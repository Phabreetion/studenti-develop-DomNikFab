import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from "../../../services/global-data.service";
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-esame',
    templateUrl: './esame.page.html',
    styleUrls: ['./esame.page.scss'],
})
export class EsamePage implements OnInit {

    srcPage: string;
    esame: any;

    constructor(
        public globalData: GlobalDataService) {
    }

    ngOnInit() {
        this.srcPage = this.globalData.srcPage;
        this.esame = this.globalData.esame;
        this.globalData.getConnected();
    }

    onGoBack()  {
        this.globalData.goTo(this.globalData.srcPage, this.globalData.srcPage,'backward', false);

    }

}
