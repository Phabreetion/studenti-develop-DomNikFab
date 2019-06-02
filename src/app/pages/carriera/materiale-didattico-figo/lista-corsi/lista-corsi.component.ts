import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {Corso} from '../../../../models/Corso';

@Component({
    selector: 'app-lista-corsi',
    templateUrl: './lista-corsi.component.html',
    styleUrls: ['./lista-corsi.component.scss'],
})
export class ListaCorsiComponent implements OnInit {

    corsi: Corso[];

    constructor(
        public navParams: NavParams,
        public modalController: ModalController
    ) {}

    ngOnInit() {
        this.corsi = this.navParams.get('corsi');
    }

    closeModal() {
        this.modalController.dismiss();
    }

}
