import {Component, OnInit, ViewChild} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Platform, ToastController} from '@ionic/angular';
import {Chart} from 'chart.js';
import {SyncService} from '../../services/sync.service';
import {GlobalDataService} from '../../services/global-data.service';
import {NotificheService} from '../../services/notifiche.service';
import {AccountService} from '../../services/account.service';
import {HttpService} from '../../services/http.service';


@Component({
    selector: 'app-page-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    @ViewChild('lineCanvas') lineCanvas;
    @ViewChild('chartContainer') chartContainer;

    currentPage = '/home';
    chart: any;

    idServizio = 9;
    idServizioPds = 12; // Piano di studi

    lineChart: any;

    ultimoDato = '';
    media_aritm: any;
    media_pond: any;
    baselaurea: any;
    cfu_tot: any;
    cfu_sup: any;
    cfu_todo: any;
    esami_superati: number;
    esami_da_sostenere: number;
    esami_tot: number;
    lodi: number;

    voti = [];
    descrizioni = [];
    medie = [];
    descrizioni_medie = [];
    colorePunti = [];
    carriera: any;
    elementiGrafico = [];
    inizializzato = false;
    nome: string;
    cognome: string;
    matricola: number;
    token: string;
    cds: string;
    dipartimento: string;


    dataAggiornamento: string;
    aggiornamentoVerificato = false;
    rinvioAggiornamento = false;
    nrRinvii = 0;
    maxNrRinvii = 5;

    graficoLegacy = false;
    includiNoMedia = true;

    constructor(
        public toastCtrl: ToastController,
        // private speechRecognition: SpeechRecognition,
        public sync: SyncService,
        public http: HttpService,
        public storage: Storage,
        public platform: Platform,
        public globalData: GlobalDataService,
        public notificheService: NotificheService,
        public account: AccountService) {
    }

    ngOnInit() {
        this.globalData.srcPage = '/home';

        this.storage.get('token').then(
            (token) => {
                if (!token) {
                    GlobalDataService.log(2, 'Nessun Token', this.token);
                    this.globalData.goTo(this.currentPage, '/login', 'root', false);
                    return;
                } else {
                    // Aggiorniamo lo stati di log dell'utente
                    this.account.controllaAccount().then(
                        (logged) => {
                            GlobalDataService.log(
                                1,
                                'Logged in ',
                                logged);

                            // Verifichiamo la presenza sul server di messaggi diretti per il token dell'utemte
                            this.sync.controllaMessaggi();

                            // Controlliamo so stato della connessione
                            this.http.checkConnection();

                            // srcPage lo azzeriamo perchè siamo già sulla home page
                            this.globalData.srcPage = '';

                            this.caricaPreferenze();
                            this.aggiornaStatoApp();
                            this.caricaDatiDaStorage();

                            this.aggiorna(false, true);
                        }, (err) => {
                            GlobalDataService.log(
                                1,
                                'Not Logged in ',
                                err);
                            this.globalData.goTo(this.currentPage, '/login', 'root', false);
                        }
                    );

                }
            }, (err) => {
                GlobalDataService.log(0, 'Accidenti', err);
                this.globalData.goTo(this.currentPage, '/login', 'root', false);
            }
        ).catch(
            (exception) => {
                GlobalDataService.log( 2, 'Eccezione get token', exception);
                this.globalData.goTo(this.currentPage, '/login', 'root', false);
            }
        );
    }

    caricaDatiDaStorage() {
        // Carichiamo i dati dell'utente
        const nome = this.storage.get('nome');
        const cognome = this.storage.get('cognome');
        const matricola = this.storage.get('matricola');
        const token = this.storage.get('token');
        const cds = this.storage.get('nome_cds');
        const dipartimento = this.storage.get('nome_dip');

        Promise.all([nome, cognome, matricola, token, cds, dipartimento]).then(data => {
            this.nome = data[0];
            this.cognome = data[1];
            this.matricola = data[2];
            this.token = data[3];
            this.cds = data[4];
            this.dipartimento = data[5];
        });
    }

    caricaPreferenze() {
        // Android 8 sembra fare storie con la ligreria Graph.js
        // Aggiungiamo un workaround per gli utenti che non vevrebbero il grafico
        if (this.globalData.android) {
            this.storage.get('graficoLegacy').then(
                (graficoLegacy) => {
                    if ((graficoLegacy != null) && (graficoLegacy)) {
                        this.graficoLegacy = graficoLegacy;
                        GlobalDataService.log(1, 'Uso grafico legacy', null);
                    } else {
                        this.graficoLegacy = false;
                        GlobalDataService.log(1, 'Uso grafico standard', null);
                    }
                }, () => {
                    this.graficoLegacy = false;
                    GlobalDataService.log(1, 'Uso grafico standard', null);
                });
        }

        this.storage.get('includiNoMedia').then(
            (includiNoMedia) => {
                if ((includiNoMedia != null) && (includiNoMedia)) {
                    this.includiNoMedia = includiNoMedia;
                    GlobalDataService.log(1, 'Includo esami fuori media', null);

                } else {
                    this.includiNoMedia = false;
                    GlobalDataService.log(1, 'Escludo esami fuori media', null);
                }
            }, () => {
                this.includiNoMedia = true;
                GlobalDataService.log(1, 'Includo esami fuori media', null);
            });

        this.storage.get('connessioneLenta').then(
            (connessioneLenta) => {
                if ((connessioneLenta != null) && (connessioneLenta)) {
                    this.http.connessioneLenta = connessioneLenta;
                    GlobalDataService.log(1, 'Uso grafico legacy', null);
                } else {
                    this.http.connessioneLenta = false;
                    GlobalDataService.log(1, 'Uso grafico legacy', null);
                }
            }, () => {
                this.http.connessioneLenta = false;
                GlobalDataService.log(1, 'Uso grafico legacy', null);
            });
    }

    aggiornaStatoApp() {
        // Aggiorna la versione del dispositivo aul server
        // Controlla se è presente una versione aggiornata dell'App
        // Aggiorna la sottoscrizione delle notifiche periodicamente
        if (this.platform.is('ios') || (this.platform.is('android'))) {
            this.sync.aggiornaDeviceInfo().then(
                () => {
                    GlobalDataService.log(1, 'Aggiornato il Device', null);
                }, (err) => {
                    GlobalDataService.log(2, 'Impossibile aggiornare le info sul device', err);
                }
            );
            this.sync.controllaVersione().then(
                () => {
                    GlobalDataService.log(1, 'Check Ultima Versione', null);
                }, (err) => {
                    GlobalDataService.log(2, 'Impossibile controllare la versione dell\'app', err);
                }
            );
            this.notificheService.aggiornamentoPeriodicoSottoscrizioni().then(
                () => {
                    GlobalDataService.log(1, 'Sottoscrizioni Aggiornate', null);
                }, (err) => {
                    GlobalDataService.log(2, 'Impossibile aggiornare le sottoscrizioni ore', err);
                }
            );
        }
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

        // Otteniamo il PDS
        this.sync.getJson(this.idServizioPds, sync).then(
            (data) => {
                if (this.ultimoDato !== JSON.stringify(data[0])) {
                    this.ultimoDato = JSON.stringify(data[0]);
                    this.setCarriera(data);
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
        if (refresher) {
            refresher.target.complete();
        }

        this.aggiorna(true, true);
    }

    setCarriera(carriera: any) {
        // console.dir(carriera);

        // return;
        if (!carriera || !carriera[0]) {
            return this.aggiorna(false, true);
        }

        this.inizializzato = true;

        // Ottimizziamo il refresh ignorandolo in caso di dati non modificati
        // TODO: si potrebbe ottimizzare il contronto tra array con qualcosa di più efficiente dello stringify
        // if (JSON.stringify(this.jsoncarriera) === JSON.stringify(carriera[0])) {
        //     // Niente di nuovo!
        //     return;
        // }

        // this.jsoncarriera = carriera[0];
        this.dataAggiornamento = SyncService.dataAggiornamento(carriera);
        this.carriera = carriera[0];

        if (!this.carriera) {
            this.carriera = [];
        }

        // Inizializziamo tutto
        this.descrizioni = [];
        this.descrizioni_medie = [];
        this.voti = [];
        this.medie = [];
        this.colorePunti = [];
        this.esami_superati = 0;
        this.esami_tot = 0;
        this.lodi = 0;
        this.cfu_tot = 0;
        this.cfu_sup = 0;
        this.cfu_todo = 0;

        this.carriera.sort(function (a, b) {
            if (a.DATA_ESTESA < b.DATA_ESTESA) {
                return -1 ;
            }
            if (a.DATA_ESTESA > b.DATA_ESTESA) {
                return 1 ;
            }
            return 0;
        });

        // Andamento media ponderata
        let esami_per_media = 0;
        let voto_tmp = 0, media_tmp = 0, somma_pesata = 0, somma_aritmetica = 0;
        let cfu_tmp = 0, cfu_tot_media = 0;
        let ultima_media = 0;
        for (let i = 0; i < this.carriera.length; i++) {
            this.esami_tot++;
            // console.dir(this.carriera[i]);
            switch (this.carriera[i]['VOTO']) {
                case '30 e lode': {
                    voto_tmp = 30;
                    break;
                }
                case '18':
                case '19':
                case '20':
                case '21':
                case '22':
                case '23':
                case '24':
                case '25':
                case '26':
                case '27':
                case '28':
                case '29':
                case '30': {
                    voto_tmp = Number(this.carriera[i]['VOTO']);
                    break;
                }
                default : {
                    voto_tmp = 0;
                    break;
                }
            }

            cfu_tmp = Number(this.carriera[i]['CFU']);

            if ((voto_tmp >= 18) && (voto_tmp <= 30)) {
                if (cfu_tmp > 0) {
                    this.cfu_sup += cfu_tmp;
                    this.cfu_tot += cfu_tmp;
                } else {
                    cfu_tmp = 1; // per non azzerare la media totale
                }

                if (this.carriera[i]['NO_MEDIA'] === '0') {
                    cfu_tot_media += cfu_tmp;
                    somma_aritmetica += voto_tmp;
                    somma_pesata += voto_tmp * cfu_tmp;
                    media_tmp = somma_pesata / cfu_tot_media;
                    ultima_media = media_tmp;
                    this.medie[esami_per_media] = Math.round(media_tmp * 100) / 100;
                    this.descrizioni_medie[esami_per_media] = 'Media ponderata';
                    this.voti[esami_per_media] = voto_tmp;
                    this.descrizioni[esami_per_media] = this.carriera[i]['DESCRIZIONE'];
                    this.colorePunti[esami_per_media] = 'rgba(51, 133, 255, 1)';
                    this.elementiGrafico [esami_per_media] = this.carriera[i];
                    esami_per_media++;
                } else {
                    if (this.includiNoMedia) {
                        this.medie[esami_per_media] = ultima_media;
                        this.descrizioni_medie[esami_per_media] = 'Media ponderata';
                        this.voti[esami_per_media] = voto_tmp;
                        this.descrizioni[esami_per_media] = this.carriera[i]['DESCRIZIONE'] + ' \n(escluso da media)';
                        this.colorePunti[esami_per_media] = 'rgba(255, 0, 0, 1)';
                        this.elementiGrafico [esami_per_media] = this.carriera[i];
                        esami_per_media++;
                    }
                }

                this.esami_superati++;
                if (this.carriera[i]['LODE'] === '1') {
                    this.lodi++;
                }

            } else {
                if (this.carriera[i]['GIUDIZIO']) {
                    this.esami_superati++;
                    if (cfu_tmp > 0) {
                        this.cfu_sup += cfu_tmp;
                        this.cfu_tot += cfu_tmp;
                    }

                    if (this.includiNoMedia) {
                        esami_per_media++;
                        this.medie[esami_per_media] = ultima_media;
                        this.elementiGrafico[esami_per_media] = ultima_media;
                        this.descrizioni_medie[esami_per_media] = this.carriera[i];
                        this.voti[esami_per_media] = ultima_media;
                        this.descrizioni[esami_per_media] = this.carriera[i]['DESCRIZIONE'] + ' \n(escluso da media)';
                        this.colorePunti[esami_per_media] = 'rgba(255, 0, 0, 1)';
                    }
                } else {
                    if (cfu_tmp > 0) {
                        this.cfu_tot += cfu_tmp;
                    }
                }
            }

            GlobalDataService.log(0,
                'Esami: ' + esami_per_media +
                ' CFU: ' + cfu_tmp +
                ' CFU totali: ' + this.cfu_tot +
                ' LODI totali: ' + this.lodi +
                ' Somma Pesata: ' + somma_pesata +
                ' Media: ' + media_tmp, null);
        }

        this.esami_da_sostenere = this.esami_tot - this.esami_superati;
        this.cfu_todo = this.cfu_tot - this.cfu_sup;

        if (this.esami_superati > 0) {
            this.media_aritm = (somma_aritmetica / esami_per_media).toFixed(2);
        } else {
            this.media_aritm = 0;
        }

        // La media ponderata è data dal prodotto tra voto e cfu diviso per il totale dei cfu sostenuti
        // usiamo la variabile $cfu_per_media in cui non compaiono gli esami in sovrannumero
        if (this.cfu_sup > 0) {
            this.media_pond = ( somma_pesata / cfu_tot_media).toFixed(2);
        } else {
            this.media_pond = this.media_aritm;
        }

        // Il voto di base per la laurea è calcolato come gli 11/3 della media ponderata (arrotondata?)
        this.baselaurea = (this.media_pond * 11 / 3).toFixed(0);


        this.lineChart = new Chart(this.lineCanvas.nativeElement, {

            type: 'line',
            data: {
                labels: this.descrizioni,
                items: this.elementiGrafico,
                datasets: [
                    {
                        label: 'Voto',
                        fill: true,
                        lineTension: 0.1,
                        // backgroundColor: 'rgba(75,192,192,0.4)',
                        backgroundColor: 'rgba(77, 148, 255, 0.4)',
                        borderColor: 'rgba(51, 133, 255, 1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(77, 148, 255, 1)',
                        // pointBackgroundColor: 'rgba(51, 133, 255, 1)',
                        pointBackgroundColor: this.colorePunti,
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(77, 148, 255, 1)',
                        pointHoverBorderColor: 'rgba(51, 133, 255, 1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: this.voti,
                        spanGaps: true,
                        cubicInterpolationMode: 'monotone'
                    },
                    {
                        label: 'Media',
                        fill: false,
                        lineTension: 0.1,
                        // backgroundColor: 'rgba(75,192,192,0.4)',
                        backgroundColor: 'rgba(255, 0, 0, 0.4)',
                        borderColor: 'rgba(255, 51, 51, 1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(255, 0, 0, 1)',
                        pointBackgroundColor: 'rgba(255, 51, 51, 1)',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(255, 0, 0, 1)',
                        pointHoverBorderColor: 'rgba(255, 51, 51, 1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: this.medie,
                        spanGaps: true,
                        cubicInterpolationMode: 'monotone'
                    }
                ]
            },
            options: {
                animation: {duration: 0},
                legend: {
                    display: true,
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            stepSize: 2,
                            min: 18,
                            max: 30
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItem, data) {
                            // return data['labels'][tooltipItem[0]['index']];
                            return data['items'][tooltipItem[0]['index']]['DESCRIZIONE'];
                        },
                        label: function(tooltipItem, data) {
                            const item = data['items'][tooltipItem['index']];
                            if (item['VOTO']) {
                                if (item['LODE'] === '1') {
                                    return '30 e lode';
                                } else {
                                    return item['VOTO'];
                                }
                            }
                            if (item['GIUDIZIO']) {
                                return item['GIUDIZIO'];
                            }
                            return item['STATO'];
                        },
                        afterLabel: function(tooltipItem, data) {
                            const item = data['items'][tooltipItem['index']];
                            const dati = [];
                            let i = 0;
                            if (item['CFU']) {
                                dati[i] = 'CFU: ' + item['CFU'];
                                i++;
                            }
                            if (item['DATA_ESAME']) {
                                dati[i] = 'Data: ' + item['DATA_ESAME'];
                                i++;
                            }
                            if (item['COGNOME']) {
                                dati[i] = 'Docente: Prof. ' + item['NOME'] + ' ' + item['COGNOME'];
                                i++;
                            }
                            if (item['SOVRANNUMERARIA'] === '1') {
                                dati[i] = 'Esame in sovrannumero';
                                i++;
                            }
                            if (item['NO_MEDIA'] === '1') {
                                dati[i] = 'Esame escluso dal calcolo della media';
                                // i++;
                            }
                            return dati;
                        }
                    }
                },
            }
        });

        // console.dir(this.lineChart);

        if (this.graficoLegacy) {
            setTimeout(() => {
                this.chart = this.lineChart.toBase64Image();
            }, 500);
        }
    }

    visualizzaStoricoEsami($event) {
        const element = this.lineChart.lastActive[0];
        const labelClicked = !element && $event && $event.offsetY && $event.offsetY < 30;

        // console.dir(element);
        if (!element && !labelClicked) {
            this.globalData.goTo(this.currentPage, '/carriera', 'forward', false);
        }
    }

    visualizzaDettagli() {
        this.globalData.goTo(this.currentPage, '/dettagli-utente', 'forward', false);
    }

    mainColSize() {
        if (this.globalData.isLandscape()) {
            return 6;
        } else {
            return 12;
        }
    }

    dettagliEsame(esame) {
        // console.dir(esame);
        this.globalData.esame = esame;
        this.globalData.goTo(this.currentPage, '/esame', 'forward', false);
    }


    // Simula l'assistente vocale (TEST)
    // inizioAscolto() {
    //     console.log('Inizio ascolto...');
    // }
}
