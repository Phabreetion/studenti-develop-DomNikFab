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
import {ToastsService} from './toasts.service';
import {Md5} from 'ts-md5';
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
'SERVIZIO_ACCOUNTS', 19
*/

//numero massimo di possibili rinivii della richiesta di aggiornamento di un servizio
const MAX_RINVII = 5;

@Injectable({
    providedIn: 'root'
})

export class SyncService {
    //perchè avere queste variabili di classe?
    //rendere sono inutili perchè in ogni caso le info vengono ripescate dallo storage
    //forse si farà qualcosa con la crittografia
    private user = 'username';
    private mat_id = 'matid';
    private psw = 'psw';
    private uuid = 'virtual';
    private token = 'token';
    private tokenNotifiche = 'tokenNotifiche';
    private params: string[];


    loading = [];

    //array di stringhe per memorizzare le date dell'ultimo aggiornamento dei servizi
    dateUltimiAggiornamenti = [];

    //array di interi per memorizzare il numero di rinvii che un servizio ha richiesto
    numRinvii = [];

    //array di booleani per memorizzare di quali serzivi è in corso il rinvioo della richiesta di aggiornamento
    rinvioAggiornamento = [];


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

    /**
     * Restituisce il body per la richiesta HTTP da inviare al Sincronizzatore
     *
     * @param token:
     * @param uuid:
     * @param id_servizio:
     * @param params:
     *
     * @return il body per
     */
    static getBodyPerRichiestaAlSync(token: string, uuid: string, id_servizio: number, params: string[]) {
        return {
            token: token,
            uuid: uuid,
            id_servizio: id_servizio,
            params: params
        };
    }

    constructor(public storage: Storage,
                public http: HttpService,
                public device: Device,
                public platform: Platform,
                public appVersion: AppVersion,
                public notificheService: NotificheService,
                // public market: Market,
                public toastCtrl: ToastController, //cercare di rimuoverlo per passare direttamente a toastService!!!!
                public alertCtrl: AlertController,
                public loadingCtrl: LoadingController,
                public ngZone: NgZone,
                public globalData: GlobalDataService,
                public toastService: ToastsService,
                public crypto: CryptoService) {
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
                elencoServizi = [1, 5, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 113]; //rimossi servizi non più utilizzati -> pulizzato tutto
                //elencoServizi = [1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 113];
                break;
            case 'teacher':
                elencoServizi = [7, 13, 14, 16, 19, 102];
                break;
            default:
                elencoServizi = [7, 19];
        }


        if (this.platform.is('ios') || (this.platform.is('android'))) {
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
     *
     * @param idServizio: id del servizio
     */
    isLoading(idServizio: number): boolean {
        return this.loading[idServizio];
    }

    /**
     * Questa funzione restiuiscre la data dell'ultimo aggiornamento del servizio.
     *
     * @param idServizio: id del servizio
     */
    getDataUltimoAggiornamento(idServizio: number): string {
        if (!this.dateUltimiAggiornamenti[idServizio]) {
            return 'Mai';
        }

        if (this.isLoading(idServizio)) {
            return 'in corso...';
        }

        return GlobalDataService.timestamp2string(this.dateUltimiAggiornamenti[idServizio]);
    }

    /**
     * Questa funzione restiuiscre il numero di rinvii della richiesta di aggiornamento di un servizio.
     *
     * @param idServizio: id del servizio
     */
    getNumRinivii(idServizio: number): number {
        return this.numRinvii[idServizio];
    }

    /**
     * Questa funzione aggiorna il servizio richiesto e restituisce i dati aggiornati.
     * Se il servizio è momentaneamente in attesa verranno fatti 5 tentativi.
     * Usare questa funzione solamente con un evento del tipo ion-refresher.
     * Se non riesce ad ottenere un json aggiornato non risolve nulla...
     *
     * @param id: id del servizio da aggiornato
     * @param params: da passare al servizio
     */
    getJsonAggiornato(id: number, params: string[]): Promise<any> {
        console.log(this.loading);
        console.log(this.numRinvii);
        //console.log(this.dateUltimiAggiornamenti);

        return new Promise((resolve, reject) => {
            if (!this.isLoading(id)) {
                //se il servizio non è occupato risolvi i dati aggiornati dal server
                console.log('inizio a scaricare');
                this.updateJson(id, params).then(
                    (dati) => {
                        this.numRinvii[id] = 0;
                        resolve(dati);
                    },
                    (err) => reject(err)
                ).catch((err) => reject(err));
            } else if (this.numRinvii[id] < MAX_RINVII) {
                //se impegnato tieni in attesa per massimo 10 secondi, nella speranza che il servizio sia nuovamente disponibile
                console.log('servizio occupato');
                if (this.http.connessioneLenta) {
                    //in caso di connessione lenta esci mostrano un toast
                    this.numRinvii[id] = 0;
                    this.toastService.connessioneLenta();
                    console.log('connessione lenta');
                    reject();
                }
                console.log('richiamo');
                this.numRinvii[id]++;
                //rimanda tra 2 secondi
                setTimeout(() => {
                    resolve(this.getJsonAggiornato(id, params));
                }, 2000);
            } else {
                //non è possibile aggiornare i dati
                reject();
            }
        });
    }

    /**
     * Questa funzione restituisce gli ultimi dati presenti nella cache o nello Storage dell'app.
     * Se questi ultimi non sono presenti, verrano recuperati dal server.
     *
     * @param id: id del servizio
     * @param params: parametri da inserire in un eventuale richiesta di aggiornamento
     * @param sync: true se si vuole avviare un aggiornamento dei dati in background, false se si vogliono solamente recuperare gli ultimi dati dallo storage.
     */
    getJson(id: number, params: string[], sync: boolean) {
        /*console.log(this.loading);
        console.log(this.numRinvii);
        console.log(this.dateUltimiAggiornamenti);*/

        this.params = params;
        return new Promise((resolve, reject) => {

            //Viene avviato un aggiornamento in background
            if (sync) {
                this.updateJson(id, params).then();
            }

            // se ci sono dati nella cache risolvi
            if ((!params) && (this.globalData.archive[id])) {
                console.log(id + ' -> prelevo da cache');
                resolve(this.globalData.archive[id]);
                return;
            }

            //se non presenti nella cache prova a prendeli dallo storage
            //se nello storage non sono presenti dati viene
            this.storage.get(id.toString()).then(
                (data) => {
                    //se i dati sono avvalorati devono essere risolti
                    if (data && (data[0] || data['timestamp'])) {
                        console.log(id + ' -> prelevo da storage');

                        //salva nella cache i dati reperiti dallo storage se quest'ultimo è vuoto
                        if (!this.globalData.archive[id]) {
                            this.globalData.archive[id] = data;
                        }
                        //se la data ultimo aggiornamento non è disponibile in ram usa questa
                        if (!this.dateUltimiAggiornamenti[id]) {
                            this.dateUltimiAggiornamenti[id] = data['timestamp'];
                        }

                        resolve(data);
                        return;
                    } else {
                        //cerca di risolvere i dati dal server
                        this.updateJson(id, params).then(
                            (dati) => resolve(dati),
                            (err) => reject(err)
                        ).catch(err => reject(err));
                    }
                }
            );
        });
    }

    /**
     * Restituisce una promise con il json aggiornato.
     * La promessa viene risolta se e solo se l'app riesce a scaricare dal server il json aggiornato
     * La promessa viene rifiutata se il token non è valido oppure se la connessione è assente
     *
     * @param id: servizio
     * @param params: eventuali parametri passati alla richiesta al server
     */
    private updateJson(id: number, params: string[]) {
        //  let jsonLista = [];
        if (id == null) {
            return;
        }

        return new Promise((resolve, reject) => {
            //inizio del caricamento del servizio
            this.loading[id] = true;

            //Promise per ottente i dati dallo storage
            const pToken = this.storage.get('token');
            const pUuid = this.storage.get('uuid');
            const pPassPhrase = this.storage.get('passphrase_key');
            const pPassword = this.storage.get('password');

            Promise.all([pToken, pUuid, pPassPhrase, pPassword]).then((data) => {
                const token = data[0];
                const uuid = data[1];
                const passphrase = data[2];
                const password = data[3];

                // Nessun token -> La richiesta verrà respina sicuramente
                // Comunica all'utente di rieffettuare la login
                if (token === undefined || token == null || token === '') {
                    this.loading[id] = false;
                    this.toastService.tokenNonDisponibile();
                    reject('Token non valido');
                }

                // Nessun uuid -> forse versione web
                if (uuid === undefined || uuid == null || uuid === '') {
                    this.uuid = 'uuid';
                    this.storage.set('uuid', 'uuid').then();
                }

                //Costruiamo la richiesta http da inviare al server
                const url = this.getUrlSync();

                console.log(passphrase + ' - ' +
                                token + ' - ' +
                                uuid + ' - ' +
                                id.toString() + ' - ' +
                                this.params);

                /*console.log('token' + token);
                console.log('passphrase' + passphrase);
                const token_cifrato = this.crypto.CryptoJSAesEncrypt(passphrase, token);
                const uuid_cifrato = this.crypto.CryptoJSAesEncrypt(passphrase, uuid);
                const id_servizio_cifrato = this.crypto.CryptoJSAesEncrypt(passphrase, id.toString());
                let parametri_cifrati;
                if (this.params == null) {
                    parametri_cifrati = this.crypto.CryptoJSAesEncrypt(passphrase, this.params);
                } else {
                    parametri_cifrati = this.crypto.CryptoJSAesEncrypt(passphrase, this.params);
                }*/

                const password_cifrata = this.crypto.CryptoJSAesEncrypt(passphrase, password);


                /*const body = {
                    token: token_cifrato,
                    uuid: uuid_cifrato,
                    id_servizio: id_servizio_cifrato,
                    parametri: parametri_cifrati
                };*/

                const body1 = {
                    token: token,
                    uuid: uuid,
                    id_servizio : id,
                    password: password
                    //parametri: params
                };


                console.log('[+]-->');
                console.log(url);
                console.log(body1);

                this.http.getJSON(url, body1).then((dati) => {
                    /*let dec = '';
                    try {
                        dec = this.crypto.CryptoJSAesDecrypt(passphrase, dati['cifrato']);
                    } catch (e) {
                        this.toastService.toastGenerico('Errore nella decriptazione del json.');
                        this.loading[id] = false;
                        reject();
                        return;
                    }

                    dec = JSON.parse(dec);*/

                    if (dati) {
                        this.globalData.archive[id] = dati;
                        this.salvaJSon(id, dati);
                    }

                    this.dateUltimiAggiornamenti[id] = dati['timestamp'];
                    this.loading[id] = false;
                    resolve(dati);
                }, (rej) => {
                    this.loading[id] = false;
                    //richiesta al server fallita
                    //esamino la risposta per trovare le cause del fallimento

                    console.log('[-]rej-->');
                    console.log(rej);

                    //offline -> il dispositivo non è connesso ad internet
                    if (rej.status === 0) {
                        //mostra all'utente un messaggio di errore
                        this.toastService.connessioneOff();
                        reject('Connessione assente');
                        return;
                    }

                    //il token non è più valido -> al momento il token scade dopo 10 min di inutilizzo
                    if ( (rej.status === 401) || (rej.error && rej.error.codice === -2) ) {
                        GlobalDataService.log(4, 'Token scaduto', null);

                        //aggiorna il token
                        //se l'aggiornamento non va a buon fine viene segnalato all'utente
                        //se l'aggiornamento va a buon fine viene ritentato updateJson
                        this.refreshToken(token, passphrase).then(
                            () => {
                                this.updateJson(id, params).then(
                                    (newData) => resolve(newData),
                                    () => reject()
                                );
                            },
                            () => {
                                this.toastService.impossibileAggiornareIlToken();
                                reject();
                            }
                        );
                    } else {
                        this.loading[id] = false;
                    }
                });
            });
        });
    }

    /**
     * Questa funzione salva un JSON nello Storage locale dell'app.
     * Il JSON verrà salvato nella posizione dello Storage corrispondente all'id del servizio.
     *
     * @param id: id del servizio, posizione nello storage dove verrà salvato il JSON
     * @param json: JSON fa salvare nello Storage
     */
    private salvaJSon(id: number, json: any) {
        this.storage.set(id.toString(), json).then(
            () => {
            }, (storageErr) => {
                GlobalDataService.log(2, 'Errore in local storage', storageErr);
            }
        );
    }

    /**
     * Ritorna una promessa che verrà risolta se il token verà aggiornato con successo, rifutata altrimenti
     *
     * @param token: token da aggiornare
     */
    private refreshToken(token, passphrase) {
        return new Promise((resolve, reject) => {
            let storedUsername = this.storage.get('username');
            let storedPassword = this.crypto.CryptoJSAesDecrypt(passphrase, this.storage.get('password'));

            Promise.all([storedUsername, storedPassword]).then(
                data => {
                    storedUsername = data[0];
                    storedPassword = data[1];

                    //@TODO gestire meglio questa cosa
                    if (!storedUsername || !storedPassword) {
                        console.log('probabile errore con username e password');
                        reject();
                    }

                    const url = this.getUrlCheckToken();
                    const bodyCheckToken = {
                        token: token,
                        username: storedUsername,
                        password: storedPassword
                    };

                    // TODO: Gestire cambio password da ESSE3
                    this.ngZone.run(() => {
                        this.http.post(url, bodyCheckToken).then(
                            () => resolve(),
                            () => reject()
                        );
                    });
                });
        });
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

            this.http.post(url, body).then(
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
                                    this.http.post(url, body).then(
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

                    this.http.post(this.getUrlAnnoCorrente(), {token: this.token}).then(
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
                    this.http.post(this.getUrlAnnoCorrente(), {token: this.token}).then(
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

                    this.http.post(urlControllaMessaggi, body).then(
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

                                    this.http.post(urlReimpostaMessaggi, body).then(
                                        () => {
                                            // const testo = String.fromCodePoint(0x1F354);
                                            GlobalDataService.log(1, 'Messaggi reimpostati', null);
                                            this.alertCtrl.create({
                                                header: 'Messaggio da Unimol',
                                                subHeader: messaggio,
                                                buttons: ['Chiudi']
                                            }).then((alert) => {
                                                    alert.present();
                                                },
                                                (err) => {
                                                    GlobalDataService.log(2, urlReimpostaMessaggi, err);
                                                });

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

    //TODO->a che serve? non la usa nessuno? togliamo?
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
                                    this.http.post(urlUltimaVersione, body)
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

    //@TODO -> chiedere se possibile rimuovere non è utilizzata da nessuna parte, forse fa la stessa cosa del caching
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


    //@TODO a che serve? non la usa nessuno! leviamo?
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
                            const url = this.getUrlSottoscrizioneCalendario();
                            body = {
                                token: this.token,
                                uuid: this.uuid,
                                codice: codice,
                                stato: stato
                            };

                            GlobalDataService.log(0, 'url: ' + url, null);
                            this.http.post(url, body).then(
                                (data) => {
                                    resolve(data);
                                },
                                (err) => {
                                    GlobalDataService.log(2, url, err);

                                    this.toastCtrl.create({
                                        message: 'Impossibile completare l\'operazione. Verificare la connessione ad Internet.',
                                        duration: 3000
                                    }).then(
                                        (toast) => {
                                            toast.present();
                                        },
                                        (errToast) => {
                                            GlobalDataService.log(2, 'Errore Toast', errToast);
                                        });
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
