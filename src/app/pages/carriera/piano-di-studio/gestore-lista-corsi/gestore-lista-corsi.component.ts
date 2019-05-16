import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {PianoDiStudioPage} from '../piano-di-studio.page';

@Component({
    selector: 'app-gestore-lista-corsi',
    templateUrl: './gestore-lista-corsi.component.html',
    styleUrls: ['./gestore-lista-corsi.component.scss'],
})
export class GestoreListaCorsiComponent implements OnInit {
    public sourcePage: PianoDiStudioPage;

    constructor(
        private modalController: ModalController,
        private navParam: NavParams) {
    }

    ngOnInit() {
        this.sourcePage = this.navParam.get('page');
    }

    checkToogleSuperati() {
        if (this.sourcePage.filtro.filtroNonSuperatiAttivo && this.sourcePage.filtro.filtroSuperatiAttivo) {
            this.sourcePage.filtro.filtroNonSuperatiAttivo = false;
        }

        this.updateSourcePage();
    }
    checkToogleNonSuperati() {
        if (this.sourcePage.filtro.filtroNonSuperatiAttivo && this.sourcePage.filtro.filtroSuperatiAttivo) {
            this.sourcePage.filtro.filtroSuperatiAttivo = false;
        }

        this.updateSourcePage();
    }

    arrayOne(n: number): any[] {
        return Array(n);
    }


    private updateSourcePage() {

        console.log('superati: ' + this.sourcePage.filtro.filtroSuperatiAttivo);
        console.log('non superati: ' + this.sourcePage.filtro.filtroNonSuperatiAttivo);
        console.log('anno: ' + this.sourcePage.filtro.filtroPerAnno);
        console.log('ordinamento: ' + this.sourcePage.filtro.idOrdinamento);
        console.log('crescenza/discenza: ' + this.sourcePage.filtro.tipoOrdinamento);


        this.sourcePage.updateFiltri();
    }

    //
    closeFiltri() {
        this.modalController.dismiss();
    }

    resetFiltri() {
        this.sourcePage.resetFiltri();
    }

    memorizzaFiltri() {
        this.sourcePage.memorizzaFiltri();
    }
}
