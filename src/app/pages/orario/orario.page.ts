import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { SyncService } from '../../services/sync.service';
import { GlobalDataService } from '../../services/global-data.service';
import { NotificheService } from '../../services/notifiche.service';
import { AccountService } from '../../services/account.service';
import { HttpService } from '../../services/http.service';

import { CalendarComponent } from 'ionic2-calendar/calendar';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-page-orario',
  templateUrl: 'orario.page.html',
  styleUrls: ['orario.page.scss'],
})
export class OrarioPage implements OnInit {

  currentPage = '/orario';

  idServizioOrario = 17; // servizio orario provvisorio

  inizializzato = false;

  dataAggiornamento: string;
  aggiornamentoVerificato = false;
  rinvioAggiornamento = false;
  nrRinvii = 0;
  maxNrRinvii = 5;

  ultimoDato = '';

  listaCorsiSeguiti = null;
  orario = null;

  // test cal
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  minDate = new Date().toISOString();

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    public toastCtrl: ToastController,
    public sync: SyncService,
    public http: HttpService,
    public storage: Storage,
    public platform: Platform,
    public globalData: GlobalDataService,
    public notificheService: NotificheService,
    public account: AccountService
  ) { }

  ngOnInit() {
    this.globalData.srcPage = '/orario';
   
  }

  ionViewDidEnter() {

    this.aggiorna(false, true);
  }


  aggiorna(interattivo: boolean, sync: boolean) {
    

    this.storage.get('CorsiSeguiti').then(
      (dati) => {
        console.log(this.listaCorsiSeguiti);
        this.listaCorsiSeguiti = dati;

        if (this.listaCorsiSeguiti == null || this.listaCorsiSeguiti == []) {
          this.primoAvvio();

        } else {

          // Otteniamo l'orario
          this.sync.getJson(this.idServizioOrario, this.listaCorsiSeguiti, true).then(
            (data) => {

              this.orario = data[0];

              console.log(this.orario);
              this.orario.forEach(lesson => {
                let event = {
                  title: lesson["description"],
                  startTime: new Date(lesson["start"]),
                  endTime: new Date(lesson["end"]),
                  desc: lesson["name"]
                }
                this.eventSource.push(event);

              });

              this.inizializzato = true;

              this.dataAggiornamento = SyncService.dataAggiornamento(data);
              this.myCal.loadEvents();

            },
            (err) => {
              GlobalDataService.log(2, 'Errore in aggiorna', err);
            }).catch(ex => {
              GlobalDataService.log(2, 'Eccezione in aggiorna', ex);

            });
        }
      }
    )
  }

  primoAvvio() {
    console.log("3");
    this.globalData.goTo(this.currentPage, '/selezione-orario', 'forward', false);
  }

  doRefresh(refresher) {
    if (refresher) {
      refresher.target.complete();
    }

    this.aggiorna(true, true);
  }

  modificaOrario() {
    console.log("2");
    this.inizializzato = false;
    this.storage.set("CorsiSeguiti", this.listaCorsiSeguiti);
    this.globalData.goTo(this.currentPage, '/selezione-orario', 'forward', false);
  }

  // test cal

  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }
}

