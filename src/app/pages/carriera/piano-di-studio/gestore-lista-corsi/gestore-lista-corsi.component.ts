import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavParams} from '@ionic/angular';
import {PianoDiStudioPage} from '../piano-di-studio.page';
import {ToastsService} from '../../../../services/toasts.service';

@Component({
    selector: 'app-gestore-lista-corsi',
    templateUrl: './gestore-lista-corsi.component.html',
    styleUrls: ['./gestore-lista-corsi.component.scss'],
})
export class GestoreListaCorsiComponent implements OnInit {
    public sourcePage: PianoDiStudioPage;

    constructor(
        private modalController: ModalController,
        private navParam: NavParams,
        private alertController: AlertController,
        private toastService: ToastsService) {
    }

    ngOnInit() {
        this.sourcePage = this.navParam.get('page');
    }



    async presentAlertPerConfermaMemorizzazione() {
        const alert = await this.alertController.create({
            header: 'Memorizzare le preferenze?',
            message: 'Sei sicuro di voler memorizzare le preferenze specificate?',
            buttons: [{
                text: 'Sì',
                handler: () => {
                    this.memorizzaFiltri();
                    this.closeFiltri();
                    this.toastService.filtriMemorizzatiConSuccesso();
                }
            }, {
                text: 'No',
                handler: () => {
                    this.toastService.filtriNonMemorizzati();
                }
            }]
        });

        await alert.present();
    }


    async presentAlertPerConfermaReset() {
        const alert = await this.alertController.create({
            header: 'Resettare le preferenze?',
            message: 'Sei sicuro di voler resettare le preferenze specificate?',
            buttons: [{
                text: 'Sì',
                handler: () => {
                    this.resetFiltri();
                    this.toastService.filtriResettatiConSuccesso();
                }
            }, {
                text: 'No',
                handler: () => {}
            }]
        });

        await alert.present();
    }


    /**
     * Questa funzione è richiamata ogni volta che si interagisce con l'interfaccia grafica.
     * Rende effettivi le modifiche ai filtri sulla lista dei corsi.
     */
    updateSourcePage() {
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
