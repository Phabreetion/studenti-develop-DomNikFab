import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MaterialeDidatticoFigoPage } from './materiale-didattico-figo.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialeDidatticoFigoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MaterialeDidatticoFigoPage]
})
export class MaterialeDidatticoFigoPageModule {}
