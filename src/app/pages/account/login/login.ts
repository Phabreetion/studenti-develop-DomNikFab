import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { LoadingController, ToastController, Platform} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { isArray } from 'rxjs/internal/util/isArray';
import { SyncService } from '../../../services/sync.service';
import { GlobalDataService } from '../../../services/global-data.service';
import {AccountService} from '../../../services/account.service';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-page-login',
    templateUrl: 'login.html',
})

export class LoginPage implements OnInit, AfterViewInit, OnDestroy {

    currentPage = '/login';
    username = '';
    password = '';
    matricola = '';
    cds_id = '';
    dip_id = '';
    appVersionNum = '';

    fingerprintIsAvbailable = false;
    fingerprintOptions: FingerprintOptions;
    fingerprintResult = '';

    constructor(
        public platform: Platform,
        public appVersionProvider: AppVersion,
        public fingerprint: FingerprintAIO,
        public sync: SyncService,
        public http: HttpService,
        public globalData: GlobalDataService,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        // public menu: MenuController,
        public storage: Storage,
        public account: AccountService) {

    }

    ngOnInit() {
        // Prende la versione dell'app settata nel file config.xml
        this.appVersionProvider.getVersionNumber().then((value) => {
            this.appVersionNum = value;
        });

        this.account.controllaAccount().then(
            (ok) => {
                },
            (err) => {
                this.globalData.goTo(this.currentPage, '/login', 'root', false);
            });
    }

    ngAfterViewInit() {
        this.storage.get('username').then(
            (user) => {
                if ((user != null) && (user !== '') &&
                    (this.platform.is('ios') || (this.platform.is('android')))) {

                    this.fingerprint.isAvailable().then(
                        (datiFP) => {
                            console.dir(datiFP);
                            let available = datiFP;

                            if (available === 'OK' || available === 'finger') {
                                available = 'Available';
                            }

                            if (available === 'Available') {
                                this.fingerprintIsAvbailable = true;
                                this.fingerprintOptions = {
                                    clientId: 'Studenti Unimol',
                                    clientSecret: 'password',
                                    localizedFallbackTitle: 'Studenti Unimol',
                                    localizedReason: 'Accedi all\'App tramite impronta digitale',
                                    // disableBackup: true,
                                };
                            } else {
                                this.fingerprintIsAvbailable = false;
                            }
                        },
                        (err) => {
                            console.dir(err);
                        }
                    );
                }
            });

        // this.menu.enable(false);
        this.storage.get('username').then(data => {
            this.username = data;
        });
    }

    ngOnDestroy() {
        // this.menu.enable(true);
    }

    async showFingerprintDialog() {
        try {
            // //await this.platform.ready();
            // let available = await this.fingerprint.isAvailable();
            // //console.log(available);
            // // Uniformiamo lo stato (Android -> OK, iOS -> 'Available');
            // if (available == 'OK')
            //   available = 'Available';
            if (this.fingerprintIsAvbailable) {
                // this.fingerprintOptions = {
                //   clientId: 'Studenti Unimol',
                //   clientSecret: 'password',
                //   localizedFallbackTitle: 'Studenti Unimol',
                //   localizedReason: 'Accedi all\'App tramite impronta digitale',
                //   //disableBackup: true,
                // };

                this.fingerprintResult = await this.fingerprint.show(this.fingerprintOptions);

                // Uniformiamo la risposta (Android -> Object, iOS -> 'Available');
                if ((this.fingerprintResult['withPassword']) ||
                    (this.fingerprintResult['withFingerprint']) ||
                    (this.fingerprintResult['withBackup'])) {
                    this.fingerprintResult = 'Success';
                }

                // Utente autenticato con lettore di impronte
                if (this.fingerprintResult === 'Success') {
                    const storedNome = this.storage.get('nome');
                    const storedSesso = this.storage.get('sesso');
                    Promise.all([storedNome, storedSesso]).then(data => {
                        // this.ngZone.run(() => {
                            let messaggio;
                            if (data[1] === 'F') {
                                messaggio = 'Bentornata ' + data[0];
                            } else {
                                messaggio = 'Bentornato ' + data[0];
                            }
                            this.toastCtrl.create({
                                message: messaggio,
                                duration: 3000
                            }).then(
                                (toast) => toast.present(),
                                (errToast) => { GlobalDataService.log(2, 'Errore Toast', errToast); });
                            this.storage.set('logged', true).then(
                                () => {
                                    this.globalData.goTo(this.currentPage, '/home', 'root', false);
                                }, (errStorage) => {
                                    GlobalDataService.log(2, 'Errore nella scrittura dei dati sullo storage!', errStorage);
                                });
                        });
                    // });
                }
            }
        } catch (err) {
            GlobalDataService.log(2, 'Errore in showFingerprintDialog!', err);
        }
    }

    login() {
        this.loadingCtrl.create().then(loading => {
            loading.present();

            // let username = form.value.username.toLowerCase();
            // let password = form.value.password;
            const username = this.username;
            const password = this.password;
            const matricola = this.matricola;
            const cds_id = this.cds_id;
            const dip_id = this.dip_id;

            this.account.login(username, password, matricola, cds_id, dip_id).then(
                (risultato) => {
                    // console.dir(risultato);

                    loading.dismiss().then(
                        () => {
                            if (isArray(risultato)) {
                                this.globalData.utente_test = this.username === 'test';
                                this.globalData.username = this.username;
                                this.globalData.password = this.password;
                                this.globalData.carriere = risultato;
                                this.globalData.goTo(this.currentPage, '/carriere', 'root', false);
                            } else {
                                switch (risultato) {
                                    case 'unlocked' : {
                                        this.globalData.goTo(this.currentPage, '/home', 'root', false);
                                        break;
                                    }
                                    case 'logged': {
                                        this.globalData.goTo(this.currentPage, '/tutorial', 'root', false);
                                        break;
                                    }
                                    default: {
                                        this.globalData.goTo(this.currentPage, '/login', 'root', false);
                                        break;
                                    }
                                }
                            }
                        }
                    );
                },
                (err) => {
                    loading.dismiss();
                    GlobalDataService.log(2, 'Login Reject', err);
                }).catch(
                (ex) => {
                    loading.dismiss();
                    GlobalDataService.log(2, 'Login Exception', ex);

                }
            );

        });


    }

    // sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    // toTitleCase(str) {
    //     return str.replace(/\w\S*/g, function(txt) {
    //         return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    //     });
    // }
}
