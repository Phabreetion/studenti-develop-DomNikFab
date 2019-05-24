import {Component, OnChanges, OnInit} from '@angular/core';
import {LoadingController, ToastController, AlertController, ModalController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {AccountService} from '../../../services/account.service';
import {Esse3Service} from '../../../services/esse3.service';
import {HttpService} from '../../../services/http.service';
import {GestoreListaAppelliDisponbiliComponent} from './gestore-lista-appelli-disponbili/gestore-lista-appelli-disponbili.component';
import {PianoDiStudioService} from '../../../services/piano-di-studio.service';
import {Corso} from '../../../models/Corso';
import {AppelloDisponibile} from '../../../models/AppelloDisponibile';
import {FiltroAppelliDisponibili} from '../../../models/FiltroAppelliDisponibili';
import {AppelliService} from '../../../services/appelli.service';
import {ToastsService} from '../../../services/toasts.service';

const PAGE_URL = '/appelli';

@Component({
    selector: 'app-page-appelli',
    templateUrl: 'appelli.html',
})

export class AppelliPage implements OnInit {


    //verrà passato nella query string
    insegnamento: string;

    //sezione in cui si ci trova
    sezioni: string; //'disponibili' o 'prenotati'

    //appelli array
    appelli: AppelloDisponibile[];
    appelliOrdinati: AppelloDisponibile[];
    appelliTrovati: AppelloDisponibile[];
    appelliFiltrati: AppelloDisponibile[];

    //per filtri e ordinamento
    filtro: FiltroAppelliDisponibili;

    //ricerca
    searchKey: string;
    isSearchbarOpened = false;


    //prenotazioni array
    prenotazioni: Array<any>;

    //corsi array
    corsi: Corso[];
    corsiMap: Map<number, Corso>;




    constructor(public route: ActivatedRoute,
                public sync: SyncService,
                public http: HttpService,
                public toastCtrl: ToastController,
                public toastService: ToastsService,
                public alertCtrl: AlertController,
                public loadingCtrl: LoadingController,
                public globalData: GlobalDataService,
                public account: AccountService,
                public esse3: Esse3Service,
                public modalController: ModalController,
                public pianoDiStudioService: PianoDiStudioService,
                public appelliService: AppelliService) {
        this.sezioni = 'disponibili';
        this.searchKey = '';
        this.filtro = new FiltroAppelliDisponibili();
    }

    async ngOnInit() {
        //controllo l'account, se non verificato rimanda alla pagina di login
        this.account.controllaAccount().then(
            () => {this.http.getConnected();},
            () => {this.globalData.goTo(PAGE_URL, '/login', 'root', false);}
        );

        this.insegnamento = this.route.snapshot.paramMap.get('id');

        this.corsi = await this.pianoDiStudioService.getCorsi();
        this.corsiMap = await this.pianoDiStudioService.getCorsiAsMap();

        this.appelliService.getAppelliDisponibili().then(appelliDisponibili => {
            this.appelli = appelliDisponibili;

            //fix this
            if (this.insegnamento != null) {
                const val = this.insegnamento;
                if (val && val.trim() !== '') {
                    this.appelli = appelliDisponibili.filter((item) => {
                        return (item.codice.toString() === val);
                    });
                }
            }

            this.updateFiltri();
        });

        this.appelliService.getAppelliPrenotati().then(appelliPrenotati => {
            this.prenotazioni = appelliPrenotati;
            this.controllaPrenotazioni(); //modifica le prenotazioni rimuovendo quelle il cui esame e superato
        });
    }

    ionViewDidEnter() {
        this.sezioni = 'disponibili';
        this.isSearchbarOpened = false;
        this.searchKey = '';
    }


    doRefresh(event) {
        if (this.sezioni === 'disponibili') {
            this.appelliService.getAppelliDisponibiliAggiornati().then((appelliDisponibiliAggiornati) => {
                if (this.appelliService.areAppelliChanged(appelliDisponibiliAggiornati, this.appelli)) {
                    console.log('appelli disponibili aggiornati');
                    //
                    this.appelli = appelliDisponibiliAggiornati;

                    //fix this
                    if (this.insegnamento != null) {
                        const val = this.insegnamento;
                        if (val && val.trim() !== '') {
                            this.appelli = appelliDisponibiliAggiornati.filter((item) => {
                                return (item.codice.toString() === val);
                            });
                        }
                    }

                    this.updateFiltri();
                }
                event.target.complete();
            }).catch((err) => {
                console.log(err);
                event.target.complete();
            });
        }

        if (this.sezioni === 'prenotati') {
            this.appelliService.getAppelliPrenotatiAggiornati().then((appelliPrenotatiAggiornati) => {
                if (this.appelliService.areAppelliChanged(appelliPrenotatiAggiornati, this.prenotazioni)) {
                    console.log('appelli prenotati aggiornati');
                    this.prenotazioni = appelliPrenotatiAggiornati;
                }
                event.target.complete();
            }).catch((err) => {
                console.log(err);
                event.target.complete();
            });
        }

    }

    toogleSearchbar() {
        this.isSearchbarOpened = !this.isSearchbarOpened;
        this.searchKey = '';
        this.search();
    }

    gestioneSearchbarAppelli() {

        if (this.sezioni !== 'disponibili' && this.isSearchbarOpened == true) {
            this.isSearchbarOpened = false;
            return false;
        }

        return true;
    }

    mostraIcone() {
        return this.sezioni == 'disponibili' && this.appelli && this.appelli.length !== 0 && this.insegnamento == null;
    }

    async openFiltri() {
        const modal = await this.modalController.create({
            component: GestoreListaAppelliDisponbiliComponent,
            cssClass: 'gestore-lista-appelli-disponibili-css',
            componentProps: {
                'page': this
            }
        });

        return await modal.present();
    }


    filtra() {

    }

    ordina() {
        this.appelliOrdinati = this.filtro.ordina(this.appelli, this.corsiMap);
    }

    /**
     * Questa funzione consente la ricerca degli appelli.
     * Deve essere richiamata quando viene alterata la searchbar.
     */
    search() {
        const searchKeyLowered = this.searchKey.toLowerCase();
        this.appelliTrovati = this.appelli.filter(appello => appello.descrizione.toLowerCase().search(searchKeyLowered) >= 0);
    }

    /**
     * Questa funzione ottimizza le funzioni di filtro ordinamento e ricerca
     * Filtro -> riduce il numero dei corsi per abbattere
     * Ordinamento -> la più lenta, meglio eseguirla in seguito al filtraggio per abbattere la complessità.
     * Search -> questa funzione verrà chiamata spesso. Meglio eseguirla per ultima per evitare di eseguire anche quelle sopra.
     */
    updateFiltri() {
        this.filtra();
        this.ordina();
        this.search();
    }

    memorizzaFiltri() {
        this.appelliService.memorizzaFiltri(this.filtro);
    }

    resetFiltri() {
        this.filtro.reset();
        this.memorizzaFiltri();
        this.updateFiltri();

    }


    prenotaAppello(appello: AppelloDisponibile) {
        //item.close();

        if (appello.isPrenotabile()) {
            this.alertCtrl.create({
                header: 'Prenotazione',
                subHeader: 'Vuoi prenotarti all\'appello ' + appello.descrizione + ' ?',
                message: 'La richiesta di prenotazione sarà inviata al portale dello studente.',
                buttons: [
                    {
                        text: 'No',
                        handler: () => {
                        }
                    },
                    {
                        text: 'Si',
                        handler: () => {
                            this.loadingCtrl.create().then(loading => {
                                loading.present();

                                this.appelliService.prenotaAppello(appello).then(() => {
                                    loading.dismiss();
                                    this.toastService.prenotazioneEffettuataConSuccesso();

                                    //TODO - forzare aggiornamento dati e rimandare a tab prenotati
                                }, () => {
                                    this.toastService.prenotazioneFallita();

                                    loading.dismiss();
                                });
                            });
                        }
                    }
                ]
            }).then(alert => alert.present());
        } else {

            if (appello.isBeforeApertura()) {
                this.toastService.appelloNonAncoraPrenotabile(appello.giorniRimanentiPrimaDellApertura());
            } else if (appello.isAfterChiusura()) {
                this.toastService.appelloScaduto(appello.giorniPassatiDopoLaChiusura());
            }
        }
    }

    cancellaPrenotazione(prenotazione) {
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
                subHeader: 'Vuoi cancellare la prenotazione di ' + prenotazione.ad_des + ' ?',
                message: 'Ricorda che se la finestra per la prenotazione è chiusa non sarà più possibile prenotarsi all\'appello!',
                buttons: [
                    {
                        text: 'No',
                        handler: () => {
                            //item.close();
                            // console.log('Prenotazione non cancellata!');
                        }
                    },
                    {
                        text: 'Si',
                        handler: () => {
                            this.loadingCtrl.create().then(loading => {

                                loading.present();

                                this.appelliService.cancellaPrenotazione(prenotazione.app_id, prenotazione.ad_id, prenotazione.adsce_id).then(
                                    (data) => {
                                        // console.dir(data);
                                        if (data === 'success') {
                                            //@TODO fix
                                            //this.aggiorna(false, true);
                                            loading.dismiss();

                                            this.toastCtrl.create({
                                                message: 'Cancellazione inviata! Verifica sempre se l\'invio ha avuto successo!',
                                                duration: 3000
                                            }).then(
                                                (toast) => {
                                                    toast.present();
                                                },
                                                (toastErr) => {
                                                    GlobalDataService.log(2, 'Toast fallito!', toastErr);
                                                });

                                            setTimeout(() => {
                                                //@TODO fix
                                                //this.aggiorna(false, true);
                                            }, 1000);
                                        } else {
                                            loading.dismiss();

                                            this.toastCtrl.create({
                                                message: 'Errore: ' + data,
                                                duration: 4000
                                            }).then(
                                                (toast) => {
                                                    toast.present();
                                                },
                                                (toastErr) => {
                                                    GlobalDataService.log(2, 'Toast fallito!', toastErr);
                                                });
                                            //@TODO fix
                                            //this.aggiorna(false, true);
                                        }
                                    },
                                    (err) => {
                                        // console.log(err);
                                        loading.dismiss();

                                        this.toastCtrl.create({
                                            message: 'Si è verificato un problema durante l\'invio della prenotazione. Riprova più tardi.',
                                            duration: 3000
                                        }).then(
                                            (toast) => {
                                                toast.present();
                                            },
                                            (toastErr) => {
                                                GlobalDataService.log(2, 'Toast fallito!', toastErr);
                                            });
                                    });
                            });
                        }
                    }

                ]
            }).then(alert => alert.present());
        } else {
            //item.close();
            this.toastCtrl.create({
                message: 'Non è possibile cancellare l\'appello.',
                duration: 3000
            }).then((toast) => {
                toast.present();
            }, (toastErr) => {
                GlobalDataService.log(2, 'Toast fallito!', toastErr);
            });
        }
    }


    controllaPrenotazioniOutOfTime() {
        this.prenotazioni = this.prenotazioni.filter((prenotazione) => !this.isOutOfTime(prenotazione));
    }


    /**
     * Conteggio per i giorni rimanenti
     */
    giorniRimanentiPerEsame(appello): number {
        const MS_GIORNO = 24 * 60 * 60 * 1000; // numero di millisecondi in un giorno

        const dataEsameSplittata: string[] = appello.data_ora_app.toString().split('/'); // [dd],[mm],[yyyy]
        const data_esame = new Date(parseInt(dataEsameSplittata[2]), parseInt(dataEsameSplittata[1]) - 1, parseInt(dataEsameSplittata[0])); // YYYY/MM/DD
        const data_odierna = new Date();

        return Math.ceil(Math.abs(data_odierna.getTime() - data_esame.getTime()) / MS_GIORNO);
    }

    isOutOfTime(appello): boolean {
        const dataInizioSplittata: string[] = appello.data_ora_app.toString().split('/'); // [dd],[mm],[yyyy]

        const data_esame = new Date(parseInt(dataInizioSplittata[2]), parseInt(dataInizioSplittata[1]) - 1, parseInt(dataInizioSplittata[0])); // YYYY/MM//DD
        const data_odierna = new Date();


        return data_odierna.getTime() >= data_esame.getTime(); // && data_odierna <= data_fine;
    }

    controllaPrenotazioni() {
        this.prenotazioni = this.prenotazioni.filter((appello) => {
            return this.isPrenotazioneSuperata(appello);
        });
    }

    isPrenotazioneSuperata(prenotazione): boolean {
        console.log(prenotazione.ad_id);
        let i = 0;
        while (i < this.corsi.length && (this.corsi[i].AD_ID != parseInt(prenotazione.ad_id) || this.corsi[i].isSuperato())) {
            i++;
        }
        return i < this.corsi.length;
    }


    getNumAppelliDisponibiliAsString(): string {
        if (!this.appelli) {
            return '';
        }

        return this.appelli.length > 0 ? '(' + this.appelli.length + ')' : '';
    }

    getNumPrenotazioniAsString(): string {
        if (!this.prenotazioni) {
            return '';
        }

        return this.prenotazioni.length > 0 ? '(' + this.prenotazioni.length + ')' : '';
    }

    pulisciTesto(item: string): string {
        return item.replace(/\\r\\n|\\r|\\n/g, '').replace('?', '\'');
    }


    goToDettagliCorso(appello: AppelloDisponibile) {
        this.globalData.goTo(this, ['/esame/', appello.codice], 'forward', false);
    }

    goToMaterialeDidattico(appello: AppelloDisponibile) {
        this.globalData.goTo(this, ['/materiale-didattico/', appello.ad_id], 'forward', false);
    }



}
