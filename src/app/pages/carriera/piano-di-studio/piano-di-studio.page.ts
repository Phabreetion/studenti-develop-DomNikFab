import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../../services/global-data.service';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {GestoreListaCorsiComponent} from './gestore-lista-corsi/gestore-lista-corsi.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PianoDiStudioService} from '../../../services/piano-di-studio.service';
import {Corso} from '../../../models/Corso';
import {FiltroPianoDiStudio} from '../../../models/FiltroPianoDiStudio';



const ORDINAMENTO_ALFABETICO = 1;
const ORDINAMENTO_ANNO = 2;
const ORDINAMENTO_CFU = 3;
const ORDINAMENTO_VOTO = 4;

@Component({
    selector: 'app-piano-di-studio',
    templateUrl: './piano-di-studio.page.html',
    styleUrls: ['./piano-di-studio.page.scss'],
})

export class PianoDiStudioPage implements OnInit {

    private corsi: Corso[];
    private corsiFiltrati: Corso[];
    private corsiTrovati: Corso[];
    private searchKey: string;
    public isSearchbarOpened = false;


    //per filtri e ordinamento
    filtro: FiltroPianoDiStudio;



    constructor(public globalData: GlobalDataService,
                private modalController: ModalController,
                private actionSheetController: ActionSheetController,
                private pianoDiStudioService: PianoDiStudioService) {
        this.filtro = new FiltroPianoDiStudio();
    }

    async ngOnInit() {
        this.corsi = await this.pianoDiStudioService.getCorsi();

        this.corsiFiltrati = this.corsi;
        this.corsiTrovati = this.corsiFiltrati;

        this.resetFiltri();

        //carico i filtri dallo storage ed eseguo il filtraggio
        this.pianoDiStudioService.loadFiltriFromStorage().then(
            filtro => {
                this.filtro = filtro;
                this.updateFiltri();
            }
        );


    }

    doRefresh(event) {
        // @TODO sostituire con la funzione di aggionramento del libretto
        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }


    ordina(): void {
        //il primo ordinamento viene eseguito per crescente crescente
        switch (this.filtro.idOrdinamento) {
            case ORDINAMENTO_ALFABETICO: //alfabetico crescente
                this.corsiFiltrati.sort((one, two) => (one.DESCRIZIONE < two.DESCRIZIONE ? -1 : 1) );
                break;

            case ORDINAMENTO_ANNO: //anno crescente
                this.corsiFiltrati.sort((one, two) => (one.ANNO < two.ANNO ? -1 : 1) );
                break;

            case ORDINAMENTO_CFU: //CFU crescente
                this.corsiFiltrati.sort((one, two) => (one.CFU < two.CFU ? -1 : 1) );
                break;

            case ORDINAMENTO_VOTO: //voto crescente
                this.corsiFiltrati.sort((one, two) => {
                    if (one.VOTO < two.VOTO) {
                        return -1;
                    }
                    if (one.VOTO > two.VOTO) {
                        return 1;
                    }
                    if (one.VOTO === two.VOTO && one.LODE >= two.LODE) {
                        return 1;
                    }
                    if (one.VOTO === two.VOTO && one.LODE <= two.LODE) {
                        return -1;
                    }
                    /*if (!one.VOTO && !two.VOTO && one.STATO === 'S' && two.STATO === 'F') {
                        return -1;
                    }
                    if (!one.VOTO && !two.VOTO && one.STATO === 'F' && two.STATO === 'S') {
                        return 1;
                    }*/
                });
                break;
        }

        //se viene selezionato decrescente viene effetuato il reverse dell'array
        if(this.filtro.isDescrescente) {
            this.corsiFiltrati.reverse();
        }
    }

    filtra(): void {
        this.corsiFiltrati = this.corsi;
        if (this.filtro.filtroSuperatiAttivo) {
            this.corsiFiltrati = this.corsiFiltrati.filter(corso => corso.isSuperato());
        }

        if (this.filtro.filtroNonSuperatiAttivo) {
            this.corsiFiltrati = this.corsiFiltrati.filter(corso => !corso.isSuperato());
        }

        if (this.filtro.filtroPerAnno >= 0) {
            this.corsiFiltrati = this.corsiFiltrati.filter(corso => corso.ANNO === this.filtro.filtroPerAnno);
        }
    }

    search() {
        const searchKeyLowered = this.searchKey.toLowerCase();
        this.corsiTrovati = this.corsiFiltrati.filter(corso => corso.DESCRIZIONE.toLowerCase().search(searchKeyLowered) >= 0);
    }



    async presentActionSheet(corso: Corso) { //
        let actionSheet;

        if (corso.isSuperato()) {
            actionSheet = await this.actionSheetController.create({
                header: corso.DESCRIZIONE,
                buttons: [ {
                    text: 'Materiale didattico',
                    icon: 'archive',
                    handler: () => { this.goToMaterialeDidattico(corso); }
                }, {
                    text: 'Dettagli corso',
                    icon: 'alert',
                    handler: () => { this.goToDettagliCorso(corso); }
                }, {
                    text: 'Chiudi',
                    icon: 'close',
                    handler: () => { this.actionSheetController.dismiss(); }
                }]
            });
        } else {
            actionSheet = await this.actionSheetController.create({
                header: corso.DESCRIZIONE,
                buttons: [{
                    text: 'Appelli',
                    icon: 'book',
                    handler: () => { this.goToAppelli(corso); }
                }, {
                    text: 'Materiale didattico',
                    icon: 'archive',
                    handler: () => { this.goToMaterialeDidattico(corso); }
                }, {
                    text: 'Dettagli corso',
                    icon: 'alert',
                    handler: () => { this.goToDettagliCorso(corso); }
                }, {
                    text: 'Chiudi',
                    icon: 'close',
                    handler: () => { this.actionSheetController.dismiss(); }
                }]
            });
        }

        await actionSheet.present();
    }

    async openFiltri() {
        const modal = await this.modalController.create( {
            component: GestoreListaCorsiComponent,
            cssClass: 'gestore-lista-piano-di-studio-css',
            componentProps: {
                'page': this
            }
        });


        return await modal.present();
    }

    public updateFiltri() {
        this.corsiFiltrati = this.corsi;
        this.ordina();
        this.filtra();
        this.search();
    }

    goToAppelli(corso: Corso) {
        this.globalData.goTo(this, ['/appelli/', corso.CODICE], 'forward', false);
    }

    goToMaterialeDidattico(corso: Corso) {
        this.globalData.goTo(this, ['/materiale-didattico/', corso.AD_ID], 'forward', false);
    }

    goToDettagliCorso(corso: Corso) {
        this.globalData.goTo(this, ['/esame/', corso.CODICE], 'forward', false);
        //this.globalData.esame = esame;
        //this.globalData.goTo(this.currentPage, '/esame', 'forward', false); //
    }

    memorizzaFiltri() {
        this.pianoDiStudioService.memorizzaFiltri(this.filtro);
    }

    resetFiltri() {
        this.searchKey = '';
        this.filtro.filtroPerAnno = -1;
        this.filtro.filtroSuperatiAttivo = false;
        this.filtro.filtroNonSuperatiAttivo = false;
        this.filtro.idOrdinamento = 3;
        this.filtro.isDescrescente = false;

        this.updateFiltri();
    }

    hideSearchbar() {
        this.isSearchbarOpened = false;
        this.searchKey = '';
        this.search();
    }
}
