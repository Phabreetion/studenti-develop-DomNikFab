import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { InsegnamentiDocentePage } from './insegnamenti-docente.page';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule.forChild([
      {
        path: '',
        component: InsegnamentiDocentePage
      }
    ])
  ],
  declarations: [InsegnamentiDocentePage]
})
export class InsegnamentiDocentePageModule {}
