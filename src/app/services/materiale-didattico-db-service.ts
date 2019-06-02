import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {AlertController, LoadingController, Platform} from '@ionic/angular';
import {File} from '@ionic-native/file/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {ToastsService} from './toasts.service';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser/ngx';
import {GlobalDataService} from './global-data.service';
import {SyncService} from './sync.service';
import {Allegato} from '../models/Allegato';

@Injectable({
    providedIn: 'root'
})
export class MaterialeDidatticoDbService {

    public database: SQLiteObject;

    dbOptions: any = {
        name: 'unimol-studenti.db',
        location: 'default'
    };

    urlAllegatoTest: string = this.globalData.baseurl + '/test_json/test.pdf';
    options: InAppBrowserOptions = {
        location: 'yes', // Or 'no'
        hidden: 'no', // Or  'yes'
        clearcache: 'yes',
        clearsessioncache: 'yes',
        zoom: 'yes', // Android only ,shows browser zoom controls
        hardwareback: 'yes',
        mediaPlaybackRequiresUserAction: 'no',
        shouldPauseOnSuspend: 'no', // Android only
        closebuttoncaption: 'Close', // iOS only
        disallowoverscroll: 'no', // iOS only
        toolbar: 'yes', // iOS only
        enableViewportScale: 'no', // iOS only
        allowInlineMediaPlayback: 'no', // iOS only
        presentationstyle: 'pagesheet', // iOS only
        fullscreen: 'yes', // Windows only
    };
    private browser: any;

    constructor(
        public sqlite: SQLite,
        public platform: Platform,
        public fileOpener: FileOpener,
        public transfer: FileTransfer,
        public file: File,
        public toastService: ToastsService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public inAppBrowser: InAppBrowser,
        public permessi: AndroidPermissions,
        public sync: SyncService,
        public globalData: GlobalDataService) {
    }

    openDb() {
        if (this.platform.is('ios') || (this.platform.is('android'))) {
            // console.log('Apro database ' + this.dbOptions.name);

            this.sqlite.create(this.dbOptions).then((db) => {
                this.database = db;

                db.executeSql('CREATE TABLE IF NOT EXISTS allegatiScaricati (' +
                    'ALLEGATO_ID integer primary key, ' + //id dell'allegato
                    'AD_ID integer, ' + //id dell'corso
                    'AUTORE varchar(50), ' + //prof che ha caricato il file
                    'CLS_ID integer, ' + //non lo so a cosa serve
                    'COMUNITA_ID integer, ' + //non lo so a cosa serve
                    'DATA_INS varchar(30), ' + //data in cui il prof ha caricato il file
                    'ESTENSIONE varchar(10), ' + //estenzione del file (utile per determinare l'icona)
                    'FILENAME varchar(100), ' + //nome del file
                    'TESTO varchar(100), ' + //note aggiunte dal prof
                    'TITOLO varchar(100), ' + //titolo assegnato dal prof al file
                    'TIPO varchar(50)' + //utile per capire con che programma dovrà essere aperto il file
                    'SCARICATO integer' + //scaricato
                    ')', []).then(() => {
                    // console.log('Tabella allegati creata: ', op);
                }, (err) => {
                    console.dir(err);
                });
            }, (error) => {
                console.error('Impossibile aprire/creare il database: ');
                console.dir(error);
            }).catch(e => {
                console.error('Eccezione: Impossibile aprire/creare il database: ');
                console.dir(e);
            });
        }
    }


    /* ----   ALLEGATI  ___ */
    getTuttiAllegatScaricatiiFromDB(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.sqlite.create(this.dbOptions).then((db: SQLiteObject) => {
                db.executeSql('SELECT * FROM allegatiScaricati', []).then(
                    (result) => {

                        const files = [];
                        if (result.rows.length > 0) {

                            for (let i = 0; i < result.rows.length; ++i) {
                                const item = result.rows.item(i);

                                files.push(item);
                            }

                            resolve(files);
                        } else {
                            resolve(files);
                        }
                    }, (errore) => {
                        console.dir(errore);
                        reject();
                    });
            });
        });
    }

    getAllegatoFromDB(id): Promise<any> {
        return new Promise((resolve, reject) => {
            this.sqlite.create(this.dbOptions).then((db) => {
                db.executeSql('SELECT * FROM allegatiScaricati WHERE id = ?', [id]).then(
                    (result) => {

                        if (result.rows.length > 0) {
                            const firstItem = result.rows.item(0);
                            resolve(firstItem);
                        } else {
                            reject();
                        }

                    }, (errore) => {
                        // console.log('Errore select allegato ');
                        console.dir(errore);
                        reject();
                    });
            });
        });
    }

    inserisciAllegatoInDB(allegato, tipo) {

        return new Promise((resolve, reject) => {
            this.sqlite.create(this.dbOptions).then(
                (db: SQLiteObject) => {
                    console.log('a');

                    db.executeSql('select * from allegatiScaricati where id = ?', [allegato.ALLEGATO_ID])
                        .then((esitoQuery) => {
                            console.log('b');
                            if (esitoQuery.rows.length <= 0) {
                                db.executeSql(
                                    'INSERT INTO allegatiScaricati (ALLEGATO_ID, AD_ID, AUTORE, CLS_ID, COMUNITA_ID, DATA_INS, ESTENSIONE, FILENAME, TESTO, TITOLO, TIPO, SCARICATO) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                                    [allegato.ALLEGATO_ID, allegato.AD_ID, allegato.AUTORE, allegato.CLS_ID, allegato.COMUNITA_ID, allegato.DATA_INS, allegato.ESTENSIONE, allegato.FILENAME, allegato.TESTO, allegato.TITOLO, tipo, 1]).then(() => {
                                    console.log('Insert files Ok.');
                                    resolve();
                                }, (erroreQuery) => {
                                    console.log('Errore insert allegati: ');
                                    console.dir(erroreQuery);
                                    reject(erroreQuery);
                                });
                            }
                        }, (erroreSelect) => {
                            console.log('Errore select * from allegati: ');
                            console.dir(erroreSelect);
                            reject(erroreSelect);
                        });
                }, (error) => {
                    console.error('Impossibile aprire il database...');
                    console.dir(error);
                    reject(error);
                }).catch(e => console.log(e)); // -- Sqlite
        });
    }

    removeAllegatoFromDB(id) {
        return new Promise((resolve, reject) => {
            this.sqlite.create(this.dbOptions).then(
                (db: SQLiteObject) => {
                    db.executeSql('DELETE FROM allegatiScaricati WHERE id = ?', [id])
                        .then((esitoQuery) => {
                            resolve();
                        }, (erroreDelete) => {
                            // console.log('Errore select * from allegati: ');
                            console.dir(erroreDelete);
                            reject(erroreDelete);
                        });
                }, (error) => {
                    console.error('Impossibile aprire il database...');
                    console.dir(error);
                    reject(error);
                }).catch(e => console.log(e)); // -- Sqlite
        });
    }

    isPiattaformaSupportata(): boolean {
        return !this.platform.is('mobileweb') && (this.platform.is('android') ||
            this.platform.is('ios'));
    }

    /**
     * Controlla nella memoria del telefono se è presente l'allegato.
     *
     * @param allegato: l'allegato da scaricare
     */
    isAllegatoScaricato(allegato: Allegato): Promise<boolean> {
        return new Promise((resolve, reject) => {

            if (this.isPiattaformaSupportata()) {
                const fileName = allegato.ALLEGATO_ID + '.' + allegato.ESTENSIONE;
                const downloadDir = this.file.dataDirectory;

                this.file.checkFile(downloadDir, fileName).then(
                    () => {
                        resolve(true);
                    },
                    () => {
                        reject(false);
                    }
                );
            } else {
                reject(false);
            }
        });
    }


    getAllegatiJson(): Promise<Allegato[]> {
        return new Promise<Allegato[]>((resolve, reject) => {
            return this.sync.getJson(18, null, false).then((data) => {
                const allegati: Allegato[] = data[0];

                //conversione di tutti i corsi in istanze dalla classe Corso
                for (let i = 0; i < allegati.length; i++) {
                    allegati[i] = Allegato.toObj(allegati[i]);
                }

                resolve(allegati);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    getAllegatiJsonAggiornato(): Promise<Allegato[]> {
        return new Promise<Allegato[]>((resolve, reject) => {
            return this.sync.getJsonAggiornato(18, null).then((data) => {
                const allegati: Allegato[] = data[0];

                //conversione di tutti i corsi in istanze dalla classe Corso
                for (let i = 0; i < allegati.length; i++) {
                    allegati[i] = Allegato.toObj(allegati[i]);
                }

                resolve(allegati);
            }).catch((err) => {
                reject(err);
            });
        });
    }


    hasPermission() {
        return new Promise((resolve, reject) => {
            this.permessi.checkPermission(this.permessi.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
                (permesso) => {
                    if (permesso.hasPermission) {
                        resolve();
                    } else {
                        this.permessi.requestPermission(this.permessi.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
                            (success) => {
                                if (success.hasPermission) {
                                    resolve(success.hasPermission);
                                } else {
                                    reject(success.hasPermission);
                                }
                            },
                            (failure) => {
                                reject(failure);
                            }
                        );
                    }
                }, (err) => {
                    reject(err);
                });
        });
    }

    download(item) {
        this.hasPermission().then(
            () => {
                let filePath = 'https://unimol.esse3.cineca.it/ewc/VisualizzaAllegato.do?ALL_ID=' + item.ALLEGATO_ID;

                if (this.globalData.utente_test) {
                    filePath = this.urlAllegatoTest;
                }

                const uri = encodeURI(filePath);

                if (this.platform.is('android') || this.platform.is('ios')) {
                    const fileTransfer: FileTransferObject = this.transfer.create();
                    const downloadDir = this.file.dataDirectory;
                    const fileName = item.ALLEGATO_ID + '.' + item.ESTENSIONE;


                    // console.log('Scarico ' + uri);

                    this.loadingCtrl.create({
                            spinner: 'crescent',
                            message: 'Download in corso...'
                        }
                    ).then(loading => {
                        loading.present();
                        fileTransfer.download(
                            uri,
                            downloadDir + fileName,
                            true,
                            {
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Credentials': 'true',
                                    'Access-Control-Allow-Headers': 'true',
                                    'Access-Control-Allow-Methods': 'Content-Type, Accept, X-Requested-With, remember-me'
                                }
                            }
                        ).then(
                            (entry) => {
                                console.log('SCARICATO');
                                console.dir(entry);

                                entry.file(success => {
                                    const mimeType = success.type;
                                    // console.log('download complete: ' + entry.toURL());
                                    this.toastService.downloadCompletato();

                                    this.inserisciAllegatoInDB(item, mimeType).then(
                                        () => {
                                            console.log('c');
                                            loading.dismiss();
                                            this.apriFile(item);
                                        },
                                        (err) => {
                                            GlobalDataService.log(4, 'inserisciAllegato rejected', err);
                                            loading.dismiss();
                                        }
                                    );
                                }, error => {
                                    loading.dismiss();
                                    GlobalDataService.log(4, 'entry.file fallito!', error);
                                    this.toastService.erroreAperturaFile();
                                });

                            }, (err) => {
                                loading.dismiss();
                                // console.log('ERR');
                                console.dir(err);
                                this.toastService.erroreDownload();
                            }
                        ).catch(
                            (ex) => {
                                loading.dismiss();
                                GlobalDataService.log(4, 'Eccezione in download!', ex);
                                this.toastService.erroreDownload();
                            }
                        );
                    }, (err) => {
                        GlobalDataService.log(4, 'Loader fallito!', err);
                    });
                } else {
                    const target = '_self';
                    this.browser = this.inAppBrowser.create(uri, target, this.options);
                }
            }, (err) => {
                GlobalDataService.log(2, 'Errore permessi', err);
                this.toastService.permessoNonAttivo();
            }
        );
    }

    apriFile(item) {
        if (this.isPiattaformaSupportata()) {
            this.isAllegatoScaricato(item).then(() => {
                this.getAllegatoFromDB(item.ALLEGATO_ID).then((allegato) => {
                    const fileName = item.ALLEGATO_ID + '.' + item.ESTENSIONE;
                    const downloadDir = this.file.dataDirectory;
                    const pathCompleto = downloadDir + fileName;

                    this.fileOpener.open(pathCompleto, allegato.tipo)
                        .then(() => {
                            // console.log('File aperto!'));
                        }).catch(() => {
                        // console.log('Errore apertura file', e);
                        this.toastService.fileNonSupportato();
                    });

                }).catch();
            }, (error) => {
                GlobalDataService.log(2, 'Impossibile recuperare il file', error);
                this.toastService.fileNonScaricato();
                return;
            });
        } else {
            this.toastService.piattaformaNonSupportata();
        }

    }

    eliminaFile(item) {
        if (this.isPiattaformaSupportata()) {
            const fileName = item.ALLEGATO_ID + '.' + item.ESTENSIONE;
            const downloadDir = this.file.dataDirectory;

            this.file.checkFile(downloadDir, fileName).then(
                (data) => {
                    GlobalDataService.log(1, 'checkFile OK', data);

                    this.file.removeFile(downloadDir, fileName).then(
                        () => {
                            this.removeAllegatoFromDB(item.ALLEGATO_ID).then();
                            this.toastService.successoEliminazione();
                            return true;
                        },
                        (err) => {
                            GlobalDataService.log(2, 'Impossibile eliminare l\'allegato', err);
                            this.toastService.fallimentoEliminazione();
                            return false;
                        }
                    );
                    return true;
                },
                (err) => {
                    this.toastService.fileNonScaricato();
                    GlobalDataService.log(1, 'Nulla da cancellare!', err);
                    return true;
                }
            );

        } else {
            // console.log('Terminale Windows');
            this.toastService.piattaformaNonSupportata();
            return false;
        }
    }
}
