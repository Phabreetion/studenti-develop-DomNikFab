import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-piano-di-studio',
  templateUrl: './piano-di-studio.page.html',
  styleUrls: ['./piano-di-studio.page.scss'],
})
export class PianoDiStudioPage implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  doRefresh(event) {
    // @TODO sostituire con la funzione di aggionramento del libretto
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
