import { Component, OnInit, ViewChild, Inject, LOCALE_ID, NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { SyncService } from '../../services/sync.service';
import { GlobalDataService } from '../../services/global-data.service';
import { NotificheService } from '../../services/notifiche.service';
import { AccountService } from '../../services/account.service';
import { HttpService } from '../../services/http.service';

import { CalendarComponent } from 'ionic2-calendar/calendar';
import { formatDate, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it'


@Component({
  selector: 'app-page-orario',
  templateUrl: 'orario.page.html',
  styleUrls: ['orario.page.scss'],
})

@NgModule({
  providers: [
    { provide: LOCALE_ID, useValue: 'it-IT' }
  ]
})

export class OrarioPage implements OnInit {


  currentPage = '/orario';

  idServizioPds = 12; // servizio Piano di studi
  idServizioOrario = 17; // servizio Orario

  inizializzato = false;
  selezionaCorsi = false;

  dataAggiornamento: string;
  aggiornamentoVerificato = false;
  rinvioAggiornamento = false;
  nrRinvii = 0;
  maxNrRinvii = 5;

  ultimoDato = '';

  listaCorsi = null;
  listaCorsiSeguiti = null;
  orario = null;

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
    locale: 'it-IT',
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
  ) {
    registerLocaleData(localeIt);
  }

  ngOnInit() {
    this.globalData.srcPage = '/orario';

    this.aggiornaOrario(false, true);
  }

  aggiornaOrario(interattivo: boolean, sync: boolean) {


    this.storage.get('CorsiSeguiti').then(
      (dati) => {

        this.listaCorsiSeguiti = dati;
        //  console.log(this.listaCorsiSeguiti);
        if (this.listaCorsiSeguiti == null || this.listaCorsiSeguiti[0] == null) {
          this.primoAvvio();

        } else {

          // Otteniamo l'orario
          this.sync.getJson(this.idServizioOrario, this.listaCorsiSeguiti, true).then(
            (data) => {

              this.orario = data[0];

              //console.log(data[0]);
              this.eventSource = [];

              this.orario.forEach(lesson => {
                var nomeMateria = "";
                nomeMateria = lesson["description"];

                if (nomeMateria.length>35){  
                nomeMateria=nomeMateria.substring(0, 30)+"...";
                }

                let event = {
                  title: nomeMateria ,
                  startTime: new Date(lesson["start"]),
                  endTime: new Date(lesson["end"]),
                  desc: lesson["name"],
                  
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
    this.selezionaCorsi = true;
    this.aggiornaLista(false, true);
  }

  doRefresh(refresher) {
    if (refresher) {
      refresher.target.complete();
    }

    this.aggiornaOrario(true, true);

  }

  modificaOrario() {
    this.selezionaCorsi = true;
    this.inizializzato = false;
    this.aggiornaLista(false, true);
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'Dalle: ' + start + '<br><br>Alle: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

  aggiornaLista(interattivo: boolean, sync: boolean) {

    if (this.sync.loading[this.idServizioPds]) {
      this.rinvioAggiornamento = true;
      this.dataAggiornamento = 'in corso';
      this.nrRinvii++;

      GlobalDataService.log(0, 'Rinvio' + this.nrRinvii, null);

      if (this.nrRinvii < this.maxNrRinvii) {
        setTimeout(() => {
          this.aggiornaLista(interattivo, sync);
        }, 2000);
        return;
      } else {
        if (this.http.connessioneLenta) {
          this.toastCtrl.create({
            message: 'La connessione è assente o troppo lenta. Riprova ad aggiornare i dati più tardi.',
            duration: 3000,
            position: 'bottom'
          }).then(
            (toast) => { toast.present(); },
            (err) => { GlobalDataService.log(2, 'Errore in aggiorna', err); });
        }
      }
    }
    this.rinvioAggiornamento = false;
    this.nrRinvii = 0;


    // Otteniamo la lista corsi
    this.sync.getJson(this.idServizioPds, null, sync).then(
      (data) => {

        this.setListaCorsi(data);

        this.dataAggiornamento = SyncService.dataAggiornamento(data);
      },
      (err) => {
        GlobalDataService.log(2, 'Errore in aggiorna', err);
      }).catch(ex => {
        GlobalDataService.log(2, 'Eccezione in aggiorna', ex);
        setTimeout(() => {
          this.controllaAggiornamento();
        }, 1000);
      });

  }

  controllaAggiornamento() {

    // La verifica dell'aggiornamento in background la facciamo solo una volta
    if (this.aggiornamentoVerificato) {
      return;
    }

    // Se stiamo caricando dati dal server rimandiamo la verifica
    if (this.sync.loading[this.idServizioPds]) {
      setTimeout(() => {
        this.controllaAggiornamento();
      }, 1000);
    } else {
      this.aggiornamentoVerificato = true;
      this.aggiornaOrario(true, true);
    }
  }

  setListaCorsi(lista: any) {
    this.inizializzato = true;

    this.dataAggiornamento = SyncService.dataAggiornamento(lista);
    this.listaCorsi = lista[0];

    this.storage.get('CorsiSeguiti').then(
      (dati) => {
        this.listaCorsiSeguiti = dati;

        //  console.log("list->");

        if (this.listaCorsiSeguiti != null) {

          console.log(this.listaCorsiSeguiti);
          this.listaCorsi.forEach(corso => {
            this.listaCorsiSeguiti.forEach(corsoSeguito => {

              if (corso["CODICE"] === corsoSeguito) {

                //   console.log("sot");
                this.listaCorsi["SOTTOSCRITTO"] = 1;
              } else {
                // console.log("UNsot");
                this.listaCorsi["SOTTOSCRITTO"] = 0;
              }
            });

            this.inizializzato = true;

          });
        } else {
          //   console.log("data");
          this.listaCorsi.forEach(corso => {

            this.listaCorsi["SOTTOSCRITTO"] = 0;
            this.inizializzato = true;

            //console.log(this.listaCorsi["SOTTOSCRITTO"]);
          })
        }

        if (!this.listaCorsi || !this.listaCorsi[0]) {
          return this.aggiornaLista(true, true);
        }

      });
  }

  isLoading() {

    return this.sync.loading[this.idServizioOrario];
  }


  aggiungiCorso(codCorso: string) {
    // console.log(this.listaCorsi);
    this.listaCorsi.forEach(corso => {
      if (corso["CODICE"] === codCorso) {
        if (corso["SOTTOSCRITTO"] == 0) {
          corso["SOTTOSCRITTO"] = 1;
        } else {
          corso["SOTTOSCRITTO"] = 0;
        }
      }
    });
  }

  confermaSelezione() {
    this.listaCorsiSeguiti = [];
    this.listaCorsi.forEach(element => {
      if (element["SOTTOSCRITTO"] == 1) {
        this.listaCorsiSeguiti.push(element["CODICE"]);
      }
    });
    this.storage.set("CorsiSeguiti", this.listaCorsiSeguiti).then(
      () => {
        this.selezionaCorsi = false;
        this.inizializzato = false;
        this.aggiornaOrario(false, true);
      }
    )
  }
}

