import {Component, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {AccountService} from '../../../services/account.service';
import {HttpService} from '../../../services/http.service';


@Component({
    selector: 'app-page-storico-esami',
    templateUrl: 'storico-esami.html',
    styleUrls: ['./storico-esami.scss']
})
export class StoricoEsamiPage implements OnInit {

    currentPage = '/storico-esami';
    idServizio = 9;
    carriera: any;
    storico: any;
    dataAggiornamento: string;
    aggiornamentoVerificato = false;
    rinvioAggiornamento = false;
    nrRinvii = 0;
    maxNrRinvii = 5;

    constructor(
        private toastCtrl: ToastController,
        public sync: SyncService,
        public http: HttpService,
        public globalData: GlobalDataService,
        public account: AccountService) {
    }

    ngOnInit() {
        this.globalData.srcPage = this.currentPage;

        this.account.controllaAccount().then(
            () => {
                this.http.getConnected();
                this.aggiorna(false, true);
            }, (err) => {
                this.globalData.goTo(this.currentPage, '/login', 'root', err);
            }
        );
    }

    // onGoBack()  {
    //     this.navCtrl.navigateBack('/home').then(
    //         () => { },
    //         (errNavigate => {
    //             GlobalDataService.log(
    //                 2,
    //                 'Errore nella chiamata al NavController ',
    //                 errNavigate);
    //         }));
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

        this.sync.getJson(this.idServizio, sync).then(
            (data) => {
                if ( this.sync.dataIsChanged(this.storico, this.carriera[0]['storico_esami']) ) {
                    this.carriera = data;
                    this.storico = this.carriera[0]['storico_esami'];
                    setTimeout(() => {
                        this.controllaAggiornamento();
                    }, 1000);
                }
                this.dataAggiornamento = SyncService.dataAggiornamento(data);
            },
            (err) => {
                console.log('Errore in aggiorna: ' + err);
            }).catch(err => {
            console.log('Eccezione in aggiorna: ' + err);
            setTimeout(() => {
                this.controllaAggiornamento();
            }, 1000);
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

    isLoading() {
        return this.sync.loading[this.idServizio];
    }

    doRefresh(refresher) {
        if (refresher) {
            refresher.complete();
        }

        if (this.sync.loading[this.idServizio]) {
            return;
        }

        this.aggiorna(true, true);
    }
}
