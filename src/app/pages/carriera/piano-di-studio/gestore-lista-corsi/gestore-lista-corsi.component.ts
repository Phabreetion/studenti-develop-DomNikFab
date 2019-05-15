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

    //ordinamento
    private ordinamentoOffset: number;
    private ordinamentoSelected: number;

    constructor(
        private modalController: ModalController,
        private navParam: NavParams) {
    }

    ngOnInit() {
        this.sourcePage = this.navParam.get('page');
    }

    private updateSourcePage() {
        console.log(this.sourcePage.filtro.filtroSuperatiAttivo);
        console.log(this.sourcePage.filtro.filtroNonSuperatiAttivo);
        console.log(this.sourcePage.filtro.filtroPerAnno);
        console.log(this.sourcePage.filtro.idOrdinamento);
        console.log(this.sourcePage.filtro.tipoOrdinamento);

        if (this.sourcePage.filtro.filtroSuperatiAttivo && this.sourcePage.filtro.filtroNonSuperatiAttivo) {
            console.log ('a');
            this.sourcePage.filtro.disableBothFiltri();
        }//rivedere

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
