import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DisconnettiPage } from './disconnetti';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: DisconnettiPage
            }
        ])
    ],
    declarations: [DisconnettiPage]
})
export class DisconnettiPageModule {}
