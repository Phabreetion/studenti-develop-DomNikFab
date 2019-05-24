import { Component, OnInit } from '@angular/core';
import {ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {GlobalDataService} from '../../../../services/global-data.service';
import {HttpService} from '../../../../services/http.service';
import {SyncService} from '../../../../services/sync.service';


@Component({
    selector: 'app-page-appello',
    templateUrl: 'appello.page.html',
})

export class AppelloPage implements OnInit {

    item: any;
    sezioni: string;
    studenti: Array<any> = [];
    commissione: Array<any> = [];
    loaded = true;

    constructor(private toastCtrl: ToastController,
                private sync: SyncService,
                public globalData: GlobalDataService,
                private storage: Storage,
                public http: HttpService) {
        if (this.sezioni == null) {
            this.sezioni = 'dati';
        }
    }


    ngOnInit() {
        if (this.globalData.userRole !== 'teacher') {
            this.globalData.goHome();
            return;
        }
        this.http.getConnected();
        this.item = this.globalData.appello;
        this.dettaglioAppello(this.item.AD_ID, this.item.APP_ID).then(
            () => { },
            (err) => {GlobalDataService.log(2, 'Chiamata a dettaglioAppello fallita', err); }
            );
    }

    mostraPrenotati() {
        this.sezioni = 'esami';
    }


    date2string(stringDate): string {
        return GlobalDataService.formatStringDateNoTime(stringDate, '-');
    }

    isLoading() {
        return !this.loaded;
    }

    dettaglioAppello(ad_id, app_id) {
        // console.log(ad_id + ' - ' + app_id);
        return new Promise((resolve, reject) => {
            this.storage.get('token').then((token) => {
                this.storage.get('id_docente').then((id) => {

                    this.loaded = false;
                    const url = this.sync.getUrlDettaglioAppello();
                    let body;
                    // url = this.getUrlCancellaPrenotazione();
                    body = JSON.stringify({
                        token: token,
                        id_docente: id,
                        ad_id: ad_id,
                        app_id: app_id
                    });
                    this.http.getJSON(url, body).then(
                        (risposta) => {

                            // console.log(JSON.stringify(risposta));
                            console.log(risposta);

                                if (Array.isArray(risposta['studenti'])) {
                                    this.studenti = risposta['studenti'];
                                }
                                if (Array.isArray(risposta['commissione'])) {
                                    this.commissione = risposta['commissione'];
                                }
                                this.loaded = true;
                                resolve();
                            },
                            () => {
                                this.toastCtrl.create({
                                    message: 'Si è verificato un problema durante il recupero dei dati. Verificare la connessione ad Internet.',
                                    duration: 3000
                                }).then(
                                    (toast) => {toast.present(); },
                                    (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
                                this.loaded = true;
                            });
                });
            });
        });
    }

    home() {
        this.globalData.goHome();
    }
}
