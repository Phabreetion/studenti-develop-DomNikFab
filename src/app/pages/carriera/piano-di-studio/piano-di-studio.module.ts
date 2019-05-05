import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PianoDiStudioPage} from './piano-di-studio.page';
import {GestoreListaCorsiComponent} from './gestore-lista-corsi/gestore-lista-corsi.component';

const routes: Routes = [
    {
        path: '',
        component: PianoDiStudioPage
    }
];

@NgModule({
    entryComponents: [GestoreListaCorsiComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        PianoDiStudioPage,
        GestoreListaCorsiComponent
    ]
})
export class PianoDiStudioPageModule {
}
