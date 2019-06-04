import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialeDidatticoCorsoPage } from './materiale-didattico-corso.page';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FontAwesomeModule,
        RouterModule.forChild([
            {
                path: '',
                component: MaterialeDidatticoCorsoPage
            }
        ])
    ],
    declarations: [MaterialeDidatticoCorsoPage]
})
export class MaterialeDidatticoCorsoPageModule {}
