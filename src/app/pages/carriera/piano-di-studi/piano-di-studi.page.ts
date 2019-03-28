import {Component, NgZone, OnInit} from '@angular/core';
import {ActionSheetController, ToastController} from '@ionic/angular';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {AccountService} from '../../../services/account.service';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-page-piano-di-studi',
    templateUrl: 'piano-di-studi.page.html',
    styleUrls: ['./piano-di-studi.page.scss']
})
export class PianoDiStudiPage implements OnInit {

    currentPage = '/carriera/tab/piano-di-studi';
    idServizio = 12;

    srcPage: string;
    libretto: Array<any>;
    primoAnno: Array<any>;
    secondoAnno: Array<any>;
    terzoAnno: Array<any>;
    quartoAnno: Array<any>;
    quintoAnno: Array<any>;
    sestoAnno: Array<any>;
    anniSuccessivi: Array<any>;

    nrPrimoAnno = 0;
    nrSecondoAnno = 0;
    nrTerzoAnno = 0;
    nrQuartoAnno = 0;
    nrQuintoAnno = 0;
    nrSestoAnno = 0;
    nrSuccessiviAnno = 0;

    anni: Array<any>;

    loading: any;
    dataAggiornamento: string;
    aggiornamentoVerificato = false;
    rinvioAggiornamento = false;
    nrRinvii = 0;
    maxNrRinvii = 5;

    // lastItem: any;
    // threeDeeTouchEnabled = false;
    // actions: Array<ThreeDeeTouchQuickAction> = [
    //     {
    //         type: 'checkin',
    //         title: 'Check in',
    //         subtitle: 'Quickly check in',
    //         iconType: 'Compose'
    //     },
    //     {
    //         type: 'share',
    //         title: 'Share',
    //         subtitle: 'Share like you care',
    //         iconType: 'Share'
    //     },
    //     {
    //         type: 'search',
    //         title: 'Search',
    //         iconType: 'Search'
    //     },
    //     {
    //         title: 'Show favorites',
    //         iconTemplate: 'HeartTemplate'
    //     }
    // ];

    constructor(
        public ngZone: NgZone,
        public sync: SyncService,
        public http: HttpService,
        public globalData: GlobalDataService,
        public toastCtrl: ToastController,
        public actionSheetCtrl: ActionSheetController,
        public account: AccountService) {
    }

    ngOnInit() {

        this.account.controllaAccount().then(
            (ok) => {
                this.srcPage = this.globalData.srcPage;
                this.globalData.srcPage = this.currentPage;
                if (this.srcPage === this.globalData.srcPage) {
                    this.srcPage = null;
                }
                this.http.getConnected();
                this.aggiorna(false, true);
            }, (err) => {
                this.globalData.goTo(this.currentPage, '/login', 'root', false);
            }
        );

        // this.threeDeeTouch.isAvailable().then(isAvailable => {
        //     if (isAvailable) {
        //         this.threeDeeTouchEnabled = true;
        //         this.threeDeeTouch.watchForceTouches()
        //             .subscribe(
        //                 (data: ThreeDeeTouchForceTouch) => {
        //                     console.dir(data);
        //                     console.log('Force touch %' + data.force);
        //                     console.log('Force touch timestamp: ' + data.timestamp);
        //                     console.log('Force touch x: ' + data.x);
        //                     console.log('Force touch y: ' + data.y);
        //                     console.dir(this.lastItem);
        //                 }
        //             );
        //         this.threeDeeTouch.configureQuickActions(this.actions);
        //         this.threeDeeTouch.onHomeIconPressed().subscribe(
        //             (payload) => {
        //                 // returns an object that is the button you presed
        //                 console.log('Pressed the ${payload.title} button')
        //                 console.log(payload.type)
        //
        //             });
        //     } else {
        //         this.threeDeeTouchEnabled = true;
        //     }
        // }, (err) => {
        //     this.threeDeeTouchEnabled = false;
        // });


    }

    swipeEvent(event) {
        // console.log('Swiped');
        // if (event.direction === 2) {
        //     console.dir('Next');
        // } else {
        //     console.log('Previous');
        // }
        //
        // console.dir(event);
    }


    // select(item) {
    //     this.lastItem = item;
    // }

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
                    }).then( (toast) => {toast.present(); }, (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                }
            }
        }
        this.rinvioAggiornamento = false;

        this.sync.getJson(this.idServizio, true).then(
            (data) => {
                if ( this.sync.dataIsChanged(this.libretto, data[0]) ) {
                    this.libretto = data[0];
                    this.caricaAnni();
                    setTimeout(() => {
                        this.controllaAggiornamento();
                    }, 1000);
                }
                this.dataAggiornamento = SyncService.dataAggiornamento(data);
            },
            (err) => {
            }).catch(err => {
            }
        );

    }

    // listaFile(interattivo:boolean, sync:boolean) {
    //     if (this.sync.loading[18])
    //         return;
    //
    //     this.sync.getJson(18, true).then(
    //         (data) => {
    //             let dati = data[0];
    //             //console.dir(dati);
    //         },
    //         (err) => {
    //         }).catch(err => {
    //         }
    //     );
    // }

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

    isLoading() {
        return this.sync.loading[this.idServizio];
    }

    doRefresh(refresher) {
        refresher.target.complete();

        if (this.sync.loading[this.idServizio]) {
            return;
        }

        this.aggiorna(true, true);
    }

    onPress(item) {
        let stato = 'true';
        let etichettaSottoscrizione = 'Aggiungi al Calendario delle Lezioni';
        if (item.SOTTOSCRITTO) {
            stato = 'false';
            etichettaSottoscrizione = 'Rimuovi dal Calendario delle Lezioni';
        }
        this.actionSheetCtrl.create({
            header: item.DESCRIZIONE,
            buttons: [
                {
                    text: 'Appelli',
                    icon: 'book',
                    handler: () => {
                        this.globalData.goTo(this.currentPage, '/appelli/' + item.CODICE, 'forward', false);
                    }
                }, {
                    text: etichettaSottoscrizione,
                    icon: 'calendar',
                    handler: () => {
                        this.inviaACalendario(item);
                    }
                }, {
                    text: 'Materiale didattico',
                    icon: 'archive',
                    handler: () => {
                        console.dir('File per ' + item.AD_ID);
                        this.apriMaterialeDidattico(item.AD_ID);
                    }
                }, {
                    text: 'Chiudi',
                    role: 'cancel',
                    icon: 'close',
                    handler: () => {
                        // console.log('Cancel clicked');
                    }
                }
            ]
        }).then (
            (actionSheet) => actionSheet.present()
        );
    }



    caricaAnni() {
        this.anni = Array();
        this.primoAnno = Array();
        this.primoAnno = Array();
        this.secondoAnno = Array();
        this.terzoAnno = Array();
        this.primoAnno = Array();
        this.quartoAnno = Array();
        this.quintoAnno = Array();
        this.sestoAnno = Array();
        this.anniSuccessivi = Array();

        this.nrPrimoAnno = 0;
        this.nrSecondoAnno = 0;
        this.nrTerzoAnno = 0;
        this.nrQuartoAnno = 0;
        this.nrQuintoAnno = 0;
        this.nrSestoAnno = 0;
        this.nrSuccessiviAnno = 0;

        for (const riga of this.libretto) {
            switch (riga.ANNO) {
                case '1':
                    this.primoAnno[this.nrPrimoAnno] = riga;
                    this.nrPrimoAnno++;
                    break;
                case '2':
                    this.secondoAnno[this.nrSecondoAnno] = riga;
                    this.nrSecondoAnno++;
                    break;
                case '3':
                    this.terzoAnno[this.nrTerzoAnno] = riga;
                    this.nrTerzoAnno++;
                    break;
                case '4':
                    this.quartoAnno[this.nrQuartoAnno] = riga;
                    this.nrQuartoAnno++;
                    break;
                case '5':
                    this.quintoAnno[this.nrQuintoAnno] = riga;
                    this.nrQuintoAnno++;
                    break;
                case '6':
                    this.sestoAnno[this.nrSestoAnno] = riga;
                    this.nrSestoAnno++;
                    break;
                default:
                    this.anniSuccessivi[this.nrSuccessiviAnno] = riga;
                    this.nrSuccessiviAnno++;
                    break;
            }
        }

        for (let i = 0; i <= 6; i++) {
            this.anni[i] = Array();
        }

        if (this.nrPrimoAnno > 0) {
            this.anni[0] = this.primoAnno;
        }
        if (this.nrSecondoAnno > 0) {
            this.anni[1] = this.secondoAnno;
        }
        if (this.nrTerzoAnno > 0) {
            this.anni[2] = this.terzoAnno;
        }
        if (this.nrQuartoAnno > 0) {
            this.anni[3] = this.quartoAnno;
        }
        if (this.nrQuintoAnno > 0) {
            this.anni[4] = this.quintoAnno;
        }
        if (this.nrSestoAnno > 0) {
            this.anni[5] = this.sestoAnno;
        }
        if (this.nrSuccessiviAnno > 0) {
            this.anni[6] = this.anniSuccessivi;
        }
    }


    selezionaTab() {
        this.actionSheetCtrl.create({
            header: 'Mostra',
            buttons: [
                {
                    text: 'Libretto',
                    icon: 'list-box',
                    handler: () => {
                        this.globalData.goTo(this.currentPage,
                            '/carriera/tab/libretto', 'forward', false);
                    }
                }, {
                    text: 'Esami da sostenere',
                    icon: 'list',
                    handler: () => {
                        this.globalData.goTo(this.currentPage,
                            '/carriera/tab/lista-esami', 'forward', false);
                    }
                }, {
                    text: 'Chiudi',
                    role: 'cancel',
                    icon: 'close',
                    handler: () => {
                        // console.log('Cancel clicked');
                    }
                }
            ]
        }).then(
            (actionSheet) => actionSheet.present()
        );
    }

    appelliEsame(esame) {
        this.globalData.goTo(this.currentPage,
            '/appelli/' + esame.CODICE, 'forward', false);
    }

    dettagliEsame(esame) {
        // console.dir(esame);
        this.globalData.esame = esame;
        this.globalData.goTo(this.currentPage, '/esame', 'forward', false);
    }

    apriMaterialeDidattico(ad_id) {
        this.globalData.ad_id = ad_id;
        this.globalData.goTo(this.currentPage, '/materiale-didattico/' + ad_id, 'forward', false);
    }

    inviaACalendario(item) {
        let stato = 'true';
        if (item.SOTTOSCRITTO) {
            stato = 'false';
        }
        this.sync.sottoscriviCalendario(item.CODICE, stato).then(
            (data) => {
                const esito = JSON.parse(data['_body']);
                const msg = esito ? esito['msg'] : null;
                const codice = esito ? esito['codice'] : -1;

                if (msg) {
                    this.toastCtrl.create({
                        message: msg,
                        duration: 3000
                    }).then( (toast) => {toast.present(); }, (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                }
                if (codice === 0) {
                    item.SOTTOSCRITTO = item.SOTTOSCRITTO === 0 ? 1 : 0;
                }

            }, (err) => {
                console.dir(err);
            }).catch(reason => {
                console.dir(reason);
            }
        );
    }

    async mostraOpzioni(esame) {
        const actionSheet = await this.actionSheetCtrl.create({
            header: esame.DESCRIZIONE,
            buttons: [{
                text: 'Dettali esame',
                icon: 'information-circle',
                handler: () => {
                    this.dettagliEsame(esame);
                }
            }, {
                text: 'Appelli',
                icon: 'book',
                handler: () => {
                    this.appelliEsame(esame);
                }
            }, {
                text: 'Materiale didattico',
                icon: 'archive',
                handler: () => {
                    this.apriMaterialeDidattico(esame.AD_ID);
                }
            }, {
                text: 'Chiudi',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                }
            }]
        });
        await actionSheet.present();
    }
}
