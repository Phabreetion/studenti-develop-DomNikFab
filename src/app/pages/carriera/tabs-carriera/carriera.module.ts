import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {CarrieraPage} from './carriera.page';
import {CarrieraPageRoutingModule} from './carriera-routing.module';
import {PianoDiStudiPageModule} from '../piano-di-studi/piano-di-studi.module';
import {LibrettoPageModule} from '../libretto/libretto.module';
import {ListaEsamiPageModule} from '../lista-esami/lista-esami.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CarrieraPageRoutingModule,
        PianoDiStudiPageModule,
        LibrettoPageModule,
        ListaEsamiPageModule,
    ],
    declarations: [CarrieraPage]
})
export class CarrieraPageModule {}
