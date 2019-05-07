import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../../services/global-data.service';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {GestoreListaCorsiComponent} from './gestore-lista-corsi/gestore-lista-corsi.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PianoDiStudioService} from '../../../services/piano-di-studio.service';
import {forEach} from '@angular-devkit/schematics';
import {Corso} from '../../../models/Corso';

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
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateX(0)'})),
            transition('void => *', [
                style({transform: 'translateX(100%)'}),
                animate(300)
            ])
        ])
    ]
})

export class PianoDiStudioPage implements OnInit {

    private corsi: Corso[];
    private corsiFiltrati: Corso[];
    private searchKey: String;
    showSearchBar = false;
    flyInOutState = 'in';


    private anno: number;


    constructor(public globalData: GlobalDataService,
                private modalController: ModalController,
                private actionSheetController: ActionSheetController,
                private pianoDiStudioService: PianoDiStudioService) {
        this.searchKey = '';
        this.anno = 0;
    }

    async ngOnInit() {
        await this.pianoDiStudioService.getLibretto().then((data) => {
            this.corsi = data[0] as any[];
            for(let i = 0; i < this.corsi.length; i++) {
                this.corsi[i] = Corso.toObj(this.corsi[i]);
            }

            console.log(this.corsi);
        });
        this.corsiFiltrati = this.corsi;
        this.filtra(false, false);
    }

    doRefresh(event) {
        // @TODO sostituire con la funzione di aggionramento del libretto
        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }

    public filtra(filtroSuperatiAttivo: boolean, filtroNonSuperatiAttivo: boolean): void {
        this.corsiFiltrati = this.corsi;
        if (filtroSuperatiAttivo) {
            this.corsiFiltrati = this.corsiFiltrati.filter(corso => corso.VOTO != null);
        }

        if (filtroNonSuperatiAttivo) {
            this.corsiFiltrati = this.corsiFiltrati.filter(corso => corso.VOTO == null);
        }

        if (this.anno != 0) {
            this.corsiFiltrati = this.corsiFiltrati.filter(corso => corso.ANNO == this.anno);
        }

        //this.search();
    }

    private search() {
      //  this.corsiFiltrati = this.corsiFiltrati.filter(corso => corso.nome.toString().toLowerCase().search(this.searchKey.toLowerCase())>=0);
    }

    private toggleInOut() {
        this.flyInOutState === 'out' ? this.flyInOutState = 'in' : this.flyInOutState = 'out';
        this.showSearchBar = !this.showSearchBar;
    }

    /*private ordina(idOrdinamento: number): void {
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

    }*/

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

}
