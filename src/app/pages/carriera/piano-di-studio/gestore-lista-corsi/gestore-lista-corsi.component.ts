import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {PianoDiStudioPage} from '../piano-di-studio.page';

@Component({
  selector: 'app-gestore-lista-corsi',
  templateUrl: './gestore-lista-corsi.component.html',
  styleUrls: ['./gestore-lista-corsi.component.scss'],
})
export class GestoreListaCorsiComponent implements OnInit {
  private sourcePage: PianoDiStudioPage;

  private ordinamento: number;
  private filtroSupertati: boolean;
  private filtroNonSupertati: boolean;

  constructor(
      private modalController: ModalController,
      private navParam: NavParams) {
    this.filtroSupertati = false;
    this.filtroNonSupertati = false;
  }

  ngOnInit() {
    this.sourcePage = this.navParam.get('page');
  }

  private updateSourcePage() {
    this.sourcePage.filtra(this.filtroSupertati, this.filtroNonSupertati);
  }

  // non restituisce nessun valore.. da implementare
  closeFiltri() {
    this.modalController.dismiss(
        {result : null }
    );
  }

  private reset() {
    this.ordinamento = 0;
  }


}
