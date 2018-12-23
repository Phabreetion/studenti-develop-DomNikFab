import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrieraPage } from './carriera.page';

const routes: Routes = [
    {
        path: 'tab',
        component: CarrieraPage,
        children: [
            {
                path: 'libretto',
                children: [
                    {
                        path: '',
                        loadChildren: '../libretto/libretto.module#LibrettoPageModule'
                    }
                ]
            },
            {
                path: 'piano-di-studi',
                children: [
                    {
                        path: '',
                        loadChildren: '../piano-di-studi/piano-di-studi.module#PianoDiStudiPageModule'
                    }
                ]
            },
            {
                path: 'lista-esami',
                children: [
                    {
                        path: '',
                        loadChildren: '../lista-esami/lista-esami.module#ListaEsamiPageModule'
                    }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: '/carriera/tab/piano-di-studi',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarrieraPageRoutingModule {}
