import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {AlertController, LoadingController, Platform} from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {ToastsService} from './toasts.service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser/ngx';
import {GlobalDataService} from './global-data.service';
import {SyncService} from './sync.service';

@Injectable({
    providedIn: 'root'
})
export class DBService {

    public database: SQLiteObject;

    dbOptions: any = {
        name: 'unimol-studenti.db',
        location: 'default'
    };

    urlAllegatoTest: string = this.sync.schema + this.sync.ip + this.sync.dir + '/test_json/test.pdf';

    private browser: any;
    options: InAppBrowserOptions = {
        location : 'yes', // Or 'no'
        hidden : 'no', // Or  'yes'
        clearcache : 'yes',
        clearsessioncache : 'yes',
        zoom : 'yes', // Android only ,shows browser zoom controls
        hardwareback : 'yes',
        mediaPlaybackRequiresUserAction : 'no',
        shouldPauseOnSuspend : 'no', // Android only
        closebuttoncaption : 'Close', // iOS only
        disallowoverscroll : 'no', // iOS only
        toolbar : 'yes', // iOS only
        enableViewportScale : 'no', // iOS only
        allowInlineMediaPlayback : 'no', // iOS only
        presentationstyle : 'pagesheet', // iOS only
        fullscreen : 'yes', // Windows only
    };

    constructor(
        public sqlite: SQLite,
        public platform: Platform,
        public fileOpener: FileOpener,
        public transfer: FileTransfer,
        public file: File,
        public messaggi: ToastsService,
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

                db.executeSql('CREATE TABLE IF NOT EXISTS allegati (' +
                    'id integer primary key, ' +
                    'ad_id varchar(50), ' +
                    'data bigint(10),' +
                    'tipo varchar(50), ' +
                    'estensione varchar(50), ' +
                    'scaricato NUMERIC)', []).then((op) => {
                    // console.log('Tabella allegati creata: ', op);
                }, (err) => {
                    // console.log('Errore creazione tabella: ');
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


    inserisciAllegato(id, ad_id, tipo, estensione) {

        // console.log(id + ' - ' + ad_id + ' - ' + tipo + ' - ' + estensione);

        // this.openDb();

        return new Promise( (resolve, reject) => {
            this.sqlite.create(this.dbOptions).then(
                (db: SQLiteObject) => {
                    const data = new Date();

                    db.executeSql('select * from allegati where id=' + id, [])
                        .then((esitoQuery) => {
                            if (esitoQuery.rows.length > 0) {
                                db.executeSql(
                                    'UPDATE allegati SET (tipo, ad_id, estensione, data, scaricato) = (?, ?, ?, ?, ?) ' +
                                    'WHERE id = ?',
                                    [tipo, ad_id, estensione, data, 1, id]).then(
                                    () => {
                                        // console.log('Update tabella files Ok.');
                                        resolve();
                                    }, (erroreAggiornamentoTabellaFiles) => {
                                        // console.log('Errore update tabella files: ');
                                        console.dir(erroreAggiornamentoTabellaFiles);
                                        reject(erroreAggiornamentoTabellaFiles);
                                    });


                            } else {
                                db.executeSql(
                                    'INSERT INTO allegati (id, tipo, ad_id, estensione, data, scaricato) VALUES (?, ?, ?, ?, ?, ?) ',
                                    [id, tipo, ad_id, estensione, data, 1]).then(() => {
                                    // console.log('Insert files Ok.');
                                    resolve();
                                }, (erroreQuery) => {
                                    // console.log('Errore insert allegati: ');
                                    console.dir(erroreQuery);
                                    reject(erroreQuery);
                                });
                            }
                        }, (erroreSelect) => {
                            // console.log('Errore select * from allegati: ');
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

    getAllegato(id): Promise<any> {
        // console.log('Cerco allegati per ' + id);
        let allegato = null;
        return new Promise( (resolve, reject) => {
            this.sqlite.create(this.dbOptions).then((db) => {
                db.executeSql('SELECT * FROM allegati WHERE id = ?', [id]).then(
                    (result) => {

                    if (result.rows.length > 0) {
                        // for (let i = 0; i < result.rows.length; i++) {
                        //     console.log('Item:' + i);
                        //     console.dir(result.rows.item(i));
                        // }

                        // prendo solo il primo
                        // for (let i = 0; i < result.rows.length; i++) {
                        const all = result.rows.item(0);
                        allegato = {
                            id: all.id,
                            ad_id: all.ad_id,
                            tipo: all.tipo,
                            estensione: all.estensione,
                            data: all.data,
                            scaricato: all.scaricato
                        };
                        resolve( allegato );
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

    allegatoScaricato(item: any) {
        return new Promise( (resolve, reject) => {
            // console.log('Cerco allegati per ' + id);
            if (this.platform.is('android') || this.platform.is('ios')) {
                const fileName = item.ALLEGATO_ID + '.' + item.ESTENSIONE;
                const downloadDir = this.file.dataDirectory;

                this.file.checkFile(downloadDir, fileName).then(
                    (data) => {
                        console.dir(data);
                        resolve( true );
                    },
                    (err) => {
                        reject(err);
                    }
                );
            } else {
                // console.log('Terminale Windows');
                reject('Piattaforma non supportata');
            }
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
                                // console.log('SCARICATO');
                                // console.dir(entry);

                                entry.file(success => {
                                    const mimeType = success.type;
                                    // console.log('download complete: ' + entry.toURL());
                                    this.messaggi.downloadCompletato();

                                    this.inserisciAllegato(item.ALLEGATO_ID, item.AD_ID, mimeType, item.ESTENSIONE).then(
                                        () => {
                                            loading.dismiss();
                                            this.apriFile(item);
                                        },
                                        (err) => {
                                            GlobalDataService.log(2, 'inserisciAllegato rejected', err);
                                            loading.dismiss();
                                        }
                                    );
                                }, error => {
                                    loading.dismiss();
                                    GlobalDataService.log(2, 'entry.file fallito!', error);
                                    this.messaggi.erroreAperturaFile();
                                });

                            }, (err) => {
                                loading.dismiss();
                                // console.log('ERR');
                                console.dir(err);
                                this.messaggi.erroreDownload();
                            }
                        ).catch(
                            (ex) => {
                                loading.dismiss();
                                GlobalDataService.log(2, 'Eccezione in download!', ex);
                                this.messaggi.erroreDownload();
                            }
                        );
                    }, (err) => {
                        GlobalDataService.log(2, 'Loader fallito!', err);
                    });
                } else {
                    const target = '_self';
                    this.browser = this.inAppBrowser.create(uri, target, this.options);
                }
            }, (err) => {
                GlobalDataService.log(2, 'Errore permessi', err);
                this.messaggi.permessoNonAttivo();
            }
        );
    }

    apriFile(item) {
        this.allegatoScaricato(item).then(
            () => {

                this.getAllegato(item.ALLEGATO_ID).then(
                    (allegato) => {
                        // console.dir(allegato);
                        if (allegato != null) {
                            if (this.platform.is('android') || this.platform.is('ios')) {
                                const fileName = item.ALLEGATO_ID + '.' + item.ESTENSIONE;
                                const downloadDir = this.file.dataDirectory ;
                                const pathCompleto = downloadDir + fileName;

                                this.fileOpener.open(pathCompleto, allegato.tipo)
                                    .then(() => {
                                        // console.log('File aperto!'));
                                    }).catch(e => {
                                        // console.log('Errore apertura file', e);
                                        this.messaggi.fileNonSupportato();
                                    });

                            }  else {
                                // console.log('Terminale Windows');
                                this.messaggi.piattaformaNonSupportata();
                            }
                        } else {
                            this.messaggi.fileNonScaricato();
                            // console.log('Allegato non presente');
                        }
                    },
                    (err) => {
                        GlobalDataService.log(2, 'Impossibile recuperare l\'allegato', err);
                        this.messaggi.fileNonScaricato();
                    }
                );
            },
            (error) => {
                GlobalDataService.log(2, 'Impossibile recuperare il file', error);

                this.alertCtrl.create({
                    header: 'Apertura File',
                    message: 'Il file non e\' presente sul dispositivo. Vuoi scaricarlo ora?',
                    buttons: [
                        {
                            text: 'Si',
                            handler: () => {
                                this.download(item);
                            }
                        },
                        {
                            text: 'No',
                            role: 'cancel',
                            handler: () => {
                            }
                        }
                    ]
                }).then(alert => alert.present());
            });
    }


    eliminaFile(item) {
        if (this.platform.is('android') || this.platform.is('ios')) {
            const fileName = item.ALLEGATO_ID + '.' + item.ESTENSIONE;
            const downloadDir = this.file.dataDirectory;

            this.file.checkFile(downloadDir, fileName).then(
                (data) => {
                    GlobalDataService.log(1, 'checkFile OK', data);

                    this.file.removeFile(downloadDir, fileName).then(
                        () => {
                            this.messaggi.successoEliminazione();
                            return true;
                        },
                        (err) => {
                            GlobalDataService.log(2, 'Impossibile eliminare l\'allegato', err);
                            this.messaggi.fallimentoEliminazione();
                            return false;
                        }
                    );
                    return true;
                },
                (err) => {
                    this.messaggi.fileNonScaricato();
                    GlobalDataService.log(1, 'Nulla da cancellare!', err);
                    return true;
                }
            );

        } else {
            // console.log('Terminale Windows');
            this.messaggi.piattaformaNonSupportata();
            return false;
        }
    }
}
