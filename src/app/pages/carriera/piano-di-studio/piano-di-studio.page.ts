import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../../services/global-data.service';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {GestoreListaCorsiComponent} from './gestore-lista-corsi/gestore-lista-corsi.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PianoDiStudioService} from '../../../services/piano-di-studio.service';
import {Corso} from '../../../models/Corso';

import {faCoins} from '@fortawesome/free-solid-svg-icons';

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
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateY(0)'})),
            transition('void => *', [
                style({transform: 'translateY(100%)'}),
                animate(300)
            ])
        ])
    ]
})

export class PianoDiStudioPage implements OnInit {

    private corsi: Corso[];
    private corsiFiltrati: Corso[];
    private searchKey: string;
    showSearchBar = false;
    flyInOutState = 'in';


    //per filtri e ordinamento
    public filtroSuperatiAttivo: boolean;
    public filtroNonSuperatiAttivo: boolean;
    public filtroPerAnno: number; //-1 non attivo -> altrimenti gli altri
    public idOrdinamento: number;



    constructor(public globalData: GlobalDataService,
                private modalController: ModalController,
                private actionSheetController: ActionSheetController,
                private pianoDiStudioService: PianoDiStudioService) {
        this.searchKey = '';
        this.filtroPerAnno = -1;
        this.filtroSuperatiAttivo = false;
        this.filtroNonSuperatiAttivo = false;
        this.idOrdinamento = 3;
    }

    async ngOnInit() {
        this.corsi = await this.pianoDiStudioService.getCorsi();

        this.corsiFiltrati = this.corsi;
    }

    private doRefresh(event) {
        // @TODO sostituire con la funzione di aggionramento del libretto
        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }

    private filtra(): void {
        this.corsiFiltrati = this.corsi;
        if (this.filtroSuperatiAttivo) {
            this.corsiFiltrati = this.corsiFiltrati.filter(corso => corso.STATO == 'S');
        }

        if (this.filtroNonSuperatiAttivo) {
            this.corsiFiltrati = this.corsiFiltrati.filter(corso => corso.STATO != 'S');
        }

        if (this.filtroPerAnno >= 0) {
            this.corsiFiltrati = this.corsiFiltrati.filter(corso => corso.ANNO == this.filtroPerAnno);
        }
    }

    private search() {
      //  this.corsiFiltrati = this.corsiFiltrati.filter(corso => corso.nome.toString().toLowerCase().search(this.searchKey.toLowerCase())>=0);
    }

    public toggleInOut() {
        this.flyInOutState === 'out' ? this.flyInOutState = 'in' : this.flyInOutState = 'out';
        this.showSearchBar = !this.showSearchBar;
    }

    private ordina(): void {
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

    async presentActionSheet() { //
        const actionSheet = await this.actionSheetController.create({
            header: 'Operazioni', // da sostituire con il nome del corso
            buttons: [{

                text: 'Appelli',
                icon: 'book',
                handler: () => {
                    console.log('Appelli cliccato');
                }
            }, {
                text: 'Materiale didattico',
                icon: 'archive',
                handler: () => {
                    console.log('Materiale didattico cliccato');
                }
            }, {
                text: 'Dettagli corso',
                icon: 'alert',
                handler: () => {
                    console.log('Dettagli corso cliccato');
                }
            }, {
                text: 'Chiudi',
                role: 'cancel',
                icon: 'close',
                handler: () => {
                    console.log('Chiudi cliccato');
                }
            }]
        });
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
    }

}
