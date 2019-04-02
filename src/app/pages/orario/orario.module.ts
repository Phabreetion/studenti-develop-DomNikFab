
import { OrarioPage } from './orario.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
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
              component: OrarioPage
          }
      ])
  ],
  declarations: [OrarioPage]
})
export class OrarioPageModule {}
