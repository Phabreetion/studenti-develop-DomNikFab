import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonContent, MenuController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {AccountService} from '../../../services/account.service';
import {HttpService} from '../../../services/http.service';


@Component({
    selector: 'app-page-rubrica',
    templateUrl: 'rubrica.html',
    styleUrls: ['./rubrica.scss'],
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

export class RubricaPage implements OnInit {
    [x: string]: any;

    currentPage = '/rubrica';
    idServizio = 7;

    rubrica: Array<any> = [];
    rubricaFiltrata: Array<any> = [];

    dataAggiornamento: string;
    searchTerm = '';

    @ViewChild('searchbar') searchbar: any;
    flyInOutState: String = 'in';
    showSearchBar = false;

    aggiornamentoVerificato = false;
    rinvioAggiornamento = false;
    nrRinvii = 0;
    maxNrRinvii = 5;

    step = 10;
    mostraTutti = false;
    mostraPrimi = true;
    nrElementi = 0;
    nrElementiFiltrati = 0;
    nrElementiDaMostrare = this.step;
    nrElementiNascosti = 0;

    @ViewChild(IonContent) ionContent: IonContent;

    sezioni = 'indietro'; // per lo switch dei bottoni.


    constructor(
        private toastCtrl: ToastController,
        public storage: Storage,
        public sync: SyncService,
        public http: HttpService,
        public alertCtrl: AlertController,
        public globalData: GlobalDataService,
        public account: AccountService,
        private menu: MenuController) {

    }

    //ti porta alla fine ed anche all'inizio della lista dei contatti
    scrollContent(scroll) {
        if (scroll === 'top') {
            this.ionContent.scrollToTop(300);
        } else {
            this.ionContent.scrollToBottom(300);
        }
    }

    ngOnInit() {
        this.globalData.srcPage = this.currentPage;

        this.account.controllaAccount().then(
            (ok) => {
                this.http.getConnected();
                this.storage.get('step').then((value) => {
                    if (value != null) {
                        this.step = parseInt(value, 10);
                        this.nrElementiDaMostrare = this.step;
                    }
                });
                this.aggiorna(false, true);
                if (!this.troppi()) {
                    this.flyInOutState = 'in';
                    this.showSearchBar = true;
                }
            }, (err) => {
                this.globalData.goTo(this.currentPage, '/login', 'root', false);
            }
        );
    }


    ionViewDidEnter() {
        this.showSearchBar = false;
        this.searchTerm = '';
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
        return (!this.mostraTutti && this.rubricaFiltrata && this.rubricaFiltrata.length > 100);
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
                message: 'Vuoi visualizzare tutti i ' + this.rubricaFiltrata.length + ' contatti individuati?',
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

    onSearchCancel() {
        console.log('Cancellato');
        this.searchTerm = '';
        this.setFiltro();
    }


    setFiltro() {
        this.rubricaFiltrata = this.filtra(this.searchTerm);
        //filtro per sezione 
        if (this.sezioni != 'indietro') {
            this.rubricaFiltrata = this.rubricaFiltrata.filter(contatto => contatto.citta === this.sezioni);
        }

        this.nrElementiFiltrati = this.rubricaFiltrata.length;
        this.nrElementiNascosti = this.nrElementiFiltrati - this.nrElementiDaMostrare;
        if (this.nrElementiNascosti < 0) {
            this.nrElementiNascosti = 0;
        }
        if (this.mostraPrimi && this.rubricaFiltrata.length > this.nrElementiDaMostrare) {
            this.rubricaFiltrata = this.rubricaFiltrata.slice(0, this.nrElementiDaMostrare - 1);
            this.mostraTutti = false;
        }


    }


// qui vado a filtrare
    filtra(searchTerm) {
        if (searchTerm == null || searchTerm === undefined || searchTerm == '') {
            return this.rubrica;
        }

        return this.rubrica.filter((item) => {
            try {
                return (item.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    (item.cognome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    (item.email_utente.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    (item.tel1.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    (item.struttura.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    (item.indirizzo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
            } catch (err) {
                console.log(err);
            }
        });
    }


    // Restituisce lo stato di eventuali richieste di sincronizzazione per il JSON associato al servizio
    isLoading() {
        return this.sync.loading[this.idServizio];
    }

    // Recupera i dati tramite il sincronizzatore
    aggiorna(interattivo: boolean, sync: boolean) {
        if (this.sync.loading[this.idServizio]) {
            this.rinvioAggiornamento = true;
            this.dataAggiornamento = 'in corso';
            this.nrRinvii++;

            // console.log('Rinvio ' + this.nrRinvii);

            if (this.nrRinvii < this.maxNrRinvii) {
                setTimeout(() => {
                    console.log(this.rubrica);
                    this.aggiorna(interattivo, sync);
                }, 2000);
                return;
            } else {
                if (this.http.connessioneLenta) {
                    this.toastCtrl.create({
                        message: 'La connessione è assente o troppo lenta. Riprova ad aggiornare i dati più tardi.',
                        duration: 3000,
                        position: 'bottom'
                    }).then(toast => {
                        toast.present();
                    }, (err) => {
                        GlobalDataService.log(2, 'Toast fallito!', err);
                    });
                }
            }
        }
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;

        this.sync.getJson(this.idServizio, null, sync).then(
            (data) => {
                if (this.sync.dataIsChanged(this.rubrica, data[0])) {
                    this.rubrica = data[0];
                    console.log(this.rubrica); //console json
                    if (this.rubrica) {
                        this.nrElementi = this.rubrica.length;
                    }
                    for (const contatto of this.rubrica) {
                        if (contatto.nome != null) {
                            contatto.nome = GlobalDataService.toTitleCase(contatto.nome);
                        } else {
                            contatto.nome = '';
                        }
                        if (contatto.cognome != null) {
                            contatto.cognome = GlobalDataService.toTitleCase(contatto.cognome);
                        } else {
                            contatto.cognome = '';
                        }

                        if ((contatto.tel1 != null) && (contatto.tel1 !== '')) {
                            if ((contatto.tel1.indexOf('+39') !== 0) && (contatto.tel1.indexOf('0') !== 0)) {
                                contatto.tel1 = '+39 0874 404' + contatto.tel1.slice(1);
                            }
                        } else {
                            contatto.tel1 = 'Numero non presente!';
                        }
                    }
                    this.setFiltro();
                    setTimeout(() => {
                        this.controllaAggiornamento();
                    }, 1000);
                }
                this.dataAggiornamento = SyncService.dataAggiornamento(data);
            },
            (err) => {
                GlobalDataService.log(2, 'Errore nella chiamata a getJson(' + this.idServizio + ',' + sync + ')', err);
                if (interattivo) {
                    this.toastCtrl.create({
                        message: 'Non è stato possibile recuparate i dati dal server. Riprovare più tardi.',
                        duration: 3000
                    }).then(
                        (toast) => {
                            toast.present();
                        },
                        (toastErr) => {
                            GlobalDataService.log(2, 'Toast fallito!', toastErr);
                        });
                }
            }).catch(ex => {
                GlobalDataService.log(2, 'Eccezione nella chiamata a getJson(' + this.idServizio + ',' + sync + ')', ex);
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

    showDetails(contatto) {
        this.globalData.contatto = contatto;
        this.globalData.goTo(this.currentPage, '/contatto', 'forward', false);
    }

    // getItems(ev: any) {
    //     this.storage.get(this.idServizio.toString()).then((data) => {
    //         const val = ev.target.value;
    //         if (val && val.trim() !== '') {
    //             this.rubrica = data[0].filter((item) => {
    //                 if (item.nome == null) {
    //                     item.nome = '';
    //                 }
    //                 if (item.cognome == null) {
    //                     item.cognome = '';
    //                 }
    //                 if (item.tel1 == null) {
    //                     item.tel1 = '';
    //                 }
    //                 if (item.tel12 == null) {
    //                     item.tel2 = '';
    //                 }
    //                 if (item.tel3 == null) {
    //                     item.tel3 = '';
    //                 }
    //                 if (item.tel4 == null) {
    //                     item.tel4 = '';
    //                 }
    //
    //
    //                 return (
    //                     (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
    //                     (item.cognome.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
    //                     (item.tel1.indexOf(val) > -1) ||
    //                     (item.tel2.indexOf(val) > -1) ||
    //                     (item.tel3.indexOf(val) > -1) ||
    //                     (item.tel4.indexOf(val) > -1) );
    //             });
    //         } else {
    //             this.rubrica = data[0];
    //         }
    //     });
    // }

    doRefresh(refresher) {
        if (refresher) {
            refresher.target.complete();
        }
        this.aggiorna(true, true);
    }

    toggleInOut() {
        this.flyInOutState === 'out' ? this.flyInOutState = 'in' : this.flyInOutState = 'out';
        this.showSearchBar = !this.showSearchBar;

        if (this.showSearchBar) {
            setTimeout(() => {
                this.searchbar.setFocus();
            }, 150);
        }
    }

}
