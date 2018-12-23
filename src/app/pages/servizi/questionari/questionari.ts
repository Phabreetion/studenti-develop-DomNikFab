import {Component, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {Storage } from '@ionic/storage';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {AccountService} from '../../../services/account.service';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-page-questionari',
    templateUrl: 'questionari.html',
})

export class QuestionariPage implements OnInit {
    currentPage = '/questionari';
    idServizio = 8;

    questionariInizializzati = false;
    questionari: Array<{ des: String }>;
    questionariNonDisponibili: Array<{ des: String }>;
    questionariCompilati: Array<{ des: String }>;
    questionariDaCompilare: Array<{ des: String }>;

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
        this.globalData.srcPage = '/questionari';
        this.account.controllaAccount().then(
            (ok) => {
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
                    }).then(
                        (toast) => {toast.present(); },
                        (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                }
            }
        }
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;

        this.sync.getJson(this.idServizio, true).then(
            (data) => {
                this.parseQuestionari(data);
                this.dataAggiornamento = SyncService.dataAggiornamento(data);
                setTimeout(() => {
                    this.controllaAggiornamento();
                }, 1000);
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
        if (refresher) {
            refresher.target.complete();
        }
        this.aggiorna(true, true);
    }


    parseQuestionari(listaQuestionari: any) {
        // console.dir(listaQuestionari);
        if (!this.questionariInizializzati || JSON.stringify(this.questionari) !== JSON.stringify(listaQuestionari)) {
            this.questionariInizializzati = true;
            this.questionari = listaQuestionari;
            this.questionariNonDisponibili = [];
            this.questionariCompilati = [];
            this.questionariDaCompilare = [];

            let contNonDisponibili = 0;
            let contCompilati = 0;
            let contDaCompilare = 0;

            const iter = Object.keys(listaQuestionari).length;

            for (let i = 0; i < iter - 2; i++) {
                if (listaQuestionari[i].adsce_id && listaQuestionari[i].stato === 0) {
                    this.questionariNonDisponibili[contNonDisponibili] = listaQuestionari[i].des;
                    contNonDisponibili++;
                } else if (listaQuestionari[i].adsce_id && listaQuestionari[i].stato === 1) {
                    this.questionariCompilati[contCompilati] = listaQuestionari[i].des;
                    contCompilati++;
                } else if (listaQuestionari[i].adsce_id) {
                    this.questionariDaCompilare[contDaCompilare] = listaQuestionari[i].des;
                    contDaCompilare++;
                }
            }
        }
    }


}
