import {Injectable, NgZone} from '@angular/core';
// import {Http} from '@angular/http';
import {HTTP} from '@ionic-native/http/ngx';

import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {NavController, Platform} from '@ionic/angular';

// Includiamo una libreria che ci consente di risolvere il map sul trace per avere il file in cui il log è stato chiamato
import {mapStackTrace} from 'sourcemapped-stacktrace';

@Injectable({
    providedIn: 'root'
})
export class GlobalDataService {

    utente_test = false;

    connessioneInizializzata = false;
    connessioneInCorso = false;

    android = false;
    iPhoneX = false;

    debug = false;
    logged = false;

    srcPage = '/home';
    landscape: boolean;

    width = 600;
    height = 600;

    connected: boolean = undefined;
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

    // Preferenze
    connessioneLenta = true;


    // level 0: VERBOSE
    // level 1: INFO
    // level 2: ERROR
    static log(level, reason, msg) {
        const minLog = 3;
        const minTrace = 10; // disabilitato, lo usiamo solo nel dubugging, problemi con l'emulatore ios
        if (level >= minLog) {
            // if (reason) { console.log(reason); }
            // if (msg) { console.dir(msg); }
            if (level >= minTrace) {
                let stack = null;
                try { throw true; } catch (e) { stack = e.stack; }
                if (stack) {
                    mapStackTrace(stack, function (mappedStack) {
                        let trace = '';
                        try {
                            // Nel trace la prima chiamata è relativa al metodo log stesso
                            // a noi invece interessa solo la chiamata precedente ad essa
                            trace = mappedStack.join('\n');
                            const start = trace.split(' at ', 2).join(' at ').length + 4;
                            trace = trace.slice(start);
                            const end = trace.indexOf('\n');
                            trace = trace.slice(0, end);
                        } catch (e) {
                            trace = '';
                        }
                        if (reason) { console.log(reason + ' (' + trace + ')'); }
                        if (msg) { console.dir(msg); }
                    }, {
                        filter: function (line) {
                            // process only sources containing typescript sources
                            // return /(\.ts)/.test(line);
                        }
                    });
                } else {
                    if (reason) { console.log(reason); }
                    if (msg) { console.dir(msg); }
                }
            } else {
                if (reason) { console.log(reason); }
                if (msg) { console.dir(msg); }
            }
        }

    }

    static toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
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
        const mydate = new Date( dayParts[0], dayParts[1] - 1, dayParts[2], hourParts[0], hourParts[1], hourParts[2]);
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
        } else  {
            return '';
        }
    }

    static formatStringDateTime(stringDate, daySeparator, hourSeparator): string {
        const day = stringDate.slice(0, 10);
        const hour = stringDate.slice(11, 19);
        const dayParts = day.split(daySeparator);
        const hourParts = hour.split(hourSeparator);
        const mydate = new Date( dayParts[0], dayParts[1] - 1, dayParts[2], hourParts[0], hourParts[1], hourParts[2]);
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

    getConnected(): boolean {
        // console.log(this.connessioneInizializzata);

        if (!this.connessioneInCorso && !this.connessioneInizializzata) {
            try {
                this.connessioneInCorso = true;
                // this.http.get('https://httpbin.org/ip')

                this.http.setHeader('*', 'Content-Type', 'application/json');
                this.http.setDataSerializer('json');

                this.http.post('https://service.unimol.it/studenti/api/ultimaVersione.php', {platform: 'Android'}, {})
                    .then(data => {
                        console.dir(data);
                        this.connessioneInizializzata = true;
                        this.connected = true;
                        this.connessioneInCorso = false;
                        return this.connected;

                    }, (err) => {
                        GlobalDataService.log(2, 'Ping fallito!', err);
                        this.connessioneInizializzata = true;
                        this.connected = false;
                        this.connessioneInCorso = false;
                        return this.connected;
                    } )
                    .catch(error => {
                        GlobalDataService.log(2, 'Ping fallito!', error);
                        console.dir(error);
                        this.connessioneInizializzata = true;
                        this.connected = false;
                        this.connessioneInCorso = false;
                        return this.connected;
                    });

                // this.http.get('https://service.unimol.it/studenti/api/ultimaVersione.php')
                //    // .pipe(map(res => res.json()))
                //     .subscribe(
                //         (data) => {
                //             // console.dir(data);
                //             this.connessione Inizializzata = true;
                //             this.connected = true;
                //             this.connessioneInCorso = false;
                //             return this.connected;
                //         },
                //         (err) => {
                //             // console.dir(err);
                //             this.connessioneInizializzata = true;
                //             this.connected = false;
                //             this.connessioneInCorso = false;
                //             return this.connected;
                //         }
                //     );
            } catch (e) {
                console.dir(e);
                this.connessioneInCorso = false;
            }

        } else {
            return this.connected;
        }
    }


    setConnected(status: boolean) {
        this.connessioneInizializzata = false;
        this.connected = status;
    }

    // isSpeakEnabled(): boolean {
    //     return false; // Disabilitato fino al rilascio
    //     // return this.speakEnabled;
    // }

    setSpeakEnabled(spk: boolean) {
        this.speakEnabled = spk;
    }

    checkConnection() {
        this.getConnected();
        // this.http.get('https://httpbin.org/ip', {}, {})
        //     .then(
        //         (data) => {
        //             this.setConnected(true);
        //             console.dir(data);
        //         },
        //         (err) => {
        //             this.setConnected(false);
        //             console.dir(err);
        //         })
    }

    testNetworkStartup() {
        this.http.get('https://httpbin.org/ip', {}, {})
            .then(data => {
                // console.log('OK');
                // console.dir(data);
                GlobalDataService.log(1, 'Ping', data);
                return true;
            }, (err) => {
                GlobalDataService.log(2, 'Ping fallito!', err);
                return false;
            })
            .catch(error => {
                GlobalDataService.log(2, 'Ping fallito!', error);
                return false;
            });
        // return this.http.get('https://httpbin.org/ip')
        //     .pipe(
        //         map(
        //     res => { res.json(); },
        //     err => { console.dir(err); }));
    }

    isLandscape() {
        this.landscape = this.screenOrientation.type.startsWith('landscape');
        return this.landscape;
    }


    goTo(fromPage, toPage, direction, zone) {
        zone = true;
        if (zone) {
            this.ngZone.run(() => {

                switch(direction) {
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

                    }
                    default : {
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
            switch(direction) {
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

                }
                default : {
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

    constructor(
        private navCtrl: NavController,
        private http: HTTP,
        private platform: Platform,
        private screenOrientation: ScreenOrientation,
        private ngZone: NgZone) { }
}
