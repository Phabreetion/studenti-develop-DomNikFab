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
    public allegatiScaricati: Array<any>;
    allegatiScaricatiTrovati: Array<any>;

    //corsi array
    private corsi: Corso[];
    private corsiMap: Map<number, Corso>;

    public MOCK_FILES = [
        {id: 12, ad_id_corso: 31305164, filename: 'iannolli.pdf', estensione: 'pdf'},
        {id: 13, ad_id_corso: 31309477, filename: 'scroKING.zip', estensione: 'zip'},
        {id: 14, ad_id_corso: 31305167, filename: 'nella Fattispecie.pptx', estensione: 'pptx'},
        {id: 15, ad_id_corso: 31307059, filename: 'Giovanni offre.pdf', estensione: 'pdf'},
        {id: 16, ad_id_corso: 31309477, filename: 'Pesche deuticità.pdf', estensione: 'pdf'},
        {id: 16, ad_id_corso: 31309476, filename: 'Contadino_dell_informatica.pdf', estensione: 'pdf'},
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
            this.matDidatticoService.getTuttiAllegatiScaricatiFromDB().then((allegati) => {
                this.allegatiScaricati = allegati;
                this.search();
            });
        } else {
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
            this.allegatiScaricatiTrovati = this.allegatiScaricati.filter(allegato => allegato.filename.toLowerCase().search(searchKeyLowered) >= 0);
        } else {
            this.allegatiScaricatiTrovati = this.allegatiScaricati;
        }
    }

    async presentActionSheet(allegato: Allegato) {
        let actionSheet;
        if (allegato.scaricato) {
            actionSheet = await this.actionSheetController.create({
                header: allegato.TITOLO,
                buttons: [{
                    text: 'Dettagli file',
                    icon: 'information-circle',
                    handler: () => {
                        this.goToDettagliFile(allegato);
                    }
                }, {
                    text: 'Apri',
                    icon: 'easel',
                    handler: () => {
                        this.apriFile(allegato);
                    }
                }, {
                    text: 'Elimina',
                    icon: 'trash',
                    handler: () => {
                        this.rimuoviFile(allegato).then();
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
                header: allegato.TITOLO,
                buttons: [{
                    text: 'Dettagli file',
                    icon: 'information-circle',
                    handler: () => {
                        this.goToDettagliFile(allegato);
                    }
                }, {
                    text: 'Download',
                    icon: 'download',
                    handler: () => {
                        this.download(allegato);
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

    apriFile(item) {
        if (this.localdb.isPiattaformaSupportata()) {

            this.localdb.isAllegatoScaricato(item).then(
                () => this.localdb.apriFile(item),
                () => this.presentAlertConfermaDownload(item)
            );
        } else {
            this.toastsService.piattaformaNonSupportata();
        }
    }

    async rimuoviFile(item) {
        if (this.localdb.isPiattaformaSupportata()) {
            await this.localdb.isAllegatoScaricato(item).then(
                () => this.presentAlertConfermaRimozione(item),
                () => this.toastsService.fileNonScaricato()
            );
        } else {
            this.toastsService.piattaformaNonSupportata();
        }
    }

    goToDettagliFile(item) {
        this.globalData.allegato = item;

        this.globalData.goTo('/materiale-didattico', '/allegato', 'forward', false);
    }

    download(item) {
        this.localdb.download(item);
    }

    async presentAlertConfermaDownload(item) {
        const alertConfermaRimozione = await this.alertController.create({
            header: 'Download file',
            message: 'Sei sicuro di\' voler scaricare il file sul dispositivo?',
            buttons: [
                {
                    text: 'Si',
                    handler: () => {
                        this.download(item);

                    }
                },
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });

        await alertConfermaRimozione.present();
    }


    async presentAlertConfermaRimozione(item) {
        const alertConfermaRimozione = await this.alertController.create({
            header: 'Rimozione file',
            message: 'Sei sicuro di\ voler eliminare il file sul dispositivo?',
            buttons: [
                {
                    text: 'Si',
                    handler: () => {
                        this.localdb.eliminaFile(item);
                    }
                },
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });

        await alertConfermaRimozione.present();
    }

    selezionaIcona(item) {
        const estensione: string = item.estensione.toLowerCase();
        let nomeIcona = '';
        switch (estensione) {
            case 'pdf':
                nomeIcona = 'pdf1';
                break;
            case 'zip':
                nomeIcona = 'zip';
                break;
            case 'doc':
                nomeIcona = 'doc';
                break;
            case 'docx':
                nomeIcona = 'doc';
                break;
            case 'xls':
                nomeIcona = 'xls';
                break;
            case 'xlsx':
                nomeIcona = 'xls';
                break;
            case 'ppt':
                nomeIcona = 'ppt';
                break;
            case 'pptx':
                nomeIcona = 'ppt';
                break;
            default:
                nomeIcona = 'file1';
                break;
        }

        return nomeIcona;
    }
}
