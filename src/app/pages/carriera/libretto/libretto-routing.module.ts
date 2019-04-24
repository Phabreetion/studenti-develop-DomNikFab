import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LibrettoPageModule} from './libretto.module';

const routes: Routes = [
    { path: '', component: LibrettoPageModule, outlet: 'libretto' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LibrettoPageRoutingModule {}
