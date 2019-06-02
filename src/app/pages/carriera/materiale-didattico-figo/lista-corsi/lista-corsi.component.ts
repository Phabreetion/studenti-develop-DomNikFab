import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {Corso} from '../../../../models/Corso';
import {GlobalDataService} from '../../../../services/global-data.service';

@Component({
    selector: 'app-lista-corsi',
    templateUrl: './lista-corsi.component.html',
    styleUrls: ['./lista-corsi.component.scss'],
})
export class ListaCorsiComponent implements OnInit {

    corsi: Corso[];

    constructor(
        public navParams: NavParams,
        public modalController: ModalController,
        public globalData: GlobalDataService
    ) {}

    ngOnInit() {
        this.corsi = this.navParams.get('corsi');
    }

    closeModal() {
        this.modalController.dismiss();
    }

    goToMaterialeDidattico(corso: Corso) {
        this.globalData.goTo(this, ['/materiale-didattico/', corso.AD_ID,  corso.DESCRIZIONE], 'forward', false);
        this.modalController.dismiss();
    }
}
