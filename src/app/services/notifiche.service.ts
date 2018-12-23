import { Injectable } from '@angular/core';
import {GlobalDataService} from './global-data.service';
import {Storage} from '@ionic/storage';
import {FCM} from '@ionic-native/fcm/ngx';
import {Platform} from '@ionic/angular';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class NotificheService {

  constructor(
      private storage: Storage,
      public services: HttpService,
      private fcm: FCM,
      private platform: Platform,
  ) { }

    sottoscrivi(topic) {
        this.fcm.subscribeToTopic(topic).then(
            (res) => {
                GlobalDataService.log(1, 'Sottoscrizione a ' + topic + ' confermata', res);
            }, (err) => {
                GlobalDataService.log(2, 'Sottoscrizione a ' + topic + ' fallita', err);
            }
        );
    }

    rimuoviSottoscrizione(topic) {
        this.fcm.unsubscribeFromTopic(topic).then(
            (res) => {
                GlobalDataService.log(1, 'Sottoscrizione a ' + topic + ' rimossa', res);
            }, (err) => {
                GlobalDataService.log(2, 'Sottoscrizione a ' + topic + ' NON rimossa', err);
            }
        );
    }

    aggiornaSottoscrizioni() {
        if (this.platform.is('ios') || (this.platform.is('android'))) {
            // Aggiorniamo la sottoscrizione delle topic di notifica

            this.fcm.getToken().then((token) => {
                GlobalDataService.log(1, 'Token notifiche ' + token, null);

                // this.sottoscrivi('testbeta');

                let topic: string;

                // Notifiche per lo studente
                this.storage.get('matricola').then(
                    (matricola) => {
                        if (matricola) {
                            topic = 'MAT' + matricola;
                            GlobalDataService.log(1, 'Aggiorno ' + topic, null);

                            this.storage.get('carriera').then(
                                (data) => {
                                    if (data === false) {
                                        this.rimuoviSottoscrizione(topic);
                                    } else {
                                        this.sottoscrivi(topic);
                                    }
                                },
                                (err) => {
                                    GlobalDataService.log(1, 'Sottoscrizione di default per carriera ' + topic, err);
                                    this.sottoscrivi(topic);
                                });
                        }
                    }, (err) => {
                        // TO BE CHECKED!
                        GlobalDataService.log(2, 'Matricola non presente nello storage!', err);
                    });

                GlobalDataService.sleepBW(1000);

                // News di Ateneo

                this.storage.get('newsAteneo').then(
                    (data) => {
                        GlobalDataService.log(1, 'Aggiorno ' + topic, null);
                        if (data === false) {
                            this.rimuoviSottoscrizione(topic);
                        } else {
                            this.sottoscrivi('UNIMOL');
                        }
                    },
                    (err) => {
                        GlobalDataService.log(1, 'Sottosrizione di default per News Ateneo ' + topic, err);
                        this.sottoscrivi('UNIMOL');
                    });

                GlobalDataService.sleepBW(1000);

                // News di Dipartimento
                this.storage.get('dipID').then(
                    (id) => {
                        if (id != null) {
                            topic = 'DIP' + id;
                            GlobalDataService.log(1, 'Aggiorno ' + topic, null);

                            this.storage.get('newsDipartimento').then(
                                (data) => {
                                    if (data === false) {
                                        this.rimuoviSottoscrizione(topic);
                                    } else {
                                        this.sottoscrivi(topic);
                                    }
                                },
                                (err) => {
                                    GlobalDataService.log(0, 'newsDipartimento non impostato', err);
                                    this.sottoscrivi(topic);
                                });
                        }
                    }, (err) => {
                        // TO BE CHECKED!
                        GlobalDataService.log(2, 'Non è presente il codice del dipartimento nello storage!', err);
                    }
                );

                GlobalDataService.sleepBW(1000);

                // News dal Corso di studi
                this.storage.get('cdsID').then(
                    (id) => {
                        if (id != null) {
                            topic = 'CDS' + id;
                            GlobalDataService.log(1, 'Aggiorno ' + topic, null);

                            this.storage.get('newsCds').then(
                                (data) => {
                                    if (data === false) {
                                        this.rimuoviSottoscrizione(topic);
                                    } else {
                                        this.sottoscrivi(topic);
                                    }
                                },
                                (err) => {
                                    GlobalDataService.log(0, 'newsCds non impostato', err);
                                    this.sottoscrivi(topic);
                                });
                        }
                    }, (err) => {
                        // TO BE CHECKED!
                        GlobalDataService.log(2, 'Non è presente il codice del corso nello storage!', err);
                    }
                );
            }, (err) => {
                GlobalDataService.log(1, 'Nessun token notifiche!', err);
            });

        }
    }

    rimuoviSottoscrizioni() {
        return new Promise((resolve) => {
            if (this.platform.is('ios') || (this.platform.is('android'))) {

                let topic: string;

                this.storage.get('matricola').then(
                    (matricola) => {
                        if (matricola) {
                            topic = 'MAT' + matricola;
                            this.rimuoviSottoscrizione(topic);
                            GlobalDataService.log(1, 'Rimuovo ' + topic, null);
                        }
                    }, (err) => {
                        GlobalDataService.log(2, 'Non è presente la matricola nello storage!', err);
                    });

                this.storage.get('cdsID').then(
                    (cdsID) => {
                        if (cdsID != null) {
                            topic = 'CDS' + cdsID;

                            this.rimuoviSottoscrizione(topic);
                            GlobalDataService.log(1, 'Rimuovo ' + topic, null);
                        }
                    }, (err) => {
                        GlobalDataService.log(2, 'Non è presente il cdsId nello storage!', err);
                    }
                );

                this.storage.get('dipID').then(
                    (dipID) => {
                        if (dipID != null) {
                            topic = 'DIP' + dipID;

                            this.rimuoviSottoscrizione(topic);
                            GlobalDataService.log(1, 'Rimuovo ' + topic, null);
                        }
                    }, (err) => {
                        GlobalDataService.log(2, 'Non è presente dipID nello storage!', err);
                    }

                );

                topic = 'UNIMOL';
                this.rimuoviSottoscrizione(topic);
                GlobalDataService.log(1, 'Rimuovo ' + topic, null);
                resolve();

            } else {
                // In esecuzione su web
                GlobalDataService.log(1, 'Nessuna sottroscrizione notifiche da rimuovere ', null);
                resolve();
            }
        });
    }


    aggiornamentoPeriodicoSottoscrizioni() {
        return new Promise((resolve) => {
            if (this.platform.is('ios') || (this.platform.is('android'))) {
                this.storage.get('lastSubscriptionUpdate').then(
                    (data) => {
                        GlobalDataService.log(0, 'Ultima verifica:', data);

                        const oggi = new Date();
                        const tsOggi = oggi.getTime();
                        const ultimoCheck = new Date(data);
                        const oreTrascorse = GlobalDataService.differenzaOre(oggi, ultimoCheck);
                        // let minutiTrascorsi = this.differenzaMinuti(oggi, ultimoCheck);

                        GlobalDataService.log(0,
                            'Ultima verifica aggiornamentoPeriodicoSottoscrizioni: ' + oreTrascorse +
                            ' ore fa ovvero : ' + ultimoCheck, null);

                        if ((data != null) && (oreTrascorse < 2)) {
                            GlobalDataService.log(1, 'Non sono trascorse ancora 2 ore!', null);
                            resolve(true);
                            return;
                        } else {
                            GlobalDataService.log(1, 'Sono trascorse ' + oreTrascorse + ' ore', null);
                            this.storage.set('lastSubscriptionUpdate', tsOggi).then(
                                () => {
                                }, (storageErr) => {
                                    GlobalDataService.log(2, 'Errore in local storage', storageErr);
                                }
                            );
                            this.aggiornaSottoscrizioni();
                            resolve(true);
                            return;
                        }
                    }, (err) => {
                        // Se non abbiamo mai salvato l'ultimo check, inizializziamolo
                        this.storage.set('lastSubscriptionUpdate', new Date(75, 2, 20).getTime()).then(
                            () => {
                            }, (storageErr) => {
                                GlobalDataService.log(2, 'Errore in local storage', storageErr);
                            }
                        );
                        GlobalDataService.log(1, 'lastSubscriptionUpdate non inizializzata', err);
                        resolve(false);
                    });
            } else {
                resolve(false);
            }
        });
    }
}
