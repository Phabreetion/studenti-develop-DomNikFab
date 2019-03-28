import {Component, NgZone, OnInit} from '@angular/core';
import {ActionSheetController, ToastController} from '@ionic/angular';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {AccountService} from '../../../services/account.service';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-page-libretto',
    templateUrl: 'libretto.page.html',
})
export class LibrettoPage implements OnInit {

    currentPage = '/carriera/tab/libretto';
    idServizio = 4;
    srcPage: string;

    libretto = [];
    dataAggiornamento: string;
    aggiornamentoVerificato = false;
    rinvioAggiornamento = false;
    nrRinvii = 0;
    maxNrRinvii = 5;

    constructor(
        public toastCtrl: ToastController,
        public actionSheetCtrl: ActionSheetController,
        public ngZone: NgZone,
        public sync: SyncService,
        public http: HttpService,
        public globalData: GlobalDataService,
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
    }

    aggiorna(interattivo: boolean, sync: boolean) {
        if (this.sync.loading[this.idServizio]) {
            this.rinvioAggiornamento = true;
            this.dataAggiornamento = 'in corso';
            this.nrRinvii++;

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

        this.sync.getJson(this.idServizio, true).then(
            (data) => {
                if ( this.sync.dataIsChanged(this.libretto, data[0]) ) {
                    this.libretto = data[0];
                    if (!this.libretto[0]) {
                        this.libretto = new Array();
                    }
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

    cercaAppello(item, ins) {
        this.globalData.goTo(this.currentPage, '/appelli/' + ins.codice, 'forward', false);
    }


    selezionaTab() {
        this.actionSheetCtrl.create({
            header: 'Mostra',
            buttons: [
                {
                    text: 'Piano di studi',
                    icon: 'school',
                    handler: () => {
                        this.globalData.goTo(this.currentPage,
                            '/carriera/tab/piano-di-studi', 'forward', false);
                    }
                }, {
                    text: 'Esami di sostenere',
                    icon: 'list-box',
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
}
