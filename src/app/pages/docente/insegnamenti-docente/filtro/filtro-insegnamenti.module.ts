import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { FiltroInsegnamentiPage} from './filtro-insegnamenti';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FontAwesomeModule,
        RouterModule.forChild([
            {
                path: '',
                component: FiltroInsegnamentiPage
            }
        ])
    ],
    declarations: [FiltroInsegnamentiPage]
})
export class FiltroInsegnamentiPageModule {}
