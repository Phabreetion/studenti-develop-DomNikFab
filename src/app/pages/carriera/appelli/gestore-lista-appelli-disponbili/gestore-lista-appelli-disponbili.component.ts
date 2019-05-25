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

    checkfiltraScritti(){

        if(this.sourcePage.filtro.filtraScritto){
            this.sourcePage.filtro.filtraOrale = 0;
            this.sourcePage.filtro.filtraScrittoOrale = 0;
        }

        this.updateSourcePage();

    }


    checkfiltroOrale(){

        if(this.sourcePage.filtro.filtraOrale){
            this.sourcePage.filtro.filtraScritto = 0;
            this.sourcePage.filtro.filtraScrittoOrale = 0;
        }
        this.updateSourcePage();
    }

    checkfiltriScrittoOrale(){

        if(this.sourcePage.filtro.filtraScrittoOrale){
            this.sourcePage.filtro.filtraOrale = 0;
            this.sourcePage.filtro.filtraScritto = 0;
        }

        this.updateSourcePage();
    }


    /**
     * Questa funzione memorizza i filtri applicati.
     */
    memorizzaFiltri() {
        this.sourcePage.memorizzaFiltri();
    }


}
