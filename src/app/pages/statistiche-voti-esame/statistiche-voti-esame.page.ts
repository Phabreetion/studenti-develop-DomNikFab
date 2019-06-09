import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalDataService} from '../../services/global-data.service';
import {ActionSheetController} from '@ionic/angular';
import {SyncService} from '../../services/sync.service';
import {BaseChartDirective} from 'ng2-charts';
import {InfoAnno} from './classe-infoanno';

@Component({
    selector: 'app-statistiche-voti-esame',
    templateUrl: './statistiche-voti-esame.page.html',
    styleUrls: ['./statistiche-voti-esame.page.scss'],
})
export class StatisticheVotiEsamePage implements OnInit {
    @ViewChild(BaseChartDirective)
    public chart: BaseChartDirective;

    oddUpdate = false;
    srcPage: string;
    annoSelezionato: any;
    currentPage = '/statistiche-voti-esame';
    value: 25;

    idServizioStatistiche = 130;

    gruppiEsamiSupCorso = [];

    infoAnni: InfoAnno[];


    public pieChartLabels: string[] = ['Anno di frequentazione', 'Dopo 1 anno', 'Dopo 2 anni', 'Oltre 2 anni dopo'];
    public pieChartData: number[] = [0, 0, 0, 0];
    public pieChartType = 'pie';
    public pieChartOptions: any = {
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

    public barChartOptions: any = {

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
    public lineChartLegend = true;
    public lineChartType = 'line';
    public barChartLabels = ['18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '30L'];
    public barChartType = 'bar';
    public barChartLegend = true;

    public barChartData = [
        {data: Array(31 - 17), label: 'Percentuale voto'},
    ];
    public lineChartData: Array<any> = [
        {data: [], label: 'Voto medio'},
    ];
    public lineChartLabels: Array<any> = [];
    public lineChartOptions: any = {
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
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            backgroundColor: 'rgba(77, 148, 255, 0.4)',
            borderColor: 'rgba(51, 133, 255, 1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            backgroundColor: 'rgba(219,255,4,0.4)',
            borderColor: 'rgb(228,255,40)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            backgroundColor: 'rgba(255,10,60,0.4)',
            borderColor: 'rgb(255,0,10)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            backgroundColor: 'rgba(255,14,223,0.4)',
            borderColor: 'rgb(255,0,211)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },


    ];

    constructor(public globalData: GlobalDataService, private actionSheetController: ActionSheetController,
                private sync: SyncService) {
    }

// events
    public chartClickedG(e: any): void {
    }

    public chartHoveredG(e: any): void {
    }

    public chartClicked(e: any): void {
    }

    public chartHovered(e: any): void {
    }

    // public randomize(): void {
    //     let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    //     for (let i = 0; i < this.lineChartData.length; i++) {
    //         _lineChartData[i] = {annoSelezionato: new Array(this.lineChartData[i].annoSelezionato.length), label: this.lineChartData[i].label};
    //         for (let j = 0; j < this.lineChartData[i].annoSelezionato.length; j++) {
    //             _lineChartData[i].annoSelezionato[j] = Math.floor((Math.random() * 100) + 1);
    //         }
    //     }
    //     this.lineChartData = _lineChartData;
    // }

    // events

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

        console.log(pulsantiAnni);
        const actionSheet = await this.actionSheetController.create({
            header: 'Selezione dell\'anno',
            buttons: pulsantiAnni
        });
        await actionSheet.present();
    }

    ngOnInit() {
        this.srcPage = this.globalData.srcPage;

        this.sync.getJson(this.idServizioStatistiche, null, true).then((data) => {
            this.calcolaInfoAnni(data);

            this.disegnaLineChart();
            this.disegnaPieChart();

            //impostiamo il valore del pulsante degli anni all'ultimo anno del corso
            this.configuraPulsanteAnni();


            this.disegnaBarChart();
        });
    }


    calcolaInfoAnni(data) {

        console.log(data);

        const COD_CORSO = 'AD_COD';
        const ANNO_ACCADEMICO = 'AA_SES_ID';
        const VOTO = 'VOTO';
        const NUM_VOTI = 'NR';
        const ANNI_RITARDO = 'RITARDO';


        //gruppi di dati relativi agli esami superati del corso selezionato
        this.gruppiEsamiSupCorso = data[0].filter(gruppoEsami => {
            return (gruppoEsami[COD_CORSO] == this.globalData.corso.CODICE
                && (gruppoEsami[VOTO] >= 18 && gruppoEsami[VOTO] <= 31)
                && gruppoEsami[ANNO_ACCADEMICO] != null);
        });

        console.log(this.gruppiEsamiSupCorso);

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
                this.infoAnni[anno].sommaVoti -= gruppoEsamiSupCorso[NUM_VOTI];
            }

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

        for (const anno in this.infoAnni) {
            this.infoAnni[anno].media = (this.infoAnni[anno].sommaVoti / this.infoAnni[anno].numEsamiSuperati);
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

        this.oddUpdate = !this.oddUpdate;
    }


    doRefresh(event) {
        console.log('Begin async operation');

        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }

}
