import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DettagliUtentePage } from './dettagli-utente';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: DettagliUtentePage
            }
        ])
    ],
    declarations: [DettagliUtentePage]
})
export class DettagliUtentePageModule {}
