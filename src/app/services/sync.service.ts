import { Injectable, NgZone } from '@angular/core';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
// import {Md5} from 'ts-md5';
import { Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Device } from '@ionic-native/device/ngx';
// import {FCM} from '@ionic-native/fcm/ngx';

import 'rxjs/add/operator/map';
import { GlobalDataService } from './global-data.service';
import { NotificheService } from './notifiche.service';
import { HttpService } from './http.service';
import { CryptoService } from './crypto.service';
// import {timeout} from 'rxjs/operators';

/*
ID SERVIZI
"APPELLI', 1
'NEW PIANO DI STUDIO', 112
'NEW PROPEDEUTICITÀ', 113
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
'SERVIZIO_ORARIO', 17
'SERVIZIO_MATERIALE_DIDATTICO', 18
'SERVIZIO_ACCOUNTS', 19                        //
*/

@Injectable({
    providedIn: 'root'
})

export class SyncService {
    private user = 'username';
    private mat_id = 'matid';
    private psw = 'psw';
    private uuid = 'virtual';
    private token = 'token';
    private tokenNotifiche = 'tokenNotifiche';
    private params: string[];

    private passphrase: string;

    loading = [];
    dateUltimiAggiornamenti = [];

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
                public globalData: GlobalDataService,
                public crypto: CryptoService) {

        this.storage.get('passphrase_key').then(
            (key) => {
                this.passphrase = key;
            });


    }

    getTimeout() {
        return this.timeout;
    }

    getUrlSync() {
        return this.globalData.getBaseUrl() + 'sincronizza.php';
    }

    getUrlConfermaRegistrazione() {
        return this.globalData.getBaseUrl() + 'confermaRegistrazione.php';
    }

    getUrlAppelliPrenotabili() {
        return this.globalData.getBaseUrl() + 'appelliPrenotabili.php';
    }

    getUrlPreferenzeNotifiche() {
        return this.globalData.getBaseUrl() + 'salvaPreferenzeNotifiche.php';
    }

    getUrlAggiornaTokenNotifiche() {
        return this.globalData.getBaseUrl() + 'aggiornaTokenNotifiche.php';
    }

    getUrlAggiornaDeviceInfo() {
        return this.globalData.getBaseUrl() + 'aggiornaDeviceInfo.php';
    }

    getUrlControllaMessaggi() {
        return this.globalData.getBaseUrl() + 'controllaMessaggi.php';
    }

    getUrlReimpostaMessaggi() {
        return this.globalData.getBaseUrl() + 'reimpostaMessaggi.php';
    }

    getUrlUltimaVersione() {
        return this.globalData.getBaseUrl() + 'ultimaVersione.php';
    }

    getUrlSottoscrizioneCalendario() {
        return this.globalData.getBaseUrl() + 'sottoscrizioneCalendario.php';
    }

    getUrlDettaglioAppello() {
        return this.globalData.getBaseUrl() + 'dettaglioAppello.php';
    }

    getUrlCheckToken() {
        return this.globalData.getBaseUrl() + 'checkToken.php';
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

    getUrlAnnoCorrente() {
        return this.globalData.getBaseUrl() + 'annoCorrente.php';
    }

    sincronizza() {
        let elencoServizi = [];

        switch (this.globalData.userRole) {
            case 'student':
                elencoServizi = [ 112, 1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 113 ];
                break;
            case 'teacher':
                elencoServizi = [ 7, 13, 14, 16, 19, 102];
                break;
            default:
                elencoServizi = [ 7, 19 ];
        }


        if (this.platform.is('ios') || (this.platform.is('android'))) {
            /*this.aggiornaDeviceInfo().then(
                () => {
                    GlobalDataService.log(0, 'Aggiornato il Device', null);
                }, (err) => {
                    GlobalDataService.log(2, 'Impossibile aggiornare le info sul device', err);
                }
            );*/
            this.controllaVersione().then(
                () => {
                    GlobalDataService.log(0, 'Constollo versione OK', null);
                }, (err) => {
                    GlobalDataService.log(2, 'Impossibile controllare la versione dell\'app', err);
                }
            );
        }

        for (const i of elencoServizi) {
            this.getJson(i, null, true).then(
                (data) => {
                    GlobalDataService.log(0, 'Recuperato servizio ' + i, data);
                },
                (err) => {
                    GlobalDataService.log(0, 'Non Recuperato servizio ' + i, err);
                });
        }
    }

    /**
     * Questa funzione restituisce true se il servizio è attualmente in aggiornamento,false altrimenti.
     * @param idServizio: id del servizio
     */
    isLoading(idServizio: number): boolean {
        return this.loading[idServizio];
    }

    /**
     * Questa funzione restiuiscre la data dell'ultimo aggiornamento del servizio.
     * @param idServizio: id del servizio
     */
    getDataUltimoAggiornamento(idServizio: number): string {
        if (!this.dateUltimiAggiornamenti[idServizio]) {
            return 'Mai';
        }

        if (this.dateUltimiAggiornamenti[idServizio] == 'in corso...') {
            return 'in corso...';
        }

        return GlobalDataService.timestamp2string(this.dateUltimiAggiornamenti[112]);
    }



    getJson(id: number, params: string[], sync: boolean) {
        this.params = params;
        return new Promise((resolve, reject) => {
            this.storage.get(id.toString()).then(
                (data) => {
                    if (data && (data[0] || data['timestamp'])) {
                        if (sync) {
                            this.getJsonLista(id, params).then(); // Aggiornamento in background
                        }
                        resolve(data);
                    } else {
                        this.getJsonLista(id, params).then(
                            (dati) => resolve(dati),
                            (err) => reject(err)
                        ).catch(err => reject(err));
                    }
                }, () => this.getJsonLista(id, params).then(
                    (data) => resolve(data),
                    (err) =>  reject(err)
                ).catch(err => reject(err))
            ).catch(err =>  reject(err));
        });
    }

    private getJsonLista(id: number, params: string[]) {
        //  let jsonLista = [];
        if (id == null) {
            return;
        }

        return new Promise((resolve, reject) => {
            if ( (!params) && (this.globalData.archive[id]) ) {
                // Async update
                this.updateJson(id, params);
                // Return cached data
                resolve(this.globalData.archive[id]);
            } else {
                // Default sync
                return this.updateJson(id, params);
            }
        });
    }

    private updateJson(id: number, params: string[]) {
        //  let jsonLista = [];
        if (id == null) {
            return;
        }

        return new Promise((resolve, reject) => {
            this.loading[id] = true;
            this.dateUltimiAggiornamenti[id] = 'in corso...';
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



                            console.log(this.passphrase + ' - ' +
                                this.token + ' - ' +
                                this.uuid + ' - ' +
                                id.toString() + ' - ' +
                                this.params);

                            const token_cifrato = this.crypto.CryptoJSAesEncrypt(this.passphrase, this.token);
                            const uuid_cifrato = this.crypto.CryptoJSAesEncrypt(this.passphrase, this.uuid);
                            const id_servizio_cifrato = this.crypto.CryptoJSAesEncrypt(this.passphrase, id.toString());
                            let parametri_cifrati;
                            if (this.params == null) {
                                parametri_cifrati = this.crypto.CryptoJSAesEncrypt(this.passphrase, this.params);
                            } else {
                                parametri_cifrati = this.crypto.CryptoJSAesEncrypt(this.passphrase, this.params.toString());
                            }


                            const body = {
                                token: token_cifrato,
                                uuid: uuid_cifrato,
                                id_servizio: id_servizio_cifrato,
                                parametri: parametri_cifrati
                            };

// console.log('[+]-->');
// console.log(url);
// console.log(body);
                            this.services.getJSON(url, body).then(
                                (dati) => {
                                    let dec = this.crypto.CryptoJSAesDecrypt(this.passphrase, dati['cifrato']);
                                    dec = JSON.parse(dec);
                                    // console.log(dec);
                                    if (dec) {
                                        this.globalData.archive[id] = dec;
                                        this.storage.set(id.toString(), dec).then(
                                            () => {
                                            }, (storageErr) => {
                                                GlobalDataService.log(2, 'Errore in local storage', storageErr);
                                            }
                                        );
                                        // this.storage.set(id.toString() + '_timestamp', dati['timestamp']);
                                    }

                                    this.dateUltimiAggiornamenti[id] = dati['timestamp'];
                                    this.loading[id] = false;
                                    resolve(dec);
                                },
                                (rej) => {
//  console.log('[+]rej-->');
// console.log(rej);
                                    this.loading[id] = false;
                                    if (rej.error) {
                                        const errore = JSON.parse(rej.error);
                                        const stato = rej.status;
                                        const codice = errore.codice;

                                        if (stato === 401 && codice === -2) {
                                            GlobalDataService.log(1, 'Token scaduto', null);

                                            let storedUsername = this.storage.get('username');
                                            let storedPassword = this.crypto.CryptoJSAesDecrypt(this.passphrase, this.storage.get('password'));

                                            Promise.all([storedUsername, storedPassword]).then(
                                                data => {
                                                    storedUsername = data[0];
                                                    storedPassword = data[1];

                                                    url = this.getUrlCheckToken();
                                                    const bodyCheckToken = {
                                                        token: this.token,
                                                        username: storedUsername,
                                                        password: storedPassword
                                                    };

                                                    // TODO: Gestire cambio password da ESSE3
                                                    this.ngZone.run(() => {
                                                        this.services.post(url, bodyCheckToken).then(
                                                            () => {
                                                                this.getJsonLista(id, params).then(
                                                                    (res) => {
                                                                        GlobalDataService.log(0, 'getJsonLista', res);
                                                                    }, (err) => {
                                                                        GlobalDataService.log(2, 'getJsonLista reject', err);
                                                                    }
                                                                );
                                                            }
                                                        );


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

        }, (err) => {
            // Non aggiorniamo
            GlobalDataService.log(2, 'Il token non è presente', err);
        });
    }

    aggiornaDeviceInfo(tokenNotifichePar: string) {

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
                                        uuid: this.device.uuid,
                                        tokenNotifiche: tokenNotifichePar
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

    aggiornaAnnoCorrente() {
        return new Promise((resolve, reject) => {

            // verifichiamo la presenza di un aggiornamento solo se non lo abbiamo già fatto nelle ultime 24 ore
            this.storage.get('lastCheckAA').then(
                (data) => {
                    const oggi = new Date();
                    const ultimoCheck = new Date(data);
                    const oreTrascorse = GlobalDataService.differenzaOre(oggi, ultimoCheck);
                    if ((data != null) && (oreTrascorse < 24)) {
                        resolve(true);
                        return;
                    }

                    this.storage.set('lastCheckAA', oggi);

                    this.services.post(this.getUrlAnnoCorrente(), {token: this.token}).then(
                        (response) => {
                            if (response) {
                                if (response != null) {
                                    const annoCorrente: string = response.toString();
                                    this.storage.set('annoCorrente', annoCorrente);
                                }
                            }
                        },
                        (err) => {
                            console.log('Non è possibile ricevere dati ora.' + err);
                            reject(err);
                        }
                    );
                }, (err) => {
                    // Se non abbiamo mai salvato l'ultimo check, inizializziamolo ad oggi
                    this.storage.set('lastCheckAA', new Date(75, 2, 20).getTime());
                    this.services.post(this.getUrlAnnoCorrente(), {token: this.token}).then(
                        (response) => {
                            if (response) {
                                if (response != null) {
                                    const annoCorrente: string = response.toString();
                                    this.storage.set('annoCorrente', annoCorrente);
                                }
                            }
                        },
                        (error) => {
                            console.log('Non è possibile ricevere dati ora.' + error);
                            reject(err);
                        }
                    );
                }
            );
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
                                                                    case 'Android': {
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
                        const ultimoCheck = new Date(val['timestamp'] * 1000);
                        const oreTrascorse = GlobalDataService.differenzaOre(oggi, ultimoCheck);
                        resolve(oreTrascorse);
                    } else {
                        resolve(999);
                    }
                },
                (err) => {
                    GlobalDataService.log(0, 'Non posso caricare i dati del servizio ' + idServizio, err);
                    reject();
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
