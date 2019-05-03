import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PianoDiStudioPage } from './piano-di-studio.page';

const routes: Routes = [
  {
    path: '',
    component: PianoDiStudioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PianoDiStudioPage]
})
export class PianoDiStudioPageModule {}
