import {Injectable, NgZone} from '@angular/core';

import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {NavController, Platform} from '@ionic/angular';
// Includiamo una libreria che ci consente di risolvere il map sul trace per avere il file in cui il log è stato chiamato
// import {mapStackTrace} from 'sourcemapped-stacktrace';
import {faCalendarDay, faCoins, faLink, faUnlink, faWifi} from '@fortawesome/free-solid-svg-icons';
import {Storage} from '@ionic/storage';
import {faBookOpen} from '@fortawesome/free-solid-svg-icons/faBookOpen';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import {Corso} from '../models/Corso';

@Injectable({
    providedIn: 'root'
})

export class GlobalDataService {

    schema = 'https://';
    ip = 'app.unimol.it/';
    dir = 'app_2_1';

    apiurl =  this.dir + '/api/';
    defaultBaseUrl: string = this.schema + this.ip + this.apiurl;
    baseurl;

    archive = [];
    passphrase_private_key = 'faustofasano2019_appunimol';

    utente_test = false;

    userRole = 'none';

    android = false;
    iPhoneX = false;

    debug = false;
    logged = false;

    srcPage = '/home';
    landscape: boolean;

    width = 600;
    height = 600;

    speakEnabled: boolean;

    nrNotifiche: number;
    nrContatti: number;

    testoNotifiche: string;
    testoContatti: string;

    sezioneNews: string;
    ultimaScheda: string;

    // Variabili globali temporanee
    carriere: any;
    username: string;
    password: string;
    notizia: any;
    contatto: any;
    corso: Corso;
    allegato: any;
    ad_id: any;

    faWifi = faWifi;
    faLink = faLink;
    faUnlink = faUnlink;
    faCoins = faCoins;
    faPencilAlt = faPencilAlt;
    faCalendarDay = faCalendarDay;
    faBookOpen = faBookOpen;


    appello: any;
    nrAppelliAperti: number;
    nrAppelli: number;
    testoAppelliAperti: string;
    testoAppelli: string;
    testoTesisti: string;

    // level 0: VERBOSE
    // level 1: INFO
    // level 2: ERROR
    static log(level, reason, msg) {
        const minLog = 3;
        const minTrace = 10; // disabilitato, lo usiamo solo nel dubugging, problemi con l'emulatore ios
        if (level >= minLog) {
            if (reason) {
                console.log(reason);
            }
            if (msg) {
                console.dir(msg);
            }
        }
    }

    static toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    static differenzaGiorni(laterdate, earlierdate): number {
        const difference = laterdate.getTime() - earlierdate.getTime();
        return Math.ceil(difference / 1000 / 60 / 60 / 24);
    }

    static differenzaOre(laterdate, earlierdate): number {
        const difference = laterdate.getTime() - earlierdate.getTime();
        return Math.ceil(difference / 1000 / 60 / 60);
    }

    static differenzaMinuti(laterdate, earlierdate): number {
        const difference = laterdate.getTime() - earlierdate.getTime();
        return Math.floor(difference / 1000 / 60);
    }

    static formatStringDate(stringDate): string {
        const day = stringDate.slice(0, 10);
        const hour = stringDate.slice(11, 19);
        const dayParts = day.split('-');
        const hourParts = hour.split(':');
        const mydate = new Date(dayParts[0], dayParts[1] - 1, dayParts[2], hourParts[0], hourParts[1], hourParts[2]);
        return this.timestamp2string(mydate.getTime() / 1000);
    }

    static timestamp2string(timestamp): string {
        const d = new Date(timestamp * 1000);
        const dataFormattata =
            ('0' + d.getDate()).slice(-2) + '/' +
            ('0' + (d.getMonth() + 1)).slice(-2) + '/' +
            d.getFullYear().toString().slice(-4) + ' ' +
            ('0' + d.getHours()).slice(-2) + ':' +
            ('0' + d.getMinutes()).slice(-2);

        if (dataFormattata) {
            return dataFormattata;
        } else {
            return '';
        }
    }

    static string2date(stringDate): Date {
        const day = stringDate.slice(0, 10);
        const hour = stringDate.slice(11, 19);
        const dayParts = day.split('/');
        const hourParts = hour.split(':');

        return new Date(dayParts[2], dayParts[1] - 1, dayParts[0], hourParts[0], hourParts[1], hourParts[2]);
    }

    static formatStringDateTime(stringDate, daySeparator, hourSeparator): string {
        const day = stringDate.slice(0, 10);
        const hour = stringDate.slice(11, 19);
        const dayParts = day.split(daySeparator);
        const hourParts = hour.split(hourSeparator);
        const mydate = new Date(dayParts[0], dayParts[1] - 1, dayParts[2], hourParts[0], hourParts[1], hourParts[2]);
        return this.timestamp2string(mydate.getTime() / 1000);
    }

    static formatStringDateNoTime(stringDate, daySeparator): string {
        const day = stringDate.slice(0, 10);
        const dayParts = day.split(daySeparator);
        const mydate = new Date( dayParts[0], dayParts[1] - 1, dayParts[2]);
        return this.timestamp2string(mydate.getTime() / 1000);
    }

    static sleepBW(milliseconds) {
        const start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    static async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getWidth() {
        this.width = this.platform.width();
        return this.width;
    }

    getHeigth() {
        this.height = this.platform.height();
        return this.height;
    }

    // isSpeakEnabled(): boolean {
    //     return false; // Disabilitato fino al rilascio
    //     // return this.speakEnabled;
    // }

    setSpeakEnabled(spk: boolean) {
        this.speakEnabled = spk;
    }

    isLandscape() {
        this.landscape = this.screenOrientation.type.startsWith('landscape');
        return this.landscape;
    }

    goHome(fromPage = '/home') {
        if (this.userRole === 'student') {
            return this.goTo(fromPage, '/home', 'root', false);
        } else if (this.userRole === 'teacher') {
            return this.goTo(fromPage, '/home-docente', 'root', false);
        } else {
            return this.goTo(fromPage, '/login', 'root', false);
        }
    }

    goTo(fromPage, toPage, direction, zone) {
        // zone = true;

        if (zone) {
            this.ngZone.run(() => {

                switch (direction) {
                    case 'forward': {
                        this.srcPage = fromPage;

                        this.navCtrl.navigateForward(toPage).then(
                            () => {
                            },
                            (errNavigate => {
                                GlobalDataService.log(
                                    2,
                                    'Errore nella chiamata al NavController ',
                                    errNavigate);
                            }));
                        break;
                    }
                    case 'backward': {
                        this.navCtrl.navigateBack(toPage).then(
                            () => {
                            },
                            (errNavigate => {
                                GlobalDataService.log(
                                    2,
                                    'Errore nella chiamata al NavController ',
                                    errNavigate);
                            }));
                        break;
                    }
                    default: {
                        this.srcPage = toPage; // Navigate Root
                        this.navCtrl.navigateRoot(toPage).then(
                            () => {
                            },
                            (errNavigate => {
                                GlobalDataService.log(
                                    2,
                                    'Errore nella chiamata al NavController ',
                                    errNavigate);
                            }));
                    }
                }
            });

        } else {
            switch (direction) {
                case 'forward': {
                    this.srcPage = fromPage;
                    this.navCtrl.navigateForward(toPage).then(
                        () => {
                        },
                        (errNavigate => {
                            GlobalDataService.log(
                                2,
                                'Errore nella chiamata al NavController ',
                                errNavigate);
                        }));
                    break;
                }
                case 'backward': {
                    this.navCtrl.navigateBack(toPage).then(
                        () => {
                        },
                        (errNavigate => {
                            GlobalDataService.log(
                                2,
                                'Errore nella chiamata al NavController ',
                                errNavigate);
                        }));
                    break;
                }
                default: {
                    this.srcPage = toPage; // Navigate Root
                    this.navCtrl.navigateRoot(toPage).then(
                        () => {
                        },
                        (errNavigate => {
                            GlobalDataService.log(
                                2,
                                'Errore nella chiamata al NavController ',
                                errNavigate);
                        }));
                }
            }
        }
    }

    initialize() {
        this.storage.get('baseurl').then(
            (value) => {
                if (value != null) {
                    this.baseurl = value;
                } else {
                    this.baseurl = this.defaultBaseUrl;
                }
            }, () => {
                this.baseurl = this.defaultBaseUrl;
            });
        this.storage.get('user_role').then(
            (value) => {
                if (value != null) {
                    this.userRole = value;
                } else {
                    this.logged ? this.userRole = 'student' : this.userRole = 'none';
                }
            }, () => {
                this.logged ? this.userRole = 'student' : this.userRole = 'none';
            });
    }

    //@TODO non ha senso pescare dallo storage questa cosa
    getBaseUrl(): string {
        if (!this.baseurl) {
            this.storage.get('baseurl').then(
                (value) => {
                    if (value != null) {
                        this.baseurl = value;
                    } else {
                        this.baseurl = this.defaultBaseUrl;
                    }
                    return this.baseurl;

                }, () => {
                    this.baseurl = this.defaultBaseUrl;
                    return this.baseurl;
                });
        } else {
            return this.baseurl;
        }
    }

    constructor(
        private navCtrl: NavController,
        private platform: Platform,
        private storage: Storage,
        private screenOrientation: ScreenOrientation,
        private ngZone: NgZone) {

        this.initialize();
    }

}
