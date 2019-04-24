import {Component, NgZone, OnInit} from '@angular/core';
import {ActionSheetController, LoadingController, ToastController} from '@ionic/angular';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
// import {Http} from '@angular/http';

import {Storage} from '@ionic/storage';
import {AccountService} from '../../../services/account.service';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-page-accounts',
    templateUrl: './accounts.page.html',
    styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {

    currentPage = '/accounts';
    idServizio = 19;
    accounts: Array<any> = [];
    dataAggiornamento = '';
    aggiornamentoVerificato = false;
    rinvioAggiornamento = false;
    nrRinvii = 0;
    maxNrRinvii = 5;
    tokenLocale = '';
    nrAccounts = '';

    constructor(
        public toastCtrl: ToastController,
        public ngZone: NgZone,
        public http: HttpService,
        public storage: Storage,
        public sync: SyncService,
        public loadingCtrl: LoadingController,
        public actionSheetCtrl: ActionSheetController,
        public globalData: GlobalDataService,
        public account: AccountService) {
    }

    ngOnInit() {
        this.globalData.srcPage = this.currentPage;

        this.account.controllaAccount().then(
            (ok) => {
                this.storage.get('token').then((val) => {
                    this.tokenLocale = val;
                }, (err) => {
                    //
                });
                this.http.getConnected();
                this.aggiorna(false, true);
            }, (err) => {
                this.globalData.goTo(this.currentPage, '/login', 'root', false);
            }
        );
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

        this.sync.getJson(this.idServizio, sync).then(
            (data) => {
                // if (this.sync.dataIsChanged(this.accounts, data[0]))
                if ( this.sync.dataIsChanged(this.accounts, data[0]) ) {
                    // if (JSON.stringify(this.accounts) !== JSON.stringify(data[0])) {
                    this.accounts = data[0];
                    if (this.accounts) {
                        this.nrAccounts = '(' + this.accounts.length + ')';
                    } else {
                        GlobalDataService.log(1, 'Nessun account per l\'utente!', null);
                        this.accounts = [];
                        this.nrAccounts = '';
                    }

                    this.sync.dataIsChanged(this.accounts, data[0]);
                    // if (interattivo) loading.dismiss();
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
                    }).then(
                        (toast) => {toast.present(); },
                        (toastErr) => {
                            GlobalDataService.log(2, 'Toast fallito!', toastErr);
                        });
                    // loading.dismiss();
                }
            }).catch(err => {
                GlobalDataService.log(2, 'Eccezione ', err);
                // if (interattivo) loading.dismiss();
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

    doRefresh(refresher) {
        this.aggiorna(true, true);
        if (refresher) {
            refresher.target.complete();
        }
    }


    selezionaIcona(item) {
        let nomeIcona = '';
        switch (item.platform) {
            case 'iOS':
                // nomeIcona = 'apple.svg';
                nomeIcona = 'apple2.svg';
                break;
            case 'Android':
                nomeIcona = 'android2.svg';
                break;
            case 'windows':
                nomeIcona = 'windows2.svg';
                break;
            case 'amazon-fireos':
                nomeIcona = 'amazon2.svg';
                break;
            default:
                nomeIcona = 'unimol2.svg';
                break;
        }

        return nomeIcona;
    }

    onPress(item) {
        this.actionSheetCtrl.create({
            header: 'Disconnessione',
            buttons: [
                {
                    text: 'Disconnetti',
                    icon: 'trash',
                    handler: () => {
                        this.disconnetti(item);
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
        }).then(actionSheet => actionSheet.present());
    }

    disconnetti(item) {
        if (item.token === this.tokenLocale || item.token === 'test') {
            this.toastCtrl.create({
                message: 'Per disconnettere il dispositivo in uso da questa schermata. ' +
                'Usare la funzione Disconnetti nel menu laterale.',
                duration: 5000
            }).then( (toast) => {toast.present(); }, (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
        } else {
            this.account.disconnetti(item.token).then(
                () => {
                    this.globalData.goTo(this.currentPage, '/preferenze', 'back', false);
                }, (err) => {
                    this.aggiorna(true, true);
                    GlobalDataService.log(2, 'Disconnessione fallita!', err);
                }
            );
            //
            // let body;
            //
            // body = JSON.stringify({
            //     token: item.token,
            // });
            //
            // this.loadingCtrl.create({
            //     message: 'Attendere...'
            // }).then(loading => {
            //
            //     loading.present();
            //
            //     this.ngZone.run(() => {
            //
            //         this.http.post(this.sync.getUrlDisconnetti(), body, {})
            //             .pipe(timeout(this.sync.getTimeout()))
            //             .subscribe(
            //                 data => {
            //                     loading.dismiss();
            //                     if (data) {
            //                         this.toastCtrl.create({
            //                             message: 'Il dispositivo è stato disconnesso.',
            //                             duration: 5000
            //                         }).then(
            //                             (toast) => {toast.present(); },
            //                             (toastErr) => {
            //                                 GlobalDataService.log(2, 'Toast fallito!', toastErr);
            //                             });
            //                         // this.navCtrl.pop();
            //                         this.navCtrl.navigateBack('/preferenze').then(
            //                             () => { },
            //                             (errNavigate => {
            //                                 GlobalDataService.log(
            //                                     2,
            //                                     'Errore nella chiamata al NavController ',
            //                                     errNavigate);
            //                             }));
            //                     } else {
            //                         this.toastCtrl.create({
            //                             message: 'Si è verificato un problema durante l\'elaborazione della richiesta.',
            //                             duration: 5000
            //                         }).then(
            //                             (toast) => {toast.present(); },
            //                             (toastErr) => {
            //                                 GlobalDataService.log(2, 'Toast fallito!', toastErr);
            //                             });
            //                         // this.navCtrl.pop();
            //                         this.navCtrl.navigateBack('/preferenze').then(
            //                             () => { },
            //                             (errNavigate => {
            //                                 GlobalDataService.log(
            //                                     2,
            //                                     'Errore nella chiamata al NavController ',
            //                                     errNavigate);
            //                             }));
            //                     }
            //                     this.aggiorna(true, true);
            //                 },
            //                 err => {
            //                     loading.dismiss();
            //                     GlobalDataService.log(
            //                         2,
            //                         'Nessuna connessione ad Internet',
            //                         err);
            //                     this.toastCtrl.create({
            //                         message: 'Nessuna connessione ad Internet. ' +
            //                         'Per poter scollegare un dispoditivo devi essere connesso ad Internet.',
            //                         duration: 10000
            //                     }).then(
            //                         (toast) => {toast.present(); },
            //                         (toastErr) => {
            //                             GlobalDataService.log(2, 'Toast fallito!', toastErr);
            //                         });
            //                 });
            //     });
            // });
        }
    }

    timestamp2string(date): string {
        return GlobalDataService.timestamp2string(date);
    }

}
