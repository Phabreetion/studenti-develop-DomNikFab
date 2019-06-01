import { Injectable } from '@angular/core';
import { GlobalDataService } from './global-data.service';
import { SyncService } from './sync.service';
import { Storage } from '@ionic/storage';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class Esse3Service {

    baseurl = this.globalData.baseurl;
    urlSession: string = this.baseurl + 'getSession.php';


    constructor(
        public storage: Storage,
        public services: HttpService,
        public sync: SyncService,
        public globalData: GlobalDataService
    ) { }



    getUrlSession() {
        return this.globalData.getBaseUrl()  + 'getSession.php';
    }

    //@TODO Sembra non essere mai usata!
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
                    GlobalDataService.log(2, 'Errore', err);
                }
            );

        });
    }


}
