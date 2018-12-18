import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrieraPage } from './carriera.page';
import {LibrettoPage} from '../libretto/libretto.page';
import {PianoDiStudiPage} from '../piano-di-studi/piano-di-studi.page';
import {ListaEsamiPage} from '../lista-esami/lista-esami.page';

const routes: Routes = [
    {
        path: 'tab',
        component: CarrieraPage,
        children: [
            {
                path: 'libretto',
                outlet: 'libretto',
                component: LibrettoPage
            },
            {
                path: 'piano-di-studi',
                outlet: 'piano-di-studi',
                component: PianoDiStudiPage
            },
            {
                path: 'lista-esami',
                outlet: 'lista-esami',
                component: ListaEsamiPage
            }
        ]
    },
    {
        path: '',
        redirectTo: '/carriera/tab/(piano-di-studi:piano-di-studi)',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarrieraPageRoutingModule {}
