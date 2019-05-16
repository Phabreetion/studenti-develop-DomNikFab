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

    /**
     * Questa funzione evita che, attivando entrambi i toogle, resti attivo anche il toogle per il filtro degli esami non superati.
     */
    checkToogleSuperati(): void {
        //se i toogle sono entrambi attivi, disattiva quello dei non superati
        if (this.sourcePage.filtro.filtroNonSuperatiAttivo && this.sourcePage.filtro.filtroSuperatiAttivo) {
            this.sourcePage.filtro.filtroNonSuperatiAttivo = false;
        }

        this.updateSourcePage();
    }

    /**
     * Questa funzione evita che, attivando entrambi i toogle, resti attivo anche il toogle per il filtro degli esami superati.
     */
    checkToogleNonSuperati(): void {
        if (this.sourcePage.filtro.filtroNonSuperatiAttivo && this.sourcePage.filtro.filtroSuperatiAttivo) {
            this.sourcePage.filtro.filtroSuperatiAttivo = false;
        }

        this.updateSourcePage();
    }


    /**
     * Questa funzione è richiamata ogni volta che si interagisce con l'interfaccia grafica.
     * Rende effettivi le modifiche ai filtri sulla lista dei corsi.
     */
    updateSourcePage() {
        console.log('superati: ' + this.sourcePage.filtro.filtroSuperatiAttivo);
        console.log('non superati: ' + this.sourcePage.filtro.filtroNonSuperatiAttivo);
        console.log('anno: ' + this.sourcePage.filtro.filtroPerAnno);
        console.log('ordinamento: ' + this.sourcePage.filtro.idOrdinamento);
        console.log('crescenza/discenza: ' + this.sourcePage.filtro.tipoOrdinamento);


        this.sourcePage.updateFiltri();
    }

    /**
     * Questa funzione chiude la schermata dei filtri.
     */
    closeFiltri() {
        this.modalController.dismiss();
    }

    /**
     * Questa funzione resetta i filtri applicati e aggiorna la lista dei corsi.
     */
    resetFiltri() {
        this.sourcePage.filtro.reset();
        this.updateSourcePage();
    }

    /**
     * Questa funzione memorizza i filtri applicati.
     */
    memorizzaFiltri() {
        this.sourcePage.memorizzaFiltri();
    }
}
