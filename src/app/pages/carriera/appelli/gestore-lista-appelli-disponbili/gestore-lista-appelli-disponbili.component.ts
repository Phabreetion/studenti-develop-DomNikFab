import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {AppelliPage} from '../appelli';

@Component({
    selector: 'app-gestore-lista-appelli-disponbili',
    templateUrl: './gestore-lista-appelli-disponbili.component.html',
    styleUrls: ['./gestore-lista-appelli-disponbili.component.scss'],
})
export class GestoreListaAppelliDisponbiliComponent implements OnInit {


    public sourcePage: AppelliPage;

    constructor(
        private modalController: ModalController,
        private navParam: NavParams) {
    }

    ngOnInit() {
        this.sourcePage = this.navParam.get('page');
    }

    closeAppelli() {
        this.modalController.dismiss();
    }

    private reset() {

        this.sourcePage.filtro.reset();
        this.updateSourcePage();
    }

    updateSourcePage() {
        this.sourcePage.updateFiltri();
    }

    /**
     * Questa funzione memorizza i filtri applicati.
     */
    memorizzaFiltri() {
        this.sourcePage.memorizzaFiltri();
    }


}
