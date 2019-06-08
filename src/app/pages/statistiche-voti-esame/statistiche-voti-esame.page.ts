import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalDataService} from '../../services/global-data.service';
import {ActionSheetController} from '@ionic/angular';
import {max} from 'rxjs/operators';
import {SyncService} from '../../services/sync.service';
import {forEach} from '@angular-devkit/schematics';
import {BaseChartDirective} from 'ng2-charts';

@Component({
    selector: 'app-statistiche-voti-esame',
    templateUrl: './statistiche-voti-esame.page.html',
    styleUrls: ['./statistiche-voti-esame.page.scss'],
})
export class StatisticheVotiEsamePage implements OnInit {
    @ViewChild(BaseChartDirective)
    public chart: BaseChartDirective;

    constructor(public globalData: GlobalDataService, private actionSheetController: ActionSheetController, private sync: SyncService) {
    }

    oddUpdate = false;
    srcPage: string;
    pieChartData = [];
    dataButton: any;
    currentPage = '/statistiche-voti-esame';
    value: 25;
    votiEsamiSuperati = [];
    datiAnnui = [];


    public doughnutChartLabels: string[] = ['Anno di frequentazione', 'Dopo 1 anno', 'Dopo 2 anni', 'Oltre 2 anni'];
    public doughnutChartData: number[] = [0, 0, 0, 0];
    public doughnutChartType = 'pie';
    public doughnutChartOptions: any = {
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                        return previousValue + currentValue;
                    });
                    var currentValue = dataset.data[tooltipItem.index];
                    var precentage = ((currentValue / total) * 100).toFixed(1);
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
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var total = dataset.data.reduce(function (previousValue, currentValue) {
                        return previousValue + currentValue;
                    });
                    var currentValue = dataset.data[tooltipItem.index];
                    var precentage = ((currentValue / total) * 100).toFixed(1);
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
        {data: [], label: 'Percentuale voto'},
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

// events
    public chartClickedG(e: any): void {
    }

    public chartHoveredG(e: any): void {
    }

    public chartClicked(e: any): void {
    }

    public chartHovered(e: any): void {
    }
    
    // events

    async openActionSheet() {

        let pulsantiAnni = [];
        let pulsanteCorrente;

        for (let anno of this.lineChartLabels) {
            pulsanteCorrente = {
                text: anno,
                icon: 'ios-arrow-forward',
                handler: () => {
                    this.dataButton = anno;
                    this.configuraGraficoABarre(anno);
                }
            };

            pulsantiAnni.push(pulsanteCorrente);
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
        // this.useAngularLibrary();


        this.sync.getJson(130, null, true).then((data) => {

            //voti positivi dell'esame corrente
            this.votiEsamiSuperati = data[0].filter(singoloDato => {
                return (singoloDato['AD_COD'] == this.globalData.corso.CODICE
                    && (singoloDato['VOTO'] >= 18 && singoloDato['VOTO'] <= 31)
                    && singoloDato['AA_SES_ID'] != null);
            });

            console.log(this.votiEsamiSuperati);

            this.datiAnnui = [];

            for (let singoloDato of this.votiEsamiSuperati) {
                let anno = singoloDato['AA_SES_ID'];
                if (!(anno in this.datiAnnui)) {
                    this.datiAnnui[anno] = [];
                    this.datiAnnui[anno]['sommaVoti'] = singoloDato['NR'] * singoloDato['VOTO'];
                    this.datiAnnui[anno]['numeroEsami'] = parseInt(singoloDato['NR'], 10);
                } else {
                    this.datiAnnui[anno]['sommaVoti'] += singoloDato['NR'] * singoloDato['VOTO'];
                    this.datiAnnui[anno]['numeroEsami'] += parseInt(singoloDato['NR'], 10);
                }

                if (singoloDato['VOTO'] == 31) {
                    this.datiAnnui[anno]['sommaVoti'] -= singoloDato['NR'];
                }
            }


            console.log(this.datiAnnui);

            let medie = [];

            for (let anno in this.datiAnnui) {
                medie[anno] = (this.datiAnnui[anno]['sommaVoti'] / this.datiAnnui[anno]['numeroEsami']).toFixed(2);
            }

            for (let key in medie) {
                this.lineChartLabels.push(key);
                this.lineChartData[0].data.push(medie[key]);
            }

            console.log(medie);


            this.doughnutChartData = [0, 0, 0, 0];


            let ultimoAnnoDiCorso = this.lineChartLabels.reduce((a, b) => {
                return Math.max(a, b);
            });
            this.dataButton = ultimoAnnoDiCorso;
            document.getElementById('nEsamiAnno').innerText = 'Numero esami dell\'anno: ' + this.datiAnnui[this.dataButton]['numeroEsami'];


            let temp = [];

            for (let i = 0; i < this.barChartLabels.length; i++) {
                temp.push(0);
            }


            this.votiEsamiSuperati.map(singoloDato => {
                singoloDato['VOTO'] = parseInt(singoloDato['VOTO'], 10);
                singoloDato['NR'] = parseInt(singoloDato['NR'], 10);

                if (singoloDato['RITARDO'] >= 0 && singoloDato['RITARDO'] <= 2) {
                    this.doughnutChartData[singoloDato['RITARDO']] += singoloDato['NR'];
                } else {
                    this.doughnutChartData[3] += singoloDato['NR'];
                }

                if (singoloDato['AA_SES_ID'] == ultimoAnnoDiCorso) {
                    temp[singoloDato['VOTO'] - 18] += singoloDato['NR'];
                }
            });


            //trasformiamo i dati del barChart in percentuali
            for (let i in temp) {
                this.barChartData[0].data[i] = temp [i] * 100 / this.datiAnnui[ultimoAnnoDiCorso]['numeroEsami'];
            }


            console.log(this.barChartData[0].data);

        });
    }

    configuraGraficoABarre(annoSelezionato) {

        let votiAnnoSelezionato = this.votiEsamiSuperati.filter((singoloDato) => {
            return singoloDato['AA_SES_ID'] == annoSelezionato;
        });

        let temp = [];

        for (let i = 0; i < this.barChartLabels.length; i++) {
            temp.push(0);
        }

        for (let singoloDato of votiAnnoSelezionato) {
            temp[singoloDato['VOTO'] - 18] += singoloDato['NR'];
        }

        //trasformiamo i dati del barChart in percentuali
        for (let i in temp) {
            this.barChartData[0].data[i] = temp [i] * 100 / this.datiAnnui[annoSelezionato]['numeroEsami'];
        }

        this.oddUpdate = !this.oddUpdate;

        document.getElementById('nEsamiAnno').innerText = 'Numero esami passati dell\'anno: ' + this.datiAnnui[annoSelezionato]['numeroEsami'];

    }

    doRefresh(event) {
        console.log('Begin async operation');

        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }

}
