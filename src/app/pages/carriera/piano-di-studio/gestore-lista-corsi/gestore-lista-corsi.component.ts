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


  //filtri
  private filtroSupertati: boolean;
  private filtroNonSupertati: boolean;
  private filtroPerAnno: number;

  //ordinamento
  private ordinamentoOffset: number;
  private ordinamentoSelected: number;

  private idOrdinamento: number; // ordinamentoSelected + ordinamentoOffset

  constructor(
      private modalController: ModalController,
      private navParam: NavParams) {
    this.resetFiltri();
  }

  ngOnInit() {
    this.sourcePage = this.navParam.get('page');
    this.filtroSupertati = this.sourcePage.filtroSuperatiAttivo;
    this.filtroNonSupertati = this.sourcePage.filtroNonSuperatiAttivo;
    this.filtroPerAnno = this.sourcePage.filtroPerAnno;

    this.ordinamentoSelected = this.sourcePage.idOrdinamento/2;
    this.ordinamentoOffset = this.sourcePage.idOrdinamento%2;
    this.idOrdinamento = this.ordinamentoSelected + this.ordinamentoOffset;
  }

  private updateSourcePage() {
    console.log(this.filtroSupertati);
    console.log(this.filtroNonSupertati);
    console.log(this.ordinamentoSelected);
    console.log(this.ordinamentoOffset);

    this.sourcePage.filtroSuperatiAttivo = this.filtroSupertati;
    this.sourcePage.filtroNonSuperatiAttivo = this.filtroNonSupertati;
    this.sourcePage.filtroPerAnno = this.filtroPerAnno;
    this.sourcePage.idOrdinamento = this.ordinamentoSelected + this.ordinamentoOffset;

    console.log(this.sourcePage.idOrdinamento);

    this.sourcePage.updateFiltri();
  }

  //
  closeFiltri() {
    this.modalController.dismiss();
  }

  private resetFiltri() {
    this.filtroNonSupertati = false;
    this.filtroSupertati = false;
    this.filtroPerAnno = -1;


    this.ordinamentoSelected = 0;
    this.ordinamentoOffset = 0;
    this.idOrdinamento = this.ordinamentoSelected + this.ordinamentoOffset;
  }


}
