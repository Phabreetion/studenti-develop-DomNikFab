import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DettagliCorsoPage } from './dettagli-corso.page';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppModule} from '../../../app.module';
import {FooterComponent} from '../../footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: DettagliCorsoPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FontAwesomeModule,
        RouterModule.forChild(routes)
    ],
  declarations: [DettagliCorsoPage, FooterComponent]
})
export class DettagliCorsoPageModule {}
