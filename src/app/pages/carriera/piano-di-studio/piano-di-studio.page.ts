import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-piano-di-studio',
  templateUrl: './piano-di-studio.page.html',
  styleUrls: ['./piano-di-studio.page.scss'],
})
export class PianoDiStudioPage implements OnInit {

  private corsi: any[];
  private corsiFiltrati: any[];
  private searchKey: String;
  showSearchBar = false;
  searchTerm = '';
  flyInOutState = 'in';


  // Sarà un array di corsi

  constructor() {
    this.searchKey = '';
  }

  ngOnInit() {
    this.corsi = [
      {id: 1, anno: 1, nome: 'Programmazione'},
      {id: 2, anno: 1, nome: 'Matematica'},
      {id: 3, anno: 1, nome: 'Informatica giuridica'},
      {id: 4, anno: 2, nome: 'Storia della matematica'},
      {id: 5, anno: 2, nome: 'Ingegneria del software'},
      {id: 6, anno: 2, nome: 'Storia della matematica'},
      {id: 7, anno: 3, nome: 'Informatica territoriale'},
      {id: 8, anno: 3, nome: 'Ricerca operativa'},
    ]; // Prova per testare
    this.filtra();
  }

  doRefresh(event) {
    // @TODO sostituire con la funzione di aggionramento del libretto
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  private filtra(): void {
     }
  private onSearchCancel(): void {
    this.searchTerm = '';
    this.filtra();
  }
  private  toggleInOut() {
    this.flyInOutState === 'out' ? this.flyInOutState = 'in' : this.flyInOutState = 'out';
    this.showSearchBar = !this.showSearchBar;
  }
}
