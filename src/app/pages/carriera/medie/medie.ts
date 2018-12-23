import {Component, OnInit} from '@angular/core';
import { isNumeric } from 'rxjs/util/isNumeric';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {ToastController} from '@ionic/angular';
import {AccountService} from '../../../services/account.service';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-page-medie',
    templateUrl: 'medie.html'
})
export class MediePage implements OnInit {

    currentPage = '/medie';
    idServizio = 12; // Piano di studi
    items: any;
    sommaVoti = 0;
    sommaCrediti = 0;
    numeroEsami = 0;
    pesoEsami = 0;
    dataAggiornamento: string;
    mediaAritmetica = 0;
    mediaPonderata = 0;
    baseLaurea = 0;

    // variabili da far visualizzare nella tabella
    ListaMedieAritmetiche: Array<number> = [];
    ListaMediePonderate: Array<number> = [];
    ListaBasiLauree: Array<number> = [];
    listaVoti: Array<number> = [];

    CFU = 1;
    cfuSelezionati = 1;

    aggiornamentoVerificato = false;
    rinvioAggiornamento = false;
    nrRinvii = 0;
    maxNrRinvii = 5;

    constructor(
        public sync: SyncService,
        public http: HttpService,
        private toastCtrl: ToastController,
        public globalData: GlobalDataService,
        public account: AccountService) {
        this.listaVoti = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    }

    ngOnInit() {
        this.globalData.srcPage = this.currentPage;

        this.account.controllaAccount().then(
            (ok) => {
                this.http.getConnected();
                this.aggiorna(false, true);
            }, (err) => {
                this.globalData.goTo(this.currentPage, '/login', 'root', false);
            }
        );
    }

    // ngAfterContentInit() {
    //     //     this.aggiorna(false, true);
    //     // }

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
                if ( this.sync.dataIsChanged(this.items, data[0]) ) {
                    this.items = data[0];
                    this.calcola();
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
        if (refresher) {
            refresher.target.complete();
        }

        if (this.sync.loading[this.idServizio]) {
            return;
        }

        this.aggiorna(true, true);
    }

    calcola() {
        this.sommaCrediti = 0;
        this.sommaVoti = 0;
        this.numeroEsami = 0;
        this.pesoEsami = 0;

        const MedieAritmetiche: Array<any> = [];
        const MediePonderate: Array<any> = [];
        const BasiLauree: Array<any> = [];

        const json = this.items;

        // ESTRAZIONE DEI DATI DAL JSON
        const iter = Object.keys(json).length;
        let i;
        for (i = 0; i < iter; i++) {
            // aggiornamento delle variabili di lavoro che verranno usate nei calcoli
            if ((isNumeric(json[i]['VOTO']) &&
                (json[i]['VOTO'] !== 0) &&
                (json[i]['SOVRANNUMERARIA'] === '0'))) {
                const votoEsame = parseInt(json[i]['VOTO'], 10);
                const peso = parseInt(json[i]['CFU'], 10);

                this.numeroEsami += 1;
                this.sommaCrediti += peso;
                this.sommaVoti += votoEsame;
                this.pesoEsami += votoEsame * peso;
            }
        }

        this.mediaAritmetica = parseFloat((this.sommaVoti / this.numeroEsami).toFixed(2));
        this.mediaPonderata = parseFloat((this.pesoEsami / this.sommaCrediti).toFixed(2));

        if (isNaN(this.mediaAritmetica)) {
            this.mediaAritmetica = 0;
        }
        if (isNaN(this.mediaPonderata)) {
            this.mediaPonderata = 0;
        }
        if (isNaN(this.sommaCrediti)) {
            this.sommaCrediti = 0;
        }

        this.baseLaurea = parseFloat((this.mediaPonderata * 11 / 3).toFixed(0));

        // if (this.CFU == '')) {
        //     this.cfuSelezionati = 1;
        // } else {
        //     this.cfuSelezionati = form.value.CFU;
        // }
        this.cfuSelezionati = this.CFU;
        this.sommaCrediti += this.cfuSelezionati;

        // incremento del numero degli esami al solo fine di effettuare la previsione con un nuovo esame
        this.numeroEsami = (this.numeroEsami + 1);

        // inizio dei CALCOLI
        let voto;
        for (voto = 18; voto <= 30; voto++) {
            // CALCOLO MEDIA ARITMETICA
            MedieAritmetiche[voto - 18] = ((this.sommaVoti + voto) / this.numeroEsami).toFixed(2);

            // CALCOLO MEDIA PONDERATA
            MediePonderate[voto - 18] = ((this.pesoEsami + (voto * this.cfuSelezionati)) / this.sommaCrediti).toFixed(2);

            // CALCOLO BASE DI LAUREA
            BasiLauree[voto - 18] = ((MediePonderate[voto - 18] * 11) / 3).toFixed(0);
        }
        // assegna le variabili calcolate a variabili globali
        this.ListaMedieAritmetiche = MedieAritmetiche;
        this.ListaMediePonderate = MediePonderate;
        this.ListaBasiLauree = BasiLauree;
        this.CFU = this.cfuSelezionati;
    }
}
