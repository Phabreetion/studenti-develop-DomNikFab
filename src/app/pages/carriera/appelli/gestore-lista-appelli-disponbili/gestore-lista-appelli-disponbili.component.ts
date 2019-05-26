import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavParams} from '@ionic/angular';
import {AppelliPage} from '../appelli';
import {ToastsService} from '../../../../services/toasts.service';

@Component({
    selector: 'app-gestore-lista-appelli-disponbili',
    templateUrl: './gestore-lista-appelli-disponbili.component.html',
    styleUrls: ['./gestore-lista-appelli-disponbili.component.scss'],
})
export class GestoreListaAppelliDisponbiliComponent implements OnInit {


    public sourcePage: AppelliPage;

    constructor(
        private modalController: ModalController,
        private navParam: NavParams,
        private alertController: AlertController,
        private toastService: ToastsService) {
    }

    ngOnInit() {
        this.sourcePage = this.navParam.get('page');
    }

    closeAppelli() {
        this.modalController.dismiss();
    }

    reset() {
        this.sourcePage.filtro.reset();
        this.updateSourcePage();
    }

    updateSourcePage() {
        this.sourcePage.updateFiltri();
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

    checkfiltraScritti() {

        if (this.sourcePage.filtro.filtraScrittoAttivo) {
            this.sourcePage.filtro.filtraOraleAttivo = false;
            this.sourcePage.filtro.filtraScrittoOraleAttivo = false;
        }

        this.updateSourcePage();

    }


    checkfiltroOrale() {

        if (this.sourcePage.filtro.filtraOraleAttivo) {
            this.sourcePage.filtro.filtraScrittoAttivo = false;
            this.sourcePage.filtro.filtraScrittoOraleAttivo = false;
        }
        this.updateSourcePage();
    }

    checkfiltriScrittoOrale() {

        if (this.sourcePage.filtro.filtraScrittoOraleAttivo) {
            this.sourcePage.filtro.filtraOraleAttivo = false;
            this.sourcePage.filtro.filtraScrittoAttivo = false;
        }

        this.updateSourcePage();
    }


    /**
     * Questa funzione memorizza i filtri applicati.
     */
    memorizzaFiltri() {
        this.sourcePage.memorizzaFiltri();
    }

    /**
     * Questa funzione chiude la schermata dei filtri.
     */
    closeFiltri() {
        this.modalController.dismiss();
    }


}
