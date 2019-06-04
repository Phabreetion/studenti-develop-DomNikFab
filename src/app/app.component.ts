import {Component, QueryList, ViewChildren} from '@angular/core';

import {
    ActionSheetController,
    AlertController,
    IonRouterOutlet,
    MenuController,
    ModalController,
    Platform,
    PopoverController
} from '@ionic/angular';

import {Network} from '@ionic-native/network/ngx';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';

import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {FCM} from '@ionic-native/fcm/ngx';
import {Storage} from '@ionic/storage';

import {SyncService} from './services/sync.service';
import {GlobalDataService} from './services/global-data.service';
import {MaterialeDidatticoDbService} from './services/materiale-didattico-db-service';
import {AccountService} from './services/account.service';
import {Device} from '@ionic-native/device/ngx';
import {HttpService} from './services/http.service';
import {Router} from '@angular/router';
import {ToastsService} from './services/toasts.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home',
            role: 'student'
        },
        {
            title: 'Home',
            url: '/home-docente',
            icon: 'home',
            role: 'teacher'
        },
        {
            title: 'Piano di studio',
            url: '/piano-di-studio',
            icon: 'book',
            role: 'student'
        },
        {
            title: 'Appelli',
            url: '/appelli',
            icon: 'bookmark',
            role: 'student'
        },
        {
            title: 'Materiale didattico',
            url: '/materiale-didattico-scaricato',
            icon: 'download',
            role: 'student'
        },
        {
            title: 'Appelli',
            url: '/appelli-docente',
            icon: 'bookmark',
            role: 'teacher'
        },
        {
            title: 'Insegnamenti',
            url: '/insegnamenti-docente',
            icon: 'bookmark',
            role: 'teacher'
        },
        {
            title: 'Previsione Media',
            url: '/medie',
            icon: 'calculator',
            role: 'student'
        },
        {
            title: 'Orario',
            url: '/orario',
            icon: 'calendar',
            role: 'student'
        },
        {
            title: 'News',
            url: '/news',
            icon: 'information-circle',
            role: 'logged'
        },
        // {
        //     title: 'Calendario',
        //     url: '/calendario',
        //     icon: 'calendar'
        // },
        {
            title: 'Notifiche',
            url: '/notifiche',
            icon: 'megaphone',
            role: 'logged'
        },
        {
            title: 'Rubrica',
            url: '/rubrica',
            icon: 'contacts',
            role: 'logged'
        },
        {
            title: 'Questionari',
            url: '/questionari',
            icon: 'create',
            role: 'student'
        },
        {
            title: 'Tasse',
            url: '/tasse',
            icon: 'pricetag',
            role: 'student'
        },
        {
            title: 'Servizi Online',
            url: '/servizi-online',
            icon: 'cog',
            role: 'student'
        },
        {
            title: 'Impostazioni',
            url: '/preferenze',
            icon: 'options',
            role: 'all'
        },
        {
            title: 'Blocca',
            url: '/lock',
            icon: 'lock',
            role: 'logged'
        },
        {
            title: 'Disconnetti',
            url: '/disconnetti',
            icon: 'log-out',
            role: 'logged'
        }
    ];

    // set up hardware back button event.
    private lastTimeBackPress = 0;
    private TIME_PERIOD_TO_EXIT = 2000;

    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;


    constructor(
        public alertCtrl: AlertController,
        public actionSheetCtrl: ActionSheetController,
        public popoverCtrl: PopoverController,
        public modalCtrl: ModalController,
        public toastService: ToastsService,
        public router: Router,
        public menu: MenuController,
        public appVersion: AppVersion,
        public network: Network,
        public platform: Platform,
        public device: Device,
        public screenOrientation: ScreenOrientation,
        public splashScreen: SplashScreen,
        public statusBar: StatusBar,
        public fcm: FCM,
        public storage: Storage,
        public db: MaterialeDidatticoDbService,
        public sync: SyncService,
        public http: HttpService,
        public globalData: GlobalDataService,
        public account: AccountService
    ) {
        this.initializeApp();
        this.backButtonEvent().then();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            if (this.platform.is('android')) {
                this.statusBar.styleLightContent();
                this.globalData.android = true;
            } else {
                this.globalData.android = false;
                this.statusBar.styleDefault();
                if (this.device.model.startsWith('iPhone11') || this.device.isVirtual) {
                    this.statusBar.overlaysWebView(true);
                    this.globalData.iPhoneX = true;
                }
            }

            this.splashScreen.hide();

            this.globalData.landscape = false;
            this.globalData.initialize();

            this.http.setHttpType();

            try {
                // console.log('Apro il db SQLite');
                this.db.openDb();
            } catch (e) {
                GlobalDataService.log(2, 'Errore nella creazione del db SQLite', e);
            }

            if (this.platform.is('ios') || (this.platform.is('android'))) {
                if (this.screenOrientation.type.startsWith('landscape')) {
                    this.globalData.landscape = true;
                }

                //memorizziamo in una variabile globale i cambiamenti dell'orientamento dello schermo
                this.screenOrientation.onChange().subscribe(
                    () => {
                        this.globalData.landscape = this.screenOrientation.type.startsWith('landscape');
                    }
                );

                //memorizzo nello storage la versione attuale dell'app
                this.appVersion.getVersionNumber().then(
                    (appVersion) => {
                        this.storage.set('appVersion', appVersion).then();
                    }, (err) => {
                        GlobalDataService.log(2, 'ERROR in getVersionNumber', err);
                    });
            } else {
                //in caso di test da mobile si impostano nello storage questi valori di default
                this.storage.set('uuid', 'virtual').then();
                this.storage.set('appVersion', '2.0.v').then();
            }

            this.http.checkConnection();

            // watch network for a disconnect
            this.network.onDisconnect().subscribe(() => {
                //console.log('Rilevata Disconnessione');
                this.http.setConnected(false);
            });

            // watch network for a connection
            this.network.onConnect().subscribe(() => {
                //console.log('Rilevata Connessione');
                this.http.setConnected(true);
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
        }, (err) => {
            GlobalDataService.log(2, 'Reject in platform.ready', err);
        }).catch(err => {
            console.log('Eccezione nel recupero delle notifiche: ' + err);
        });
    }

    initPushNotification() {
        if (this.platform.is('ios') || (this.platform.is('android'))) {
            /***
             *  Plugin FCM per le notifiche push
             */

            try {
                this.fcm.getToken().then(
                    (token) => {
                        // console.log('FCM GETTOKEN = ' + token);
                        if (token != null) {
                            this.sync.aggiornaTokenNotifiche(token);
                        }
                    }, (err) => {
                        GlobalDataService.log(2, 'FCM: Reject in getToken', err);
                    }).catch((ex) => {
                    GlobalDataService.log(2, 'FCM: Eccezione in getToken', ex);

                });

                this.fcm.onNotification().subscribe(
                    (data) => {
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
                    }, (err) => {
                        GlobalDataService.log(2, 'FCM: Reject onNotification', err);
                    });

                this.fcm.onTokenRefresh().subscribe(
                    (token) => {
                        // console.log('FCM TOKEN AGGIORNATO = ' + token);
                        if (token != null) {
                            this.sync.aggiornaTokenNotifiche(token);
                        }
                    }, (err) => {
                        GlobalDataService.log(2, 'FCM: Reject onTokenRefresh', err);
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
                                this.globalData.goTo(this.globalData.srcPage, '/piano-di-studio', 'forward', false);
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


    /**
     * Questa funzione gestisce l'evento generato dal back-button di Android.
     * Gli ActionSheet, i Popover, i Modal e i SideMenu verrano chiusi se erano precedentemente aperti
     * Il back-button inoltre tornerà indetro alla schermanta precedente fino alla home.
     * Se nella schermata home dopo due click ravvicinati chiuderà l'app
     */
    async backButtonEvent() {
        this.platform.backButton.subscribeWithPriority(0, async () => {
            // close side menu
            try {
                const element = await this.menu.getOpen();
                if (element) {
                    this.menu.close().then();
                    return;
                }
            } catch (error) {
            }

            // close action sheet
            try {
                const element = await this.actionSheetCtrl.getTop();
                if (element) {
                    element.dismiss().then();
                    return;
                }
            } catch (error) {
            }

            // close popover
            try {
                const element = await this.popoverCtrl.getTop();
                if (element) {
                    element.dismiss().then();
                    return;
                }
            } catch (error) {
            }

            // close Modal
            try {
                const element = await this.modalCtrl.getTop();
                if (element) {
                    element.dismiss().then();
                    return;
                }
            } catch (error) {
            }

            this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
                //@TODO aggiungere tutte le route del menu
                const back_button_off = ['/piano-di-studio', '/appelli', '/medie', '/news', '/notifiche', '/rubrica', '/questionari', '/tasse', '/servizi-online', '/impostazioni', '/appelli-docente', '/insegnamenti-docente', '/orario'];

                if (outlet && outlet.canGoBack() && !back_button_off.includes(this.router.url)) {
                    // torna indetro fino alla home
                    outlet.pop(); //la pop richiama l'ultima schermata dallo stack delle pagine
                } else if (this.router.url === '/home' || this.router.url === '/home-docente') {
                    // prova ad uscire dall'app con due tap ravvicinati
                    if (new Date().getTime() - this.lastTimeBackPress < this.TIME_PERIOD_TO_EXIT) {
                        navigator['app'].exitApp(); // Exit from app, work for ionic 4
                    } else {
                        this.toastService.uscitaApp();
                        this.lastTimeBackPress = new Date().getTime();
                    }
                } else {
                    if (this.globalData.userRole == 'student') {
                        this.globalData.goTo(this.router.url, '/home', 'forward', false);
                    } else if (this.globalData.userRole == 'teacher') {
                        this.globalData.goTo(this.router.url, '/home-docente', 'forward', false);
                    } else {
                        this.globalData.goTo(this.router.url, '/login', 'forward', false);
                    }
                }
            });
        });
    }
}
