import { Component, OnInit } from '@angular/core';
import {GlobalDataService} from '../../../../services/global-data.service';
import {DBService} from '../../../../services/db-service';
import {AlertController} from '@ionic/angular';
import {ToastsService} from '../../../../services/toasts.service';


@Component({
    selector: 'app-page-allegato',
    templateUrl: 'allegato.html'
})

export class AllegatoPage implements OnInit {

    currentPage = '/allegato';
    allegato: any;
    ad_id: string;

    constructor(public globalData: GlobalDataService,
                private localdb: DBService,
                public alertController: AlertController,
                public toastsService: ToastsService) {}


    ngOnInit() {
        this.allegato = this.globalData.allegato;
        //console.log(this.allegato);
        if (this.allegato) {
            this.ad_id = this.allegato.AD_ID;
        }



        // Se non è presente l'id dell'attività didattica (nessun allegato)
        // Lo recuperiamo dai dati globali
        if (!this.ad_id) {
            this.ad_id = this.globalData.ad_id;
        }
    }

    onGoBack() {
        this.globalData.goTo(this.currentPage, '/materiale-didattico' + this.ad_id, 'backward', false);
    }

    formatStringDate(stringDate): string {
        return stringDate;
        // if (this.allegato)
        //     return this.allegato.data;
        // else
        //     return this.providers.formatStringDate(stringDate);
    }

    pulisciAllegato(item: string): string {
        if (item) {
            return item.replace(/\\r\\n|\\r|\\n/g, '<br>');
        } else {
            return '';
        }
    }

    async presentAlertConfermaDownload() {
        const alertConfermaRimozione = await this.alertController.create({
            header: 'Download file',
            message: 'Sei sicuro di\ voler scaricare il file sul dispositivo?',
            buttons: [
                {
                    text: 'Si',
                    handler: () => {
                        this.download();

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

    download() {
        this.localdb.download(this.allegato);
    }

    apriFile() {
        this.localdb.apriFile(this.allegato);
    }

    newApriFile() {
        if ( this.localdb.isPiattaformaSupportata()) {
            console.log("a");
            this.localdb.isAllegatoScaricato(this.allegato).then(
                () => this.apriFile(),
                () => this.presentAlertConfermaDownload()
            );
        } else {
            this.toastsService.piattaformaNonSupportata();
        }
    }

    async newRimuoviFile() {
        if (this.localdb.isPiattaformaSupportata()) {
            await this.localdb.isAllegatoScaricato(this.allegato).then(
                () => this.presentAlertConfermaRimozione(),
                () => this.toastsService.fileNonScaricato()
            );
        } else {
            this.toastsService.piattaformaNonSupportata();
        }
    }


    async presentAlertConfermaRimozione() {
        const alertConfermaRimozione = await this.alertController.create({
            header: 'Rimozione file',
            message: 'Sei sicuro di\ voler eliminare il file sul dispositivo?',
            buttons: [
                {
                    text: 'Si',
                    handler: () => {
                        this.eliminaFile();
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

    eliminaFile() {
        this.localdb.eliminaFile(this.allegato);
    }

}
