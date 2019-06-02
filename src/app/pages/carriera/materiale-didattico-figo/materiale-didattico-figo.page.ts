import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalDataService} from '../../../services/global-data.service';
import {MaterialeDidatticoDbService} from '../../../services/materiale-didattico-db-service';
import {ActionSheetController, AlertController, ModalController} from '@ionic/angular';
import {ListaCorsiComponent} from './lista-corsi/lista-corsi.component';
import {PianoDiStudioService} from '../../../services/piano-di-studio.service';
import {Corso} from '../../../models/Corso';
import {Allegato} from '../../../models/Allegato';
import {ToastsService} from '../../../services/toasts.service';

@Component({
    selector: 'app-materiale-didattico-figo',
    templateUrl: './materiale-didattico-figo.page.html',
    styleUrls: ['./materiale-didattico-figo.page.scss'],
})
export class MaterialeDidatticoFigoPage implements OnInit {

    //allegati array
    public allegatiScaricati: Allegato[];
    allegatiScaricatiTrovati: Allegato[];

    //corsi array
    private corsi: Corso[];
    private corsiMap: Map<number, Corso>;

    public MOCK_FILES: Allegato[] = [
        {ALLEGATO_ID: 12, AD_ID: 31305164, AUTORE: 'F.Mercaldo', CLS_ID: 1, COMUNITA_ID: 1, DATA_INS: '1 maggio', FILENAME: 'iannolli.pdf', ESTENSIONE: 'pdf', TESTO: '', TITOLO: '', SCARICATO: true},

        {ALLEGATO_ID: 13, AD_ID: 31309477, AUTORE: 'Fasano', CLS_ID: 1, COMUNITA_ID: 1, DATA_INS: '1 maggio', FILENAME: 'scroKING.zip', ESTENSIONE: 'zip', TESTO: '', TITOLO: '', SCARICATO: true},
        {ALLEGATO_ID: 16, AD_ID: 31309477, AUTORE: 'Fasano', CLS_ID: 1, COMUNITA_ID: 1, DATA_INS: '1 maggio', FILENAME: 'Pesche deuticità.pdf', ESTENSIONE: 'pdf', TESTO: '', TITOLO: '', SCARICATO: true},

        {ALLEGATO_ID: 14, AD_ID: 31305167, AUTORE: 'Tronky', CLS_ID: 1, COMUNITA_ID: 1, DATA_INS: '1 maggio', FILENAME: 'nella Fattispecie.pptx', ESTENSIONE: 'pptx', TESTO: '', TITOLO: '', SCARICATO: true},

        {ALLEGATO_ID: 15, AD_ID: 31307059, AUTORE: 'F.Mercaldo', CLS_ID: 1, COMUNITA_ID: 1, DATA_INS: '1 maggio', FILENAME: 'Giovanni offre.pdf', ESTENSIONE: 'pdf', TESTO: '', TITOLO: '', SCARICATO: true},

        {ALLEGATO_ID: 16, AD_ID: 31309476, AUTORE: 'G.Parato', CLS_ID: 1, COMUNITA_ID: 1, DATA_INS: '1 maggio', FILENAME: 'Contadino_dell_informatica.pdf', ESTENSIONE: 'pdf', TESTO: '', TITOLO: '', SCARICATO: true},
        {ALLEGATO_ID: 18, AD_ID: 31309476, AUTORE: 'G.Parato', CLS_ID: 1, COMUNITA_ID: 1, DATA_INS: '1 maggio', FILENAME: 'nun è chiar.zip', ESTENSIONE: 'zip', TESTO: '', TITOLO: '', SCARICATO: true},
    ];


    //ricerca
    @ViewChild('searchbar') searchbar: any;
    isSearchbarOpened = false;
    searchKey: string;


    constructor(
        public globalData: GlobalDataService,
        public matDidatticoService: MaterialeDidatticoDbService,
        public modalController: ModalController,
        public pianoDiStudioService: PianoDiStudioService,
        public actionSheetController: ActionSheetController,
        public localdb: MaterialeDidatticoDbService,
        public toastsService: ToastsService,
        public alertController: AlertController,
    ) {
        this.searchKey = '';
    }

    ngOnInit() {
        if (this.matDidatticoService.isPiattaformaSupportata()) {
            this.matDidatticoService.getAllegatScaricatiiFromDB().then((allegati) => {
                this.allegatiScaricati = allegati;
                this.search();
            });
        } else {
            this.toastsService.piattaformaNonSupportata();
            this.allegatiScaricati = this.MOCK_FILES;
            this.search();
        }

        this.pianoDiStudioService.getCorsi().then(corsi => {
            this.corsi = corsi;
        });

        this.pianoDiStudioService.getCorsiAsMap().then(corsiMap => {
            this.corsiMap = corsiMap;
        });
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: ListaCorsiComponent,
            componentProps: {
                'corsi': this.corsi
            }
        });

        await modal.present();
    }

    async presentActionSheet(allegato: Allegato) {
        const actionSheet  = await this.actionSheetController.create({
            header: allegato.TITOLO,
            buttons: [{
                text: 'Dettagli file',
                icon: 'information-circle',
                handler: () => { this.goToDettagliFile(allegato); }
            }, {
                text: 'Apri',
                icon: 'easel',
                handler: () => { this.presentAlertConfermaApertura(allegato); }
            }, {
                text: 'Elimina',
                icon: 'trash',
                handler: () => { this.presentAlertConfermaRimozione(allegato).then(); }
            }, {
                text: 'Chiudi',
                icon: 'close',
                handler: () => { this.actionSheetController.dismiss().catch(); }
            }]
        });

        await actionSheet.present();
    }

    async presentAlertConfermaApertura(allegato: Allegato) {
        const alertConfermaRimozione = await this.alertController.create({
            header: 'Apri file',
            message: 'Sei sicuro di\' voler aprire il file?',
            buttons: [
                {
                    text: 'Si',
                    handler: () => {
                        this.localdb.apriFile(allegato);
                    }
                },
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => { }
                }
            ]
        });

        await alertConfermaRimozione.present();
    }

    async presentAlertConfermaRimozione(allegato: Allegato) {
        const alertConfermaRimozione = await this.alertController.create({
            header: 'Rimozione file',
            message: 'Sei sicuro di\ voler eliminare il file sul dispositivo?',
            buttons: [
                {
                    text: 'Si',
                    handler: () => {
                        this.localdb.eliminaFile(allegato);
                        this.doRefresh(null);
                    }
                },
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => { }
                }
            ]
        });

        await alertConfermaRimozione.present();
    }




    goToDettagliFile(item) {
        this.globalData.allegato = item;

        this.globalData.goTo('/materiale-didattico', '/allegato', 'forward', false);
    }



    doRefresh(event) {
        if (this.matDidatticoService.isPiattaformaSupportata()) {
            this.localdb.getAllegatScaricatiiFromDB().then( (allegatiAggiornati) => {
                this.allegatiScaricati = allegatiAggiornati;
                this.search();
            });
        } else {
            setTimeout(() => {
                if (event) {
                    event.target.complete();
                }
            }, 2000);
            this.toastsService.piattaformaNonSupportata();
        }
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

    search() {
        if (this.searchKey !== '') {
            const searchKeyLowered = this.searchKey.toLowerCase();
            this.allegatiScaricatiTrovati = this.allegatiScaricati.filter(allegato => allegato.FILENAME.toLowerCase().search(searchKeyLowered) >= 0);
        } else {
            this.allegatiScaricatiTrovati = this.allegatiScaricati;
        }
    }
}
