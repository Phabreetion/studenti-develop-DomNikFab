import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountsPage } from './accounts.page';
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
              component: AccountsPage
          }
      ])
  ],
  declarations: [AccountsPage]
})
export class AccountsPageModule {}
