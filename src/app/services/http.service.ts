import { Injectable } from '@angular/core';
import {GlobalDataService} from './global-data.service';
import {HTTP} from '@ionic-native/http/ngx';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    connected: boolean = undefined;
    connessioneInizializzata = false;
    connessioneInCorso = false;
    connessioneLenta = true;

    // Default (meno ottimizzato, ma funziona ion assenza di cordova)
    httpNativo = false;


// const httpOptions = {
//     headers: new HttpHeaders({
//         'Content-Type':  'application/json',
//     }),
//     observe: 'response' as 'response',
//     responseType: 'json' as 'json'
// };

    constructor(
        public http: HTTP,
        public httpClient: HttpClient,
        public globalData: GlobalDataService,
        public storage: Storage
    ) { }


    checkNative() {
        return new Promise((resolve) => {
            this.postNative('https://service.unimol.it/studenti/api/ultimaVersione.php', {platform: 'Android'})
                .then(
                    () => {
                    resolve(true);
                }, () => {
                    resolve(false);
                });
        });
    }

    setHttpType() {
        this.storage.get('httpNativo').then(
            (value) => {
                if (value != null) {
                    this.httpNativo = value;
                } else {
                    // se è supportato il plugin nativo lo impostiamo come default
                    this.checkNative().then((enabled) => {
                        this.httpNativo = !!enabled; // TODO: !! -> !
                    });
                }
            });
    }

    get(url: string, parameters: any) {
        if (this.httpNativo) {
            return this.getNative(url, parameters);
        } else {
            return this.getAngular(url);
        }
    }

    post(url: string, body: any) {
        if (this.httpNativo) {
            return this.postNative(url, body);
        } else {
            return this.postAngular(url, body);
        }
    }

    getJSON(url: string, body: any) {
        if (this.httpNativo) {
            return this.getJSONNative(url, body);
        } else {
            return this.getJSONAngular(url, body);
        }
    }

    getAngular(url: string) {
        return new Promise((resolve, reject) => {
            this.httpClient.get('https://swapi.co/api/films')
                .subscribe(
                    (data) => {
                        GlobalDataService.log(0, 'GET ' + url, data);

                        resolve(data);
                    }, (err) => {
                        GlobalDataService.log(2, 'GET fallita!', err);
                        reject(err);
                    });
        });
    }

    postAngular(url: string, body: any) {

        return new Promise((resolve, reject) => {
            this.httpClient.post(url, body, {responseType: 'text'})
                .subscribe(
                    (response) => {
                        GlobalDataService.log(0, url, response);
                        resolve(response);
                    },
                    (err) => {
                        GlobalDataService.log(2, 'Error', err);
                        reject(err);
                    });
        });
    }

    getNative(url: string, parameters: any) {
        return new Promise((resolve, reject) => {
            this.http.get(url, parameters, {})
                .then((data) => {
                    GlobalDataService.log(0, 'GET ' + url, data);
                    resolve(data);
                }, (err) => {
                    GlobalDataService.log(2, 'GET fallita!', err);
                    reject(err);
                })
                .catch(error => {
                    GlobalDataService.log(2, 'Exception durante la chiamata GET fallito!', error);
                    reject();
                });
        });
    }

    postNative(url: string, body: any) {

        return new Promise((resolve, reject) => {
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setDataSerializer('json');
            this.http.post(url, body, {}).then(
                (response) => {
                    GlobalDataService.log(0, url, response);
                    resolve(response.data);
                },
                (err) => {
                    GlobalDataService.log(2, 'Error', err);
                    reject(err);
                });
        });
    }

    getJSONNative(url: string, body: any) {
        this.http.setHeader('*', 'Content-Type', 'application/json');
        this.http.setDataSerializer('json');
        return new Promise((resolve, reject) => {
            this.http.post(url, body, {}).then(
                (response) => {
                    const dati = JSON.parse(response.data);
                    GlobalDataService.log(0, url, response);
                    resolve(dati);
                },
                (err) => {
                    GlobalDataService.log(2, 'Error', err);
                    reject(err);
                }).catch(exception => {
                GlobalDataService.log(2, 'Catch', exception);
                reject();
            });
        });
    }

    getJSONAngular(url: string, body: any) {
        return new Promise((resolve, reject) => {
            this.httpClient.post(url, body)
                .subscribe(
                    (response) => {
                        GlobalDataService.log(0, url, response);
                        resolve(response);
                    },
                    (err) => {
                        GlobalDataService.log(2, 'Error', err);
                        reject(err);
                    });
        });
    }

    // return this.http.get('https://httpbin.org/ip')
    //     .pipe(
    //         map(
    //     res => { res.json(); },
    //     err => { console.dir(err); }));



    getConnected(): boolean {
        // console.log(this.connessioneInizializzata);

        if (!this.connessioneInCorso && !this.connessioneInizializzata) {
            try {
                this.connessioneInCorso = true;
                // this.http.get('https://httpbin.org/ip')

                // this.http.setHeader('*', 'Content-Type', 'application/json');
                // this.http.setDataSerializer('json');

                this.post('https://service.unimol.it/studenti/api/ultimaVersione.php', {platform: 'Android'})
                    .then(data => {
                        console.dir(data);
                        this.connessioneInizializzata = true;
                        this.connected = true;
                        this.connessioneInCorso = false;
                        return this.connected;

                    }, (err) => {
                        console.log('NOT CONNECTED');
                        GlobalDataService.log(2, 'Ping fallito!', err);
                        this.connessioneInizializzata = true;
                        this.connected = false;
                        this.connessioneInCorso = false;
                        return this.connected;
                    } )
                    .catch(error => {
                        GlobalDataService.log(2, 'Ping fallito!', error);
                        console.dir(error);
                        this.connessioneInizializzata = true;
                        this.connected = false;
                        this.connessioneInCorso = false;
                        return this.connected;
                    });

                // this.http.get('https://service.unimol.it/studenti/api/ultimaVersione.php')
                //    // .pipe(map(res => res.json()))
                //     .subscribe(
                //         (data) => {
                //             // console.dir(data);
                //             this.connessione Inizializzata = true;
                //             this.connected = true;
                //             this.connessioneInCorso = false;
                //             return this.connected;
                //         },
                //         (err) => {
                //             // console.dir(err);
                //             this.connessioneInizializzata = true;
                //             this.connected = false;
                //             this.connessioneInCorso = false;
                //             return this.connected;
                //         }
                //     );
            } catch (e) {
                console.dir(e);
                this.connessioneInCorso = false;
            }

        } else {
            return this.connected;
        }
    }


    setConnected(status: boolean) {
        this.connessioneInizializzata = false;
        this.connected = status;
    }

    checkConnection() {
        this.getConnected();
        // this.http.get('https://httpbin.org/ip', {}, {})
        //     .then(
        //         (data) => {
        //             this.setConnected(true);
        //             console.dir(data);
        //         },
        //         (err) => {
        //             this.setConnected(false);
        //             console.dir(err);
        //         })
    }

    // testNetworkStartup() {
    //     this.services.get('https://httpbin.org/ip', {})
    //         .then(data => {
    //             return true;
    //         }, (err) => {
    //             return false;
    //         });
    //     // return this.http.get('https://httpbin.org/ip')
    //     //     .pipe(
    //     //         map(
    //     //     res => { res.json(); },
    //     //     err => { console.dir(err); }));
    // }
}
