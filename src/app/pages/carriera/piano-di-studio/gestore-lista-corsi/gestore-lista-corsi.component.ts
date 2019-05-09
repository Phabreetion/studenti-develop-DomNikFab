import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {PianoDiStudioPage} from '../piano-di-studio.page';

@Component({
  selector: 'app-gestore-lista-corsi',
  templateUrl: './gestore-lista-corsi.component.html',
  styleUrls: ['./gestore-lista-corsi.component.scss'],
})
export class GestoreListaCorsiComponent implements OnInit {
  public sourcePage: PianoDiStudioPage;

  //ordinamento
  private ordinamentoOffset: number;
  private ordinamentoSelected: number;

  private idOrdinamento: number; // ordinamentoSelected + ordinamentoOffset

  constructor(
      private modalController: ModalController,
      private navParam: NavParams) {
  }

  ngOnInit() {
    this.sourcePage = this.navParam.get('page');
  }

  private updateSourcePage() {
    console.log(this.sourcePage.filtroSuperatiAttivo);
    console.log(this.sourcePage.filtroNonSuperatiAttivo);
    console.log(this.sourcePage.filtroPerAnno);
    //console.log(this.ordinamentoSelected);
    //console.log(this.ordinamentoOffset);
    //console.log(this.sourcePage.idOrdinamento);

    this.sourcePage.updateFiltri();
  }

  //
  closeFiltri() {
    this.modalController.dismiss();
  }

  private resetFiltri() {
    this.sourcePage.filtroSuperatiAttivo = false;
    this.sourcePage.filtroNonSuperatiAttivo = false;
    this.sourcePage.filtroPerAnno = -1;


    //this.ordinamentoSelected = 0;
    //this.ordinamentoOffset = 0;
    //this.idOrdinamento = this.ordinamentoSelected + this.ordinamentoOffset;
  }


}
