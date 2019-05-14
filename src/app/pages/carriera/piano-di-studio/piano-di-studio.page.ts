import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../../services/global-data.service';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {GestoreListaCorsiComponent} from './gestore-lista-corsi/gestore-lista-corsi.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PianoDiStudioService} from '../../../services/piano-di-studio.service';
import {Corso} from '../../../models/Corso';



const ALFABETICO_CRESCENTE = 1;
const ALFABETICO_DECRESCENTE = 2;
const VOTO_CRESCENTE = 3;
const VOTO_DECRESCENTE = 4;
const ANNO_CRESCENTE = 5;
const ANNO_DECRESCENTE = 6;
const CFU_CRESCENTE = 7;
const CFU_DECRESCENTE = 8;

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
    public filtroSuperatiAttivo: boolean;
    public filtroNonSuperatiAttivo: boolean;
    public filtroPerAnno: number; //-1 non attivo -> altrimenti gli altri
    public idOrdinamento: number;



    constructor(public globalData: GlobalDataService,
                private modalController: ModalController,
                private actionSheetController: ActionSheetController,
                private pianoDiStudioService: PianoDiStudioService) {
    }

    async ngOnInit() {
        this.corsi = await this.pianoDiStudioService.getCorsi();

        this.corsiFiltrati = this.corsi;
        this.corsiTrovati = this.corsiFiltrati;

        this.resetFiltri();

        //load filtri dallo storage
        //se i filtri sono salvati nello storage
        //chiama subito le funzioni filtra e ordina
    }

    doRefresh(event) {
        // @TODO sostituire con la funzione di aggionramento del libretto
        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }


    ordina(): void {
        switch (this.idOrdinamento) {
            case ALFABETICO_CRESCENTE: //alfabetico crescente
                this.corsiFiltrati.sort((one, two) => (one.DESCRIZIONE.toString() < two.DESCRIZIONE.toString() ? -1 : 1));
                break;

            case ALFABETICO_DECRESCENTE: //alfabetico crescente
                this.corsiFiltrati.sort((one, two) => (one.DESCRIZIONE.toString() > two.DESCRIZIONE.toString() ? -1 : 1));
                break;

            case ANNO_CRESCENTE: //anno crescente
                this.corsiFiltrati.sort((one, two) => one.ANNO < two.ANNO ? -1 : 1);
                break;

            case ANNO_DECRESCENTE: //anno decrescente
                this.corsiFiltrati.sort((one, two) => one.ANNO > two.ANNO ? -1 : 1);
                break;

            case CFU_CRESCENTE: //anno crescente
                this.corsiFiltrati.sort((one, two) => one.CFU < two.CFU ? -1 : 1);
                break;

            case CFU_DECRESCENTE: //anno decrescente
                this.corsiFiltrati.sort((one, two) => one.CFU > two.CFU ? -1 : 1);
                break;

            case VOTO_CRESCENTE: //voto crescente
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

            case VOTO_DECRESCENTE: //voto decrescente
                this.corsiFiltrati.sort((one, two) => {
                    if (one.VOTO > two.VOTO) {
                        return -1;
                    }
                    if (one.VOTO < two.VOTO) {
                        return 1;
                    }
                    if (one.VOTO === two.VOTO && one.LODE <= two.LODE) {
                        return 1;
                    }
                    if (one.VOTO === two.VOTO && one.LODE >= two.LODE) {
                        return -1;
                    }
                });
                break;
        }
    }

    filtra(): void {
        this.corsiFiltrati = this.corsi;
        if (this.filtroSuperatiAttivo) {
            this.corsiFiltrati = this.corsiFiltrati.filter(corso => corso.isSuperato());
        }

        if (this.filtroNonSuperatiAttivo) {
            this.corsiFiltrati = this.corsiFiltrati.filter(corso => !corso.isSuperato());
        }

        if (this.filtroPerAnno >= 0) {
            this.corsiFiltrati = this.corsiFiltrati.filter(corso => corso.ANNO === this.filtroPerAnno);
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

    }

    resetFiltri() {
        this.searchKey = '';
        this.filtroPerAnno = -1;
        this.filtroSuperatiAttivo = false;
        this.filtroNonSuperatiAttivo = false;
        this.idOrdinamento = 3;

        this.pianoDiStudioService.resetFiltri();
    }

}
