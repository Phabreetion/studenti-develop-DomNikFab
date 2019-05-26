import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {LoadingController, ToastController, AlertController, ModalController, ActionSheetController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {AccountService} from '../../../services/account.service';
import {Esse3Service} from '../../../services/esse3.service';
import {HttpService} from '../../../services/http.service';
import {GestoreListaAppelliDisponbiliComponent} from './gestore-lista-appelli-disponbili/gestore-lista-appelli-disponbili.component';
import {PianoDiStudioService} from '../../../services/piano-di-studio.service';
import {Corso} from '../../../models/Corso';
import {AppelloDisponibile} from '../../../models/AppelloDisponibile';
import {FiltroAppelliDisponibili} from '../../../models/FiltroAppelliDisponibili';
import {AppelliService} from '../../../services/appelli.service';
import {ToastsService} from '../../../services/toasts.service';
import {AppelloPrenotato} from '../../../models/AppelloPrenotato';
import {Appello} from '../../../models/Appello';

const PAGE_URL = '/appelli';

@Component({
    selector: 'app-page-appelli',
    templateUrl: 'appelli.html',

})

export class AppelliPage implements OnInit {


    //verrà passato nella query string
    ad_id_insegnamento: number;

    //sezione in cui si ci trova
    sezioni: string; //'disponibili' o 'prenotati'

    //appelli array
    appelli: AppelloDisponibile[];
    appelliOrdinati: AppelloDisponibile[];
    appelliTrovati: AppelloDisponibile[];
    appelliFiltrati: AppelloDisponibile[];

    //prenotazioni array
    prenotazioni: AppelloPrenotato[];

    //corsi array
    corsiMap: Map<number, Corso>;

    //per filtri e ordinamento
    filtro: FiltroAppelliDisponibili;

    //ricerca
    @ViewChild('searchbar') searchbar: any;
    isSearchbarOpened = false;
    searchKey: string;


    constructor(public route: ActivatedRoute,
                public sync: SyncService,
                public http: HttpService,
                public toastCtrl: ToastController,
                public toastService: ToastsService,
                public alertCtrl: AlertController,
                public loadingCtrl: LoadingController,
                public globalData: GlobalDataService,
                public account: AccountService,
                public esse3: Esse3Service,
                public modalController: ModalController,
                public pianoDiStudioService: PianoDiStudioService,
                public appelliService: AppelliService) {
        this.sezioni = 'disponibili';
        this.searchKey = '';
        this.filtro = new FiltroAppelliDisponibili();
    }

    async ngOnInit() {
        //controllo l'account, se non verificato rimanda alla pagina di login
        this.account.controllaAccount().then(
            () => {this.http.getConnected(); },
            () => {this.globalData.goTo(PAGE_URL, '/login', 'root', false); }
        );

        this.ad_id_insegnamento = Number(this.route.snapshot.paramMap.get('id'));

        const corsiMapPromise = this.pianoDiStudioService.getCorsiAsMap();
        const appelliDisponibiliPromise = this.appelliService.getAppelliDisponibili();
        const appelliPrenotatiPromise = this.appelliService.getAppelliPrenotati();

        Promise.all([appelliDisponibiliPromise, appelliPrenotatiPromise, corsiMapPromise]).then(
            (data) => {
                this.appelli = data[0];
                this.prenotazioni = data[1];
                this.corsiMap = data[2];

                if ( this.ad_id_insegnamento != 0 ) {
                    this.appelli = this.appelli.filter((appello) => appello.ad_id == this.ad_id_insegnamento);
                }

                //carico i filtri dallo storage ed eseguo il filtraggio.
                this.appelliService.loadFiltriFromStorage().then(
                    filtro => {
                        this.filtro = filtro;

                        this.pianoDiStudioService.getMaxAnni().then(
                            value => {
                                this.filtro.setMaxAnni(value);
                                this.updateFiltri();
                            }
                        );
                    }
                );
            }
        );
    }

    ionViewDidEnter() {
        this.sezioni = 'disponibili';
        this.isSearchbarOpened = false;
        this.searchKey = '';

        const corsiMapPromise = this.pianoDiStudioService.getCorsiAsMap();
        const appelliDisponibiliPromise = this.appelliService.getAppelliDisponibili();
        const appelliPrenotatiPromise = this.appelliService.getAppelliPrenotati();

        Promise.all([appelliDisponibiliPromise, appelliPrenotatiPromise, corsiMapPromise]).then(
            (data) => {
                this.appelli = data[0];
                this.prenotazioni = data[1];
                this.corsiMap = data[2];

                if (this.ad_id_insegnamento != 0 ) {
                    this.appelli = this.appelli.filter((appello) => appello.ad_id == this.ad_id_insegnamento);
                }

                //carico i filtri dallo storage ed eseguo il filtraggio.
                this.appelliService.loadFiltriFromStorage().then(
                    filtro => {
                        this.filtro = filtro;

                        this.pianoDiStudioService.getMaxAnni().then(
                            value => {
                                this.filtro.setMaxAnni(value);
                                this.updateFiltri();
                            }
                        );
                    }
                );
            }
        );
    }




    doRefresh(event) {
        if (this.sezioni === 'disponibili') {
            this.appelliService.getAppelliDisponibiliAggiornati().then((appelliDisponibiliAggiornati) => {

                this.appelli = appelliDisponibiliAggiornati;

                if (this.ad_id_insegnamento != 0) {
                    this.appelli = this.appelli.filter((appello) => appello.ad_id === this.ad_id_insegnamento );
                }

                this.updateFiltri();
                event.target.complete();

            }).catch((err) => {
                console.log(err);
                event.target.complete();
            });
        }

        if (this.sezioni === 'prenotati') {
            this.appelliService.getAppelliPrenotatiAggiornati().then((appelliPrenotatiAggiornati) => {
                if (this.appelliService.areAppelliChanged(appelliPrenotatiAggiornati, this.prenotazioni)) {
                    console.log('appelli prenotati aggiornati');
                    this.prenotazioni = appelliPrenotatiAggiornati;
                }
                event.target.complete();
            }).catch((err) => {
                console.log(err);
                event.target.complete();
            });
        }

    }

    toogleSearchbar() {
        this.isSearchbarOpened = !this.isSearchbarOpened;

        if (this.isSearchbarOpened) {
            setTimeout(() => { this.searchbar.setFocus(); }, 150);
        }

        this.searchKey = '';
        this.search();
    }

    gestioneSearchbarAppelli() {

        if (this.sezioni !== 'disponibili' && this.isSearchbarOpened == true) {
            this.isSearchbarOpened = false;
            return false;
        }

        return true;
    }

    mostraIcone() {
        return this.sezioni == 'disponibili' && this.appelli && this.appelli.length !== 0 && this.ad_id_insegnamento === 0;
    }

    async openFiltri() {
        const modal = await this.modalController.create({
            component: GestoreListaAppelliDisponbiliComponent,
            cssClass: 'gestore-lista-appelli-disponibili-css',
            componentProps: {
                'page': this
            }
        });

        return await modal.present();
    }


    filtra() {
     this.appelliFiltrati = this.filtro.filtra(this.appelli, this.corsiMap);
    }

    ordina() {
        this.appelliOrdinati = this.filtro.ordina(this.appelliFiltrati, this.corsiMap);
    }

    /**
     * Questa funzione consente la ricerca degli appelli.
     * Deve essere richiamata quando viene alterata la searchbar.
     */
    search() {
        const searchKeyLowered = this.searchKey.toLowerCase();
        this.appelliTrovati = this.appelliFiltrati.filter(appello => appello.descrizione.toLowerCase().search(searchKeyLowered) >= 0);
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

    memorizzaFiltri() {
        this.appelliService.memorizzaFiltri(this.filtro);
    }

    resetFiltri() {
        this.filtro.reset();
        this.memorizzaFiltri();
        this.updateFiltri();

    }


    prenotaAppello(itemSliding, appello: AppelloDisponibile) {
        itemSliding.close();

        if (!appello.isPrenotabile()) {
            if (appello.isBeforeApertura()) {
                this.toastService.appelloNonAncoraPrenotabile(appello.giorniRimanentiPrimaDellApertura());
            } else if (appello.isAfterChiusura()) {
                this.toastService.appelloScaduto(appello.giorniPassatiDopoLaChiusura());
            }
        } else {
            this.alertCtrl.create({
                header: 'Prenotazione',
                subHeader: 'Vuoi prenotarti all\'appello ' + appello.descrizione + ' ?',
                message: 'La richiesta di prenotazione sarà inviata al portale dello studente.',
                buttons: [
                    {
                        text: 'No',
                        handler: () => {}
                    },
                    {
                        text: 'Si',
                        handler: () => {
                            this.loadingCtrl.create().then(loading => {
                                loading.present();

                                this.appelliService.prenotaAppello(appello).then(() => {
                                    loading.dismiss();
                                    this.toastService.prenotazioneEffettuataConSuccesso();

                                    //TODO - forzare aggiornamento dati e rimandare a tab prenotati
                                }, () => {
                                    this.toastService.prenotazioneFallita();

                                    loading.dismiss();
                                });
                            });
                        }
                    }
                ]
            }).then(alert => alert.present());
        }
    }

    cancellaPrenotazione(itemSliding, prenotazione: AppelloPrenotato) {
        itemSliding.close();

        if (!prenotazione.isCancellabile()) {
            this.toastService.annullamentoNonPiuPossibile();
        } else {
            this.alertCtrl.create({
                header: 'Prenotazione',
                subHeader: 'Vuoi cancellare la prenotazione di ' + prenotazione.ad_des + ' ?',
                message: 'Ricorda che se la finestra per la prenotazione è chiusa non sarà più possibile prenotarsi all\'appello!',
                buttons: [
                    {
                        text: 'No',
                        handler: () => {}
                    },
                    {
                        text: 'Si',
                        handler: () => {
                            this.loadingCtrl.create().then(loading => {

                                loading.present();

                                this.appelliService.cancellaPrenotazione(prenotazione).then(() => {
                                    loading.dismiss();
                                    this.toastService.prenotazioneAnnullataConSuccesso();
                                    //forzare aggiornamento
                                }, () => {
                                    this.toastService.annullamentoFallito();
                                    loading.dismiss();
                                });
                            });
                        }
                    }

                ]
            }).then(alert => alert.present());
        }
    }








    getNumAppelliDisponibiliAsString(): string {
        if (!this.appelli) {
            return '';
        }

        return this.appelli.length > 0 ? '(' + this.appelli.length + ')' : '';
    }

    getNumPrenotazioniAsString(): string {
        if (!this.prenotazioni) {
            return '';
        }

        return this.prenotazioni.length > 0 ? '(' + this.prenotazioni.length + ')' : '';
    }




    goToDettagliCorso(appello: AppelloDisponibile) {
        this.globalData.goTo(this, ['/esame/', appello.ad_id], 'forward', false);
    }

    goToMaterialeDidattico(appello: AppelloDisponibile) {
        this.globalData.goTo(this, ['/materiale-didattico/', appello.ad_id], 'forward', false);
    }

}
