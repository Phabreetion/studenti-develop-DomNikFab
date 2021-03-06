import {Component, OnInit, ViewChild} from '@angular/core';
import {
    ActionSheetController, AlertController,
    Platform
} from '@ionic/angular';
import {SyncService} from '../../../../services/sync.service';
import {GlobalDataService} from '../../../../services/global-data.service';
import {MaterialeDidatticoDbService} from '../../../../services/materiale-didattico-db-service';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '../../../../services/account.service';
import {HttpService} from '../../../../services/http.service';
import {ToastsService} from '../../../../services/toasts.service';
import {Allegato} from '../../../../models/Allegato';

@Component({
    selector: 'app-materiale-didattico-corso',
    templateUrl: 'materiale-didattico-corso.page.html',
    styleUrls: ['./materiale-didattico-corso.page.scss'],

})

export class MaterialeDidatticoCorsoPage implements OnInit {

    //parametro passato dalla query string
    ad_id_corso: string;

    nome_corso: string;


    //allegati
    allegati: Allegato[];
    allegatiFiltrati: Allegato[];
    allegatiTrovati: Allegato[];


    //ricerca
    @ViewChild('searchbar') searchbar: any;
    isSearchbarOpened = false;
    searchKey: string;

    constructor(
        public platform: Platform,
        public route: ActivatedRoute,
        public alertController: AlertController,
        public sync: SyncService,
        public http: HttpService,
        public globalData: GlobalDataService,
        public actionSheetController: ActionSheetController,
        public localdb: MaterialeDidatticoDbService,
        public toastsService: ToastsService,
        public account: AccountService) {
        this.searchKey = '';
    }

    ngOnInit() {
        this.http.checkConnection();

        this.ad_id_corso = this.route.snapshot.paramMap.get('id');
        this.nome_corso = this.route.snapshot.paramMap.get('nome_corso');

        this.localdb.getAllegatiJson().then(allegati => {
            this.allegati = allegati;

            this.allegatiFiltrati = [];
            this.allegati.forEach(allegato => {
                if (allegato.AD_ID === this.ad_id_corso) {
                    this.allegatiFiltrati.push(allegato);
                }
            });

            //controlla presenza nello storage di tutti i file
            this.allegatiFiltrati.forEach(file => {
                this.localdb.isAllegatoScaricato(file).then(
                    () => {
                        file.SCARICATO = true;
                    },
                    () => {
                        file.SCARICATO = false;
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

    ionViewDidEnter() {
        this.isSearchbarOpened = false;
        this.searchKey = '';
    }

    async presentActionSheet(allegato: Allegato) {
        let actionSheet;
        if (allegato.SCARICATO) {
            actionSheet = await this.actionSheetController.create({
                header: allegato.TITOLO,
                buttons: [{
                    text: 'Dettagli file',
                    icon: 'information-circle',
                    handler: () => { this.goToDettagliFile(allegato); }
                }, {
                    text: 'Apri',
                    icon: 'easel',
                    handler: () => { this.presentAlertConfermaApertura(allegato, null); }
                }, {
                    text: 'Elimina',
                    icon: 'trash',
                    handler: () => { this.presentAlertConfermaRimozione(allegato, null).then(); }
                }, {
                    text: 'Chiudi',
                    icon: 'close',
                    handler: () => { this.actionSheetController.dismiss().catch(); }
                }]
            });
        } else {
            actionSheet = await this.actionSheetController.create({
                header: allegato.TITOLO,
                buttons: [{
                    text: 'Dettagli file',
                    icon: 'information-circle',
                    handler: () => { this.goToDettagliFile(allegato); }
                }, {
                    text: 'Download',
                    icon: 'download',
                    handler: () => { this.presentAlertConfermaDownload(allegato, null); }
                }, {
                    text: 'Chiudi',
                    icon: 'close',
                    handler: () => { this.actionSheetController.dismiss().catch(); }
                }]
            });
        }

        await actionSheet.present();
    }

    async presentAlertConfermaDownload(item, ionItemSliding) {
        if (ionItemSliding) {
           ionItemSliding.close();
        }

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

    async presentAlertConfermaApertura(item, ionItemSliding) {
        if (ionItemSliding) {
            ionItemSliding.close();
        }

        const alertConfermaRimozione = await this.alertController.create({
            header: 'Apri file',
            message: 'Sei sicuro di\' voler aprire il file?',
            buttons: [
                {
                    text: 'Si',
                    handler: () => {
                        this.apriFile(item);
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

    async presentAlertConfermaRimozione(item, ionItemSliding) {
        if (ionItemSliding) {
            ionItemSliding.close();
        }

        const alertConfermaRimozione = await this.alertController.create({
            header: 'Rimozione file',
            message: 'Sei sicuro di\ voler eliminare il file sul dispositivo?',
            buttons: [
                {
                    text: 'Si',
                    handler: () => {
                        this.localdb.eliminaFile(item).then(() => {});
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



    isLoading() {
        return this.sync.loading[18];
    }

    doRefresh(event) {
        this.localdb.getAllegatiJsonAggiornato().then( (allegatiAggiornati) => {
            if (this.sync.dataIsChanged(allegatiAggiornati, this.allegati)) {
                this.allegatiFiltrati = [];
                this.allegati.forEach(allegato => {
                    if (allegato.AD_ID === this.ad_id_corso) {
                        this.allegatiFiltrati.push(allegato);
                    }
                });

                //ordina in maniera alfabetica
                this.allegatiFiltrati.sort(function (a, b) {
                    return a.FILENAME.localeCompare(b.FILENAME);
                });
            }


            //controlla presenza nello storage di tutti i file
            this.allegatiFiltrati.forEach(file => {
                this.localdb.isAllegatoScaricato(file).then(
                    () => {
                        file.SCARICATO = true;
                    },
                    () => {
                        file.SCARICATO = false;
                    }
                );
            });


            if (event) {
                event.target.complete();
            }
        }, () => {
            if (event) {
                event.target.complete();
            }
        });
    }

    goToDettagliFile(item) {
        this.globalData.allegato = item;

        this.globalData.goTo('/materiale-didattico', '/dettagli-allegato', 'forward', false);
    }

    download(allegato: Allegato) {
        this.localdb.download(allegato).then(() => {
            this.doRefresh(null);
            this.presentAlertConfermaApertura(allegato, null);
        }, () => {
            //non fare nulla
        });
    }



    apriFile(item) {
        if (this.localdb.isPiattaformaSupportata()) {

            this.localdb.isAllegatoScaricato(item).then(
                () => this.localdb.apriFile(item),
                () => this.presentAlertConfermaDownload(item, null)
            );
        } else {
            this.toastsService.piattaformaNonSupportata();
        }
    }


    async rimuoviFile(item) {
        if (this.localdb.isPiattaformaSupportata()) {
            await this.localdb.isAllegatoScaricato(item).then(
                () => this.presentAlertConfermaRimozione(item, null),
                () => this.toastsService.fileNonScaricato()
            );
        } else {
            this.toastsService.piattaformaNonSupportata();
        }
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

    gestioneSearchbarMaterialeDidattico() {
        if (this.allegatiFiltrati && this.allegatiFiltrati.length == 0) {
            this.isSearchbarOpened = false;
            return false;
        }

        return true;
    }

}
