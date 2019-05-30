import {Component, OnInit, ViewChild} from '@angular/core';
import {LoadingController, ToastController, AlertController, ModalController, ActionSheetController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {AccountService} from '../../../services/account.service';
import {HttpService} from '../../../services/http.service';
import {GestoreListaAppelliDisponbiliComponent} from './gestore-lista-appelli-disponbili/gestore-lista-appelli-disponbili.component';
import {PianoDiStudioService} from '../../../services/piano-di-studio.service';
import {Corso} from '../../../models/Corso';
import {AppelloDisponibile} from '../../../models/AppelloDisponibile';
import {FiltroAppelliDisponibili} from '../../../models/FiltroAppelliDisponibili';
import {AppelliService} from '../../../services/appelli.service';
import {ToastsService} from '../../../services/toasts.service';
import {AppelloPrenotato} from '../../../models/AppelloPrenotato';

const PAGE_URL = '/appelli';

@Component({
    selector: 'app-page-appelli',
    templateUrl: 'appelli.page.html',
    styleUrls: ['./appelli.page.scss'],
})

export class AppelliPage implements OnInit {


    //verrà passato nella query string per determinare quali appelli visualizzare
    //se 0 visualizza tutti
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
                public modalController: ModalController,
                public actionSheetController: ActionSheetController,
                public pianoDiStudioService: PianoDiStudioService,
                public appelliService: AppelliService) {
        this.filtro = new FiltroAppelliDisponibili();
    }

    ngOnInit() {
        //controllo l'account, se non verificato rimanda alla pagina di login
        this.account.controllaAccount().then(
            () => {
                this.http.getConnected();
            },
            () => {
                this.globalData.goTo(PAGE_URL, '/login', 'root', false);
            }
        );

        this.isSearchbarOpened = false;
        this.searchKey = '';
        this.sezioni = 'disponibili';

        this.ad_id_insegnamento = Number(this.route.snapshot.paramMap.get('id'));

        this.pianoDiStudioService.getCorsiAsMap().then((corsiMap) => {
            this.corsiMap = corsiMap;

            this.appelliService.getAppelliDisponibili().then((appelli) => {
                this.appelli = appelli;

                if (this.ad_id_insegnamento != 0) {
                    this.appelliTrovati = this.appelli.filter((appello) => appello.ad_id == this.ad_id_insegnamento);
                } else {
                    //carico i filtri dallo storage ed eseguo il filtraggio.
                    this.appelliService.loadFiltriFromStorage().then((filtro) => {
                        this.filtro = filtro;

                        this.pianoDiStudioService.getMaxAnni().then(value => {
                            this.filtro.setMaxAnni(value);
                            this.updateFiltri();
                        });
                    });
                }
            });
        });

        
        this.appelliService.getAppelliPrenotati().then((prentazioni) => {
            this.prenotazioni = prentazioni;
        });
    }

    ionViewDidEnter() {
        this.sezioni = 'disponibili';
        this.isSearchbarOpened = false;
        this.searchKey = '';

        if (this.ad_id_insegnamento != 0) {
            this.appelliTrovati = this.appelli.filter((appello) => appello.ad_id == this.ad_id_insegnamento);
        } /*else {
            this.appelliService.loadFiltriFromStorage().then(
                filtro => {
                    this.filtro = filtro;

                    this.pianoDiStudioService.getMaxAnni().then(
                        value => {
                            this.filtro.setMaxAnni(value);
                            this.updateFiltri();
                        });
                }
            );
        }*/
        /*
        const corsiMapPromise = this.pianoDiStudioService.getCorsiAsMap();
        const appelliDisponibiliPromise = this.appelliService.getAppelliDisponibili();
        const appelliPrenotatiPromise = this.appelliService.getAppelliPrenotati();

        Promise.all([appelliDisponibiliPromise, appelliPrenotatiPromise, corsiMapPromise]).then(
            (data) => {
                this.appelli = data[0];
                this.prenotazioni = data[1];
                this.corsiMap = data[2];

                 else {
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
                            console.log('fine promise ion view1');
                        }
                    );
                    console.log('fine promise ion view2');
                }
                console.log('fine promise ion view3');
            }
        );*/
    }


    doRefresh(event) {
        this.appelliService.getAppelliDisponibiliAggiornati().then((appelliDisponibiliAggiornati) => {
            this.appelli = appelliDisponibiliAggiornati;

            this.updateFiltri();

            if (event) {
                event.target.complete();
            }
        }).catch(() => {
            if (event) {
                event.target.complete();
            }
        });

        this.appelliService.getAppelliPrenotatiAggiornati().then((appelliPrenotatiAggiornati) => {
            if (this.appelliService.areAppelliChanged(appelliPrenotatiAggiornati, this.prenotazioni)) {
                console.log('appelli prenotati aggiornati');
                this.prenotazioni = appelliPrenotatiAggiornati;
            }

            if (event) {
                event.target.complete();
            }
        }).catch(() => {
            if (event) {
                event.target.complete();
            }
        });

    }

    toogleSearchbar() {
        this.isSearchbarOpened = !this.isSearchbarOpened;

        if (this.isSearchbarOpened) {
            setTimeout(() => {
                this.searchbar.setFocus();
            }, 150);
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
        if (this.searchKey !== '') {
            const searchKeyLowered = this.searchKey.toLowerCase();
            this.appelliTrovati = this.appelliTrovati.filter(appello => appello.descrizione.toLowerCase().search(searchKeyLowered) >= 0);
        } else {
            this.appelliTrovati = this.appelliFiltrati;
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

    memorizzaFiltri() {
        this.appelliService.memorizzaFiltri(this.filtro);
    }

    resetFiltri() {
        this.filtro.reset();
        this.memorizzaFiltri();

        this.updateFiltri();
    }


    async prenotaAppello(itemSliding, appello: AppelloDisponibile) {
        itemSliding.close();

        if (!appello.isPrenotabile()) {
            if (appello.isBeforeApertura()) {
                this.toastService.appelloNonAncoraPrenotabile(appello.giorniRimanentiPrimaDellApertura());
            } else if (appello.isAfterChiusura()) {
                this.toastService.appelloScaduto(appello.giorniPassatiDopoLaChiusura());
            }
        } else {
            let message = '';

            //message += (await this.pianoDiStudioService.hasTutteLePropedeuticitaSuperate(appello.ad_id, this.corsiMap)) ? '' : ' N.B. Non potrai verbalizzare questo esame finché non avrai verbalizzato tutte le propedeuticità';
            const nonSup = await this.pianoDiStudioService.getPropedeuticitaNonSuperate(appello.ad_id, this.corsiMap);
            if (nonSup.length === 1) {
                message += 'L\'esame non sarà verbalizzato fino a che non avrai superato l\'esame di ' + nonSup[0].DESCRIZIONE;
            } else {
                for (let i = 0; i < nonSup.length; i++) {
                    if (i == 0) {
                        message += 'L\'esame non sarà verbalizzato fino a che non avrai superato i seguenti esami propedeutici:\n';
                    }

                    message += '•&nbsp' + nonSup[i].DESCRIZIONE + '\n';
                }
            }

            this.alertCtrl.create({
                header: 'Prenotazione',
                subHeader: 'Vuoi prenotarti all\'appello di ' + appello.descrizione + ' ?',
                message: message,
                buttons: [
                    {
                        text: 'No',
                        handler: () => {
                        }
                    },
                    {
                        text: 'Si',
                        handler: () => {
                            this.loadingCtrl.create().then(loading => {
                                loading.present();

                                this.appelliService.prenotaAppello(appello).then(() => {
                                    loading.dismiss();
                                    this.toastService.prenotazioneEffettuataConSuccesso();

                                    this.doRefresh(null);
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
                subHeader: 'Vuoi cancellare la prenotazione all\'appello di ' + prenotazione.ad_des + ' ?',
                message: 'Ricorda che se la finestra per la prenotazione è chiusa non sarà più possibile prenotarsi all\'appello!',
                buttons: [
                    {
                        text: 'No',
                        handler: () => {
                        }
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
                                    this.doRefresh(null);
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
        if (!this.appelliTrovati) {
            return '';
        }

        return this.appelliTrovati.length > 0 ? '(' + this.appelliTrovati.length + ')' : '';
    }

    getNumPrenotazioniAsString(): string {
        if (!this.prenotazioni) {
            return '';
        }

        return this.prenotazioni.length > 0 ? '(' + this.prenotazioni.length + ')' : '';
    }


    goToDettagliCorso(appello: AppelloDisponibile) {
        this.globalData.corso = this.corsiMap.get(appello.ad_id);
        this.globalData.goTo(this, '/dettagli-corso', 'forward', false);
    }

    goToMaterialeDidattico(appello: AppelloDisponibile) {
        this.globalData.goTo(this, ['/materiale-didattico/', appello.ad_id], 'forward', false);
    }

    async presentActionSheet(appello: AppelloDisponibile) {
        const actionSheet = await this.actionSheetController.create({
            header: appello.descrizione,
            buttons: [
                {
                    text: 'Dettagli corso',
                    icon: 'alert',
                    handler: () => {
                        this.goToDettagliCorso(appello);
                    }
                }, {
                    text: 'Materiale didattico',
                    icon: 'archive',
                    handler: () => {
                        this.goToMaterialeDidattico(appello);
                    }
                }, {
                    text: 'Chiudi',
                    icon: 'close',
                    handler: () => {
                        this.actionSheetController.dismiss().catch();
                    }
                }]
        });

        await actionSheet.present();
    }
}
