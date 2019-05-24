import {Injectable} from '@angular/core';
import {SyncService} from './sync.service';
import {Storage} from '@ionic/storage';

import {AppelloDisponibile} from '../models/AppelloDisponibile';
import {AppelloPrenotato} from '../models/AppelloPrenotato';
import {Appello} from '../models/Appello';
import {GlobalDataService} from './global-data.service';
import {HttpService} from './http.service';
import {FiltroAppelliDisponibili} from '../models/FiltroAppelliDisponibili';

const ID_SERVIZIO_APPELLI_DISPONIBILI = 1;
const ID_SERVIZIO_APPELLI_PRENOTATI = 10;

@Injectable({
    providedIn: 'root'
})

export class AppelliService {

    constructor(public sync: SyncService,
                public storage: Storage,
                public globalData: GlobalDataService,
                public http: HttpService) {
    }

    getUrlPrenotaAppello() {
        return this.globalData.getBaseUrl() + 'prenotaAppello.php';
    }

    getUrlCancellaPrenotazione() {
        return this.globalData.getBaseUrl() + 'cancellaPrenotazione.php';
    }

    /**
     * Ritorna una promise che viene risolta se la prenotazione va buon fine, rifiutata altrimetni
     *
     *
     * @param appelloDaPrenotato
     */
    prenotaAppello(appelloDaPrenotato: AppelloDisponibile) {
        return new Promise((resolve, reject) => {
            if (!appelloDaPrenotato.isPrenotabile()) {
                reject();
            } else {
                this.storage.get('token').then((token) => {
                    const url = this.getUrlPrenotaAppello();

                    const ad_id = appelloDaPrenotato.p10_app_ad_id;
                    const app_id = appelloDaPrenotato.p10_app_app_id;
                    const adsce_id = appelloDaPrenotato.adsce_id;

                    const body = {
                        token: token,
                        ad_id: ad_id,
                        app_id: app_id,
                        adsce_id: adsce_id
                    };

                    console.log(body);

                    this.http.post(url, body).then((data) => {
                        if(data === 'success') {
                            resolve();
                        } else {
                            reject();
                        }
                    }, (err) => {
                        reject(err);
                    });
                });
            }
        });
    }

    cancellaPrenotazione(app_id, ad_id, adsce_id) {
        return new Promise((resolve, reject) => {
            this.storage.get('token').then((token) => {
                const url = this.getUrlCancellaPrenotazione();
                const body = {
                    token: token,
                    ad_id: ad_id,
                    app_id: app_id,
                    adsce_id: adsce_id
                };

                this.http.post(url, body).then((data) => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
            });
        });
    }


    public async getAppelliDisponibili(): Promise<AppelloDisponibile[]> {
        return new Promise<AppelloDisponibile[]>((resolve, reject) => {
            return this.sync.getJson(ID_SERVIZIO_APPELLI_DISPONIBILI, null, false).then((data) => {
                const appelliDisponibili: AppelloDisponibile[] = data[0];

                //conversione di tutti gli appelli disponibili in istanze dalla classe AppelloDisponibile
                for (let i = 0; i < appelliDisponibili.length; i++) {
                    appelliDisponibili[i] = AppelloDisponibile.toObj(appelliDisponibili[i]);
                }

                //console.log(appelliDisponibili);
                resolve(appelliDisponibili);
            }).catch((err) => {
                //console.log(err);
                reject(err);
            });
        });
    }

    public async getAppelliDisponibiliAggiornati(): Promise<AppelloDisponibile[]> {
        return new Promise<AppelloDisponibile[]>((resolve, reject) => {
            return this.sync.getJsonAggiornato(ID_SERVIZIO_APPELLI_DISPONIBILI, null).then((data) => {
                const appelliDisponibili: AppelloDisponibile[] = data[0];

                //conversione di tutti gli appelli disponibili in istanze dalla classe AppelloDisponibile
                for (let i = 0; i < appelliDisponibili.length; i++) {
                    appelliDisponibili[i] = AppelloDisponibile.toObj(appelliDisponibili[i]);
                }

                //console.log(appelliDisponibili);
                resolve(appelliDisponibili);
            }).catch((err) => {
                //console.log(err);
                reject(err);
            });
        });
    }

    public async getAppelliPrenotati(): Promise<AppelloPrenotato[]> {
        return new Promise<AppelloPrenotato[]>((resolve, reject) => {
            return this.sync.getJson(ID_SERVIZIO_APPELLI_PRENOTATI, null, false).then((data) => {
                const appelliPrenotati: AppelloPrenotato[] = data[0];

                //conversione di tutti gli appelli prenotati in istanze dalla classe AppelloPrenotato
                for (let i = 0; i < appelliPrenotati.length; i++) {
                    appelliPrenotati[i] = AppelloPrenotato.toObj(appelliPrenotati[i]);
                }

                //console.log(appelliPrenotati);
                resolve(appelliPrenotati);
            }).catch((err) => {
                //console.log(err);
                reject(err);
            });
        });
    }

    public async getAppelliPrenotatiAggiornati(): Promise<AppelloPrenotato[]> {
        return new Promise<AppelloPrenotato[]>((resolve, reject) => {
            return this.sync.getJsonAggiornato(ID_SERVIZIO_APPELLI_PRENOTATI, null).then((data) => {
                const appelliPrenotati: AppelloPrenotato[] = data[0];

                //conversione di tutti gli appelli prenotati in istanze dalla classe AppelloPrenotato
                for (let i = 0; i < appelliPrenotati.length; i++) {
                    appelliPrenotati[i] = AppelloPrenotato.toObj(appelliPrenotati[i]);
                }

                //console.log(appelliPrenotati);
                resolve(appelliPrenotati);
            }).catch((err) => {
                //console.log(err);
                reject(err);
            });
        });
    }


    public isAppelliLoading(): boolean {
        return this.sync.isLoading(ID_SERVIZIO_APPELLI_PRENOTATI) || this.sync.isLoading(ID_SERVIZIO_APPELLI_DISPONIBILI);
    }

    public areAppelliChanged(appelliOld: Appello[], appelliNew: Appello[]): boolean {
        return this.sync.dataIsChanged(appelliOld, appelliNew);
    }

    public memorizzaFiltri(filtro: FiltroAppelliDisponibili) {
        this.storage.set('filtroAppelliDisponibili', filtro).then();
    }
}
