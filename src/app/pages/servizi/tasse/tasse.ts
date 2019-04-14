import {Component, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {Storage } from '@ionic/storage';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {AccountService} from '../../../services/account.service';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-page-tasse',
    templateUrl: 'tasse.html',
})
export class TassePage implements OnInit {

    currentPage = '/tasse';
    idServizio = 11;
    tasse: any;
    tasseDaPagare: any;
    tassePagate: any;
    nrTasseDaPagare = 0;
    nrTassePagate = 0;
    sezioni: string;

    dataAggiornamento: string;
    aggiornamentoVerificato = false;
    rinvioAggiornamento = false;
    nrRinvii = 0;
    maxNrRinvii = 5;

    constructor(
        private toastCtrl: ToastController,
        public sync: SyncService,
        public http: HttpService,
        public storage: Storage,
        public globalData: GlobalDataService,
        public account: AccountService) {
    }

    ngOnInit() {
        this.globalData.srcPage = this.currentPage;

        this.account.controllaAccount().then(
            (ok) => {
                if (this.sezioni == null) {
                    this.sezioni = 'da-pagare';
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

        this.sync.getJson(this.idServizio, true).then(
            (data) => {
                if ( this.sync.dataIsChanged(this.tasse, data[0]) ) {
                    this.tasse = data[0];
                    this.caricaTasse();
                    setTimeout(() => {
                        this.controllaAggiornamento();
                    }, 1000);
                }
                this.dataAggiornamento = SyncService.dataAggiornamento(data);
            },
            (err) => {
                console.dir(err);
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
        if (refresher) {
            refresher.target.complete();
        }
        this.aggiorna(true, true);
    }

    caricaTasse() {
        if (this.tasse == null) {
            return;
        }

        this.tasseDaPagare = Array();
        this.tassePagate = Array();
        this.nrTasseDaPagare = 0;
        this.nrTassePagate = 0;

        for (const riga of this.tasse) {
            switch (riga.PAGATO) {
                case '0':
                    this.tasseDaPagare[this.nrTasseDaPagare] = riga;
                    this.nrTasseDaPagare++;
                    break;
                case '1':
                    this.tassePagate[this.nrTassePagate] = riga;
                    this.nrTassePagate++;
                    break;
            }
        }
    }

    getDescription(item) {
        if (item.DESCRIZIONE) {
            return item.DESCRIZIONE;
        }
        if (item.IMPORTO.startsWith('-')) {
            return 'RIMBORSO';
        } else {
            return 'TASSA';
        }
    }
}
