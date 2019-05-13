import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SelezioneOrarioPage } from './selezione-orario.page';

const routes: Routes = [
  {
    path: '',
    component: SelezioneOrarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SelezioneOrarioPage]
})
export class SelezioneOrarioPageModule {}
