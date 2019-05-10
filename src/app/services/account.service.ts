import { Injectable } from '@angular/core';
import {GlobalDataService} from './global-data.service';
import {Md5} from 'ts-md5';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {NotificheService} from './notifiche.service';
import {SyncService} from './sync.service';
import {HttpService} from './http.service';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    logged: boolean;

    constructor(
        public storage: Storage,
        public services: HttpService,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public sync: SyncService,
        public globalData: GlobalDataService,
        public notificheService: NotificheService,
        public alertController: AlertController
    ) { }

    getUrlDisconnetti() {
        return this.globalData.getBaseUrl()  + 'disconnetti.php';
    }

    getUrlRegistra() {
        return this.globalData.getBaseUrl() + 'registra.php';
    }

    controllaAccount() {
        return new Promise((resolve, reject) => {
            this.storage.get('logged').then(
                (logged) => {
                    GlobalDataService.log(0, 'Logged', logged);
                    this.logged = logged;
                    this.globalData.logged = this.logged;
                    if (logged) {
                        resolve(this.logged);
                    } else {
                        reject(this.logged);
                    }
                }, (err) => {
                    this.logged = false;
                    this.globalData.logged = this.logged;
                    // Forse sarebbe meglio verificare se esiste il tokene ed eventualmente aggiornare tutto
                    GlobalDataService.log(1, 'logged non presente in storage', err);
                    reject(this.logged);
                }
            );
        });
    }


    salvaDatiLogin(username, password, tokenNotifiche, carriera) {

        const userRole = carriera['user_role'];
        this.globalData.userRole = userRole;
        this.globalData.logged = true;

        const promiseLogged = this.storage.set('logged', true);
        const nome = GlobalDataService.toTitleCase(carriera['nome']);
        const cognome = GlobalDataService.toTitleCase(carriera['cognome']);
        const promiseTokenNotifiche = this.storage.set('tokenNotifiche', tokenNotifiche);
        const promiseUsername = this.storage.set('username', username);
        const promisePassword = this.storage.set('password', Md5.hashStr(password));
        const promiseToken = this.storage.set('token', carriera['token']);
        const promiseNome = this.storage.set('nome', nome);
        const promiseCognome = this.storage.set('cognome', cognome);
        const promiseDipId = this.storage.set('dipID', carriera['dip_id']);
        const promiseDip = this.storage.set('nome_dip', carriera['nome_dip']);
        const promiseUserRole = this.storage.set('user_role', userRole);

        switch (userRole) {
            case 'student': {
                const promiseMatId = this.storage.set('matid', carriera['mat_id']);
                const promiseMatricola = this.storage.set('matricola', carriera['matricola']);
                const promiseCdsId = this.storage.set('cdsID', carriera['cds_id']);
                const promiseCds = this.storage.set('nome_cds', carriera['nome_cds']);
                const promiseSesso = this.storage.set('sesso', carriera['sesso']);

                Promise.all([promiseUserRole, promiseTokenNotifiche, promiseUsername, promisePassword,
                    promiseToken, promiseMatId, promiseMatId, promiseMatricola, promiseCdsId, promiseDipId,
                    promiseCds, promiseDip, promiseNome, promiseCognome, promiseSesso, promiseLogged]).then(
                    (datiStorage) => {
                        // TEST ONLY
                        // this.storage.set('nome', 'Mario');
                        // this.storage.set('cognome', 'Rossi');
                        // this.storage.set('username', 'm.rossi');
                        // this.storage.set('matricola', 123456);

                        GlobalDataService.log(2, 'Dati salvati nello storage locale', datiStorage);
                        this.notificheService.aggiornaSottoscrizioni();
                    }, (storageErr) => {
                        GlobalDataService.log(2, 'Errore in local storage', storageErr);
                    });
                break;
            }
            case 'teacher': {


                const promiseId = this.storage.set('id', carriera['id']);
                const promiseIdDocente = this.storage.set('id_docente', carriera['id_docente']);
                const promiseRuolo = this.storage.set('ruolo', carriera['ruolo']);
                const promiseEmail = this.storage.set('email', carriera['email']);

                Promise.all([promiseTokenNotifiche, promiseUsername, promisePassword,
                    promiseToken, promiseDipId, promiseDip, promiseNome, promiseCognome,
                    promiseId, promiseIdDocente, promiseRuolo, promiseEmail, promiseLogged]).then(
                    (datiStorage) => {
                        // TEST ONLY
                        // this.storage.set('nome', 'Mario');
                        // this.storage.set('cognome', 'Rossi');
                        // this.storage.set('username', 'm.rossi');
                        // this.storage.set('matricola', 123456);

                        GlobalDataService.log(2, 'Dati salvati nello storage locale', datiStorage);
                        this.notificheService.aggiornaSottoscrizioni();
                    }, (storageErr) => {
                        GlobalDataService.log(2, 'Errore in local storage', storageErr);
                    });
                break;
            }
        }
    }

    /**
     * Questa funziona effettua il login sul server unimol
     * @return 1 se in caso di successo (normalmente si avvia il tutorial)
     * @return 0 se l'utente è valido, ma già presente sul dispositivo (andiamo all Home)
     * @return Array<Carriera> se sono presenti più carriere attive assicare all'utente e non è stat indicata una matricola
     */
    login(username, password, matricola, cds_id, dip_id) {
        GlobalDataService.log(0, 'Login ' + username + ' ' + matricola + ' ' + cds_id + ' ' + dip_id, null);

        return new Promise((resolve, reject) => {
            const url = this.getUrlRegistra();

            const storedUsernamePromise = this.storage.get('username');
            const storedPasswordPromise = this.storage.get('password');
            const storedMatricolaPromise = this.storage.get('matricola');
            const storedIdDocentePromise = this.storage.get('id_docente');
            const storedNomePromise = this.storage.get('nome');
            const storedCognomePromise = this.storage.get('cognome');
            const hashedPassword = Md5.hashStr(password).toString();

            Promise.all([storedUsernamePromise, storedPasswordPromise, storedMatricolaPromise, storedIdDocentePromise, storedNomePromise, storedCognomePromise]).then(data => {
                const storedUsername = data[0];
                const storedPassword = data[1];
                let storedMatricola = data[2];
                let storedIdDocente = data[3];
                const storedNome = data[4];
                const storedCognome = data[5];

                if (!storedMatricola) {
                    storedMatricola = '';
                }

                if (!storedIdDocente) {
                    storedIdDocente = '';
                }


                // Se è presente un utente, allora ha effettuato il Logout bloccando il dispositivo
                if ((storedUsername) && (storedPassword)) {
                    // Se si prova ad entrare con un utente differente, neghiamo l'accesso
                    // in quanto i dati nello storage sono relativi all'ultimo utente registrato
                    if (username !== storedUsername) {
                        this.toastCtrl.create({
                            message: 'Questo dispositivo è attualmente associato all\'utente ' + storedUsername,
                            duration: 3000
                        }).then(toast => {
                                toast.present();
                                reject('Dispositivo già associato a ' + storedUsername);
                            },
                            (err) => {
                                GlobalDataService.log(2, 'Toast fallito!', err);
                                reject('Errore toast');
                            });
                    } else if (hashedPassword === storedPassword.toString() &&
                        ( (matricola === '' && storedMatricola.toString() === '')
                            || ( matricola = storedIdDocente.toString()))
                            || (matricola === '' && storedIdDocente.toString() === '')
                        || ( matricola = storedIdDocente.toString())) {
                        // Utente e password coincidono con quelle dell'ultmo utente registrato
                        this.storage.get('sesso').then(
                            (sesso) => {
                                if (sesso === 'F') {
                                    this.toastCtrl.create({
                                        message: 'Bentornata ' + storedNome,
                                        duration: 3000
                                    }).then(
                                        (toast) => {toast.present(); },
                                        (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
                                } else {
                                    this.toastCtrl.create({
                                        message: 'Bentornato ' + storedNome,
                                        duration: 3000
                                    }).then(
                                        (toast) => {toast.present(); },
                                        (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
                                }
                            }, () => {
                                this.toastCtrl.create({
                                    message: 'Bentornato ' + storedNome,
                                    duration: 3000
                                }).then(
                                    (toast) => {toast.present(); },
                                    (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
                            });

                        this.storage.set('logged', true).then(
                            () => {
                                resolve ('unlocked');
                            }, (storageErr) => {
                                GlobalDataService.log(2, 'Errore in local storage', storageErr);
                                reject(storageErr);
                            }
                        );
                    } else {
                        // Password errata per l'utente registrato
                        this.toastCtrl.create({
                            message: 'Dati utente non corretti',
                            duration: 3000
                        }).then(
                            (toast) => {
                                toast.present();
                                reject('Dati errati');
                            },
                            (err) => {
                                GlobalDataService.log(2, 'Toast fallito!', err);
                                reject('Errore storage');
                            });
                    }
                } else {
                    // Nessun utente connesso. Effettuiamo la registazione
                    this.storage.get('tokenNotifiche').then(
                        (tokenNotifiche) => {

                            // const body = JSON.stringify({
                            const body = {
                                username: username,
                                password: password,
                                matricola: matricola,
                                cds_id: cds_id,
                                dip_id: dip_id,
                                tokenNotifiche: tokenNotifiche
                            };

                            GlobalDataService.log(0, 'Chiamo ' + url, body);

                            // this.http.post(url, body)
                            //     .pipe(timeout(this.getTimeout()))
                            //     .subscribe(
                            this.services.getJSON(url, body).then(
                                (esitoRegistrazione) => {
                                    GlobalDataService.log(0, 'Esito Registrazione', esitoRegistrazione);

                                    // const cod = esitoRegistrazione.json();
                                    const codice = esitoRegistrazione['codice'];
                                    const carriera = esitoRegistrazione;
                                    const carriere = esitoRegistrazione['carriere'];

                                    if (codice === 0) {
                                        // Se l'utente è valido ma è diverso dall'utente connesso
                                        // cancelliamo i dati precedentemente memorizzati
                                        if ((username !== storedUsername)) {
                                            this.storage.clear().then(
                                                () => {
                                                    this.notificheService.rimuoviSottoscrizioni().then(
                                                        () => {
                                                            this.salvaDatiLogin(username, password, tokenNotifiche, carriera);
                                                            resolve ('logged');
                                                        }, (err => {
                                                            GlobalDataService.log(2, 'Errore rimozione sottoscrizioni', err);
                                                            reject(err);
                                                        })
                                                    );
                                                }, (storageErr) => {
                                                    GlobalDataService.log(2, 'Clear storage fallito', storageErr);
                                                    reject(storageErr);
                                                }
                                            );
                                        } else {
                                            this.salvaDatiLogin(username, password, tokenNotifiche, carriera);
                                            resolve ('logged');
                                        }
                                    } else {
                                        if (codice === 2) {
                                            GlobalDataService.log(1, 'Carriere multiple', carriere);
                                            resolve ( carriere );
                                        } else {
                                            this.toastCtrl.create({
                                                message: esitoRegistrazione['messaggio'],
                                                duration: 3000
                                            }).then(
                                                (toast) => {
                                                    toast.present();
                                                    reject( esitoRegistrazione['messaggio'] );
                                                }, (err) => {
                                                    GlobalDataService.log(2, 'Toast fallito!', err);
                                                    reject( err );
                                                });
                                        }
                                    }

                                },
                                (err) => {
                                    GlobalDataService.log(2, 'Errore ' + url, err);

                                    let cod: number;
                                    let messaggio: string;
                                    cod = err.status;

                                    switch (cod) {
                                        case 0: {
                                            messaggio = 'Impossibile contattare il Portale. Verificare la connessione ad Internet';
                                            break;
                                        }
                                        case 400: {
                                            messaggio = 'Dati non validi. ' + err.error;
                                            break;
                                        }
                                        case 409: {
                                            messaggio = 'Utente già registrato';
                                            break;
                                        }
                                        default: {
                                            if (err.message) {
                                                messaggio = err.message;
                                            } else {
                                                messaggio = 'Si è verificato un errore con l\'autenticazione';
                                            }
                                        }
                                    }

                                    this.toastCtrl.create({
                                        message: messaggio,
                                        duration: 3000
                                    }).then(
                                        (toast) => {
                                            toast.present();
                                            reject(messaggio);
                                        },
                                        (toastErr) => {
                                            GlobalDataService.log(2, 'Toast fallito!', toastErr);
                                            reject(toastErr);
                                        });
                                });
                        }, (rej) => {
                            // Nessun Token Notifiche
                            GlobalDataService.log(2, 'Nessun Token Notifiche' + url, rej);
                            reject(rej);
                        }).catch((ex) => {
                        GlobalDataService.log(2, 'Eccezione in ' + url, ex);
                        reject(ex);
                    });
                }
                // else (nessun utente connesso)
            }, (err) => {
                // TO BE CHECKED!
                GlobalDataService.log(2, 'Errore nella lettura dei dati dallo storage!', err);
                reject(err);
            });
        });
    }

    disconnetti(token: string) {
        return new Promise((resolve, reject) => {
            this.loadingCtrl.create({
                message: 'Attendere...'
            }).then((loading) => {
                loading.present();

                this.services.post(this.getUrlDisconnetti(), {token: token}).then(
                    (response) => {
                        loading.dismiss();
                        if (response) {

                            this.toastCtrl.create({
                                message: 'Il dispositivo è stato disconnesso.',
                                duration: 5000
                            }).then(
                                (toast) => {
                                    toast.present();
                                },
                                (toastErr) => {
                                    GlobalDataService.log(2, 'Toast fallito!', toastErr);
                                });
                            // this.navCtrl.pop();
                            resolve(true);
                        } else {
                            this.toastCtrl.create({
                                message: 'Si è verificato un problema durante l\'elaborazione della richiesta.',
                                duration: 5000
                            }).then(
                                (toast) => {
                                    toast.present();
                                },
                                (toastErr) => {
                                    GlobalDataService.log(2, 'Toast fallito!', toastErr);
                                });
                            reject();
                        }
                    },
                    err => {
                        loading.dismiss();
                        GlobalDataService.log(
                            2,
                            'Nessuna connessione ad Internet',
                            err);
                        this.toastCtrl.create({
                            message: 'Nessuna connessione ad Internet. ' +
                            'Per poter scollegare un dispoditivo devi essere connesso ad Internet.',
                            duration: 10000
                        }).then(
                            (toast) => {
                                toast.present();
                                reject();
                            },
                            (toastErr) => {
                                GlobalDataService.log(2, 'Toast fallito!', toastErr);
                                reject();
                            });
                    });
            }, (errLoading) => {
                GlobalDataService.log(2, 'Loading fallito!', errLoading);
                reject();
            });
        });
    }

    disconnettiNoDialogs(token: string) {
        return new Promise((resolve, reject) => {
            this.services.post(this.getUrlDisconnetti(), { token: token }).then( (response) => {
                    if (response) {
                        resolve(true);
                    } else {
                        reject();
                    }
                }, err => {
                    GlobalDataService.log(2, 'Nessuna connessione ad Internet', err);
                });
        });
    }

    controlloDispositiviConnessi() {
        let numDevices = 0;
        let keyServizioDispositivi = '19';
        this.storage.get(keyServizioDispositivi).then((data) => {
            numDevices = data[0].length;
            if (numDevices > 1) {
                this.alertController.create({
                    header: 'Rilevati più dispositivi',
                    message: 'Hai più dispositivi collegati al tuo account, vuoi andare alla sezione dei dispositivi connessi?',
                    buttons: [
                        {
                            text: 'Vai',
                            handler: () => {
                                this.globalData.goTo('', '/accounts', 'forward', false);
                            }
                        },
                        {
                            text: 'Chiudi',
                            role: 'cancel',
                            cssClass: 'secondary'
                        }
                    ]
                }).then((alert) => alert.present());
            }
        });
    }
}
