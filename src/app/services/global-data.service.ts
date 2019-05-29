import { Injectable, NgZone } from '@angular/core';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { NavController, Platform } from '@ionic/angular';
import { faWifi, faLink, faUnlink } from '@fortawesome/free-solid-svg-icons';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class GlobalDataService {

    schema = 'https://';
    ip = 'app.unimol.it/';
    dir = 'app2_1';

    apiurl =  this.dir + '/api/';
    defaultBaseUrl: string = this.schema + this.ip + this.apiurl;
    baseurl;

    archive = [];
    passphrase_private_key: string = 'faustofasano2019_appunimol';

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
    esame: any;
    allegato: any;
    ad_id: any;

    faWifi = faWifi;
    faLink = faLink;
    faUnlink = faUnlink;


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
            if (reason) { console.log(reason); }
            if (msg) { console.dir(msg); }
            // if (level >= minTrace) {
            //     let stack = null;
            //     try { throw true; } catch (e) { stack = e.stack; }
            //     if (stack) {
            //         mapStackTrace(stack, function (mappedStack) {
            //             let trace = '';
            //             try {
            //                 // Nel trace la prima chiamata è relativa al metodo log stesso
            //                 // a noi invece interessa solo la chiamata precedente ad essa
            //                 trace = mappedStack.join('\n');
            //                 const start = trace.split(' at ', 2).join(' at ').length + 4;
            //                 trace = trace.slice(start);
            //                 const end = trace.indexOf('\n');
            //                 trace = trace.slice(0, end);
            //             } catch (e) {
            //                 trace = '';
            //             }
            //             if (reason) { console.log(reason + ' (' + trace + ')'); }
            //             if (msg) { console.dir(msg); }
            //         }, {
            //                 filter: function (line) {
            //                     // process only sources containing typescript sources
            //                     // return /(\.ts)/.test(line);
            //                 }
            //             });
            //     } else {
            //         if (reason) { console.log(reason); }
            //         if (msg) { console.dir(msg); }
            //     }
            // } else {
            //     if (reason) { console.log(reason); }
            //     if (msg) { console.dir(msg); }
            // }
        }

    }

    static toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    static differenzaGiorni(laterdate, earlierdate): number {
        const difference = laterdate.getTime() - earlierdate.getTime();
        return Math.floor(difference / 1000 / 60 / 60 / 24);
    }

    static differenzaOre(laterdate, earlierdate): number {
        const difference = laterdate.getTime() - earlierdate.getTime();
        return Math.floor(difference / 1000 / 60 / 60);
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
            }, (err) => {
                this.baseurl = this.defaultBaseUrl;
            });
        this.storage.get('user_role').then(
            (value) => {
                if (value != null) {
                    this.userRole = value;
                } else {
                    this.logged ? this.userRole = 'student' : this.userRole = 'none';
                }
            }, (err) => {
                this.logged ? this.userRole = 'student' : this.userRole = 'none';
            });
    }

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

                }, (err) => {
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
