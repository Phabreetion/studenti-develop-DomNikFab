import { Injectable } from '@angular/core';
import {GlobalDataService} from './global-data.service';
import {SyncService} from './sync.service';
import {Storage} from '@ionic/storage';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class Esse3Service {

    baseurl = this.sync.baseurl;
    urlPrenotaAppello: string = this.baseurl + 'prenotaAppello.php';
    urlCancellaPrenotazione: string = this.baseurl + 'cancellaPrenotazione.php';
    urlSession: string = this.baseurl + 'getSession.php';


    constructor(
        public storage: Storage,
        public services: HttpService,
        public sync: SyncService,

    ) { }

    getUrlPrenotaAppello() {
        return this.urlPrenotaAppello;
    }

    getUrlCancellaPrenotazione() {
        return this.urlCancellaPrenotazione;
    }

    getUrlSession() {
        return this.urlSession;
    }

    // Sembra non essere mai usata!
    getSid(): Promise<string> {
        return new Promise(resolve => {
                this.storage.get('token').then(
                    (token) => {
                        let body;
                        const url = this.getUrlSession();
                        body = {
                            token: token,
                        };
                        this.services.getJSON(url, body).then(
                            (json) => {
                                const sid = json['sid'];
                                resolve(sid);
                            },
                            (err) => {
                                // TO BE CHECKED!
                                GlobalDataService.log(2, url, err);
                            });
                    }, (err) => {
                        // Dovremmo fare redirect a /login
                        GlobalDataService.log(2, 'Token non presente', err);
                    }
                );
            }
        );
    }


    prenotaAppello(app_id, ad_id, adsce_id) {
        return new Promise((resolve, reject) => {
            this.storage.get('token').then((token) => {
                const url = this.getUrlPrenotaAppello();
                let body;
                // url = this.getUrlCancellaPrenotazione();
                body = {
                    token: token,
                    ad_id: ad_id,
                    app_id: app_id,
                    adsce_id: adsce_id
                };
                // this.http.post(url, body)
                //     .pipe(timeout(this.getTimeout()))
                //     .subscribe(
                this.services.post(url, body).then(
                    (data) => {
                        resolve(data);
                    },
                    (err) => {
                        // let toast = this.toastCtrl.create({
                        //   message: 'Si è verificato un problema durante il recupero dei dati. ' +
                        //  'Verificare la connessione ad Internet.',
                        //   duration: 3000
                        // });
                        // toast.present();
                        reject(err);
                    });
            }, () => {
                // Nessun token!
            });
        });
    }

    cancellaPrenotazione(app_id, ad_id, adsce_id) {
        return new Promise((resolve, reject) => {
            this.storage.get('token').then(
                (token) => {
                    const url = this.getUrlCancellaPrenotazione();
                    let body;
                    body = {
                        token: token,
                        ad_id: ad_id,
                        app_id: app_id,
                        adsce_id: adsce_id
                    };
                    // this.http.post(url, body)
                    //     .pipe(timeout(this.getTimeout()))
                    //     .subscribe(
                    this.services.post(url, body).then(
                        (data) => {
                            resolve(data);
                        },
                        (err) => {
                            reject(err);
                        });
                }, () => {
                    // Nessun token!
                });
        });
    }

    queryStringTrasporti(): Promise<string> {
        return new Promise(resolve => {
            let queryString = '?';
            this.storage.get('username').then(
                (username) => {
                    queryString = queryString + 'username=' + username + '&';
                    this.storage.get('token').then(
                        (token) => {
                            let body;
                            const url = this.getUrlSession();
                            // url = 'https://service.unimol.it/app-unimol/api/getSession.php?token=' + token;
                            body = {
                                token: token,
                            };
                            // this.http.post(url, body)
                            //     .toPromise()
                            //     .then(
                            this.services.getJSON(url, body).then(
                                (json) => {
                                    const sid = json['sid'];
                                    queryString = queryString + 'sid=' + sid;
                                    GlobalDataService.log(0, queryString, null);
                                    resolve(queryString);
                                },
                                (err) => {
                                    // reject();
                                    GlobalDataService.log(2, 'Errore getJson', err);

                                });
                        }, (err) => {
                            // TO BE CHECKED!
                            GlobalDataService.log(2, 'Errore', err);
                        }
                    );
                }, (err) => {
                    // TO BE CHECKED!
                    GlobalDataService.log(2, 'Errore', err);
                }
            );

        });
    }


}
