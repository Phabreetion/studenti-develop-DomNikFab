import {Component, NgZone, QueryList, ViewChildren} from '@angular/core';

import {
    ActionSheetController,
    AlertController,
    IonRouterOutlet, MenuController,
    Platform
} from '@ionic/angular';

import { Network} from '@ionic-native/network/ngx';
import { ScreenOrientation} from '@ionic-native/screen-orientation/ngx';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppVersion} from '@ionic-native/app-version/ngx';
import { FCM} from '@ionic-native/fcm/ngx';
import { Storage} from '@ionic/storage';

import { SyncService} from './services/sync.service';
import { GlobalDataService} from './services/global-data.service';
import { DBService} from './services/db-service';
import { AccountService} from './services/account.service';
import { Router} from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';
import {Device} from '@ionic-native/device/ngx';
import {HttpService} from './services/http.service';
// import {Push, PushObject, PushOptions} from '@ionic-native/push/ngx';
// import {Firebase} from '@ionic-native/firebase/ngx';
// import {FirebaseMessaging} from '@ionic-native/firebase-messaging/ngx';

// import {isCombinedNodeFlagSet} from 'tslint';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public mostraMenu = true;

    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Carriera',
            url: '/carriera',
            icon: 'book'
        },
        {
            title: 'Appelli',
            url: '/appelli',
            icon: 'bookmark'
        },
        {
            title: 'Previsione Media',
            url: '/medie',
            icon: 'calculator'
        },
        {
            title: 'News',
            url: '/news',
            icon: 'information-circle'
        },
        // {
        //     title: 'Calendario',
        //     url: '/calendario',
        //     icon: 'calendar'
        // },
        {
            title: 'Notifiche',
            url: '/notifiche',
            icon: 'megaphone'
        },
        {
            title: 'Rubrica',
            url: '/rubrica',
            icon: 'contacts'
        },
        {
            title: 'Questionari',
            url: '/questionari',
            icon: 'create'
        },
        {
            title: 'Tasse',
            url: '/tasse',
            icon: 'pricetag'
        },
        {
            title: 'Servizi Online',
            url: '/servizi-online',
            icon: 'cog'
        },
        {
            title: 'Impostazioni',
            url: '/preferenze',
            icon: 'options'
        },
        {
            title: 'Blocca',
            url: '/lock',
            icon: 'lock'
        },
        {
            title: 'Disconnetti',
            url: '/disconnetti',
            icon: 'log-out'
        }
    ];

    // set up hardware back button event.
    lastTimeBackPress = 0;
    timePeriodToExit = 2000;

    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;


    constructor(
        public alertCtrl: AlertController,
        public actionSheetCtrl: ActionSheetController,
        public toast: Toast,
        public router: Router,
        public menu: MenuController,
        public appVersion: AppVersion,
        public network: Network,
        public ngZone: NgZone,
        public platform: Platform,
        public device: Device,
        // public push: Push,
        public screenOrientation: ScreenOrientation,
        public splashScreen: SplashScreen,
        public statusBar: StatusBar,
        public fcm: FCM,
        // public firebase: Firebase,
        // private firebaseMessaging: FirebaseMessaging,
        public storage: Storage,
        public db: DBService,
        public sync: SyncService,
        public http: HttpService,
        public globalData: GlobalDataService,
        public account: AccountService
        //    private firebaseMessaging: FirebaseMessaging,
    ) {
        this.initializeApp();
        this.backButtonEvent();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            if (this.platform.is('android')) {
                this.statusBar.styleLightContent();
                this.globalData.android = true;
            } else {
                this.globalData.android = false;
                this.statusBar.styleDefault();
                if (this.device.model.startsWith('iPhone11') || this.device.isVirtual ) {
                    this.statusBar.overlaysWebView(true);
                    this.globalData.iPhoneX = true;
                }
            }

            this.splashScreen.hide();
            this.globalData.landscape = false;

            this.http.setHttpType();

            try {
                // console.log('Apro il db SQLite');
                this.db.openDb();
            } catch (e) {
                GlobalDataService.log(2, 'Errore nella creazione del db SQLite', e);
            }

            if (this.screenOrientation.type.startsWith('landscape')) {
                this.globalData.landscape = true;
            }

            this.screenOrientation.onChange().subscribe(
                () => {
                    this.globalData.landscape = this.screenOrientation.type.startsWith('landscape');
                }
            );

            if (this.platform.is('ios') || (this.platform.is('android'))) {
                // this.statusBar.styleDefault();
                // this.splashScreen.hide();
                // if (this.platform.is('tablet')) {
                // } else {
                //     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
                // }

                this.appVersion.getVersionNumber().then(
                    (appVersion) => {
                        this.storage.set('appVersion', appVersion);
                    });
            } else {
                this.storage.set('uuid', 'virtual');
                this.storage.set('appVersion', '2.0.v');
            }

            // moment.locale('it');

            // let lastTimeBackPress = 0;
            // const timePeriodToExit = 2000;
            // // IONIC 4 registerBackButtonAction non c'è!
            // let lastTimeBackPress = 0;
            // const timePeriodToExit = 2000;
            //
            // this.platform.registerBackButtonAction(() => {
            //     // get current active page
            //     // TODO: questa soluzione non è ottimale, la versione commentata è invece funzionante,
            //     // ma non riporta alla Home in caso di sotto-pagine
            //     // Purtroppo, al momento, la generazione della versione ottimizzata (flag --prod)
            //     // minimizza il codice per cui il nome della pagina non corrisponde
            //     const view = this.nav.getActive();
            //     const componentName = view.component.toString();
            //     if (componentName.indexOf('idServizio=9') > -1) {
            //         // Double check to exit app
            //         if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
            //             this.platform.exitApp(); // Exit from app
            //         } else {
            //             const toast = this.toastCtrl.create({
            //                 message: 'Premi di nuovo per uscire',
            //                 duration: 2000,
            //                 position: 'bottom'
            //             });
            //             toast.present();
            //             lastTimeBackPress = new Date().getTime();
            //         }
            //     } else {
            //         // go to previous page
            //         this.navCtrl.navigateRoot('/home');
            //     }
            //
            // });

            this.http.checkConnection();

            // watch network for a disconnect
            this.network.onDisconnect().subscribe(() => {
                console.log('Rilevata Disconnessione');
                this.http.setConnected(false);
                // Forza l'aggiornamento del DOM
                // this.ngZone.run(() => {
                // });
            });

            // watch network for a connection
            this.network.onConnect().subscribe(() => {
                console.log('Rilevata Connessione');
                this.http.setConnected(true);
                // this.ngZone.run(() => {
                // });
            });

            this.initPushNotification();

            // if (this.platform.is('ios')) {
            //     const actions: Array<ThreeDeeTouchQuickAction> = [
            //         {
            //             type: 'piano-di-studi',
            //             title: 'Check in',
            //             subtitle: 'Quickly check in',
            //             iconType: 'Compose'
            //         },
            //         {
            //             type: 'appelli',
            //             title: 'Share',
            //             subtitle: 'Share like you care',
            //             iconType: 'Share'
            //         },
            //         {
            //             type: 'rubrica',
            //             title: 'Search',
            //             iconType: 'Search'
            //         },
            //         {
            //             title: 'Show favorites',
            //             iconTemplate: 'HeartTemplate'
            //         }
            //     ];
            //     this.threeDeeTouch.configureQuickActions(actions);
            //     this.threeDeeTouch.onHomeIconPressed().subscribe(
            //         (payload) => {
            //             // returns an object that is the button you presed
            //             console.log('Pressed the ${payload.title} button')
            //             console.dir(payload);
            //             this.navCtrl.navigateForward(payload.type);
            //
            //         }, (err) => {
            //             console.dir(err);
            //         }, () => {
            //             console.log('Complete');
            //         }
            //     );
            // }
        }).catch(err => {
            console.log('Eccezione nel recupero delle notifiche: ' + err);
        });
    }

    initPushNotification() {
        if (this.platform.is('ios') || (this.platform.is('android'))) {
            /****
             *  PROVA PLUGIN PUSH
             */
            //
            //
            // // to check if we have permission
            // this.push.hasPermission()
            //     .then((res: any) => {
            //         console.dir(res);
            //
            //         if (res.isEnabled) {
            //             console.log('We have permission to send push notifications');
            //         } else {
            //             console.log('We do not have permission to send push notifications');
            //         }
            //
            //     });


            /*
        const options: PushOptions = {
            android: {},
            ios: {
                alert: 'true',
                badge: 'true',
                sound: 'true'
            },
            windows: {},
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            }
        }

        const pushObject : PushObject = this.push.init(options);

        pushObject.subscribe('testbeta').then(
            (esito) => {
                GlobalDataService.log(2, '****** PUSH ****** Subscription OK', esito);
            }, (err) => {
                GlobalDataService.log(2, '****** PUSH ****** Subscription ERR', err);
            }
        );

        pushObject.on('notification').subscribe(
            (notification: any) => {
                console.log('****** PUSH ****** Received a notification', notification);
                this.mostraNotifica(notification);
            }, (err) => {
                GlobalDataService.log(2, '****** PUSH ****** Error receiving a notification', err);
            });

        pushObject.on('registration').subscribe(
            (registration: any) => {
                GlobalDataService.log(2, '****** PUSH ****** Device registered', registration);
            }, (err) => {
                GlobalDataService.log(2, '****** PUSH ****** Device NOT registered', err);
            });

        pushObject.on('error').subscribe(
            error => GlobalDataService.log(2, '****** PUSH ****** Error with Push plugin', error));

*/

            /***
             *  Plugin FCM per le notifiche push
             */

            try {
                this.fcm.getToken().then(token => {
                    // console.log('FCM GETTOKEN = ' + token);
                    if (token != null) {
                        this.sync.aggiornaTokenNotifiche(token);
                    }
                }).catch(err => {
                    GlobalDataService.log(2, 'FCM: Eccezione in getToken', err);

                });

                this.fcm.onNotification().subscribe(data => {
                    GlobalDataService.log(1, 'FCM: ricevuta una notifica', data);

                    this.mostraNotifica(data);

                    // if (data && data.wasTapped) {
                    //     // console.log('Received in background');
                    //     // Notifica con app in background
                    //     this.mostraNotifica(data);
                    // } else {
                    //     // Notifica con app in primo piano
                    //     this.mostraNotifica(data);
                    // }
                });

                this.fcm.onTokenRefresh().subscribe(token => {
                    // console.log('FCM TOKEN AGGIORNATO = ' + token);
                    if (token != null) {
                        this.sync.aggiornaTokenNotifiche(token);
                    }
                });

                this.fcm.subscribeToTopic('testbeta').then(
                    (res) => {
                        GlobalDataService.log(1, 'Sottoscrizione a testbeta confermata', res);
                    }, (err) => {
                        GlobalDataService.log(2, 'Sottoscrizione a testbeta fallita', err);
                    }
                );

            } catch (e) {
                GlobalDataService.log(2, 'FCM: Eccezione nell\'inizializzazione', e);
            }
        }
    }

    // Mostriamo la notifica tramite un alert
    mostraNotifica(data) {

        let dati;
        let titolo;
        let messaggio;

        try {
            dati = JSON.parse(data);
        } catch (e) {
            GlobalDataService.log(2, 'JSON notifica non valido', e);
            dati = null;
        }

        if (dati) {
            GlobalDataService.log(1, 'FCM: uso dati dal JSON', dati);

            titolo = dati.title;
            messaggio = decodeURIComponent(escape(dati.message));
        } else if (data.aps) {
            GlobalDataService.log(1, 'FCM: uso data.aps.title', data.aps);
            titolo = data.aps.alert.title;
            messaggio = decodeURIComponent(escape(data.aps.alert.body));
        } else if (data.title) {
            GlobalDataService.log(1, 'FCM: uso data.title', data);
            titolo = data.title;
            messaggio = decodeURIComponent(escape(data.body));
        }

        if (titolo) {
            this.alertCtrl.create({
                header: titolo,
                message: messaggio,
                buttons: [{
                    text: 'Chiudi',
                    role: 'cancel',
                    handler: () => {
                        switch (titolo) {
                            case 'News di Ateneo' : {
                                this.globalData.sezioneNews = 'ateneo';
                                this.globalData.goTo(this.globalData.srcPage, '/news', 'forward', false);
                                break;
                            }
                            case 'News di Dipartimento' : {
                                this.globalData.sezioneNews = 'dipartimento';
                                this.globalData.goTo(this.globalData.srcPage, '/news', 'forward', false);
                                break;
                            }
                            case 'News del Corso' : {
                                this.globalData.sezioneNews = 'cds';
                                this.globalData.goTo(this.globalData.srcPage, '/news', 'forward', false);
                                break;
                            }
                            case 'Verbalizzazione esame' : {
                                this.globalData.goTo(this.globalData.srcPage, '/carriera', 'forward', false);
                                break;
                            }
                        }
                    }
                }]
            }).then(
                (confirm) => {
                    confirm.present();
                },
                (err) => {
                    GlobalDataService.log(2, 'Errore nella chiamata a confirm.present() ', err);
                }
            ).catch(
                (ex) => {
                    GlobalDataService.log(2, 'Eccezione nella chiamata a confirm.present() ', ex);
                }
            );
        } else {
            GlobalDataService.log(2, 'FCM: titolo non presente nella notifica', data);
        }
    }



    // active hardware back button
    backButtonEvent() {
        this.platform.backButton.subscribe(async () => {

            // close action sheet
            try {
                const element = await this.actionSheetCtrl.getTop();
                if (element) {
                    element.dismiss();
                }
            } catch (error) { }

            // close side menu
            try {
                const element = await this.menu.getOpen();
                if (element !== null) {
                    this.menu.close();
                }
            } catch (error) { }

            if (this.router.url === '/home') {
                if ((new Date().getTime() - this.lastTimeBackPress) < this.timePeriodToExit) {
                    // this.platform.exitApp(); // Exit from app
                    navigator['app'].exitApp(); // work for ionic 4
                } else {
                    this.toast.show(
                        'Premi ancora per uscire.',
                        '2000',
                        'center')
                        .subscribe(() => {
                            // console.log(JSON.stringify(toast));
                        });
                    this.lastTimeBackPress = new Date().getTime();
                }
            } else {
                // this.toast.show(
                //     this.router.url,
                //     '2000',
                //     'center')
                //     .subscribe(() => {
                //         // console.log(JSON.stringify(toast));
                //     });
                this.globalData.goTo('/home', '/home', 'root', false);
               // console.log(this.router.url);
            }
        });
    }
}
