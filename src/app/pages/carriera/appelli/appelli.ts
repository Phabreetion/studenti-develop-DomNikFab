import {Component, OnChanges, OnInit} from '@angular/core';
import {LoadingController, ToastController, AlertController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {AccountService} from '../../../services/account.service';
import {Esse3Service} from '../../../services/esse3.service';
import {HttpService} from '../../../services/http.service';
// import {cursorTo} from "readline";

@Component({
    selector: 'app-page-appelli',
    templateUrl: 'appelli.html',
})

export class AppelliPage implements OnChanges, OnInit {

    currentPage = '/appelli';
    idServizioDisponibili = 1;
    idServizioPrenotati = 10;

    insegnamento: string;
    dataAggiornamento: string;
    sezioni: string;
    appelli: Array<any>;
    prenotazioni: Array<any>;
    nrAppelli = '';
    nrPrenotazioni = '';

    dataAggiornamentoDisponibili = 'Mai';
    dataAggiornamentoPrenotati = 'Mai';
    aggiornamentoDisponibiliVerificato = false;
    aggiornamentoPrenotatiVerificato = false;

    rinvioAggiornamento = false;
    nrRinvii = 0;
    maxNrRinvii = 5;

    constructor(
        private route: ActivatedRoute,
        private sync: SyncService,
        public http: HttpService,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        public globalData: GlobalDataService,
        public account: AccountService,
        public esse3: Esse3Service) {

        if (this.sezioni == null) {
            this.sezioni = 'disponibili';
        }
        this.route.params.subscribe( params => {
            this.insegnamento = params['insegnamento'];
        } );
    }


    ngOnChanges() {
        this.ngOnInit();
    }

    ngOnInit() {
        this.globalData.srcPage = this.currentPage;

        this.account.controllaAccount().then(
            (ok) => {
                this.http.getConnected();
                this.aggiorna(false, true);

                this.insegnamento = this.route.snapshot.paramMap.get('id');
            }, (err) => {
                this.globalData.goTo(this.currentPage, '/login', 'root', false);
            }
        );
    }

    aggiorna(interattivo: boolean, sync: boolean) {

        if (this.sync.loading[this.idServizioDisponibili]) {
            this.rinvioAggiornamento = true;
            this.dataAggiornamento = 'in corso';
            this.nrRinvii++;

            // console.log('Rinvio ' + this.nrRinvii);

            if (this.nrRinvii < this.maxNrRinvii) {
                setTimeout(() => {
                    this.aggiorna(interattivo, sync);
                }, 2000);
                return;
            } else {
                if (this.http.connessioneLenta) {
                    this.toastCtrl.create({
                        message: 'La connessione è assente o troppo lenta. Riprova ad aggiornare i dati più tardi.',
                        duration: 3000,
                        position: 'bottom'
                    }).then( (toast) => {toast.present(); }, (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                }
            }
        }
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;


        this.sync.getJson(this.idServizioDisponibili, sync).then(
            (data) => {
                const newData = data[0];
                // Ottimizziamo il refresh ignorandolo in caso di dati non modificati
                // TODO: si potrebbe ottimizzare il contronto tra array con qualcosa di più efficiente dello stringify
                if (JSON.stringify(this.appelli) !== JSON.stringify(newData)) {
                    this.appelli = data[0];
                    this.dataAggiornamentoDisponibili = SyncService.dataAggiornamento(data);
                    if (this.insegnamento != null) {
                        const val = this.insegnamento;
                        if (val && val.trim() !== '') {
                            this.appelli = data[0].filter((item) => {
                                return (item.codice === val);
                            });
                        }
                    }
                    if (this.appelli.length > 0 ) {
                        this.nrAppelli = '(' + this.appelli.length + ')';
                    } else {
                        this.nrAppelli = '';
                    }
                    setTimeout(() => {
                        this.controllaAggiornamentoDisponibili();
                    }, 1000);
                }
            },
            (err) => {
                console.log('Errore in aggiorna: ' + err);
            }).catch(err => {
            console.log('Eccezione in aggiorna: ' + err);
        });

        if (this.sync.loading[this.idServizioPrenotati]) {
            this.rinvioAggiornamento = true;
            this.dataAggiornamento = 'in corso';
            this.nrRinvii++;

            // console.log('Rinvio ' + this.nrRinvii);

            if (this.nrRinvii < this.maxNrRinvii) {
                setTimeout(() => {
                    this.aggiorna(interattivo, sync);
                }, 2000);
                return;
            } else {
                if (this.http.connessioneLenta) {
                    this.toastCtrl.create({
                        message: 'La connessione è assente o troppo lenta. Riprova ad aggiornare i dati più tardi.',
                        duration: 3000,
                        position: 'bottom'
                    }).then( (toast) => {toast.present(); }, (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                }
            }
        }
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;

        this.sync.getJson(this.idServizioPrenotati, sync).then(
            (data) => {
                const newData = data[0];
                // console.dir(newData);
                if (JSON.stringify(this.prenotazioni) !== JSON.stringify(newData)) {
                    this.prenotazioni = data[0];
                    // console.dir(this.prenotazioni);
                    this.dataAggiornamentoPrenotati = SyncService.dataAggiornamento(data);
                    if (this.prenotazioni.length > 0) {
                        this.nrPrenotazioni = '(' + this.prenotazioni.length + ')';
                    } else {
                        this.nrPrenotazioni = '';
                    }
                    setTimeout(() => {
                        this.controllaAggiornamentoPrenotati();
                    }, 1000);
                }
            },
            (err) => {
                console.log('Errore in aggiorna: ' + err);
            }).catch(err => {
            console.log('Eccezione in aggiorna: ' + err);
        });
    }

    controllaAggiornamentoDisponibili() {
        // La verifica dell'aggiornamento in background la facciamo solo una volta
        if (this.aggiornamentoDisponibiliVerificato) {
            return;
        }
        // Se stiamo caricando dati dal server rimandiamo la verifica
        if (this.sync.loading[this.idServizioDisponibili]) {
            setTimeout(() => {
                this.controllaAggiornamentoDisponibili();
            }, 1000);
        } else {
            this.aggiornamentoDisponibiliVerificato = true;
            this.aggiorna(false, false);
        }
    }

    controllaAggiornamentoPrenotati() {
        // La verifica dell'aggiornamento in background la facciamo solo una volta
        if (this.aggiornamentoPrenotatiVerificato) {
            return;
        }
        // Se stiamo caricando dati dal server rimandiamo la verifica
        if (this.sync.loading[this.idServizioPrenotati]) {
            setTimeout(() => {
                this.controllaAggiornamentoPrenotati();
            }, 1000);
        } else {
            this.aggiornamentoPrenotatiVerificato = true;
            this.aggiorna(false, false);
        }
    }

    isLoading() {
        switch (this.sezioni) {
            case 'disponibili':
                return this.sync.loading[this.idServizioDisponibili];
            default :
                return this.sync.loading[this.idServizioPrenotati];
        }
    }

    doRefresh(refresher) {
        refresher.target.complete();

        this.aggiorna(true, true);
    }

    onGoBack()  {
        this.globalData.goTo(this.currentPage, '/libretto', 'backward', false);
    }

    prenotaAppello(item, appello) {
        const data_oggi = new Date();

        let data_inizio_iscrizione = appello.p10_app_data_inizio_iscr;
        data_inizio_iscrizione = data_inizio_iscrizione.split(' ');
        const data_inizio_split = data_inizio_iscrizione[0].split('/');
        const inizio_prenotazione = new Date(data_inizio_split[2], data_inizio_split[1] - 1, data_inizio_split[0]);
        const prima_data = new Date(inizio_prenotazione);

        if (data_oggi >= prima_data) {
            let data_fine_iscrizione = appello.p10_app_data_fine_iscr;
            data_fine_iscrizione = data_fine_iscrizione.split(' ');
            const data_limite_split = data_fine_iscrizione[0].split('/');
            const scadenza_prenotazione = new Date(data_limite_split[2], data_limite_split[1] - 1, data_limite_split[0]);
            const ultima_data = new Date(scadenza_prenotazione);

            if (data_oggi <= ultima_data) {

                this.alertCtrl.create({
                    header: 'Prenotazione',
                    subHeader: 'Vuoi prenotarti all\'appello?',
                    message: 'La richiesta di prenotazione sarà inviata al portale dello studente.',
                    buttons: [
                        {
                            text: 'No',
                            handler: () => {
                                item.close();
                                // console.log('Appello non prenotato!');
                            }
                        },
                        {
                            text: 'Si',
                            handler: () => {
                                this.loadingCtrl.create().then(loading => {
                                    loading.present();

                                    this.esse3.prenotaAppello(appello.p10_app_app_id, appello.p10_app_ad_id, appello.adsce_id).then(
                                        (data) => {
                                            // console.dir(data);
                                            this.aggiorna(false, true);

                                            // TODO
                                            if (data['_body'] === 'success') {
                                                this.aggiorna(true, true);
                                                loading.dismiss();
                                                this.toastCtrl.create({
                                                    message: 'Prenotazione inviata! Verifica nella scheda delle ' +
                                                    'prenotazioni l\'esito del\'operazione!',
                                                    duration: 3000
                                                }).then(
                                                    (toast) => {toast.present(); },
                                                    (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                                                setTimeout(() => {
                                                    this.aggiorna(true, true);
                                                }, 1000);
                                            } else {
                                                loading.dismiss();

                                                this.toastCtrl.create({
                                                    message: 'Errore: ' + data['_body'],
                                                    duration: 4000
                                                }).then(
                                                    (toast) => {toast.present(); },
                                                    (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                                            }
                                        },
                                        (err) => {
                                            loading.dismiss();

                                            this.toastCtrl.create({
                                                message: 'Si è verificato un problema durante l\'invio della prenotazione. ' +
                                                'Riprova più tardi.',
                                                duration: 3000
                                            }).then(
                                                (toast) => {toast.present(); },
                                                (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                                        });

                                });
                            }
                        }
                    ]
                }).then(alert => alert.present());
            } else {

                item.close();
                this.toastCtrl.create({
                    message: 'Il Termine ultimo per prenotarsi è Scaduto',
                    duration: 3000
                }).then( (toast) => {toast.present(); }, (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
            }
        } else {
            item.close();
            this.toastCtrl.create({
                message: 'Non è possibile ancora possibile prenotarsi all\'appello.',
                duration: 3000
            }).then( (toast) => {toast.present(); }, (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
        }
    }

    cancellaPrenotazione(item, prenotazione) {
        let data_limite_cancellazione = prenotazione.data_ora_app;
        data_limite_cancellazione = data_limite_cancellazione.split(' ');

        const data_limite_split = data_limite_cancellazione[0].split('/');
        const scadenza_cancellazione = new Date(data_limite_split[2], data_limite_split[1] - 1, data_limite_split[0]);
        const scad_data = scadenza_cancellazione.setDate(scadenza_cancellazione.getDate() - 5);

        const ultima_data = new Date(scad_data);
        const data_oggi = new Date();

        if (data_oggi <= ultima_data) {
            this.alertCtrl.create({
                header: 'Prenotazione',
                subHeader: 'Vuoi cancellare la prenotazione?',
                message: 'Ricorda che se la finestra per la prenotazione è chiusa non sarà più possibile prenotarsi all\'appello!',
                buttons: [
                    {
                        text: 'No',
                        handler: () => {
                            item.close();
                            // console.log('Prenotazione non cancellata!');
                        }
                    },
                    {
                        text: 'Si',
                        handler: () => {
                            this.loadingCtrl.create().then(loading => {

                                loading.present();

                                this.esse3.cancellaPrenotazione(prenotazione.app_id, prenotazione.ad_id, prenotazione.adsce_id).then(
                                    (data) => {
                                        // console.dir(data);
                                        if (data['_body'] === 'success') {
                                            this.aggiorna(false, true);
                                            loading.dismiss();

                                            this.toastCtrl.create({
                                                message: 'Cancellazione inviata! Verifica sempre se l\'invio ha avuto successo!',
                                                duration: 3000
                                            }).then(
                                                (toast) => {toast.present(); },
                                                (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });

                                            setTimeout(() => {
                                                this.aggiorna(true, true);
                                            }, 1000);
                                        } else {
                                            loading.dismiss();

                                            this.toastCtrl.create({
                                                message: 'Errore: ' + data['_body'],
                                                duration: 4000
                                            }).then(
                                                (toast) => {toast.present(); },
                                                (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                                            this.aggiorna(false, true);
                                        }
                                    },
                                    (err) => {
                                        // console.log(err);
                                        loading.dismiss();

                                        this.toastCtrl.create({
                                            message: 'Si è verificato un problema durante l\'invio della prenotazione. Riprova più tardi.',
                                            duration: 3000
                                        }).then(
                                            (toast) => {toast.present(); },
                                            (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                                    });
                            });
                        }
                    }

                ]
            }).then(alert => alert.present());
        } else {
            item.close();
            this.toastCtrl.create({
                message: 'Non è possibile cancellare l\'appello.',
                duration: 3000
            }).then( (toast) => {toast.present(); }, (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
        }
    }


    pulisciTesto(item: string): string {
        return item.replace(/\\r\\n|\\r|\\n/g, '').replace('?', '\'');
    }

}
