import {Component, OnInit, ViewChild} from '@angular/core';
import {
    ActionSheetController, AlertController,
    Platform, ToastController
} from '@ionic/angular';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {MaterialeDidatticoDbService} from '../../../services/materiale-didattico-db-service';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '../../../services/account.service';
import {HttpService} from '../../../services/http.service';
import {ToastsService} from '../../../services/toasts.service';
import {Allegato} from '../../../models/Allegato';

@Component({
    selector: 'app-materiale-didattico',
    templateUrl: 'materiale-didattico.page.html',
    styleUrls: ['./materiale-didattico.page.scss'],

})

export class MaterialeDidatticoPage implements OnInit {

    //parametro passato dalla query string
    ad_id_corso: string;


    //allegati
    allegati: Allegato[];
    allegatiFiltrati: Allegato[];
    allegatiTrovati: Allegato[];


    //ricerca
    @ViewChild('searchbar') searchbar: any;
    isSearchbarOpened = false;
    searchKey: string;

    constructor(
        private toastCtrl: ToastController,
        public route: ActivatedRoute,
        public alertController: AlertController,
        public sync: SyncService,
        public http: HttpService,
        public globalData: GlobalDataService,
        public actionSheetController: ActionSheetController,
        public localdb: MaterialeDidatticoDbService,
        public toastsService: ToastsService,
        public account: AccountService,
        public platform: Platform) {
        this.searchKey = '';
    }

    ngOnInit() {
        this.http.checkConnection();


        this.ad_id_corso = this.route.snapshot.paramMap.get('id');

        this.localdb.getAllegatiJson().then(allegati => {
            this.allegati = allegati;
            console.log(this.allegati);

            this.allegatiFiltrati = [];
            this.allegati.forEach(allegato => {
                if (allegato.AD_ID == Number(this.ad_id_corso)) {
                    this.allegatiFiltrati.push(allegato);
                }
            });

            this.allegati.forEach(file => {
                this.localdb.isAllegatoScaricato(file).then(
                    () => {
                        file.scaricato = true;
                    },
                    () => {
                        file.scaricato = false;
                    }
                );
            });

            //ordina in maniera alfabetica
            this.allegatiFiltrati.sort(function (a, b) {
                return a.FILENAME.localeCompare(b.FILENAME);
            });

            this.allegatiTrovati = this.allegatiFiltrati;

            console.log(this.allegatiFiltrati);
        });

    }

    async presentActionSheet(allegato: Allegato) {
        const actionSheet = await this.actionSheetController.create({
            header: allegato.TITOLO,
            buttons: [
                {
                    text: 'Apri',
                    icon: 'easel',
                    handler: () => {
                        this.newApriFile(allegato);
                    }
                }, {
                    text: 'Download',
                    icon: 'download',
                    handler: () => {
                        this.newApriFile(allegato);
                    }
                }, {
                    text: 'Elimina',
                    icon: 'trash',
                    handler: () => {
                        this.newRimuoviFile(allegato).then();
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

    isLoading() {
        return this.sync.loading[18];
    }

    doRefresh(refresher) {
        refresher.complete();

        this.localdb.getAllegatiJsonAggiornato().then((allegatiAggiornati) => {
            if (this.sync.dataIsChanged(allegatiAggiornati, this.allegati)) {
                this.allegatiFiltrati = [];
                this.allegati.forEach(allegato => {
                    if (allegato.AD_ID == Number(this.ad_id_corso)) {
                        this.allegatiFiltrati.push(allegato);
                    }
                });

                //ordina in maniera alfabetica
                this.allegati.sort(function (a, b) {
                    return a.FILENAME.localeCompare(b.FILENAME);
                });
            }
        });
    }


    info(item) {
        this.globalData.allegato = item;

        this.globalData.srcPage = '/materiale-didattico';
        this.globalData.goTo('/materiale-didattico', '/allegato', 'forward', false);
    }

    download(item) {
        this.localdb.download(item);
    }

    apriFile(item) {
        this.localdb.apriFile(item);
    }

    eliminaFile(item) {
        this.localdb.eliminaFile(item);
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


    newApriFile(item) {
        if (this.localdb.isPiattaformaSupportata()) {

            this.localdb.isAllegatoScaricato(item).then(
                () => this.apriFile(item),
                () => this.presentAlertConfermaDownload(item)
            );
        } else {
            this.toastsService.piattaformaNonSupportata();
        }
    }

    async newRimuoviFile(item) {
        if (this.localdb.isPiattaformaSupportata()) {
            await this.localdb.isAllegatoScaricato(item).then(
                () => this.presentAlertConfermaRimozione(item),
                () => this.toastsService.fileNonScaricato()
            );
        } else {
            this.toastsService.piattaformaNonSupportata();
        }
    }


    async presentAlertConfermaRimozione(item) {
        const alertConfermaRimozione = await this.alertController.create({
            header: 'Rimozione file',
            message: 'Sei sicuro di\ voler eliminare il file sul dispositivo?',
            buttons: [
                {
                    text: 'Si',
                    handler: () => {
                        this.eliminaFile(item);
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
        const estensione: string = item.ESTENSIONE.toLowerCase();
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


    search() {
        this.allegatiTrovati = this.allegatiFiltrati;

        const searchKeyLowered = this.searchKey.toLowerCase();
        this.allegatiTrovati = this.allegatiFiltrati.filter(file => file.FILENAME.toLowerCase().search(searchKeyLowered) >= 0);
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


}
