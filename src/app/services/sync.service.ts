import {Injectable, NgZone} from '@angular/core';
import {AlertController, LoadingController, Platform, ToastController} from '@ionic/angular';
// import {Md5} from 'ts-md5';
import {Storage} from '@ionic/storage';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {Device} from '@ionic-native/device/ngx';
// import {FCM} from '@ionic-native/fcm/ngx';

import 'rxjs/add/operator/map';
import {GlobalDataService} from './global-data.service';
import {NotificheService} from './notifiche.service';
import {HttpService} from './http.service';
// import {timeout} from 'rxjs/operators';

/*
ID SERVIZI
"APPELLI', 1
'ESAMI_DA_SOSTENERE', 2
'CREDITI_A_SCELTA', 3
'LIBRETTO', 4
'MEDIE_PREVISTE', 5
'NEWS', 6
'RUBRICA', 7
'QUESTIONARI', 8
'CARRIERA', 9
'APPELLI_PRENOTATI', 10
'TASSE', 11
'PIANO_Di_STUDI', 12
'NOTIFICHE', 13
'SERVIZIO_NEWS_DIPARTIMENTO', 14
'SERVIZIO_NEWS_CDS', 15
'SERVIZIO_NEWS_ATENEO', 16
'SERVIZIO_CALENDARIO', 17
'SERVIZIO_MATERIALE_DIDATTICO', 18
'SERVIZIO_ACCOUNTS', 19
*/

@Injectable({
    providedIn: 'root'
})

export class SyncService {

     schema = 'https://';
     ip = 'service.unimol.it';
     dir = '/studenti';
     apiurl =  this.dir + '/api/';
     baseurl: string = this.schema + this.ip + this.apiurl;
     urlCheckToken: string = this.baseurl + 'checkToken.php';
     urlSync: string = this.baseurl + 'sincronizza.php';
     urlConfermaRegistra: string = this.baseurl + 'confermaRegistrazione.php';
     urlAppelliPrenotabili: string = this.baseurl + 'appelliPrenotabili.php';
     urlPreferenzeNotifiche: string = this.baseurl + 'salvaPreferenzeNotifiche.php';
     urlAggiornaTokenNotifiche: string = this.baseurl + 'aggiornaTokenNotifiche.php';
     urlAggiornaDeviceInfo: string = this.baseurl + 'aggiornaDeviceInfo.php';
     urlControllaMessaggi: string = this.baseurl + 'controllaMessaggi.php';
     urlReimpostaMessaggi: string = this.baseurl + 'reimpostaMessaggi.php';
     urlUltimaVersione: string = this.baseurl + 'ultimaVersione.php';
     urlSottoscrizioneCalendario: string = this.baseurl + 'sottoscrizioneCalendario.php';

    private user = 'username';
    private mat_id = 'matid';
    private psw = 'psw';
    private uuid = 'virtual';
    private token = 'token';
    private tokenNotifiche = 'tokenNotifiche';


    loading = [];

    private elencoServizi = [1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    // private elencoServizi = [1,2];

    private timeout = 30000;


    static dataAggiornamento(json): string {
        let timestamp;
        if (json) {
            timestamp = json['timestamp'];
            if ((timestamp === undefined) || (timestamp == null)) {
                return 'Mai';
            }
        } else {
            return 'Mai';
        }
        return GlobalDataService.timestamp2string(timestamp);
    }

    constructor(public storage: Storage,
                public services: HttpService,
                public device: Device,
                public platform: Platform,
                public appVersion: AppVersion,
                public notificheService: NotificheService,
                // public market: Market,
                public toastCtrl: ToastController,
                public alertCtrl: AlertController,
                public loadingCtrl: LoadingController,
                public ngZone: NgZone,
                public globalData: GlobalDataService ) {
        // this.http.setHeader('*', 'Content-Type', 'application/json');
        // this.http.setDataSerializer('json');
    }

    getTimeout() {
        return this.timeout;
    }

    getUrlSync() {
        return this.urlSync;
    }

    getUrlConfermaRegistrazione() {
        return this.urlConfermaRegistra;
    }

    getUrlAppelliPrenotabili() {
        return this.urlAppelliPrenotabili;
    }

    getUrlPreferenzeNotifiche() {
        return this.urlPreferenzeNotifiche;
    }

    getUrlAggiornaTokenNotifiche() {
        return this.urlAggiornaTokenNotifiche;
    }

    getUrlAggiornaDeviceInfo() {
        return this.urlAggiornaDeviceInfo;
    }

    getUrlControllaMessaggi() {
        return this.urlControllaMessaggi;
    }

    getUrlReimpostaMessaggi() {
        return this.urlReimpostaMessaggi;
    }

    getUrlUltimaVersione() {
        return this.urlUltimaVersione;
    }

    getTokenString() {
        return this.token;
    }

    getUserString() {
        return this.user;
    }

    getPswString() {
        return this.psw;
    }

    getMatIdString() {
        return this.mat_id;
    }

    getTokenNotificheString() {
        return this.tokenNotifiche;
    }

    getUUIDString() {
        return this.uuid;
    }


    sincronizza() {
        if (this.platform.is('ios') || (this.platform.is('android'))) {
            this.aggiornaDeviceInfo().then(
                () => {
                    GlobalDataService.log(0, 'Aggiornato il Device', null);
                }, (err) => {
                    GlobalDataService.log(2, 'Impossibile aggiornare le info sul device', err);
                }
            );
            this.controllaVersione().then(
                () => {
                    GlobalDataService.log(0, 'Constollo versione OK', null);
                }, (err) => {
                    GlobalDataService.log(2, 'Impossibile controllare la versione dell\'app', err);
                }
            );
        }

        for (const i of this.elencoServizi) {
            this.getJson(i, true).then(
                (data) => {
                    GlobalDataService.log(0, 'Recuperato servizio ' + i, data);
                },
                (err) => {
                    GlobalDataService.log(0, 'Non Recuperato servizio ' + i, err);
                });
        }
    }


    getJson(id: number, sync: boolean) {

        return new Promise((resolve, reject) => {
            this.storage.get(id.toString()).then(
                (data) => {
                    if (data && (data[0] || data['timestamp'])) {
                        if (sync) {
                            this.getJsonLista(id).then(); // Aggiornamento in background
                        }
                        resolve(data);
                    } else {
                        this.getJsonLista(id).then(
                            (dati) => resolve(dati),
                            (err) => reject(err)
                        ).catch(err => reject(err));
                    }
                }, () => this.getJsonLista(id).then(
                    (data) => resolve(data),
                    (err) =>  reject(err)
                ).catch(err => reject(err))
            ).catch(err =>  reject(err));
        });
    }

    private getJsonLista(id: number) {
        //  let jsonLista = [];
        if (id == null) {
            return;
        }

        return new Promise((resolve, reject) => {
            this.loading[id] = true;
            this.storage.get('token').then(
                (val) => {
                    this.token = val;
                    this.storage.get('uuid').then(
                        (uuid) => {

                            this.uuid = uuid;
                            if (this.uuid === undefined || this.uuid == null) {
                                this.uuid = 'uuid';
                            }

                            let url = this.getUrlSync();

                            // const body = JSON.stringify({
                            //     token: this.token,
                            //     uuid: this.uuid,
                            //     id_servizio: id
                            // });

                            const body = {
                                token: this.token,
                                uuid: this.uuid,
                                id_servizio: id
                            };


                            this.services.getJSON(url, body).then(
                                (dati) => {

                                    // Salvo i json nello storage
                                    if (dati) {
                                        this.storage.set(id.toString(), dati).then(
                                            () => {
                                            }, (storageErr) => {
                                                GlobalDataService.log(2, 'Errore in local storage', storageErr);
                                            }
                                        );
                                        // this.storage.set(id.toString() + '_timestamp', dati['timestamp']);
                                    }

                                    this.loading[id] = false;
                                    resolve(dati);
                                },
                                (rej) => {
                                    this.loading[id] = false;
                                    if (rej.error) {
                                        const errore = JSON.parse(rej.error);
                                        const stato = rej.status;
                                        const codice = errore.codice;

                                        if (stato === 401 && codice === -2) {
                                            GlobalDataService.log(1, 'Token scaduto', null);

                                            let storedUsername = this.storage.get('username');
                                            let storedPassword = this.storage.get('password');

                                            Promise.all([storedUsername, storedPassword]).then(
                                                data => {
                                                    storedUsername = data[0];
                                                    storedPassword = data[1];

                                                    url = this.urlCheckToken;
                                                    const bodyCheckToken = {
                                                        token: this.token,
                                                        username: storedUsername,
                                                        password: storedPassword
                                                    };

                                                    // TODO: Gestire cambio password da ESSE3
                                                    this.ngZone.run(() => {
                                                        this.services.post(url, bodyCheckToken).then(
                                                            () => {
                                                                this.getJsonLista(id).then(
                                                                    (res) => {
                                                                        GlobalDataService.log(0, 'getJsonLista', res);
                                                                    }, (err) => {
                                                                        GlobalDataService.log(2, 'getJsonLista reject', err);
                                                                    }
                                                                );
                                                            }
                                                        );

                                                        // // Aggiorniamo la validità del token
                                                        // this.http.post(url, bodyCheckToken, {})
                                                        //     .then(response => {
                                                        //             GlobalDataService.log(0, url, response);
                                                        //             this.getJsonLista(id).then(
                                                        //                 (res) => {
                                                        //                     GlobalDataService.log(0, 'getJsonLista', res);
                                                        //                 }, (err) => {
                                                        //                     GlobalDataService.log(2, 'getJsonLista reject', err);
                                                        //                 }
                                                        //             );
                                                        //         },
                                                        //         (err) => {
                                                        //             GlobalDataService.log(2, url, err);
                                                        //         });
                                                    });
                                                }, (err) => {
                                                    GlobalDataService.log(2, 'Credenziali non accessibili', err);
                                                });

                                        } else {
                                            this.toastCtrl.create({
                                                message: errore.msg,
                                                duration: 3000
                                            }).then(
                                                (toast) => {
                                                    toast.present();
                                                },
                                                (err) => {
                                                    GlobalDataService.log(2, 'Toast fallito', err);
                                                });
                                        }
                                    }
                                }
                            ).catch(() => { this.loading[id] = false; });

                            //
                            // this.http.post(url, body, {})
                            //     .then(response => {
                            //         GlobalDataService.log(0, url, response);
                            //
                            //         const dati = JSON.parse(response.data);
                            //
                            //         // Salvo i json nello storage
                            //         if (dati) {
                            //             this.storage.set(id.toString(), dati).then(
                            //                 () => {
                            //                 }, (storageErr) => {
                            //                     GlobalDataService.log(2, 'Errore in local storage', storageErr);
                            //                 }
                            //             );
                            //             // this.storage.set(id.toString() + '_timestamp', dati['timestamp']);
                            //         }
                            //
                            //         this.loading[id] = false;
                            //         resolve(dati);
                            //     }, (rej) => {
                            //         GlobalDataService.log(2, 'Rejected', rej);
                            //
                            //         this.loading[id] = false;
                            //         if (rej.error) {
                            //             const errore = JSON.parse(rej.error);
                            //             const stato = rej.status;
                            //             const codice = errore.codice;
                            //
                            //             if (stato === 401 && codice === -2) {
                            //                 GlobalDataService.log(1, 'Token scaduto', null);
                            //
                            //                 let storedUsername = this.storage.get('username');
                            //                 let storedPassword = this.storage.get('password');
                            //
                            //                 Promise.all([storedUsername, storedPassword]).then(
                            //                     data => {
                            //                         storedUsername = data[0];
                            //                         storedPassword = data[1];
                            //
                            //                         url = this.urlCheckToken;
                            //                         const bodyCheckToken = {
                            //                             token: this.token,
                            //                             username: storedUsername,
                            //                             password: storedPassword
                            //                         };
                            //
                            //                         // TODO: Gestire cambio password da ESSE3
                            //                         this.ngZone.run(() => {
                            //                             // Aggiorniamo la validità del token
                            //                             this.http.post(url, bodyCheckToken, {})
                            //                                 .then(response => {
                            //                                         GlobalDataService.log(0, url, response);
                            //                                         this.getJsonLista(id).then(
                            //                                             (res) => {
                            //                                                 GlobalDataService.log(0, 'getJsonLista', res);
                            //                                             }, (err) => {
                            //                                                 GlobalDataService.log(2, 'getJsonLista reject', err);
                            //                                             }
                            //                                         );
                            //                                     },
                            //                                     (err) => {
                            //                                         GlobalDataService.log(2, url, err);
                            //                                     });
                            //                         });
                            //                     }, (err) => {
                            //                         GlobalDataService.log(2, 'Credenziali non accessibili', err);
                            //                     });
                            //
                            //             } else {
                            //                 this.toastCtrl.create({
                            //                     message: errore.msg,
                            //                     duration: 3000
                            //                 }).then(
                            //                     (toast) => { toast.present(); },
                            //                     (err) => { GlobalDataService.log(2, 'Toast fallito', err); });
                            //             }
                            //         }
                            //
                            //     })
                            //     .catch(exception => {
                            //         this.loading[id] = false;
                            //         GlobalDataService.log(2, 'Catch', exception);
                            //     });
                        }, (err) => {
                            // Nessun uuid - probabile versione web
                            this.storage.set('uuid', 'uuid').then(
                                () => { },
                                (storageErr) => {
                                    GlobalDataService.log(2, 'Errore in local storage', storageErr);
                                });
                            GlobalDataService.log(2, 'Nessun uuid', err);
                            this.loading[id] = false;
                            reject('Riprovare più tardi');
                        });
                },
                (err) => {
                    // Nessun token
                    this.loading[id] = false;
                    this.toastCtrl.create({
                        message: 'Nessun dato presente nello storage locale.',
                        duration: 3000
                    }).then(
                        (toast) => { toast.present(); },
                        (errToast) => { GlobalDataService.log(2, 'Toast fallito', errToast); });
                    reject(err);
                });
        });
    }

    salvaJSon(id: number, json: JSON) {
        this.storage.set(id.toString(), JSON.stringify(json)).then(
            () => {
            }, (storageErr) => {
                GlobalDataService.log(2, 'Errore in local storage', storageErr);
            }
        );
    }


    aggiornaTokenNotifiche(tokenNotifiche: string) {
        this.storage.set('tokenNotifiche', tokenNotifiche).then(
            () => {
            }, (storageErr) => {
                GlobalDataService.log(2, 'Errore in local storage', storageErr);
            }
        );
        this.storage.get('token').then((val) => {
            if (val == null) {
                return;
            }
            this.token = val;
            const url = this.getUrlAggiornaTokenNotifiche();
            const body = {
                token: this.token,
                tokenNotifiche: tokenNotifiche
            };

            this.services.post(url, body).then(
                () => {
                    // SALVA LE PREFERENZE IN LOCALE
                    this.notificheService.aggiornaSottoscrizioni();
                },
                (err) => {
                    GlobalDataService.log(2, 'Il token non può essere aggiornato ancora.', err);
                }
            );
            //
            // this.http.post(url, body, {}).then(
            //     (response) => {
            //         // SALVA LE PREFERENZE IN LOCALE
            //         GlobalDataService.log(0, url, response);
            //         this.notificheService.aggiornaSottoscrizioni();
            //     },
            //     (err) => {
            //         GlobalDataService.log(2, 'Il token non può essere aggiornato ancora.', err);
            //     });
        }, (err) => {
            // Non aggiorniamo
            GlobalDataService.log(2, 'Il token non è presente', err);
        });
    }

    aggiornaDeviceInfo() {

        return new Promise((resolve, reject) => {
            if (this.platform.is('ios') || (this.platform.is('android'))) {
                const url = this.getUrlAggiornaDeviceInfo();
                this.storage.get('lastDeviceUpdate').then(
                    (data) => {
                        GlobalDataService.log(0, 'Ultima verifica', data);

                        const oggi = new Date();
                        const tsOggi = oggi.getTime();
                        const ultimoCheck = new Date(data);
                        const oreTrascorse = GlobalDataService.differenzaOre(oggi, ultimoCheck);
                        // let minutiTrascorsi = GlobalDataService.differenzaMinuti(oggi, ultimoCheck);

                        if ((data != null) && (oreTrascorse < 24)) {
                            resolve(true);
                            return;
                        }

                        this.storage.get('token').then((token) => {
                            this.token = token;

                            this.appVersion.getVersionNumber().then(
                                (versionNr) => {
                                    const appVersion = versionNr;
                                    this.storage.set('appVersion', appVersion).then(
                                        () => {
                                        }, (storageErr) => {
                                            GlobalDataService.log(2, 'Errore in local storage', storageErr);
                                        }
                                    );
                                    this.storage.set('uuid', this.device.uuid).then(
                                        () => {
                                        }, (storageErr) => {
                                            GlobalDataService.log(2, 'Errore in local storage', storageErr);
                                        }
                                    );

                                    const body = {
                                        token: this.token,
                                        appVersion: appVersion,
                                        cordovaVersion: this.device.cordova,
                                        model: this.device.model,
                                        platform: this.device.platform,
                                        osVersion: this.device.version,
                                        manufacturer: this.device.manufacturer,
                                        isVirtual: this.device.isVirtual,
                                        uuid: this.device.uuid
                                    };
                                    this.services.post(url, body).then(
                                        (response) => {
                                            this.storage.set('lastDeviceUpdate', tsOggi).then(
                                                () => {
                                                }, (storageErr) => {
                                                    GlobalDataService.log(2, 'Errore in local storage', storageErr);
                                                }
                                            );
                                            GlobalDataService.log(0, 'I dati del device sono stati aggiornati.', response);
                                            resolve(response);
                                        },
                                        (err) => {
                                            GlobalDataService.log(2, 'I dati del device  non possono essere aggiornati.', err);
                                            reject(err);
                                        });
                                }, (err) => {
                                    // Versione web?
                                    GlobalDataService.log(0, 'Plugin versione non risponde.', err);
                                }
                            );
                        });
                    }, () => {
                        // Se non abbiamo mai salvato l'ultimo check, inizializziamolo
                        this.storage.set('lastDeviceUpdate', new Date(75, 2, 20).getTime()).then(
                            () => {
                            }, (storageErr) => {
                                GlobalDataService.log(2, 'Errore in local storage', storageErr);
                            }
                        );
                    });
            } else {
                resolve(false);
            }
        });
    }



    controllaMessaggi() {
        return new Promise((resolve, reject) => {
            const urlControllaMessaggi = this.getUrlControllaMessaggi();
            this.storage.get('token').then((val) => {
                    this.token = val;

                    const body = {
                        token: this.token
                    };

                    this.services.post(urlControllaMessaggi, body).then(
                        (response) => {
                            if (response) {
                             const messaggio: string = response.toString();

                                if ((messaggio === '') || (messaggio === 'NULL')) {
                                    GlobalDataService.log(0, 'Nessun nuovo messaggio', null);
                                    resolve('');
                                    return;
                                } else {
                                    GlobalDataService.log(0, 'Messaggio ricevuto', messaggio);

                                    const urlReimpostaMessaggi = this.getUrlReimpostaMessaggi();

                                    this.services.post(urlReimpostaMessaggi, body).then(

                                        () => {
                                            // const testo = String.fromCodePoint(0x1F354);
                                            GlobalDataService.log(1, 'Messaggi reimpostati', null);
                                            this.alertCtrl.create({
                                                header: 'Messaggio da Unimol',
                                                subHeader: messaggio,
                                                buttons: ['Chiudi']
                                            }).then((alert) => { alert.present(); },
                                                (err) => { GlobalDataService.log(2, urlReimpostaMessaggi, err); });

                                            resolve(response);
                                        },
                                        (err) => {
                                            GlobalDataService.log(2, 'Non è possibile reimpostare i messaggi ora', err);
                                        });
                                }
                            }
                        },
                        (err) => {
                            GlobalDataService.log(2, 'Non è possibile reimpostare i messaggi ora', err);
                        });
                }, (err) => {
                    // Non riesco a leggere i messaggio. Problemi di connessione?
                    GlobalDataService.log(2, 'Non riesco a leggere i messaggio. Problemi di connessione?', err);
                    reject();
                }
            );
        });
    }

    aggiornaInformazioni() {
        return new Promise((resolve) => {
            this.storage.get('aggiorna').then((value) => {
                if (value != null) {
                    resolve(value);
                } else {
                    resolve('mai');
                }
            }, () => {
                resolve('mai');
            });
        });
    }

    controllaVersione() {
        return new Promise((resolve, reject) => {
            if (this.platform.is('ios') || (this.platform.is('android'))) {
                this.storage.get('aggiornamentiApp').then(
                    (aggiornamentiApp) => {
                        if ((aggiornamentiApp != null) && (aggiornamentiApp === false)) {
                            GlobalDataService.log(1, 'Non verifico Aggiornamento (disabilitato)', null);
                            resolve(true);
                        } else {

                            // verifichiamo la presenza di un aggiornamento solo se non lo abbiamo già fatto nelle ultime 24 ore
                            this.storage.get('lastCheck').then(
                                (lastCheck) => {
                                    GlobalDataService.log(1, 'Ultima verifica: ', lastCheck);
                                    const oggi = new Date();
                                    const tsOggi = oggi.getTime();
                                    const ultimoCheck = new Date(lastCheck);
                                    const oreTrascorse = GlobalDataService.differenzaOre(oggi, ultimoCheck);
                                    // let minutiTrascorsi = this.differenzaMinuti(oggi, ultimoCheck);

                                    if ((lastCheck != null) && (oreTrascorse < 24)) {
                                        resolve(true);
                                        return;
                                    }

                                    const urlUltimaVersione = this.getUrlUltimaVersione();
                                    const body = {
                                        platform: this.device.platform
                                    };

                                    // const header = {
                                    //     headers: { 'Content-Type': 'application/json' }
                                    // };

                                    // this.http.setHeader('*', 'Content-Type', 'application/json');
                                    // this.http.setDataSerializer('json');

                                    this.services.post(urlUltimaVersione, body)
                                        .then(
                                            (ultimaVersione) => {

                                            if (ultimaVersione != null) {
                                                GlobalDataService.log(1, 'Ultima versione', ultimaVersione);

                                                this.appVersion.getVersionNumber().then(
                                                    (appVersion) => {
                                                        this.storage.set('lastCheck', tsOggi).then(
                                                            () => {
                                                            }, (storageErr) => {
                                                                GlobalDataService.log(2, 'Errore in local storage', storageErr);
                                                            }
                                                        );
                                                        this.storage.set('appVersion', appVersion).then(
                                                            () => {
                                                            }, (storageErr) => {
                                                                GlobalDataService.log(2, 'Errore in local storage', storageErr);
                                                            }
                                                        );

                                                        GlobalDataService.log(1,
                                                            'La tua version (' + appVersion +
                                                            '). L\'ultima versione disponibile (' + ultimaVersione + ')', null);


                                                        if (appVersion.toString() < ultimaVersione) {
                                                            const messaggio: string = 'Questa versione dell\'App Studenti Unimol (' +
                                                                appVersion + ') non è aggiornata. <br \>L\'ultima versione disponibile (' +
                                                                ultimaVersione + ') introduce nuove funzionalità e corregge i bug presenti';

                                                            let target: string;

                                                            switch (this.device.platform) {
                                                                case 'iOS': {
                                                                    target = 'studenti-unimol/id1275911366?mt=8';
                                                                    break;
                                                                }
                                                                case 'Android' : {
                                                                    target = 'it.unimol.app.studenti';
                                                                    break;
                                                                }
                                                            }

                                                            if (target != null) {
                                                                this.alertCtrl.create({
                                                                    header: 'Aggiornamento disponibile',
                                                                    subHeader: messaggio,
                                                                    buttons: [
                                                                        {
                                                                            text: 'Non ora',
                                                                            role: 'cancel',
                                                                            handler: () => {
                                                                            }
                                                                        },
                                                                        {
                                                                            text: 'Vai allo Store',
                                                                            handler: () => {
                                                                                //// this.market.open(target);
                                                                            }
                                                                        }
                                                                    ]
                                                                }).then(
                                                                    (alert) => {
                                                                        alert.present();
                                                                    },
                                                                    (err) => {
                                                                        GlobalDataService.log(2, 'Alert fallito', err);
                                                                    });
                                                            } else {
                                                                this.alertCtrl.create({
                                                                    header: 'Aggiornamento disponibile',
                                                                    subHeader: messaggio,
                                                                    buttons: ['Chiudi']
                                                                }).then((alert) => {
                                                                        alert.present();
                                                                    },
                                                                    (err) => {
                                                                        GlobalDataService.log(2, 'Alert fallito', err);
                                                                    });
                                                            }

                                                            resolve(true);
                                                        }
                                                    },
                                                    (err) => {
                                                        // Non è possibile verificare la versione attuale. Probabile versione web
                                                        reject(err);
                                                    }
                                                );
                                            } else {
                                                this.storage.set('lastCheck', new Date(75, 2, 20).getTime()).then(
                                                    () => {
                                                    }, (storageErr) => {
                                                        GlobalDataService.log(2, 'Errore in local storage', storageErr);
                                                    }
                                                );
                                            }

                                        }, (err) => {
                                            GlobalDataService.log(2, 'Rinvio il controllo della versione', err);
                                            this.storage.set('lastCheck', new Date(75, 2, 20).getTime()).then(
                                                () => {
                                                }, (storageErr) => {
                                                    GlobalDataService.log(2, 'Errore in local storage', storageErr);
                                                }
                                            );
                                        })
                                        .catch(error => {
                                            GlobalDataService.log(2, 'Rinvio il controllo della versione', error);
                                            this.storage.set('lastCheck', new Date(75, 2, 20).getTime()).then(
                                                () => {
                                                }, (storageErr) => {
                                                    GlobalDataService.log(2, 'Errore in local storage', storageErr);
                                                }
                                            );
                                        });
                                }, (err) => {
                                    // Se non abbiamo mai salvato l'ultimo check, inizializziamolo ad oggi
                                    GlobalDataService.log(0, 'Inizializziamo lastCheck', err);
                                    this.storage.set('lastCheck', new Date(75, 2, 20).getTime()).then(
                                        () => {
                                        }, (storageErr) => {
                                            GlobalDataService.log(2, 'Errore in local storage', storageErr);
                                        }
                                    );
                                }
                            );
                        }
                    }, (err) => {
                        // aggiornamentiApp non inizializzato
                        this.storage.set('aggiornamentiApp', true).then(
                            () => {
                            }, (storageErr) => {
                                GlobalDataService.log(2, 'Errore in local storage', storageErr);
                            }
                        );
                        GlobalDataService.log(0, 'aggiornamentiApp non inizializzato', err);
                    });
            } else {
                // Non c'è bisogno di controlli perchè la piattaforma non è supportata
                resolve();
            }
        });

    }

    // Tenta di caricare i dati prendendoli dallo storage locale
    // Se non sono disponibili dati in locale, prova a caricarli da remoto
    oreDaUltimoAggiornamento(idServizio: number) {
        return new Promise((resolve, reject) => {
            this.storage.get(idServizio.toString()).then(
                (val) => {
                    // Se non ci sono dati in locale forziamo l'aggiornamento remoto
                    if (val != null) {
                        const oggi = new Date();
                        const ultimoCheck =  new Date(val['timestamp'] * 1000);
                        const oreTrascorse = GlobalDataService.differenzaOre(oggi, ultimoCheck);
                        resolve( oreTrascorse );
                    } else {
                        resolve( 999 );
                    }
                },
                (err) => {
                    GlobalDataService.log(0, 'Non posso caricare i dati del servizio ' + idServizio, err);
                    reject();
                });
        });
    }


    sottoscriviCalendario(codice, stato) {
        GlobalDataService.log(0, 'Sottoscrivo ' + codice + ' con stato ' + stato, null);

        return new Promise((resolve, reject) => {
            this.storage.get('token').then(
                (token) => {
                    GlobalDataService.log(1, 'Token ' + token, null);

                    this.token = token;
                    this.storage.get('uuid').then(
                        (uuid) => {

                            GlobalDataService.log(0, 'uuid: ' + uuid, null);

                            this.uuid = uuid;
                            if (this.uuid === undefined || this.uuid == null) {
                                this.uuid = 'uuid';
                            }

                            let body;
                            const url = this.urlSottoscrizioneCalendario;
                            body = {
                                token: this.token,
                                uuid: this.uuid,
                                codice: codice,
                                stato: stato
                            };

                            GlobalDataService.log(0, 'url: ' + url, null);
                            this.services.post(url, body).then(
                                (data) => {
                                    resolve(data);
                                },
                                (err) => {
                                    GlobalDataService.log(2, url, err);

                                    this.toastCtrl.create({
                                        message: 'Impossibile completare l\'operazione. Verificare la connessione ad Internet.',
                                        duration: 3000
                                    }).then(
                                        (toast) => {toast.present(); },
                                        (errToast) => { GlobalDataService.log(2, 'Errore Toast', errToast); });
                                    reject(err);
                                });
                        }, (err) => {
                            // TO BE CHECKED!
                            GlobalDataService.log(2, 'Errore', err);
                        });
                },
                (err) => {
                    GlobalDataService.log(2, 'Errore', err);
                });

        });
    }

    dataIsChanged(array1, array2) {
        GlobalDataService.log(0, 'Data1: ', array1);
        GlobalDataService.log(0, 'Data2: ', array2);

        if (array1 && array2) {
            if (array1.length !== array2.length) {
                GlobalDataService.log(0, 'Lunghezza diversa: ' + array1.length + ' contro ' + array2.length, null);

                return true;
            } else {
                GlobalDataService.log(0, 'Confronto gli elementi degli array ', null);

                array1.every(
                    (value, index) => {
                        if (value !== array2[index]) {
                            GlobalDataService.log(0, value + ' diverso da ' + array2[index], null);
                            return true;
                        }
                    });
            }
        } else {
            GlobalDataService.log(0, 'Solo uno nullo', null);
            if (array1 || array2) {
                return true;
            }
        }
        GlobalDataService.log(0, 'Identici o entrambi nulli', null);

        return false;
    }
}
