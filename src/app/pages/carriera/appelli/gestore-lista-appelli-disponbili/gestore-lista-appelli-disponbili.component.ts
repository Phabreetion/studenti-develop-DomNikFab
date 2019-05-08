import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-gestore-lista-appelli-disponbili',
  templateUrl: './gestore-lista-appelli-disponbili.component.html',
  styleUrls: ['./gestore-lista-appelli-disponbili.component.scss'],
})
export class GestoreListaAppelliDisponbiliComponent implements OnInit {

  private ordinamento: number;

  constructor(
      private modalController: ModalController) { }

  ngOnInit() {}

  closeAppelli() {
    this.modalController.dismiss(
        {result : null }
    );
  }

  private reset() {
    this.ordinamento = 0;
    
  }

}
