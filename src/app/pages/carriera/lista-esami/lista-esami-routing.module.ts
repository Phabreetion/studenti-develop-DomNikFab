import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListaEsamiPageModule} from './lista-esami.module';

const routes: Routes = [
    { path: '', component: ListaEsamiPageModule, outlet: 'lista-esami' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListaEsamiPageRoutingModule {}
