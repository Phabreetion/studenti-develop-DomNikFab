import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import { trigger, state, style, animate, transition} from '@angular/animations';
import {Storage} from '@ionic/storage';
import {GlobalDataService} from '../../services/global-data.service';
import {SyncService} from '../../services/sync.service';
import {AccountService} from '../../services/account.service';
import {HttpService} from '../../services/http.service';

@Component({
    selector: 'app-page-notifiche',
    templateUrl: 'notifiche.html',
    styleUrls: ['./notifiche.scss'],
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateX(0)'})),
            transition('void => *', [
                style({transform: 'translateX(100%)'}),
                animate(300)
            ])
        ])
    ]
})
export class NotifichePage implements OnInit {
    currentPage = '/notifiche';
    idServizio = 13;

    notifiche: Array<any> = [];
    notificheFiltrate: Array<any> = [];
    dataAggiornamento: string;
    color = 'primary';

    searchTerm = '';
    flyInOutState = 'in';
    showSearchBar = false;
    aggiornamentoVerificato = false;
    rinvioAggiornamento = false;
    nrRinvii = 0;
    maxNrRinvii = 5;

    colors = { 1: 'primary', 2: 'secondary', 3: 'danger', 4: 'primary', 5: 'primary'};
    icons =  {1: 'information-circle', 2: 'information-circle', 3: 'information-circle', 4: 'bookmark', 5: 'ribbon'};

    step = 20;
    mostraTutti = false;
    mostraPrimi = true;
    nrElementi = 0;
    nrElementiFiltrati = 0;
    nrElementiDaMostrare = this.step;
    nrElementiNascosti = 0;

    constructor(
        private toastCtrl: ToastController,
        public http: HttpService,
        public storage: Storage,
        public globalData: GlobalDataService,
        public account: AccountService,
        public sync: SyncService,
        public modalCtrl: ModalController,
        public alertCtrl: AlertController) {
    }

    ngOnInit() {
        this.globalData.srcPage = '/notifiche';
        this.account.controllaAccount().then(
            () => {
                this.storage.get('step').then((value) => {
                    if (value != null) {
                        this.step = parseInt(value, 10);
                        this.nrElementiDaMostrare = this.step;
                    }
                });
                this.notificheFiltrate = [];
                this.aggiorna(false, true);
            }, () => {
                this.globalData.goTo(this.currentPage, '/login', 'root', false);
            }
        );
    }

    loadData(event) {
        setTimeout(() => {
            this.nrElementiDaMostrare += this.step;
            this.setFiltro();
            event.target.complete();

            // Se non ci sono ulteriori elementi, disabilitiamo lo scroll
            if (this.nrElementiDaMostrare >= this.nrElementi) {
                event.target.disabled = true;
            }
        }, 500);
    }

    troppi(): boolean {
        return (!this.mostraTutti && this.notificheFiltrate && this.notificheFiltrate.length > 100);
    }

    onMostraProssimi() {
        this.nrElementiDaMostrare += this.step;
        this.setFiltro();
    }

    onMostraTutti() {
        this.mostraPrimi = false;
        this.setFiltro();

        if (this.troppi()) {
            this.alertCtrl.create({
                header: 'Sei sicuro?',
                message: 'Vuoi visualizzare tutte le ' +  this.notificheFiltrate.length + ' notifiche?',
                buttons: [
                    {
                        text: 'No',
                        handler: () => {
                            this.mostraPrimi = true;
                            this.mostraTutti = false;
                            this.setFiltro();
                        }
                    },
                    {
                        text: 'Sì',
                        handler: () => {
                            this.mostraTutti = true;
                        }
                    }
                ]
            }).then(alert => alert.present());

        } else {
            this.mostraTutti = true;
        }


    }

    setFiltro() {
        this.notificheFiltrate = this.filtra(this.searchTerm);
        this.nrElementiFiltrati = this.notificheFiltrate.length;
        this.nrElementiNascosti = this.nrElementiFiltrati - this.nrElementiDaMostrare;
        if (this.nrElementiNascosti < 0) {
            this.nrElementiNascosti = 0;
        }
        if (this.mostraPrimi && this.notificheFiltrate.length > this.nrElementiDaMostrare) {
            this.notificheFiltrate = this.notificheFiltrate.slice(0, this.nrElementiDaMostrare - 1);
            this.mostraTutti = false;
        }

        if (this.nrElementiFiltrati === this.nrElementi) {
            this.color = 'primary';
        } else {
            this.color = 'danger';
        }
    }

    onSearchCancel() {
        this.searchTerm = '';
        this.setFiltro();
    }

    filtra(searchTerm) {
        if (searchTerm == null || searchTerm === undefined) {
            return this.notifiche;
        }

        return this.notifiche.filter((item) => {
            try {
                return (item.data.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    (item.titolo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    (item.messaggio.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
            } catch (err) {
                console.log(err);
            }
        });
    }


    itemSelected(item: any) {
        this.alertCtrl.create({
            header: item.title,
            message: item.messaggio,
            buttons: [{
                text: 'Chiudi',
                role: 'cancel'
            }]
        }).then(alert => alert.present());
    }

    // Restituisce lo stato di eventuali richieste di sincronizzazione per il JSON associato al servizio
    isLoading() {
        return this.sync.loading[this.idServizio];
    }

    // Recupera i dati tramite il sincronizzatore
    // il parametro interattivo indica se mostrare il refresher durante il recupero dei dati dal server
    aggiorna(interattivo: boolean, sync: boolean) {
        if (this.sync.loading[this.idServizio]) {
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
                    }).then(toast => { toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
                }
            }
        }
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;

        this.sync.getJson(this.idServizio, sync).then(
            (data) => {
                if ( this.sync.dataIsChanged(this.notifiche, data['notifiche']) ) {
                    this.notifiche = data['notifiche'];
                    if (this.notifiche) {
                        this.nrElementi = this.notifiche.length;
                    }
                    this.globalData.nrNotifiche = this.notifiche.length;
                    this.setFiltro();
                    setTimeout(() => {
                        this.controllaAggiornamento();
                    }, 1000);
                }
                this.dataAggiornamento = SyncService.dataAggiornamento(data);
            },
            (err) => {
                if (interattivo) {
                    this.toastCtrl.create({
                        message: 'Non è stato possibile recuparate i dati dal server. Riprovare più tardi.',
                        duration: 3000
                    }).then(toast => { toast.present(); }, (error) => {});
                }

            }).catch(err => {
            }
        );
    }

    controllaAggiornamento() {
        // La verifica dell'aggiornamento in background la facciamo solo una volta
        if (this.aggiornamentoVerificato) {
            return;
        }

        // Se stiamo caricando dati dal server rimandiamo la verifica
        if (this.sync.loading[this.idServizio]) {
            setTimeout(() => {
                this.controllaAggiornamento();
            }, 1000);
        } else {
            this.aggiornamentoVerificato = true;
            this.aggiorna(false, false);
        }
    }

    pulisciTesto(testo) {
        try {
            return decodeURIComponent(escape(testo));
        } catch (e) {
            return testo;
        }
    }

    showDetails(item: any) {
        const notifica = item;
        notifica.messaggio = this.pulisciTesto(notifica.messaggio);

        switch (notifica.tipo) {
            case 1:
            case 2:
            case 3: {
                this.globalData.notizia = {
                    'data' : notifica.data,
                    'titolo' : notifica.titolo,
                    'contenuto' : notifica.messaggio,
                    'link' : notifica.chiave,
                    'notifica' : 'true'
                };
                this.globalData.srcPage = '/notifiche';
                this.globalData.goTo(this.currentPage, '/notizia', 'forward', false);
                break;
            }
            case 4: {
                this.alertCtrl.create({
                    header: notifica.titolo,
                    message: notifica.messaggio,
                    buttons: [{
                        text: 'Visualizza',
                        handler: () => {
                            this.globalData.goTo(this.currentPage, '/appelli', 'forward', false);
                        }
                    }, {
                        text: 'Chiudi',
                        role: 'cancel'
                    }]
                }).then(alert => alert.present());
                break;
            }
            case 5: {
                this.alertCtrl.create({
                    header: notifica.titolo,
                    message: notifica.messaggio,
                    buttons: [{
                        text: 'Visualizza',
                        handler: () => {
                            this.globalData.goTo(this.currentPage, '/carriera', 'forward', false);
                        }
                    }, {
                        text: 'Chiudi',
                        role: 'cancel'
                    }]
                }).then(alert => alert.present());
                break;
            }

            default: {
                this.alertCtrl.create({
                    header: notifica.titolo,
                    message: notifica.messaggio,
                    buttons: [{
                        text: 'Visualizza',
                        handler: () => {
                            // console.log(' clicked');
                        }
                    }, {
                        text: 'Chiudi',
                        role: 'cancel'
                    }]
                }).then(alert => alert.present());
            }
        }
    }

    doRefresh(refresher) {
        this.aggiorna(true, true);
        if (refresher) {
            refresher.complete();
        }
    }

    toggleInOut() {
        this.showSearchBar = !this.showSearchBar;
        this.flyInOutState === 'out' ? this.flyInOutState = 'in' : this.flyInOutState = 'out';
    }

    date2string(stringDate): string {
        return GlobalDataService.formatStringDateTime(stringDate, '-', ':');
    }
}
