import {Component, ComponentRef, OnInit} from '@angular/core';
import {AlertController, ModalController, NavController, PopoverController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {GlobalDataService} from '../../../services/global-data.service';
import {SyncService} from '../../../services/sync.service';
import {HttpService} from '../../../services/http.service';
import {AccountService} from '../../../services/account.service';
import {FiltroPage} from './filtro/filtro.page';

@Component({
    selector: 'app-page-appelli-docente',
    templateUrl: 'appelli-docente.page.html',
})

export class AppelliDocentePage implements OnInit {
    currentPage = '/appelli-docente';

    dataAggiornamento: string;
    idServizio = 102;
    appelli: Array<any>;
    appelliFiltrati: Array<any> = [];

    color = 'primary';

    dataAggiornamentoAppelli = 'Mai';

    prenotati = false;
    verbalizzati = false;
    nonVerbalizzati = false;
    futuri = true;
    presidente = true;
    searchTerm = '';
    aggiornamentoVerificato = false;
    rinvioAggiornamento = false;
    nrRinvii = 0;
    maxNrRinvii = 5;
    dal = '';
    al = '';

    step = 10;
    mostraTutti = false;
    mostraPrimi = true;
    nrElementi = 0;
    nrElementiFiltrati = 0;
    nrElementiDaMostrare = this.step;
    nrElementiNascosti = 0;


    constructor(
        private navCtrl: NavController,
        private toastCtrl: ToastController,
        private storage: Storage,
        private modalCtrl: ModalController,
        public sync: SyncService,
        public http: HttpService,
        public account: AccountService,
        private alertCtrl: AlertController,
        public globalData: GlobalDataService,
        private popoverCtrl: PopoverController) {
    }


    ngOnInit() {
        if (this.globalData.userRole !== 'teacher') {
            this.globalData.goHome();
            return;
        }

        this.globalData.srcPage = this.currentPage;
        this.account.controllaAccount().then(
            () => {
                this.storage.get('step').then((value) => {
                    if (value != null) {
                        this.step = parseInt(value, 10);
                        this.nrElementiDaMostrare = this.step;
                    } else {
                        this.step = 20;
                        this.nrElementiDaMostrare = this.step;
                    }
                }, () => {
                    this.step = 20;
                    this.nrElementiDaMostrare = this.step;
                    this.storage.set('step', this.step).then(
                        () => {
                            GlobalDataService.log(0, 'Impostato step di default!', null);
                        },
                        (err) => {
                            GlobalDataService.log(2, 'Scrittura nello storage fallita fallito!', err);
                        });
                });

                this.appelliFiltrati = [];
                const filtroAppelliPrenotati = this.storage.get('filtroAppelliPrenotati');
                const filtroAppelliVerbalizzati = this.storage.get('filtroAppelliVerbalizzati');
                const filtroAppelliNonVerbalizzati = this.storage.get('filtroAppelliNonVerbalizzati');
                const filtroAppelliFuturi = this.storage.get('filtroAppelliFuturi');
                const filtroAppelliPresidente = this.storage.get('filtroAppelliPresidente');
                const filtroAppelliStringa = this.storage.get('filtroAppelliStringa');
                const filtroAppelliDal = this.storage.get('filtroAppelliDal');
                const filtroAppelliAl = this.storage.get('filtroAppelliAl');
                const preserenzeStep = this.storage.get('step');

                Promise.all([filtroAppelliPrenotati, filtroAppelliVerbalizzati, filtroAppelliNonVerbalizzati, filtroAppelliFuturi, filtroAppelliPresidente, filtroAppelliStringa, filtroAppelliDal, filtroAppelliAl, preserenzeStep]).then(
                    (data) => {
                        //  console.log('Stored New ' + data[0] + ' ' + data[1]);
                        this.prenotati = data[0];
                        this.verbalizzati = data[1];
                        this.nonVerbalizzati = data[2];
                        this.futuri = data[3];
                        this.presidente = data[4];
                        this.searchTerm = data[5];
                        this.dal = data[6];
                        this.al = data[7];
                        this.step = parseInt(data[8], 10);
                        this.nrElementiDaMostrare = this.step;
                        this.aggiorna(false, true);
                    }, (err) => {
                        this.storage.set('filtroAppelliPrenotati', false);
                        this.storage.set('filtroAppelliVerbalizzati', false);
                        this.storage.set('filtroAppelliNonVerbalizzati', false);
                        this.storage.set('filtroAppelliFuturi', true);
                        this.storage.set('filtroAppelliPresidente', true);
                        this.storage.set('filtroAppelliStringa', '');
                        this.storage.set('filtroAppelliDal', '');
                        this.storage.set('filtroAppelliAl', '');
                        this.aggiorna(false, true);

                    });
            }, () => {
                this.globalData.goTo(this.currentPage, '/login', 'root', false);
            }
        );
    }

    troppi(): boolean {
        return (!this.mostraTutti && this.appelliFiltrati && this.appelliFiltrati.length > 100);
    }

    onMostraProssimi() {
        this.nrElementiDaMostrare += this.step;
        this.setFiltro();
    }

    setFiltro() {
        this.storage.set('filtroAppelliPrenotati', this.prenotati);
        this.storage.set('filtroAppelliVerbalizzati', this.verbalizzati);
        this.storage.set('filtroAppelliNonVerbalizzati', this.nonVerbalizzati);
        this.storage.set('filtroAppelliFuturi', this.futuri);
        this.storage.set('filtroAppelliPresidente', this.presidente);
        this.storage.set('filtroAppelliStringa', this.searchTerm);
        this.storage.set('filtroAppelliDal', this.dal);
        this.storage.set('filtroAppelliAl', this.al);

        this.appelliFiltrati = this.filtra(this.searchTerm);
        this.nrElementiFiltrati = this.appelliFiltrati.length;
        this.nrElementiNascosti = this.nrElementiFiltrati - this.nrElementiDaMostrare;
        if (this.nrElementiNascosti < 0) {
            this.nrElementiNascosti = 0;
        }
        if (this.mostraPrimi && this.appelliFiltrati.length > this.nrElementiDaMostrare) {
            this.appelliFiltrati = this.appelliFiltrati.slice(0, this.nrElementiDaMostrare - 1);
            this.mostraTutti = false;
        }
        if (this.appelliFiltrati.length === this.appelli.length) {
            this.color = 'primary';
        } else {
            this.color = 'danger';
        }
    }

    getToday(): string {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1; // January is 0!
        let mmStr = '' + mm;
        let ddStr = '' + dd;
        const yyyy = today.getFullYear();

        if (dd < 10) {
            ddStr = '0' + dd;
        }
        if (mm < 10) {
            mmStr = '0' + mm;
        }
        // console.log(yyyy + '-' + mmStr + '-' + ddStr);
        return yyyy + '-' + mmStr + '-' + ddStr;
    }

    filtra(searchTerm) {

        this.appelliFiltrati = [];

        if (searchTerm == null || searchTerm === undefined) {
            this.searchTerm = '';
            searchTerm = '';
        }

        const today = this.getToday();
        return this.appelli.filter((item) => {
            try {
                if (this.prenotati && item.PRENOTAZIONI === '0') {
                    return false;
                }
                if (this.verbalizzati && item.NR_VERBALI === '0') {
                    return false;
                }
                if (this.nonVerbalizzati && item.NR_VERBALI !== '0') {
                    return false;
                }
                // console.log('DATA: ' + item.DATA_INIZIO_APP);
                if (this.futuri && item.DATA_INIZIO_APP < today) {
                    return false;
                }
                if (this.presidente && item.RUOLO.toLowerCase().indexOf('presidente') < 0 ) {
                    return false;
                }
                if (this.dal !== '' && item.DATA_INIZIO_APP < this.dal) {
                    return false;
                }
                if (this.al !== '' && item.DATA_INIZIO_APP > this.al) {
                    return false;
                }

                return (item.INSEGNAMENTO.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    // (item.RUOLO.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    // (item.COD.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    // (item.DES_STATO.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    (item.DATA_INIZIO_APP.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);

            } catch (err) {
                console.log(err);
            }
        });
    }

    // Restituisce lo stato di eventuali richieste di sincronizzazione per il JSON associato al servizio
    isLoading() {
        return this.sync.loading[this.idServizio];
    }


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

        this.sync.getJson(this.idServizio, null, sync).then(
            (data) => {
                if ( this.sync.dataIsChanged(this.appelli, data[0]) ) {
                    this.appelli = data[0];
                    console.log(data);
                    if (this.appelli) {
                        this.nrElementi = this.appelli.length;
                    }
                    this.globalData.nrAppelliAperti = this.appelli.length;
                    this.setFiltro();
                    setTimeout(() => {
                        this.controllaAggiornamento();
                    }, 1000);
                }
                this.dataAggiornamento = SyncService.dataAggiornamento(data);
                this.dataAggiornamentoAppelli = this.dataAggiornamento;
            },
            (err) => {
                console.log('Errore in aggiornaAppelli: ' + err);
            }).catch(err => {
            console.log('Eccezione in aggiornaAppelli: ' + err);
        });
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


    doRefresh(refresher) {
        this.aggiorna(true, true);
        if (refresher) { refresher.complete(); }
    }


    async mostraAppello(appello) {
        console.log('Vado al dettaglio');
        this.globalData.srcPage = '/appelli-docente';
        this.globalData.appello = appello;
        this.globalData.goTo('/appelli-docente', '/appello-docente', 'forward', false);
    }

    async presentPopover(event: any) {
        const popover = await this.popoverCtrl.create({
            component: FiltroPage,
            event: event,
            translucent: true,
            componentProps: {
                page: this
            }
        });
        return await popover.present();
    }

    async dismissPopover() {
        return await this.popoverCtrl.dismiss();
    }


    date2string(stringDate): string {
        return GlobalDataService.formatStringDateNoTime(stringDate, '-');
    }

    home() {
        this.globalData.goHome();
    }

    loadData(event) {
        setTimeout(() => {
            console.log('Elementi: ' + this.nrElementiDaMostrare);
            console.log('Step: ' + this.step);
            this.nrElementiDaMostrare += this.step;
            console.log('Elementi nuovi: ' + this.nrElementiDaMostrare);
            this.setFiltro();
            event.target.complete();

            // Se non ci sono ulteriori elementi, disabilitiamo lo scroll
            if (this.nrElementiDaMostrare >= this.nrElementi) {
                event.target.disabled = true;
            }
        }, 500);
    }

}
