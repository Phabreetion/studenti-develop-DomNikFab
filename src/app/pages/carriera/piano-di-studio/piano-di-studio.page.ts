import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../../services/global-data.service';
import {ActionSheetController, ModalController, ToastController} from '@ionic/angular';
import {GestoreListaCorsiComponent} from './gestore-lista-corsi/gestore-lista-corsi.component';
import {PianoDiStudioService} from '../../../services/piano-di-studio.service';
import {Corso} from '../../../models/Corso';
import {FiltroPianoDiStudio} from '../../../models/FiltroPianoDiStudio';
import {SyncService} from '../../../services/sync.service';
import {HttpService} from '../../../services/http.service';
import {AccountService} from '../../../services/account.service';


const ORDINAMENTO_ALFABETICO_CRESCENTE = 0;
const ORDINAMENTO_ALFABETICO_DECRESCENTE = 1;
const ORDINAMENTO_ANNO_CRESCENTE = 2;
const ORDINAMENTO_ANNO_DECRESCENTE = 3;
const ORDINAMENTO_CFU_CRESCENTE = 4;
const ORDINAMENTO_CFU_DECRESCENTE = 5;
const ORDINAMENTO_VOTO_CRESCENTE = 6;
const ORDINAMENTO_VOTO_DECRESCENTE = 7;

const PAGE_URL = '/piano-di-studio';

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


    //Aggiornamento
    idServizio = 112;
    loading: any;
    dataAggiornamento: string;
    aggiornamentoVerificato = false;
    rinvioAggiornamento = false;
    nrRinvii = 0;
    maxNrRinvii = 5;


    constructor(public globalData: GlobalDataService,
                private modalController: ModalController,
                private actionSheetController: ActionSheetController,
                private pianoDiStudioService: PianoDiStudioService,
                public sync: SyncService,
                public http: HttpService,
                public toastCtrl: ToastController,
                public account: AccountService) {
        this.filtro = new FiltroPianoDiStudio();
        this.searchKey = '';
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




        this.account.controllaAccount().then(
            (ok) => {
                this.http.getConnected();
                this.aggiorna(false, true);
            }, (err) => {
                this.globalData.goTo(PAGE_URL, '/login', 'root', false);
            }
        );
    }


    aggiorna(interattivo: boolean, sync: boolean) {
        if (this.sync.loading[this.idServizio]) {
            this.rinvioAggiornamento = true;
            this.dataAggiornamento = 'in corso';
            this.nrRinvii++;

            // console.log('Rinvio ' + this.nrRinvii);

            if (this.nrRinvii < this.maxNrRinvii) {
                setTimeout(() => {
                    this.aggiorna(interattivo, sync);
                }, 2000);
                return;
            } else {
                if (this.http.connessioneLenta) {
                    this.toastCtrl.create({
                        message: 'La connessione è assente o troppo lenta. Riprova ad aggiornare i dati più tardi.',
                        duration: 3000,
                        position: 'bottom'
                    }).then((toast) => {
                        toast.present();
                    }, (toastErr) => {
                        GlobalDataService.log(2, 'Toast fallito!', toastErr);
                    });
                }
            }
        }
        this.rinvioAggiornamento = false;

        this.sync.getJson(this.idServizio, null, true).then(
            (data) => {
                if (this.sync.dataIsChanged(this.corsi, data[0])) {
                    //this.libretto = data[0];
                    //this.caricaAnni();
                    setTimeout(() => {
                        this.controllaAggiornamento();
                    }, 1000);
                }
                this.dataAggiornamento = SyncService.dataAggiornamento(data);
            },
            (err) => {
            }).catch(err => {
            }
        );

    }


    controllaAggiornamento() {
        // La verifica dell'aggiornamento in background la facciamo solo una volta
        if (this.aggiornamentoVerificato) {
            return;
        }

        // Se stiamo caricando dati dal server rimandiamo la verifica
        if (this.sync.loading[this.idServizio]) {
            setTimeout(() => {
                this.controllaAggiornamento();
            }, 1000);
        } else {
            this.aggiornamentoVerificato = true;
            this.aggiorna(false, false);
        }
    }

    isLoading() {
        return this.sync.loading[this.idServizio];
    }


    doRefresh(event) {
        this.sync.getJson(this.idServizio, null, true).then((data) => {
            if (this.sync.dataIsChanged(this.corsi, data[0])) {
                //this.libretto = data[0];
                //this.caricaAnni();
                setTimeout(() => {
                    this.controllaAggiornamento();
                }, 1000);
            }
            this.dataAggiornamento = SyncService.dataAggiornamento(data);
            event.target.complete();
        });
    }

    ordina(): void {
        //il primo ordinamento viene eseguito per crescente crescente
        switch (this.filtro.idOrdinamento + this.filtro.tipoOrdinamento) {
            case ORDINAMENTO_ALFABETICO_CRESCENTE: //alfabetico crescente
                this.corsiFiltrati.sort(
                    (one, two) => {
                        //effettuo l'ordinamento sulle stringhe no case sensitive
                        if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                            return 1;
                        }

                        if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                            return -1;
                        }
                        //se i nomi sono uguali(molto improbabile) non si gestiscono le collisioni
                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_ALFABETICO_DECRESCENTE: //alfabetico decrescente
                this.corsiFiltrati.sort(
                    (one, two) => {
                        //effettuo l'ordinamento sulle stringhe no case sensitive
                        if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                            return 1;
                        }

                        if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                            return -1;
                        }
                        //se i nomi sono uguali non gestisco le collisioni
                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_ANNO_CRESCENTE: //anno crescente
                this.corsiFiltrati.sort(
                    (one, two) => {
                        if (one.ANNO - two.ANNO !== 0) {
                            return one.ANNO - two.ANNO;
                        }

                        //gestiso le collisioni sui corsi con stesso anno
                        //alfabetico
                        if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                            return 1;
                        }

                        if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                            return -1;
                        }

                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_ANNO_DECRESCENTE: //anno crescente
                this.corsiFiltrati.sort(
                    (one, two) => {
                        if (two.ANNO - one.ANNO !== 0) {
                            return two.ANNO - one.ANNO;
                        }

                        //gestiso le collisioni sui corsi con stesso anno
                        //alfabetico
                        if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                            return 1;
                        }

                        if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                            return -1;
                        }

                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_CFU_CRESCENTE: //CFU crescente
                this.corsiFiltrati.sort(
                    (one, two) => {
                        if (one.CFU - two.CFU !== 0) {
                            return one.CFU - two.CFU;
                        }

                        //gestiso le collisioni sui corsi con stesso anno
                        //alfabetico
                        if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                            return 1;
                        }

                        if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                            return -1;
                        }

                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_CFU_DECRESCENTE: //CFU crescente
                this.corsiFiltrati.sort(
                    (one, two) => {
                        if (two.CFU - one.CFU !== 0) {
                            return two.CFU - one.CFU;
                        }

                        //gestiso le collisioni sui corsi con stesso anno
                        //alfabetico
                        if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                            return 1;
                        }

                        if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                            return -1;
                        }

                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_VOTO_CRESCENTE: //voto crescente
                this.corsiFiltrati.sort((one, two) => {
                    if (!one.isSuperato() && two.isSuperato()) {
                        return -1;
                    }

                    if (one.isSuperato() && !two.isSuperato()) {
                        return 1;
                    }

                    if (one.VOTO < two.VOTO) {
                        return -1;
                    }
                    if (one.VOTO > two.VOTO) {
                        return 1;
                    }

                    //gestiso le collisioni sui corsi con stesso voto
                    //alfabetico
                    if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                        return 1;
                    }

                    if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                        return -1;
                    }
                });
                break;

            case ORDINAMENTO_VOTO_DECRESCENTE: //voto crescente
                this.corsiFiltrati.sort((one, two) => {
                    if (one.isSuperato() && !two.isSuperato()) {
                        return -1;
                    }

                    if (!one.isSuperato() && two.isSuperato()) {
                        return 1;
                    }

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

                    if (one.VOTO === two.VOTO && one.LODE === two.LODE) {
                        return 1;
                    }
                    if (one.VOTO === two.VOTO && one.LODE === two.LODE) {
                        return -1;
                    }


                    //gestiso le collisioni sui corsi con stesso voto
                    //alfabetico
                    if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                        return 1;
                    }

                    if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                        return -1;
                    }
                });
                break;
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

        if (this.filtro.filtroPerAnno > 0) {
            // tslint:disable-next-line:triple-equals
            this.corsiFiltrati = this.corsiFiltrati.filter(corso => corso.ANNO == this.filtro.filtroPerAnno);
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
                        this.actionSheetController.dismiss();
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
                        this.actionSheetController.dismiss();
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

    public updateFiltri() {
        this.corsiFiltrati = this.corsi;
        this.filtra();
        this.ordina();
        this.search();

        //update anno
        //@todo ottimizzare, in questo posto rischia di essere eseguito troppe volte
        let maxAnni = 0;
        this.corsiTrovati.forEach(
            corso => {
                if(maxAnni<corso.ANNO) {
                    maxAnni = corso.ANNO;
                }
            }
        );
        this.filtro.setMaxAnni(maxAnni);

        console.log(this.filtro.maxAnni);
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
        this.filtro.reset();

        this.updateFiltri();
    }

    toogleSearchbar() {
        this.isSearchbarOpened = !this.isSearchbarOpened;
        this.searchKey = '';
        this.search();
    }
}
