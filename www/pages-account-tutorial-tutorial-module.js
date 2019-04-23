(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-account-tutorial-tutorial-module"],{

/***/ "./src/app/pages/account/tutorial/tutorial.html":
/*!******************************************************!*\
  !*** ./src/app/pages/account/tutorial/tutorial.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-grid no-padding>\n    <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n      <ion-col>\n        <ion-label> </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding>\n      <ion-col no-padding>\n        <ion-toolbar>\n          <ion-button expand=\"block\" fill=\"outline\" (click)=\"doContinua()\">Salta il tutorial</ion-button>\n        </ion-toolbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n\n<ion-content class=\"tutorial-page\">\n  <ion-slides slot=\"fixed\" align-self-center>\n    <ion-slide *ngFor=\"let slide of slides\">\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <h2 class=\"slide-title\" [innerHTML]=\"slide.title\"></h2>\n          </ion-col>\n        </ion-row>\n        <ion-row justify-content-center>\n          <ion-col text-center>\n            <img style=\"margin: auto\" [src]=\"slide.image\" class=\"slide-image\" text-center />\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <p [innerHTML]=\"slide.description\"></p>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-slide>\n\n    <ion-slide>\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <h2 class=\"slide-title\">Pronto ad iniziare?</h2>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <ion-spinner *ngIf=\"!show\"></ion-spinner>\n            <div *ngIf=\"!show\">Aggiornamento in corso...</div>\n            <div>L'aggiornamento continuerà in background</div>\n            <div *ngIf=\"showProgress\">{{progress}}</div>\n            <ion-label [(ngModel)]=\"progress\" ngDefaultControl></ion-label>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <ion-button *ngIf=\"show\" expand=\"block\" fill=\"clear\" icon-end color=\"primary\" (click)=\"doContinua()\">\n              Continua\n              <ion-icon name=\"arrow-forward\"></ion-icon>\n            </ion-button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-slide>\n  </ion-slides>\n\n\n  <!--\n  <ion-button *ngIf=\"!show\" expand=\"block\" fill=\"clear\" (click)=\"doContinua()\">Continua</ion-button>\n  -->\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/account/tutorial/tutorial.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/account/tutorial/tutorial.module.ts ***!
  \***********************************************************/
/*! exports provided: TutorialPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TutorialPageModule", function() { return TutorialPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _tutorial__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tutorial */ "./src/app/pages/account/tutorial/tutorial.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var TutorialPageModule = /** @class */ (function () {
    function TutorialPageModule() {
    }
    TutorialPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _tutorial__WEBPACK_IMPORTED_MODULE_5__["TutorialPage"]
                    }
                ])
            ],
            declarations: [_tutorial__WEBPACK_IMPORTED_MODULE_5__["TutorialPage"]]
        })
    ], TutorialPageModule);
    return TutorialPageModule;
}());



/***/ }),

/***/ "./src/app/pages/account/tutorial/tutorial.scss":
/*!******************************************************!*\
  !*** ./src/app/pages/account/tutorial/tutorial.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".tutorial-page .toolbar-background {\n  background: #FFF;\n  border-color: transparent; }\n\n.tutorial-page .slide-zoom {\n  height: 90%; }\n\n.tutorial-page .slide-title {\n  margin-top: 0.5rem;\n  font-size: 1.0rem; }\n\n.tutorial-page .slide-image {\n  max-height: 50%;\n  max-width: 60%;\n  margin: auto; }\n\n.tutorial-page b {\n  font-weight: 500; }\n\n.tutorial-page p {\n  padding: 0 0;\n  font-size: 0.8rem;\n  line-height: 1.2;\n  color: #60646B; }\n\n.tutorial-page p b {\n    color: #000000; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbnRvbmlvX21hc3Ryb3Bhb2xvL0Rlc2t0b3AvbW9kaWZpY2hlQVBQL3N0dWRlbnRpLW1hc3Rlci9zcmMvYXBwL3BhZ2VzL2FjY291bnQvdHV0b3JpYWwvdHV0b3JpYWwuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUdJLGdCQUFnQjtFQUNoQix5QkFBeUIsRUFBQTs7QUFKN0I7RUFRSSxXQUFXLEVBQUE7O0FBUmY7RUFZSSxrQkFBa0I7RUFDbEIsaUJBQWlCLEVBQUE7O0FBYnJCO0VBaUJJLGVBQWU7RUFDZixjQUFjO0VBQ2QsWUFBWSxFQUFBOztBQW5CaEI7RUF1QkksZ0JBQWdCLEVBQUE7O0FBdkJwQjtFQTJCSSxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixjQUFjLEVBQUE7O0FBOUJsQjtJQWlDTSxjQUFjLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9hY2NvdW50L3R1dG9yaWFsL3R1dG9yaWFsLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudHV0b3JpYWwtcGFnZSB7XG5cbiAgLnRvb2xiYXItYmFja2dyb3VuZCB7XG4gICAgYmFja2dyb3VuZDogI0ZGRjtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICB9XG5cbiAgLnNsaWRlLXpvb20ge1xuICAgIGhlaWdodDogOTAlO1xuICB9XG5cbiAgLnNsaWRlLXRpdGxlIHtcbiAgICBtYXJnaW4tdG9wOiAwLjVyZW07XG4gICAgZm9udC1zaXplOiAxLjByZW07XG4gIH1cblxuICAuc2xpZGUtaW1hZ2Uge1xuICAgIG1heC1oZWlnaHQ6IDUwJTtcbiAgICBtYXgtd2lkdGg6IDYwJTtcbiAgICBtYXJnaW46IGF1dG87XG4gIH1cblxuICBiIHtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICB9XG5cbiAgcCB7XG4gICAgcGFkZGluZzogMCAwO1xuICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjI7XG4gICAgY29sb3I6ICM2MDY0NkI7XG5cbiAgICBiIHtcbiAgICAgIGNvbG9yOiAjMDAwMDAwO1xuICAgIH1cbiAgfVxuXG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/pages/account/tutorial/tutorial.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/account/tutorial/tutorial.ts ***!
  \****************************************************/
/*! exports provided: TutorialPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TutorialPage", function() { return TutorialPage; });
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_sync_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/sync.service */ "./src/app/services/sync.service.ts");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/global-data.service */ "./src/app/services/global-data.service.ts");
/* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/account.service */ "./src/app/services/account.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TutorialPage = /** @class */ (function () {
    function TutorialPage(sync, menu, storage, globalData, account) {
        this.sync = sync;
        this.menu = menu;
        this.storage = storage;
        this.globalData = globalData;
        this.account = account;
        this.currentPage = '/tutorial';
        this.ticks = 0;
        this.time = 20; // soglia tempo
        this.slides = [
            {
                title: 'Benvenuto nella nuova applicazione dell\'Unimol!',
                description: 'La nuova applicazione <b>Unimol</b> ti permette di avere a portata di mano tutto ciò di cui hai bisogno!',
                image: 'assets/img/tutorial/login_tut.png',
            },
            {
                title: 'La Bacheca...',
                description: 'La <b>Bacheca</b> contiene i dati di base inerenti la tua carriera, la media aritmetica e ponderata, ' +
                    'l\'andamento dei tuoi esami e il numero di CFU da acquisire.',
                image: 'assets/img/tutorial/bacheca_tut.png',
            },
            {
                title: 'Appelli e prenotazioni...',
                description: 'Potrai effettuare la <b>Prenotazione</b> direttamente dall\'applicazione, ' +
                    'potrai cancellare la prenotazione e visualizzare le tue prenotazioni.',
                image: 'assets/img/tutorial/prenotazioni_tut.png',
            },
            {
                title: 'Piano di studi...',
                description: 'Potrai visualizzare il tuo <b>Piano di studi</b> in qualsiasi momento. ' +
                    'Clicca su un esame per accedere alle informaizoni, agli appelli o al materiale didattico... ',
                image: 'assets/img/tutorial/libretto_tut.png',
            },
            {
                title: 'Materiale didattico...',
                description: 'Potrai visualizzare il <b>Materiale didattico</b> di un insegnamento ' +
                    'o scaricarlo per poi visualizzarlo successivamente... ',
                image: 'assets/img/tutorial/materiale_didattico_tut.png',
            },
            {
                title: 'News...',
                description: 'Potrai visualizzare le <b>News</b> dell\'Ateneo, del tuo Dipartimento ' +
                    'o del Corso di Studi che frequenti... ',
                image: 'assets/img/tutorial/news_tut.png',
            },
            {
                title: 'Stima della Media...',
                description: 'Potrai prevedere la tua media in base al voto che prenderai al tuo prossimo esame!',
                image: 'assets/img/tutorial/medie_tut.png',
            },
            {
                title: 'Rubrica UNIMOL',
                description: 'Potrai trovare i <b>Contatti</b> dei tuoi professori in pochi secondi!',
                image: 'assets/img/tutorial/rubrica_tut.png',
            },
            {
                title: 'Sempre aggiornato...',
                description: 'Tramite le notifiche push potrai sempre essere aggiornato anche quando non utilizzi l\'App',
                image: 'assets/img/tutorial/notifiche_tut.png',
            },
        ];
    }
    // ionViewWillEnter() {
    //     this.menu.enable(false);
    // }
    //
    // ionViewWillLeave() {
    //     this.menu.enable(true);
    // }
    TutorialPage.prototype.ngOnInit = function () {
        var _this = this;
        // this.timer = Observable.timer(500);
        // this.timer.subscribe(x => this.progressChange());
        this.account.controllaAccount().then(function (ok) {
            _this.scaricaTutto();
            _this.show = true;
            _this.showProgress = true;
            _this.progress = 'Aggiornamento dati in corso...';
        }, function (err) {
            _this.globalData.goTo(_this.currentPage, '/login', 'root', false);
        });
    };
    TutorialPage.prototype.progressChange = function () {
        var _this = this;
        this.time--;
        this.storage.get('progress').then(function (val) {
            _this.progress = val;
            if (_this.time > 0) {
                _this.timer.subscribe(function () { return _this.progressChange(); });
            }
        });
    };
    // tickerFunc(tick) {
    //     this.ticks = tick;
    //     this.storage.get('progress').then((val) => {
    //         this.progress = val;
    //     });
    //
    //     if (this.ticks > this.time) {
    //         this.show = true;
    //         this.sub.unsubscribe();
    //     }
    // }
    TutorialPage.prototype.scaricaTutto = function () {
        this.sync.sincronizza();
    };
    TutorialPage.prototype.doContinua = function () {
        this.globalData.goTo(this.currentPage, '/home', 'root', false);
    };
    TutorialPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-page-tutorial',
            template: __webpack_require__(/*! ./tutorial.html */ "./src/app/pages/account/tutorial/tutorial.html"),
            styles: [__webpack_require__(/*! ./tutorial.scss */ "./src/app/pages/account/tutorial/tutorial.scss")]
        }),
        __metadata("design:paramtypes", [_services_sync_service__WEBPACK_IMPORTED_MODULE_3__["SyncService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["MenuController"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_0__["Storage"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_5__["AccountService"]])
    ], TutorialPage);
    return TutorialPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-account-tutorial-tutorial-module.js.map