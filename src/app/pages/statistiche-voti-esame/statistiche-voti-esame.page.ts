import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../services/global-data.service';
import {ActionSheetController} from '@ionic/angular';

@Component({
    selector: 'app-statistiche-voti-esame',
    templateUrl: './statistiche-voti-esame.page.html',
    styleUrls: ['./statistiche-voti-esame.page.scss'],
})
export class StatisticheVotiEsamePage implements OnInit {

    constructor(public globalData: GlobalDataService, private actionSheetController: ActionSheetController, ) {
        this.dataButton = 2011;
    }

    srcPage: string;
    pieChartData;
    dataButton: any;
    currentPage = '/statistiche-voti-esame';

    public doughnutChartLabels: string[] = ['1°Anno', '2°Anno', '3°Anno', 'Fuori corso'];
    public doughnutChartData: number[] = [20, 45, 10, 15];
    public doughnutChartType = 'doughnut';

    public barChartOptions: any = {
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    stepSize: 20,
                    min: 0,
                    max: 100
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
    public barChartLabels: string[] = ['18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '30L'];
    public barChartType = 'bar';
    public barChartLegend = true;

    public barChartData: any[] = [
        {data: [20, 24, 22, 30, 27, 19, 26, 11, 25, 11, 28, 5, 6], label: 'Distribuzione voto'},
    ];


    public lineChartData: Array<any> = [
        {data: [25, 26, 25, 24, 23, 24, 26], label: 'Voto medio'},
    ];
    public lineChartLabels: Array<any> = ['2012', '2013', '2014', '2015', '2016', '2017', '2018'];
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
        console.log(e);
    }

    public chartHoveredG(e: any): void {
        console.log(e);
    }
    // public randomize(): void {
    //     let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    //     for (let i = 0; i < this.lineChartData.length; i++) {
    //         _lineChartData[i] = {dataButton: new Array(this.lineChartData[i].dataButton.length), label: this.lineChartData[i].label};
    //         for (let j = 0; j < this.lineChartData[i].dataButton.length; j++) {
    //             _lineChartData[i].dataButton[j] = Math.floor((Math.random() * 100) + 1);
    //         }
    //     }
    //     this.lineChartData = _lineChartData;
    // }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    async openActionShett() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Selezione dell\'anno',
            buttons: [{
                text: '2011',
                icon: 'ios-arrow-forward',
                handler: () => {
                    this.dataButton = 2011;
                    console.log('Delete clicked');
                }
            }, {
                text: '2012',
                icon: 'ios-arrow-forward',
                handler: () => {
                    this.dataButton = 2012;
                    console.log('Share clicked');
                }
            }, {
                text: '2013',
                icon: 'ios-arrow-forward',
                handler: () => {
                    this.dataButton = 2013;
                    console.log('Play clicked');
                }
            }, {
                text: '2014',
                icon: 'ios-arrow-forward',
                handler: () => {
                    this.dataButton = 2014;
                    console.log('Favorite clicked');
                }
            }, {
                text: '2015',
                icon: 'ios-arrow-forward',
                handler: () => {
                    this.dataButton = 2015;
                    console.log('Cancel clicked');
                }
            }, {
                text: '2016',
                icon: 'ios-arrow-forward',
                handler: () => {
                    this.dataButton = 2016;
                    console.log('Favorite clicked');
                }
            }, {
                text: '2017',
                icon: 'ios-arrow-forward',
                handler: () => {
                    this.dataButton = 2017;
                    console.log('Favorite clicked');
                }
            }, {
                text: '2018',
                icon: 'ios-arrow-forward',
                handler: () => {
                    this.dataButton = 2018;
                    console.log('Favorite clicked');
                }
            }]
        });
        await actionSheet.present();
    }

    ngOnInit() {
        this.srcPage = this.globalData.srcPage;
        this.useAngularLibrary();
    }

    useAngularLibrary() {
        this.pieChartData = {
            chartType: 'PieChart',
            dataTable: [
                ['Languages', 'Percent'],
                ['1°Anno', 10],
                ['2°Anno', 20],
                ['3°Anno', 50],
                ['Fuori corso', 20]
            ],
            options: {
                'width': 450,
                'height': 230
            }
        };
    }

}
