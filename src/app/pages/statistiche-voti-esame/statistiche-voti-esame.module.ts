import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { IonicModule } from '@ionic/angular';
import { ChartsModule } from 'ng2-charts';


import { StatisticheVotiEsamePage } from './statistiche-voti-esame.page';

const routes: Routes = [
    {
        path: '',
        component: StatisticheVotiEsamePage
    }
];

@NgModule({
    imports: [
        ChartsModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        Ng2GoogleChartsModule
    ],
    declarations: [StatisticheVotiEsamePage]
})
export class StatisticheVotiEsamePageModule {}
