import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../../services/global-data.service';
import {ModalController} from '@ionic/angular';
import {GestoreListaCorsiComponent} from './gestore-lista-corsi/gestore-lista-corsi.component';

const ALFABETICO_CRESCENTE: number = 1;
const ALFABETICO_DECRESCENTE: number = 2;
const VOTO_CRESCENTE: number = 3;
const VOTO_DECRESCENTE: number = 4;
const ANNO_CRESCENTE: number = 5;
const ANNO_DECRESCENTE: number = 6;
const CFU_CRESCENTE: number = 7;
const CFU_DECRESCENTE: number = 8;

@Component({
    selector: 'app-piano-di-studio',
    templateUrl: './piano-di-studio.page.html',
    styleUrls: ['./piano-di-studio.page.scss'],
})

export class PianoDiStudioPage implements OnInit {

    private corsi: any[];
    private corsiFiltrati: any[];
    private searchKey: String;
    showSearchBar = false;
    flyInOutState = 'in';

    private filtroSuperatiAttivo: boolean;
    private filtroNonSuperatiAttivo: boolean;
    private anno: number;


    constructor(public globalData: GlobalDataService,
                private modalController: ModalController) {
        this.searchKey = '';
        this.filtroSuperatiAttivo = false;
        this.filtroNonSuperatiAttivo = false;
        this.anno = 0;
    }

    ngOnInit() {
        this.corsi = [
            {id: 1, anno: 1, nome: 'Programmazione', cfu: 12, voto: 30},
            {id: 2, anno: 1, nome: 'Matematica', cfu: 12, voto: 20},
            {id: 3, anno: 1, nome: 'Informatica giuridica', cfu: 6, voto: 20},
            {id: 4, anno: 2, nome: 'Storia della matematica', cfu: 6, voto: 18},
            {id: 5, anno: 2, nome: 'Ingegneria del software', cfu: 9, voto: 27},
            {id: 6, anno: 2, nome: 'Basi di dati e sistemi informativi', cfu: 12, voto: 28},
            {id: 7, anno: 3, nome: 'Informatica territoriale', cfu: 8,},
            {id: 8, anno: 3, nome: 'Ricerca operativa', cfu: 7,},
        ]; // Prova per testare
        this.corsiFiltrati = this.corsi;
        this.filtra();
    }

    doRefresh(event) {
        // @TODO sostituire con la funzione di aggionramento del libretto
        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }

    private filtra(): void {
        this.corsiFiltrati = this.corsi;
        if (this.filtroSuperatiAttivo) {
            this.corsiFiltrati = this.corsiFiltrati.filter(corso => corso.voto != null);
        }

        if (this.filtroNonSuperatiAttivo) {
            this.corsiFiltrati = this.corsiFiltrati.filter(corso => corso.voto == null);
        }

        if (this.anno != 0) {
            this.corsiFiltrati = this.corsiFiltrati.filter(corso => corso.anno == this.anno);
        }

        this.search();
    }

    private search() {
        this.corsiFiltrati = this.corsiFiltrati.filter(corso => corso.nome.toString().toLowerCase().search(this.searchKey.toLowerCase())>=0);
    }

    private toggleInOut() {
        this.flyInOutState === 'out' ? this.flyInOutState = 'in' : this.flyInOutState = 'out';
        this.showSearchBar = !this.showSearchBar;
    }

    private ordina(idOrdinamento: number): void {
        switch (idOrdinamento) {
            case ALFABETICO_CRESCENTE: //alfabetico crescente
                this.corsi.sort((one, two) => (one.nome.toString() < two.nome.toString() ? -1 : 1));
                break;

            case ALFABETICO_DECRESCENTE: //alfabetico crescente
                this.corsi.sort((one, two) => (one.nome.toString() > two.nome.toString() ? -1 : 1));
                break;

            case VOTO_CRESCENTE: //voto crescente
                this.corsi.sort((one, two) => (parseInt(one.voto) < parseInt(two.voto) ? -1 : 1));
                break;

            case VOTO_DECRESCENTE: //voto decrescente
                this.corsi.sort((one, two) => (parseInt(one.voto) > parseInt(two.voto) ? -1 : 1));
                break;

            case ANNO_CRESCENTE: //anno crescente
                this.corsi.sort((one, two) => (parseInt(one.anno) < parseInt(two.anno) ? -1 : 1));
                break;

            case ANNO_DECRESCENTE: //anno decrescente
                this.corsi.sort((one, two) => (parseInt(one.anno) > parseInt(two.anno) ? -1 : 1));
                break;

            case CFU_CRESCENTE: //anno crescente
                this.corsi.sort((one, two) => (parseInt(one.cfu) < parseInt(two.cfu) ? -1 : 1));
                break;

            case CFU_DECRESCENTE: //anno decrescente
                this.corsi.sort((one, two) => (parseInt(one.cfu) > parseInt(two.cfu) ? -1 : 1));
                break;
        }

        this.filtra();

    }


    async openFiltri() {
        const modal = await this.modalController.create( {
            component: GestoreListaCorsiComponent,
            cssClass: 'gestore-lista-piano-di-studio-css'
        });

        return await modal.present();
    }
}
