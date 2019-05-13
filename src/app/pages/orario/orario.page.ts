import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ToastController } from '@ionic/angular';
import { SyncService } from '../../services/sync.service';
import { GlobalDataService } from '../../services/global-data.service';
import { NotificheService } from '../../services/notifiche.service';
import { AccountService } from '../../services/account.service';
import { HttpService } from '../../services/http.service';


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


  constructor(
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
    this.aggiorna(true, true);

  }


  aggiorna(interattivo: boolean, sync: boolean) {
    if (this.sync.loading[this.idServizioOrario]) {
      this.rinvioAggiornamento = true;
      this.dataAggiornamento = 'in corso';
      this.nrRinvii++;

      GlobalDataService.log(0, 'Rinvio' + this.nrRinvii, null);

      if (this.nrRinvii < this.maxNrRinvii) {
        setTimeout(() => {
          this.aggiorna(interattivo, sync);
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


    this.storage.get('CorsiSeguiti').then(
      (dati) => {
        this.listaCorsiSeguiti = dati;

        console.log("listaOrario ->");
        console.log(this.listaCorsiSeguiti);
        if (this.listaCorsiSeguiti == null) {
          this.primoAvvio();

        } else {

          // Otteniamo l'orario
          this.sync.getJson(17, this.listaCorsiSeguiti, true).then(
            (data) => {
              this.setOrario(data);
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
      }
    )
  }

  controllaAggiornamento() {
    // La verifica dell'aggiornamento in background la facciamo solo una volta
    if (this.aggiornamentoVerificato) {
      return;
    }

    // Se stiamo caricando dati dal server rimandiamo la verifica
    if (this.sync.loading[this.idServizioOrario]) {
      setTimeout(() => {
        this.controllaAggiornamento();
      }, 1000);
    } else {
      this.aggiornamentoVerificato = true;
      this.aggiorna(true, true);
    }
  }

  primoAvvio() {
    this.globalData.goTo(this.currentPage, '/selezione-orario', 'forward', false);
  }

  setOrario(orario: any) {

    if (!orario || !orario[0]) {
      return this.aggiorna(true, true);
    }

   
    this.dataAggiornamento = SyncService.dataAggiornamento(orario);
    this.orario = orario[0];

    console.log("set orario inizializzato = true");
    this.inizializzato = true;

    if (!this.orario) {
      this.orario = [];
    }
  }

  isLoading() {
    // console.log("isloading");
    return this.sync.loading[this.idServizioOrario];
  }

  doRefresh(refresher) {
    if (refresher) {
      refresher.target.complete();
    }

    this.aggiorna(true, true);
  }

  modificaOrario() {
    console.log("mod orario inizializzato = false");
    this.inizializzato = false;
    this.storage.set("CorsiSeguiti", this.listaCorsiSeguiti);
    this.globalData.goTo(this.currentPage, '/selezione-orario', 'forward', false);
  }
}
