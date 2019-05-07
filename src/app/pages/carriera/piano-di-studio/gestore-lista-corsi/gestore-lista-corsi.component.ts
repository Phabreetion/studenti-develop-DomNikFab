import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-gestore-lista-corsi',
  templateUrl: './gestore-lista-corsi.component.html',
  styleUrls: ['./gestore-lista-corsi.component.scss'],
})
export class GestoreListaCorsiComponent implements OnInit {
  private sourcePage: any;

  private ordinamento: number;

  constructor(
      private modalController: ModalController,
      private navParam: NavParams) {
  }

  ngOnInit() {
    this.sourcePage = this.navParam.get('page');
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
