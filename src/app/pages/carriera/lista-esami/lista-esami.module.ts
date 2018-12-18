import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ListaEsamiPage } from './lista-esami.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: ListaEsamiPage
            }
        ])
    ],
    declarations: [ListaEsamiPage]
})
export class ListaEsamiPageModule {}
