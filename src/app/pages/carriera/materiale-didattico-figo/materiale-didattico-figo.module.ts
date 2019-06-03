import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MaterialeDidatticoFigoPage} from './materiale-didattico-figo.page';
import {ListaCorsiComponent} from './lista-corsi/lista-corsi.component';


const routes: Routes = [
    {
        path: '',
        component: MaterialeDidatticoFigoPage
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
    declarations: [MaterialeDidatticoFigoPage, ListaCorsiComponent]
})
export class MaterialeDidatticoFigoPageModule {}
