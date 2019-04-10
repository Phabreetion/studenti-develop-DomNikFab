import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppelliDocentePage} from './appelli-docente.page';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FontAwesomeModule,
        RouterModule.forChild([
            {
                path: '',
                component: AppelliDocentePage
            }
        ])
    ],
    declarations: [AppelliDocentePage]
})
export class AppelliDocentePageModule {}
