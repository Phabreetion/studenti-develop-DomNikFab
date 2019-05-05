import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-gestore-lista-corsi',
  templateUrl: './gestore-lista-corsi.component.html',
  styleUrls: ['./gestore-lista-corsi.component.scss'],
})
export class GestoreListaCorsiComponent implements OnInit {

  constructor(private modalController: ModalController) {


  }

  ngOnInit() {}

  // non restituisce nessun valore.. da implementare
  closeFiltri(){
    this.modalController.dismiss(
        {result : null }
    );

  }

}
