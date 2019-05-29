import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppelliPage } from './appelli';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {GestoreListaAppelliDisponbiliComponent} from './gestore-lista-appelli-disponbili/gestore-lista-appelli-disponbili.component';

@NgModule({
    entryComponents: [GestoreListaAppelliDisponbiliComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FontAwesomeModule,
        RouterModule.forChild([
            {
                path: '',
                component: AppelliPage
            }
        ])
    ],
    declarations: [AppelliPage, GestoreListaAppelliDisponbiliComponent]
})
export class AppelliPageModule {}

