import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../services/global-data.service';
import {ActionSheetController} from '@ionic/angular';
import {SyncService} from '../../services/sync.service';
import {InfoAnno} from './classe-infoanno';
import {Storage} from '@ionic/storage';
import {HttpService} from '../../services/http.service';
import {AccountService} from '../../services/account.service';

const PAGE_URL = '/statistiche-voti-esame';

const ID_SERVIZIO_STATISTICHE = 130;

const COD_CORSO = 'AD_COD';
const ANNO_ACCADEMICO = 'AA_SES_ID';
const VOTO = 'VOTO';
const NUM_VOTI = 'NR';
const ANNI_RITARDO = 'RITARDO';

@Component({
    selector: 'app-statistiche-voti-esame',
    templateUrl: './statistiche-voti-esame.page.html',
    styleUrls: ['./statistiche-voti-esame.page.scss'],
})

export class StatisticheVotiEsamePage implements OnInit {

    currentPage = '/statistiche-voti-esame';
    srcPage: string;

    valutazioniPresenti: boolean;
    //idoneità:
    esameConGiudizio: boolean;

    //valore del pulsante degli anni
    annoSelezionato: any;
    gruppiEsamiSupCorso = [];
    infoAnni: InfoAnno[];

    aggiornamentoDispari = false;

    //l'insegnamento presenta  o meno dati relativi ad un solo anno accademico.
    solo1Anno = false;
    anni = [];

    lineChartType = 'line';
    lineChartLabels = [];
    lineChartData = [
        {data: [], label: 'Voto medio', pointRadius: 6, pointHoverRadius: 8, pointHitRadius: 13},
    ];
    lineChartLegend = true;

    pieChartType = 'pie';
    pieChartLabels = ['Anno di frequentazione', 'Dopo 1 anno', 'Dopo 2 anni', 'Oltre 2 anni dopo'];
    pieChartData = [0, 0, 0, 0];


    barChartLegend = true;
    barChartData = [
        {data: Array(31 - 17), label: 'Percentuale voto'},
    ];
    barChartLabels = ['18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '30L'];
    barChartType = 'bar';


    lineChartOptions: any = {
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    stepSize: 2,
                    min: 18,
                    max: 30
                }
            }]
        },
        legend: {
            display: false
        },
        //label sull'asse y che si aggiornano dinamicamente in base al
        //valore della barra più alta
        responsive: true,
    };

    //pieChart con percentuali
    pieChartOptions: any = {
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const total = dataset.data.reduce(function (previousValue, currentValue) {
                        return previousValue + currentValue;
                    });
                    const currentValue = dataset.data[tooltipItem.index];
                    const precentage = ((currentValue / total) * 100).toFixed(1);
                    return precentage + '%';
                }
            }
        }
    };

    barChartOptions: any = {

        tooltips: {
            callbacks: {
                title: function () {
                    return '';
                },
                label: function (tooltipItem, data) {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const total = dataset.data.reduce(function (previousValue, currentValue) {
                        return previousValue + currentValue;
                    });
                    const currentValue = dataset.data[tooltipItem.index];
                    const precentage = ((currentValue / total) * 100).toFixed(1);
                    return precentage + '%';
                }

            }
        },
        label: '%',
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    callback: value => value + '%'
                }
            }],
            xAxes: [{
                display: true,
                ticks: {
                    //"trucco" per visualizzare tutte le label
                    callback: value => ' ' + value
                }
            }]
        },

        legend: {
            display: false
        },
        scaleShowVerticalLines: false,
        responsive: true
    };


    lineChartColors = [
        {
            backgroundColor: 'rgba(77, 148, 255, 0.4)',
            borderColor: 'rgba(51, 133, 255, 1)',
            pointBackgroundColor: 'rgba(51, 133, 255, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(51, 133, 255, 1)'
        }
    ];

    constructor(public storage: Storage, public globalData: GlobalDataService, private actionSheetController: ActionSheetController,
                private sync: SyncService, public http: HttpService, public account: AccountService) {
        this.esameConGiudizio = false;
        this.valutazioniPresenti = true;
    }

    //menu a tendina che si apre quando si clicca sul pulsante degli anni
    async openActionSheet() {
        const pulsantiAnni = [];
        let pulsanteAnno;

        for (const anno in this.infoAnni) {
            pulsanteAnno = {
                text: anno,
                icon: 'ios-arrow-forward',
                handler: () => {
                    this.annoSelezionato = anno;
                    this.disegnaBarChart();
                }
            };

            pulsantiAnni.push(pulsanteAnno);
        }

        const actionSheet = await this.actionSheetController.create({
            header: 'Selezione dell\'anno',
            buttons: pulsantiAnni
        });
        await actionSheet.present();
    }

    ngOnInit() {
        this.account.controllaAccount().then(
            () => {
                this.http.getConnected();
            },
            () => {
                this.globalData.goTo(PAGE_URL, '/login', 'root', false);
            }
        );
        this.srcPage = this.globalData.srcPage;

        this.sync.getJson(ID_SERVIZIO_STATISTICHE, null, true).then((data) => {
            this.gruppiEsamiSupCorso = data[0].filter(gruppoEsami => {
                return (
                    gruppoEsami[COD_CORSO] == this.globalData.corso.CODICE
                    && ((gruppoEsami[VOTO] >= 18 && gruppoEsami[VOTO] <= 31)
                        //esami di idoneità: superato è indicato con 999
                        || gruppoEsami[VOTO] == 999)
                    && gruppoEsami[ANNO_ACCADEMICO] != null);

            });

            this.calcolaInfoAnni();

            if (this.valutazioniPresenti) {
                if (!this.esameConGiudizio && !this.solo1Anno) {
                    this.disegnaLineChart();
                }

                this.disegnaPieChart();

                //impostiamo il valore del pulsante degli anni all'ultimo anno del corso
                if (!this.esameConGiudizio) {
                    this.configuraPulsanteAnni();
                    this.disegnaBarChart();
                }

            }
        }, () => {
            this.valutazioniPresenti = false;
            this.esameConGiudizio = null;
        });

    }


    calcolaInfoAnni() {

        if (this.gruppiEsamiSupCorso.length == 0) {
            this.valutazioniPresenti = false;
        } else {
            this.valutazioniPresenti = true;
        }

        if (this.globalData.corso.VALUTAZIONE == 'V') {
            this.esameConGiudizio = false;
        } else {/*Se è G*/
            this.esameConGiudizio = true;
        }

        let anno: any;
        this.infoAnni = [];

        for (const gruppoEsamiSupCorso of this.gruppiEsamiSupCorso) {

            anno = gruppoEsamiSupCorso[ANNO_ACCADEMICO];
            if (!(anno in this.infoAnni)) {
                //numEsamiSuperati, gli elementi di occorrenzeVoti e sommaVoti inizializzati a 0 dal costruttore
                this.infoAnni[anno] = new InfoAnno();
            }


            this.infoAnni[anno].numEsamiSuperati += parseInt(gruppoEsamiSupCorso[NUM_VOTI], 10);

            this.infoAnni[anno].sommaVoti += gruppoEsamiSupCorso[NUM_VOTI] * gruppoEsamiSupCorso[VOTO];
            //il 30 e lode (31) viene considerato come 30 ai fini della media, quindi...
            if (gruppoEsamiSupCorso[VOTO] == 31) {
                this.infoAnni[anno].sommaVoti -= gruppoEsamiSupCorso[NUM_VOTI] * 1;
            }

            //dati da inserire nel barchart
            this.infoAnni[anno].occorrenzeVoti[gruppoEsamiSupCorso[VOTO] - 18] +=
                parseInt(gruppoEsamiSupCorso[NUM_VOTI], 10);

            // 0, 1 o 2 anni di ritardo rappresentati nel grafico a torta con lo stesso significato
            // 3 equivale a oltre 2 anni di ritardo
            if (gruppoEsamiSupCorso[ANNI_RITARDO] < 3) {
                this.infoAnni[anno].puntualitaSup[gruppoEsamiSupCorso[ANNI_RITARDO]] +=
                    parseInt(gruppoEsamiSupCorso[NUM_VOTI], 10);
            } else {
                this.infoAnni[anno].puntualitaSup[3] +=
                    parseInt(gruppoEsamiSupCorso[NUM_VOTI], 10);
            }
        }

        //calcolo della media
        for (const anno in this.infoAnni) {
            this.infoAnni[anno].media = (this.infoAnni[anno].sommaVoti / this.infoAnni[anno].numEsamiSuperati);
            this.anni.push(anno);
        }

        if (this.anni.length == 1) {
            this.solo1Anno = true;
        }
    }


    disegnaLineChart() {
        for (const anno in this.infoAnni) {
            this.lineChartLabels.push(anno);
            this.lineChartData[0].data.push(this.infoAnni[anno].media.toFixed(2));
        }

    }

    disegnaPieChart() {

        this.pieChartData = [0, 0, 0, 0];

        for (const anno in this.infoAnni) {
            for (const i in this.pieChartData) {
                this.pieChartData[i] += this.infoAnni[anno].puntualitaSup[i];
            }
        }
    }

    configuraPulsanteAnni() {

        const anniDiCorso = [];
        for (const anno in this.infoAnni) {
            anniDiCorso.push(anno);
        }

        const ultimoAnnoDiCorso = anniDiCorso.reduce((a, b) => {
            return Math.max(a, b);
        });

        this.annoSelezionato = ultimoAnnoDiCorso;
    }

    disegnaBarChart() {

        for (let i = 0; i < 31 - 17; i++) {
            this.barChartData[0].data[i] = (this.infoAnni[this.annoSelezionato].occorrenzeVoti[i]
                * 100 / this.infoAnni[this.annoSelezionato].numEsamiSuperati);
        }

        document.getElementById('nEsamiAnno').innerText = 'Numero esami passati dell\'anno: ' +
            this.infoAnni[this.annoSelezionato].numEsamiSuperati;

        this.aggiornamentoDispari = !this.aggiornamentoDispari;
    }

    caricaDatiEPagina(event) {
        this.getGruppiEsamiAggiornati().then((gruppiEsamiAggiornati) => {
            if (this.areGruppiEsamiChanged(gruppiEsamiAggiornati, this.gruppiEsamiSupCorso)) {
                console.log('i gruppi di esami sono stati aggiornati');

                this.gruppiEsamiSupCorso = gruppiEsamiAggiornati;

                this.calcolaInfoAnni();
                if (this.valutazioniPresenti) {

                    if (!this.esameConGiudizio) {
                        this.disegnaLineChart();
                    }

                    this.disegnaPieChart();

                    //impostiamo il valore del pulsante degli anni all'ultimo anno del corso
                    if (!this.esameConGiudizio) {
                        this.configuraPulsanteAnni();
                        this.disegnaBarChart();
                    }
                }
            }
            event.target.complete();

        }).catch(() => {
            event.target.complete();
        });
    }


    async getGruppiEsamiAggiornati(): Promise<any> {

        return new Promise<any>((resolve, reject) => {
            return this.sync.getJsonAggiornato(ID_SERVIZIO_STATISTICHE, null).then((data) => {
                //gruppi di dati relativi agli esami superati del corso selezionato
                const gruppiEsamiSupCorso = data[0].filter(gruppoEsami => {
                    return (gruppoEsami[COD_CORSO] == this.globalData.corso.CODICE
                        && ((gruppoEsami[VOTO] >= 18 && gruppoEsami[VOTO] <= 31)
                            //esami di idoneità:
                            || gruppoEsami[VOTO] == 999)
                        && gruppoEsami[ANNO_ACCADEMICO] != null);
                });

                resolve(gruppiEsamiSupCorso);
            }).catch((err) => {
                reject(err);
            });
        });
    }


    areGruppiEsamiChanged(newGruppiEsame, oldGruppiEsame) {
        return this.sync.dataIsChanged(newGruppiEsame, oldGruppiEsame);
    }

    isLoading(): boolean {
        return this.sync.isLoading(ID_SERVIZIO_STATISTICHE);
    }

    getDataUltimoAggiornamentoGruppiEsami(): string {
        return this.sync.getDataUltimoAggiornamento(ID_SERVIZIO_STATISTICHE);
    }

}
