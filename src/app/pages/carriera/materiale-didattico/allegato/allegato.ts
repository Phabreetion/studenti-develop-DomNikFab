import { Component, OnInit } from '@angular/core';
import {GlobalDataService} from '../../../../services/global-data.service';
import {DBService} from '../../../../services/db-service';


@Component({
    selector: 'app-page-allegato',
    templateUrl: 'allegato.html'
})

export class AllegatoPage implements OnInit {

    currentPage = '/allegato';
    allegato: any;
    ad_id: string;

    constructor(public globalData: GlobalDataService,
                private localdb: DBService) {}


    ngOnInit() {
        this.allegato = this.globalData.allegato;
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

    download() {
        this.localdb.download(this.allegato);
    }

    apriFile() {
        this.localdb.apriFile(this.allegato);
    }

    eliminaFile() {
        this.localdb.eliminaFile(this.allegato);
    }

}
