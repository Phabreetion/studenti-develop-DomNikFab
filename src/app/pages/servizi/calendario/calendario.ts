import {Component, OnInit} from '@angular/core';
import { AlertController, NavParams, ToastController } from '@ionic/angular';
// import * as moment from 'moment';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {HttpService} from '../../../services/http.service';

/**
 * Generated class for the CalendarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'app-page-calendario',
    templateUrl: 'calendario.html',
})
export class CalendarioPage implements OnInit {
    idServizio = 17;
    eventi: Array<any> = [];
    dataAggiornamento: string;
    eventSource = [];
    viewTitle: string;
    selectedDay = new Date();
    aggiornamentoVerificato = false;

    calendar = {
        mode: 'month',
        currentDate: new Date(),
        // locale: 'it-IT',
        autoSelect: false,
        noEventsLabel: 'Nessun evento',

    };

    constructor(
        public navParams: NavParams,
        public sync: SyncService,
        public http: HttpService,
        public globalData: GlobalDataService,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController) {
    }


    ngOnInit() {
        this.http.getConnected();
        // this.aggiorna(false, true);
    }

    /*

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onCurrentDateChanged(title) {
    }

    onEventSelected(evento) {
        this.alertCtrl.create({
            header: moment(evento.startTime).format('LLL'),
            subHeader: evento.title,
            buttons: ['Chiudi']
        }).then(alert => alert.present());
    }

    eventSelected(evento) {
        this.alertCtrl.create({
            header: moment(evento.startTime).format('LLL'),
            subHeader: evento.title,
            buttons: ['Chiudi']
        }).then(alert => alert.present());
    }

    onTimeSelected(ev) {
        this.selectedDay = ev.selectedTime;
    }

    swapView() {
        if ( this.calendar.mode === 'month' ) {
            this.calendar.mode = 'week';
        } else {
            this.calendar.mode = 'month';
        }
    }

    today() {
        this.calendar.currentDate = new Date();
    }

    caricaEventi() {
        const events = [];
        for (const evento of this.eventi) {

            const start = moment(evento.start.date).toDate();
            const end =  moment(evento.end.date).toDate();

            if (evento.start.date === evento.end.date) {
                end.setHours(end.getHours() + 2);
            }

            events.push({
                tipo: evento.tipo,
                title: evento.description,
                startTime: start,
                endTime: end,
                aula: evento.aula,
                docente: evento.docente,
                allDay: false
            });
        }
        this.eventSource = [];
        setTimeout(() => {
            this.eventSource = events;
        });

        // events.push({
        //         title: 'Ingegneria del Software e laboratorio',
        //         startTime: new Date('2017-12-28 11:00:00'),
        //         endTime: new Date('2017-12-28 13:00:00'),
        //         aula: 'Aula Informatica - B. Pascal',
        //         allDay: false
        //     });
        //
        // events.push({
        //     title: 'Ingegneria del Software',
        //     startTime: new Date('2017-12-29 11:00:00'),
        //     endTime: new Date('2017-12-29 13:00:00'),
        //     docente: 'Prof. Fasano',
        //     aula: 'Aula Informatica - B. Pascal',
        //     allDay: false
        // });
        // events.push({
        //     title: 'Programmazione Web e Mobile',
        //     startTime: new Date('2017-12-29 14:00:00'),
        //     endTime: new Date('2017-12-29 16:00:00'),
        //     docente: 'Prof. Fasano',
        //     aula: 'Aula Pesche - M. Curie',
        //     allDay: false
        // });
    }

    isLoading() {
        return this.sync.loading[this.idServizio];
    }

    // Recupera i dati tramite il sincronizzatore
    // il parametro interattivo indica se mostrare il refresher durante il recupero dei dati dal server
    aggiorna(interattivo: boolean, sync: boolean) {
        // Se ancora stiamo caricando i dati dall'ultima richiesta è inutile forzare un secondo aggiornamento
        if (this.isLoading()) {
            return;
        }

        this.sync.getJson(this.idServizio, sync).then(
            (data) => {
                this.eventi = data[0];
                this.dataAggiornamento = SyncService.dataAggiornamento(data);
                this.caricaEventi();
                setTimeout(() => {
                    this.controllaAggiornamento();
                }, 1000);
            },
            (err) => {
                console.log('REJECT ' + err);
                if (interattivo) {
                    this.toastCtrl.create({
                        message: 'Non è stato possibile recuparate i dati dal server. Riprovare più tardi.',
                        duration: 3000
                    }).then( (toast) => {toast.present(); }, (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                }

            }).catch(err => {
                console.log('CATCH ' + err);
                if (interattivo) {
                    this.toastCtrl.create({
                        message: 'Non è stato possibile recuparate i dati dal server. Riprovare più tardi.',
                        duration: 3000
                    }).then( (toast) => {toast.present(); }, (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                }
            }
        );
    }

    controllaAggiornamento() {
        // La verifica dell'aggiornamento in background la facciamo solo una volta
        if (this.aggiornamentoVerificato) {
            return;
        }

        // Se stiamo caricando dati dal server rimandiamo la verifica
        if (this.sync.loading[this.idServizio]) {
            setTimeout(() => {
                this.controllaAggiornamento();
            }, 1000);
        } else {
            this.aggiornamentoVerificato = true;
            this.aggiorna(false, false);
        }
    }

    doRefresh(refresher) {
        if (refresher) {
            refresher.complete();
        }

        if (this.isLoading()) {
            return;
        }

        this.aggiorna(true, true);
    }

    date2string(stringDate): string {
        return GlobalDataService.formatStringDateTime(stringDate, '-', ':');
    }
    */

}
