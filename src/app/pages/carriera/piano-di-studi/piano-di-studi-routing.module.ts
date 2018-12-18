import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PianoDiStudiPageModule} from './piano-di-studi.module';

const routes: Routes = [
    { path: '', component: PianoDiStudiPageModule, outlet: 'piano-di-studi' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PianoDiStudiPageRoutingModule {}
