import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { AppelloPage } from './appello.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FontAwesomeModule,
        RouterModule.forChild([
            {
                path: '',
                component: AppelloPage
            }
        ])
    ],
    declarations: [AppelloPage]
})
export class AppelloPageModule {}
