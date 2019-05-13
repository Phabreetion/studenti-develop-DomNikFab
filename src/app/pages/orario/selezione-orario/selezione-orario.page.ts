import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ToastController } from '@ionic/angular';
import { SyncService } from '../../../services/sync.service';
import { GlobalDataService } from '../../../services/global-data.service';
import { NotificheService } from '../../../services/notifiche.service';
import { AccountService } from '../../../services/account.service';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-selezione-orario',
  templateUrl: 'selezione-orario.page.html',
  styleUrls: ['selezione-orario.page.scss'],
})
export class SelezioneOrarioPage implements OnInit {

  currentPage = '/selezione-orario';

  idServizioPds = 12; // Piano di studi

  inizializzato = false;

  dataAggiornamento: string;
  aggiornamentoVerificato = false;
  rinvioAggiornamento = false;
  nrRinvii = 0;
  maxNrRinvii = 5;

  ultimoDato = '';

  listaCorsi = null;
  listaCorsiSeguiti = null;

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

    this.globalData.srcPage = '/selezione-orario';

    this.aggiorna(true, true);
  }

  aggiorna(interattivo: boolean, sync: boolean) {

    if (this.sync.loading[this.idServizioPds]) {
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
      this.aggiorna(true, true);
    }
  }

  setListaCorsi(lista: any) {
    this.inizializzato = true;

    this.dataAggiornamento = SyncService.dataAggiornamento(lista);
    this.listaCorsi = lista[0];

    this.storage.get('CorsiSeguiti').then(
      (dati) => {
        this.listaCorsiSeguiti = dati;

        console.log("list->");
        console.log(this.listaCorsiSeguiti);

        this.listaCorsi.forEach(corso => {
          this.listaCorsiSeguiti.forEach(corsoSeguito => {

            if (corso["CODICE"] === corsoSeguito) {
              console.log("sot");
              this.listaCorsi["SOTTOSCRITTO"] = 1;
            } else {
              console.log("UNsot");
              this.listaCorsi["SOTTOSCRITTO"] = 0;
            }
          });

        });
      }
    )

    if (!this.listaCorsi || !this.listaCorsi[0]) {
      return this.aggiorna(true, true);
    }

  }

  isLoading() {

    return this.sync.loading[this.idServizioPds];
  }

  doRefresh(refresher) {

    if (refresher) {
      refresher.target.complete();
    }

    this.aggiorna(true, true);
  }

  aggiungiCorso(codCorso: string) {
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
    this.storage.set("CorsiSeguiti", this.listaCorsiSeguiti);

    this.globalData.goTo(this.currentPage, '/orario', 'forward', false);
  }

}
