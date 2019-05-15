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

    //switch
    switchSup: boolean;
    switchNonSup: boolean;

    constructor(
        private modalController: ModalController,
        private navParam: NavParams) {
        this.switchSup = false;
        this.switchNonSup = false;
    }

    ngOnInit() {
        this.sourcePage = this.navParam.get('page');


        this.switchSup = this.sourcePage.filtro.filtroSuperatiAttivo;
        this.switchNonSup = this.sourcePage.filtro.filtroNonSuperatiAttivo;
    }

    checkToogle() {
        console.log(this.switchSup);
        console.log(this.switchNonSup);

        if (this.switchSup && this.switchNonSup && this.sourcePage.filtro.filtroSuperatiAttivo) {
            this.sourcePage.filtro.filtroNonSuperatiAttivo = true;
            this.sourcePage.filtro.filtroSuperatiAttivo = false;
        }

        if (this.switchSup && this.switchNonSup && this.sourcePage.filtro.filtroNonSuperatiAttivo) {
            this.sourcePage.filtro.filtroNonSuperatiAttivo = false;
            this.sourcePage.filtro.filtroSuperatiAttivo = true;
        }

        this.switchSup =

        this.updateSourcePage();
    }


    private updateSourcePage() {
        /*
        if (this.sourcePage.filtro.filtroSuperatiAttivo) {
            console.log ('a');
            this.sourcePage.filtro.disableFiltroEsamiNonSuperati();
        } else if ( this.sourcePage.filtro.filtroNonSuperatiAttivo) {
            console.log('b');
            this.sourcePage.filtro.disableFiltroEsamiSuperati();
        }
        */

        console.log('superati: ' + this.sourcePage.filtro.filtroSuperatiAttivo);
        console.log('non superati: ' + this.sourcePage.filtro.filtroNonSuperatiAttivo);
        console.log('anno: ' + this.sourcePage.filtro.filtroPerAnno);
        console.log('ordinamento: ' + this.sourcePage.filtro.idOrdinamento);
        console.log('discenza: ' + this.sourcePage.filtro.tipoOrdinamento);


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
