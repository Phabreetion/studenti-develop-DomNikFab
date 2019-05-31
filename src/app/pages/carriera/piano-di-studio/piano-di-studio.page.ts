import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalDataService} from '../../../services/global-data.service';
import {ActionSheetController, ModalController, ToastController} from '@ionic/angular';
import {GestoreListaCorsiComponent} from './gestore-lista-corsi/gestore-lista-corsi.component';
import {PianoDiStudioService} from '../../../services/piano-di-studio.service';
import {Corso} from '../../../models/Corso';
import {FiltroPianoDiStudio} from '../../../models/FiltroPianoDiStudio';
import {SyncService} from '../../../services/sync.service';
import {HttpService} from '../../../services/http.service';
import {AccountService} from '../../../services/account.service';
import {ToastsService} from '../../../services/toasts.service';


const PAGE_URL = '/piano-di-studio';

@Component({
    selector: 'app-piano-di-studio',
    templateUrl: './piano-di-studio.page.html',
    styleUrls: ['./piano-di-studio.page.scss'],
})


export class PianoDiStudioPage implements OnInit {


    //corsi array
    corsi: Corso[];
    corsiFiltrati: Corso[];
    corsiOrdinati: Corso[];
    corsiTrovati: Corso[];

    //per filtri e ordinamento
    filtro: FiltroPianoDiStudio;

    //ricerca
    @ViewChild('searchbar') searchbar: any;
    isSearchbarOpened = false;
    searchKey: string;


    constructor(public globalData: GlobalDataService,
                public modalController: ModalController,
                public actionSheetController: ActionSheetController,
                public pianoDiStudioService: PianoDiStudioService,
                public sync: SyncService,
                public http: HttpService,
                public toastCtrl: ToastController,
                public account: AccountService,
                public toastService: ToastsService) {
        this.filtro = new FiltroPianoDiStudio();
    }

    ngOnInit() {
        //controllo l'account, se non verificato rimanda alla pagina di login
        this.account.controllaAccount().then(
            () => {this.http.getConnected(); },
            () => {this.globalData.goTo(PAGE_URL, '/login', 'root', false); }
        );

        this.isSearchbarOpened = false;
        this.searchKey = '';

        this.pianoDiStudioService.getCorsi().then( data => {
            this.corsi = data;

            this.corsiFiltrati = this.corsi;
            this.corsiTrovati = this.corsiFiltrati;

            //this.resetFiltri();

            this.pianoDiStudioService.loadFiltriFromStorage().then(filtro => {
                this.filtro = filtro;

                this.pianoDiStudioService.getMaxAnni().then( value => {
                    this.filtro.setMaxAnni(value);
                    this.updateFiltri();
                });
            });
        });


    }

    ionViewDidEnter() {
        this.isSearchbarOpened = false;
        this.searchKey = '';
    }




    doRefresh(event) {
        this.pianoDiStudioService.getCorsiAggiornati().then( (corsiAggiornati) => {
            if (this.pianoDiStudioService.areCorsiChanged(corsiAggiornati, this.corsi)) {
                console.log('i corsi sono stati aggiornati');

                this.corsi = corsiAggiornati;
                this.updateFiltri();
            }

            event.target.complete();
        }).catch( () => {
            event.target.complete();
        });
    }

    toogleSearchbar() {
        this.isSearchbarOpened = !this.isSearchbarOpened;

        if (this.isSearchbarOpened) {
            setTimeout(() => { this.searchbar.setFocus(); }, 150);
        }

        this.searchKey = '';
        this.search();
    }

    async presentActionSheet(corso: Corso) {
        let actionSheet;

        if (corso.isSuperato()) {
            actionSheet = await this.actionSheetController.create({
                header: corso.DESCRIZIONE,
                buttons: [{
                    text: 'Materiale didattico',
                    icon: 'archive',
                    handler: () => {
                        this.goToMaterialeDidattico(corso);
                    }
                }, {
                    text: 'Dettagli corso',
                    icon: 'alert',
                    handler: () => {
                        this.goToDettagliCorso(corso);
                    }
                }, {
                    text: 'Chiudi',
                    icon: 'close',
                    handler: () => {
                        this.actionSheetController.dismiss().catch();
                    }
                }]
            });
        } else {
            actionSheet = await this.actionSheetController.create({
                header: corso.DESCRIZIONE,
                buttons: [{
                    text: 'Appelli',
                    icon: 'book',
                    handler: () => {
                        this.goToAppelli(corso);
                    }
                }, {
                    text: 'Materiale didattico',
                    icon: 'archive',
                    handler: () => {
                        this.goToMaterialeDidattico(corso);
                    }
                }, {
                    text: 'Dettagli corso',
                    icon: 'alert',
                    handler: () => {
                        this.goToDettagliCorso(corso);
                    }
                }, {
                    text: 'Chiudi',
                    icon: 'close',
                    handler: () => {
                        this.actionSheetController.dismiss().catch();
                    }
                }]
            });
        }

        await actionSheet.present();
    }

    async openFiltri() {
        const modal = await this.modalController.create({
            component: GestoreListaCorsiComponent,
            cssClass: 'gestore-lista-piano-di-studio-css',
            componentProps: {
                'page': this
            }
        });

        return await modal.present();
    }




    /**
     * Questa funzione consente il filtraggio dei corsi del piano di studio.
     * Deve essere richiamata quando viene alterata la schermata dei filtri e ordinamento.
     */
    filtra(): void {
        this.corsiFiltrati = this.filtro.filtra(this.corsi);
    }

    /**
     * Questa funzione consente l'ordinamento dei corsi del piano di studio.
     * Deve essere richiamata quando viene alterata la schermata dei filtri e ordinamento.
     */
    ordina(): void {
        this.corsiOrdinati = this.filtro.ordina(this.corsiFiltrati);
    }

    /**
     * Questa funzione consente la ricerca dei corsi del piano di studio.
     * Deve essere richiamata quando viene alterata la searchbar.
     */
    search(): void {

        if (this.searchKey !== '') {
            const searchKeyLowered = this.searchKey.toLowerCase();
            this.corsiTrovati = this.corsiFiltrati.filter(corso => corso.DESCRIZIONE.toLowerCase().search(searchKeyLowered) >= 0);
        } else {
            this.corsiTrovati = this.corsiFiltrati;
        }
    }

    /**
     * Questa funzione ottimizza le funzioni di filtro ordinamento e ricerca
     * Filtro -> riduce il numero dei corsi per abbattere
     * Ordinamento -> la più lenta, meglio eseguirla in seguito al filtraggio per abbattere la complessità.
     * Search -> questa funzione verrà chiamata spesso. Meglio eseguirla per ultima per evitare di eseguire anche quelle sopra.
     */
    updateFiltri() {
        this.filtra();
        this.ordina();
        this.search();
    }

    /**
     * Questa funzione resetta i filtri e li memorizza nello Storage.
     */
    resetFiltri() {
        this.filtro.reset();
        this.memorizzaFiltri();

        this.updateFiltri();
    }

    /**
     * Questa funzione memorizza i filtri nello Storage.
     */
    memorizzaFiltri() {
        this.pianoDiStudioService.memorizzaFiltri(this.filtro);
    }



    goToDettagliCorso(corso: Corso, ionItemSliding?) {
        if (ionItemSliding) {
            ionItemSliding.close();
        }

        this.globalData.corso = corso;
        this.globalData.goTo(this, '/dettagli-corso', 'forward', false);
    }

    goToAppelli(corso: Corso, ionItemSliding?) {
        if (ionItemSliding) {
            ionItemSliding.close();
        }

        this.globalData.goTo(this, ['/appelli/', corso.AD_ID, corso.DESCRIZIONE], 'forward', false);
    }

    goToMaterialeDidattico(corso: Corso, ionItemSliding?) {
        if (ionItemSliding) {
            ionItemSliding.close();
        }

        this.globalData.goTo(this, ['/materiale-didattico/', corso.AD_ID], 'forward', false);
    }

}
