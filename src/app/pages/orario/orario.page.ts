import {Component, OnInit, ViewChild} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Platform, ToastController} from '@ionic/angular';
import {SyncService} from '../../services/sync.service';
import {GlobalDataService} from '../../services/global-data.service';
import {NotificheService} from '../../services/notifiche.service';
import {AccountService} from '../../services/account.service';
import {HttpService} from '../../services/http.service';


@Component({
    selector: 'app-page-orario',
    templateUrl: 'orario.page.html',
    styleUrls: ['orario.page.scss'],
})
export class OrarioPage implements OnInit {

    currentPage = '/orario';

    idServizio = 999;

    ultimoDato = '';
    dataAggiornamento: string;
    aggiornamentoVerificato = false;
    rinvioAggiornamento = false;
    nrRinvii = 0;
    maxNrRinvii = 5;

    graficoLegacy = false;


    inizializzato = false;
    orario: any;

    start: Date;
    end: Date;
    description: number;
    docente: string;
    codiceIns: number;
    codiceIns2: number;
    name: string;
    location: string;

    constructor(
        public toastCtrl: ToastController,
        public sync: SyncService,
        public http: HttpService,
        public storage: Storage,
        public platform: Platform,
        public globalData: GlobalDataService,
        public notificheService: NotificheService,
        public account: AccountService
    ) { }

    ngOnInit() {
        this.globalData.srcPage = '/orario';

        this.http.checkConnection();

        this.aggiorna(false, true);

    }

    aggiorna(interattivo: boolean, sync: boolean) {
        if (this.sync.loading[this.idServizio]) {
            this.rinvioAggiornamento = true;
            this.dataAggiornamento = 'in corso';
            this.nrRinvii++;

            GlobalDataService.log(0, 'Rinvio'  + this.nrRinvii, null);

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
                        (toast) => { toast.present(); },
                        (err) => { GlobalDataService.log(2, 'Errore in aggiorna', err); });
                }
            }
        }
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;

        // Otteniamo l'orario
        this.sync.getJson(this.idServizio, null, sync).then(
            (data) => {
                console.log(this.ultimoDato);
                if (this.ultimoDato !== JSON.stringify(data[0])) {
                    this.ultimoDato = JSON.stringify(data[0]);


                    setTimeout(() => {
                        this.controllaAggiornamento();
                    }, 1000);
                }
                this.dataAggiornamento = SyncService.dataAggiornamento(data);
            },
            (err) => {
                GlobalDataService.log(2, 'Errore in aggiorna', err);
            }).catch(ex => {
            GlobalDataService.log(2, 'Eccezione in aggiorna', ex);
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
        this.aggiorna(true, true);
        if (refresher) {
            refresher.complete();
        }
    }
}
