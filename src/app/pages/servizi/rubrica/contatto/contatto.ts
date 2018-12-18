import { Component, OnInit } from '@angular/core';
import {GlobalDataService} from '../../../../services/global-data.service';


@Component({
    selector: 'app-page-contatto',
    templateUrl: 'contatto.html',
})

export class ContattoPage implements OnInit {

    contatto: any;

    constructor(
        public globalData: GlobalDataService) {
    }


    ngOnInit() {

        this.contatto = this.globalData.contatto;

        if ( (this.contatto.tel1 != null) && (this.contatto.tel1 !== '') ) {
            if (this.contatto.tel1.indexOf('+39') !== 0) {
              this.contatto.tel1 = '+39 0874 404' + this.contatto.tel1;
            }
        } else {
          this.contatto.tel1 = 'Numero non presente!';
        }
        if ( (this.contatto.tel2 != null)
            && (this.contatto.tel2 !== '')
            && (this.contatto.tel2.indexOf('+39') !== 0)
            && (this.contatto.tel2.indexOf('0') !== 0)) {
          this.contatto.tel2 = '+39 0874 404' + this.contatto.tel2.slice(1);
        }
        if ( (this.contatto.tel3 != null) &&
            (this.contatto.tel3 !== '') &&
            (this.contatto.tel3.indexOf('+39') !== 0)
            && (this.contatto.tel3.indexOf('0') !== 0)) {
          this.contatto.tel3 = '+39 0874 404' + this.contatto.tel3.slice(1);
        }
        if ( (this.contatto.tel4 != null) &&
            (this.contatto.tel4 !== '') &&
            (this.contatto.tel4.indexOf('+39') !== 0) &&
            (this.contatto.tel4.indexOf('0') !== 0)) {
          this.contatto.tel4 = '+39 0874 404' + this.contatto.tel4.slice(1);
        }
    }

    // onGoBack()  {
    //     this.navCtrl.navigateBack('/rubrica');
    // }
}
