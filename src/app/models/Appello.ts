import {OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SyncService} from '../services/sync.service';
import {GlobalDataService} from '../services/global-data.service';
import {HttpService} from '../services/http.service';
import {ToastController} from '@ionic/angular';

export class Appello {



    ad_id: number //
    adsce_id: number //
    data_ora_app: string //


    constructor(ad_id: number, adsce_id: number, data_ora_app: string) {
        this.ad_id = ad_id;
        this.adsce_id = adsce_id;
        this.data_ora_app = data_ora_app;
    }
}
