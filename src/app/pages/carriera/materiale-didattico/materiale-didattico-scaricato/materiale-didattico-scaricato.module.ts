import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MaterialeDidatticoScaricatoPage} from './materiale-didattico-scaricato.page';
import {ListaCorsiComponent} from './lista-corsi/lista-corsi.component';


const routes: Routes = [
    {
        path: '',
        component: MaterialeDidatticoScaricatoPage
    }
];

@NgModule({
    entryComponents: [ListaCorsiComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MaterialeDidatticoScaricatoPage, ListaCorsiComponent]
})
export class MaterialeDidatticoScaricatoPageModule {}
