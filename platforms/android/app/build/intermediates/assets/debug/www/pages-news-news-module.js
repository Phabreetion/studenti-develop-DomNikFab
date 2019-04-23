(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-news-news-module"],{

/***/ "./src/app/pages/news/news.html":
/*!**************************************!*\
  !*** ./src/app/pages/news/news.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-grid no-padding>\n    <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n      <ion-col>\n        <ion-label> </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding>\n      <ion-col no-padding>\n        <ion-toolbar>\n          <ion-buttons slot=\"start\">\n            <ion-menu-button></ion-menu-button>\n          </ion-buttons>\n          <ion-title *ngIf='!showSearchBar'>\n            News\n          </ion-title>\n          <ion-searchbar *ngIf='showSearchBar'\n                         [@flyInOut]=\"flyInOutState\"\n                         [(ngModel)]=\"searchTerm\"\n                         (click)=\"setFiltro()\"\n                         (ionChange)=\"setFiltro()\"\n                         (ionCancel)=\"onSearchCancel()\"\n                         (ionClear)=\"onSearchCancel()\">\n          </ion-searchbar>\n          <ion-buttons slot=\"end\">\n            <ion-button icon-only (click)=\"toggleInOut()\">\n              <ion-icon name=\"search\" color=\"primary\" style=\"font-size: 1.5em;\"></ion-icon>\n            </ion-button>\n          </ion-buttons>\n        </ion-toolbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n\n<ion-content id=\"content\" >\n  <ion-refresher slot=\"fixed\" [disabled]=\"false\" (ionRefresh)=\"doRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <ion-segment [(ngModel)]=\"sezioni\" (ionChange)=\"onViewChange($event.target)\">\n          <ion-segment-button value=\"ateneo\">Ateneo {{nrNewsAteneo}}</ion-segment-button>\n          <ion-segment-button value=\"dipartimento\">Dipartimento {{nrNewsDipartimento}}</ion-segment-button>\n          <ion-segment-button value=\"cds\" small>Corso {{nrNewsCDS}}</ion-segment-button>\n        </ion-segment>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col no-padding>\n        <div [ngSwitch]=\"sezioni\" >\n\n          <ion-list *ngSwitchCase=\"'ateneo'\" >\n            <ion-item *ngIf=\"ateneoNewsFiltrate?.length == 0 && rinvioAggiornamentoNewsAteneo\" text-center>\n              <ion-grid>\n                <ion-row>\n                  <ion-col>\n                    <img class=\"progress\" src=\"assets/img/progress.gif\" />\n                  </ion-col>\n                </ion-row>\n                <ion-row>\n                  <ion-col text-center>\n                    <ion-title><strong>Aggiornamento in corso</strong></ion-title>\n                  </ion-col>\n                </ion-row>\n                <ion-row>\n                  <ion-col text-center>\n                    <ion-label>un attimo di pazienza</ion-label>\n                  </ion-col>\n                </ion-row>\n              </ion-grid>\n            </ion-item>\n\n            <ion-item *ngIf=\"ateneoNewsFiltrate?.length == 0 && !rinvioAggiornamentoNewsAteneo\" text-center>\n              <ion-title text-center>Nessuna News di Ateneo</ion-title>\n            </ion-item>\n\n            <ion-card [hidden]=\"ateneoNewsFiltrate?.length == 0\"  *ngFor=\"let ateneo of ateneoNewsFiltrate\" (click)=\"showDetails(ateneo)\">\n              <ion-card-subtitle text-center>\n                {{date2string(ateneo.data)}}\n              </ion-card-subtitle>\n              <ion-card-header text-wrap class=\"ellipsis\" ng-bind-html=\"snippet\">\n                <b>{{this.pulisciNews(ateneo.messaggio)}}</b>\n              </ion-card-header>\n              <ion-card-content *ngIf=\"ateneo.contenuto\">\n                <ion-label text-wrap class=\"ellipsis\" ng-bind-html=\"snippet\">\n                  {{this.pulisciNews(ateneo.contenuto)}}\n                </ion-label>\n              </ion-card-content>\n              <ion-card-content *ngIf=\"!ateneo.contenuto\">\n                <ion-label text-wrap text-center>\n                  News completa disponibile sul portale\n                </ion-label>\n              </ion-card-content>\n            </ion-card>\n          </ion-list>\n\n          <ion-list *ngSwitchCase=\"'dipartimento'\" >\n            <ion-item *ngIf=\"dipartimentoNewsFiltrate?.length == 0 && rinvioAggiornamentoNewsDipartimento\" text-center>\n              <ion-grid>\n                <ion-row>\n                  <ion-col>\n                    <img class=\"progress\" src=\"assets/img/progress.gif\" />\n                  </ion-col>\n                </ion-row>\n                <ion-row>\n                  <ion-col text-center>\n                    <ion-title><strong>Aggiornamento in corso</strong></ion-title>\n                  </ion-col>\n                </ion-row>\n                <ion-row>\n                  <ion-col text-center>\n                    <ion-label>un attimo di pazienza</ion-label>\n                  </ion-col>\n                </ion-row>\n              </ion-grid>\n            </ion-item>\n\n            <ion-item *ngIf=\"dipartimentoNewsFiltrate?.length == 0 && !rinvioAggiornamentoNewsDipartimento\" text-center>\n              <ion-title text-center>Nessuna News di Dipartimento</ion-title>\n            </ion-item>\n\n            <ion-card [hidden]=\"dipartimentoNewsFiltrate?.length == 0\" *ngFor=\"let dipartimento of dipartimentoNewsFiltrate\" (click)=\"showDetails(dipartimento)\">\n              <ion-card-subtitle text-center>\n                {{date2string(dipartimento.data)}}\n              </ion-card-subtitle>\n              <ion-card-header text-wrap class=\"ellipsis\" ng-bind-html=\"snippet\">\n                <b>{{this.pulisciNews(dipartimento.messaggio)}}</b>\n              </ion-card-header>\n              <ion-card-content *ngIf=\"dipartimento.contenuto\">\n                <ion-label text-wrap class=\"ellipsis\" ng-bind-html=\"snippet\">\n                  {{this.pulisciNews(dipartimento.contenuto)}}\n                </ion-label>\n              </ion-card-content>\n              <ion-card-content *ngIf=\"!dipartimento.contenuto\">\n                <ion-label text-wrap text-center>\n                  News completa disponibile sul portale\n                </ion-label>\n              </ion-card-content>\n            </ion-card>\n          </ion-list>\n\n          <ion-list *ngSwitchCase=\"'cds'\" >\n            <ion-item *ngIf=\"corsoNewsFiltrate?.length == 0 && rinvioAggiornamentoNewsCDS\" text-center>\n              <ion-grid>\n                <ion-row>\n                  <ion-col>\n                    <img class=\"progress\" src=\"assets/img/progress.gif\" />\n                  </ion-col>\n                </ion-row>\n                <ion-row>\n                  <ion-col text-center>\n                    <ion-title><strong>Aggiornamento in corso</strong></ion-title>\n                  </ion-col>\n                </ion-row>\n                <ion-row>\n                  <ion-col text-center>\n                    <ion-label>un attimo di pazienza</ion-label>\n                  </ion-col>\n                </ion-row>\n              </ion-grid>\n            </ion-item>\n\n            <ion-item *ngIf=\"corsoNewsFiltrate?.length == 0 && !rinvioAggiornamentoNewsCDS\" text-center>\n              <ion-title text-center>Nessuna News del Corso</ion-title>\n            </ion-item>\n\n            <ion-card [hidden]=\"corsoNewsFiltrate?.length == 0\" *ngFor=\"let corso of corsoNewsFiltrate\" (click)=\"showDetails(corso)\">\n              <ion-card-subtitle text-center>\n                {{date2string(corso.data)}}\n              </ion-card-subtitle>\n              <ion-card-header text-wrap class=\"ellipsis\" ng-bind-html=\"snippet\">\n                <b>{{this.pulisciNews(corso.messaggio)}}</b>\n              </ion-card-header>\n              <ion-card-content *ngIf=\"corso.contenuto\">\n                <ion-label text-wrap class=\"ellipsis\" ng-bind-html=\"snippet\">\n                  {{this.pulisciNews(corso.contenuto)}}\n                </ion-label>\n              </ion-card-content>\n              <ion-card-content *ngIf=\"!corso.contenuto\">\n                <ion-label text-wrap text-center>\n                  News completa disponibile sul portale\n                </ion-label>\n              </ion-card-content>\n            </ion-card>\n          </ion-list>\n\n          <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadData($event)\">\n            <ion-infinite-scroll-content\n                    loadingSpinner=\"bubbles\"\n                    loadingText=\"Caricamento dati...\">\n            </ion-infinite-scroll-content>\n          </ion-infinite-scroll>\n        </div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n\n  <!--\n  <ion-refresher (ionRefresh)=\"doRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  -->\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-spinner [hidden]=\"!isLoading() || !http.getConnected()\"></ion-spinner>\n      <fa-icon [hidden]=\"isLoading() || !http.getConnected()\" [icon]=\"globalData.faLink\"></fa-icon>\n      <fa-icon [hidden]=\"isLoading() || http.getConnected()\"  [icon]=\"globalData.faUnlink\"></fa-icon>\n    </ion-buttons>\n\n    <div class=\"testo-footer\" *ngIf=\"sezioni=='cds'\">\n      Aggiornato al: {{dataAggiornamentoCDS}}\n    </div>\n    <div class=\"testo-footer\" *ngIf=\"sezioni=='dipartimento'\">\n      Aggiornato al: {{dataAggiornamentoDipartimento}}\n    </div>\n    <div class=\"testo-footer\" *ngIf=\"sezioni=='ateneo'\">\n      Aggiornato al: {{dataAggiornamentoAteneo}}\n    </div>\n\n    <ion-buttons slot=\"end\">\n      <ion-icon slot=\"icon-only\" src=\"assets/icon/blank.png\"></ion-icon>\n    </ion-buttons>\n  </ion-toolbar>\n<ion-footer>"

/***/ }),

/***/ "./src/app/pages/news/news.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/news/news.module.ts ***!
  \*******************************************/
/*! exports provided: NewsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsPageModule", function() { return NewsPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _news__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./news */ "./src/app/pages/news/news.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var NewsPageModule = /** @class */ (function () {
    function NewsPageModule() {
    }
    NewsPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _news__WEBPACK_IMPORTED_MODULE_5__["NewsPage"]
                    }
                ])
            ],
            declarations: [_news__WEBPACK_IMPORTED_MODULE_5__["NewsPage"]]
        })
    ], NewsPageModule);
    return NewsPageModule;
}());



/***/ }),

/***/ "./src/app/pages/news/news.scss":
/*!**************************************!*\
  !*** ./src/app/pages/news/news.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ellipsis {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-height: 3.9em;\n  line-height: 1.3em;\n  text-overflow-mode: ellipsis;\n  text-align: center;\n  padding: 0px 3px;\n  display: block; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbnRvbmlvX21hc3Ryb3Bhb2xvL0Rlc2t0b3AvbW9kaWZpY2hlQVBQL3N0dWRlbnRpLW1hc3Rlci9zcmMvYXBwL3BhZ2VzL25ld3MvbmV3cy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQix1QkFBdUI7RUFDdkIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQiw0QkFBNEI7RUFDNUIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixjQUFjLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9uZXdzL25ld3Muc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5lbGxpcHNpcyB7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICBtYXgtaGVpZ2h0OiAzLjllbTtcbiAgbGluZS1oZWlnaHQ6IDEuM2VtO1xuICB0ZXh0LW92ZXJmbG93LW1vZGU6IGVsbGlwc2lzO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDBweCAzcHg7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4iXX0= */"

/***/ }),

/***/ "./src/app/pages/news/news.ts":
/*!************************************!*\
  !*** ./src/app/pages/news/news.ts ***!
  \************************************/
/*! exports provided: NewsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsPage", function() { return NewsPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var _services_sync_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/sync.service */ "./src/app/services/sync.service.ts");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/global-data.service */ "./src/app/services/global-data.service.ts");
/* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/account.service */ "./src/app/services/account.service.ts");
/* harmony import */ var _services_http_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/http.service */ "./src/app/services/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var NewsPage = /** @class */ (function () {
    function NewsPage(sync, http, toastCtrl, globalData, account) {
        this.sync = sync;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.globalData = globalData;
        this.account = account;
        this.currentPage = '/news';
        this.idServizioDipartimento = 14;
        this.idServizioCDS = 15;
        this.idServizioAteneo = 16;
        // private newsList: any;
        this.ateneoNews = [];
        this.ateneoNewsFiltrate = [];
        this.dipartimentoNews = [];
        this.dipartimentoNewsFiltrate = [];
        this.corsoNews = [];
        this.corsoNewsFiltrate = [];
        this.searchTerm = '';
        this.nrNewsAteneo = '';
        this.nrNewsDipartimento = '';
        this.nrNewsCDS = '';
        this.dataAggiornamentoAteneo = 'Mai';
        this.dataAggiornamentoDipartimento = 'Mai';
        this.dataAggiornamentoCDS = 'Mai';
        this.flyInOutState = 'in';
        this.showSearchBar = false;
        this.aggiornamentoNewsDipartimentoVerificato = false;
        this.aggiornamentoNewsAteneoVerificato = false;
        this.aggiornamentoNewsCDSVerificato = false;
        this.rinvioAggiornamentoNewsAteneo = false;
        this.rinvioAggiornamentoNewsDipartimento = false;
        this.rinvioAggiornamentoNewsCDS = false;
        this.nrRinvii = 0;
        this.maxNrRinvii = 5;
        this.step = 10;
        this.nrElementi = 0;
        this.nrElementiFiltrati = 0;
        this.nrElementiDaMostrare = this.step;
        this.sezioni = this.globalData.sezioneNews;
        if (!this.sezioni) {
            this.sezioni = 'ateneo';
        }
    }
    NewsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.globalData.srcPage = this.currentPage;
        this.account.controllaAccount().then(function (ok) {
            _this.showSearchBar = false;
            _this.http.getConnected();
            _this.aggiorna(false, true);
        }, function (err) {
            _this.globalData.goTo(_this.currentPage, '/login', 'root', false);
        });
    };
    NewsPage.prototype.onViewChange = function (data) {
        this.doRefresh(null);
        // Ripristiniamo il controllo InfiniteScroll che potrebbe essere stato disabilitato
        // nel caso in cui da un'altra sezione avessimo raggiunto l'ultimo elemento
        if (this.infiniteScrollCtrl) {
            this.infiniteScrollCtrl.disabled = false;
        }
        // Inizializziamo nuovamente il nr di elementi da visualizzare per questa sezione
        this.nrElementiDaMostrare = this.step;
        this.setFiltro();
    };
    NewsPage.prototype.loadData = function (event) {
        var _this = this;
        setTimeout(function () {
            // Salviamo in una variabile il controllo InifineScroll per poterlo
            // eventualmente riabilitate quando si passa ad una diversa sezione
            _this.infiniteScrollCtrl = event.target;
            _this.nrElementiDaMostrare += _this.step;
            _this.setFiltro();
            event.target.complete();
            // Se non ci sono ulteriori elementi, disabilitiamo lo scroll
            if (_this.nrElementiDaMostrare >= _this.nrElementi) {
                event.target.disabled = true;
            }
        }, 500);
    };
    NewsPage.prototype.setFiltro = function () {
        this.ateneoNewsFiltrate = [];
        this.dipartimentoNewsFiltrate = [];
        this.corsoNewsFiltrate = [];
        this.ateneoNewsFiltrate = this.filtra(this.ateneoNews, this.searchTerm);
        if (this.ateneoNewsFiltrate) {
            this.nrNewsAteneo = '(' + this.ateneoNewsFiltrate.length + ')';
        }
        else {
            this.nrNewsAteneo = '';
        }
        this.dipartimentoNewsFiltrate = this.filtra(this.dipartimentoNews, this.searchTerm);
        if (this.dipartimentoNewsFiltrate) {
            this.nrNewsDipartimento = '(' + this.dipartimentoNewsFiltrate.length + ')';
        }
        else {
            this.nrNewsDipartimento = '';
        }
        this.corsoNewsFiltrate = this.filtra(this.corsoNews, this.searchTerm);
        if (this.corsoNewsFiltrate) {
            this.nrNewsCDS = '(' + this.corsoNewsFiltrate.length + ')';
        }
        else {
            this.nrNewsCDS = '';
        }
        switch (this.sezioni) {
            case 'ateneo': {
                this.nrElementi = this.ateneoNews.length;
                this.nrElementiFiltrati = this.ateneoNewsFiltrate.length;
                if (this.ateneoNewsFiltrate.length > this.nrElementiDaMostrare) {
                    this.ateneoNewsFiltrate = this.ateneoNewsFiltrate.slice(0, this.nrElementiDaMostrare - 1);
                }
                break;
            }
            case 'dipartimento': {
                this.nrElementi = this.dipartimentoNews.length;
                this.nrElementiFiltrati = this.dipartimentoNewsFiltrate.length;
                if (this.dipartimentoNewsFiltrate.length > this.nrElementiDaMostrare) {
                    this.dipartimentoNewsFiltrate = this.dipartimentoNewsFiltrate.slice(0, this.nrElementiDaMostrare - 1);
                }
                break;
            }
            case 'cds': {
                this.nrElementi = this.corsoNews.length;
                this.nrElementiFiltrati = this.corsoNewsFiltrate.length;
                if (this.corsoNewsFiltrate.length > this.nrElementiDaMostrare) {
                    this.corsoNewsFiltrate = this.corsoNewsFiltrate.slice(0, this.nrElementiDaMostrare - 1);
                }
                break;
            }
        }
    };
    NewsPage.prototype.onSearchCancel = function () {
        this.searchTerm = '';
        this.setFiltro();
    };
    NewsPage.prototype.filtra = function (items, searchTerm) {
        if (searchTerm == null || searchTerm === undefined || searchTerm === '') {
            return items;
        }
        return items.filter(function (item) {
            try {
                return (item.messaggio.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    (item.descrizione.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
            }
            catch (err) {
                console.dir(err);
            }
        });
    };
    NewsPage.prototype.aggiorna = function (automatico, sync) {
        this.aggiornaNewsAteneo(automatico, sync);
        this.aggiornaNewsDipartimento(automatico, sync);
        this.aggiornaNewsCDS(automatico, sync);
    };
    NewsPage.prototype.isLoading = function () {
        switch (this.sezioni) {
            case 'cds':
                return this.sync.loading[this.idServizioCDS];
            case 'dipartimento':
                return this.sync.loading[this.idServizioDipartimento];
            default:
                return this.sync.loading[this.idServizioAteneo];
        }
    };
    NewsPage.prototype.doRefresh = function (refresher) {
        if (refresher) {
            refresher.target.complete();
        }
        switch (this.sezioni) {
            case 'cds':
                this.aggiornaNewsCDS(true, true);
                break;
            case 'dipartimento':
                this.aggiornaNewsDipartimento(true, true);
                break;
            default:
                this.aggiornaNewsAteneo(true, true);
                break;
        }
    };
    NewsPage.prototype.aggiornaNewsCDS = function (interattivo, sync) {
        var _this = this;
        if (this.sync.loading[this.idServizioCDS]) {
            this.rinvioAggiornamentoNewsCDS = true;
            this.dataAggiornamento = 'in corso';
            this.dataAggiornamentoCDS = this.dataAggiornamento;
            this.nrRinvii++;
            // console.log('Rinvio ' + this.nrRinvii);
            if (this.nrRinvii < this.maxNrRinvii) {
                setTimeout(function () {
                    _this.aggiornaNewsCDS(interattivo, sync);
                }, 2000);
                return;
            }
            else {
                if (this.http.connessioneLenta) {
                    this.toastCtrl.create({
                        message: 'La connessione è assente o troppo lenta. Riprova ad aggiornare i dati più tardi.',
                        duration: 3000,
                        position: 'bottom'
                    }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
                }
            }
        }
        this.rinvioAggiornamentoNewsCDS = false;
        this.nrRinvii = 0;
        this.sync.getJson(this.idServizioCDS, sync).then(function (data) {
            if (JSON.stringify(_this.corsoNews) !== JSON.stringify(data['news'])) {
                _this.corsoNews = data['news'];
                _this.setFiltro();
                setTimeout(function () {
                    _this.controllaAggiornamentoNewsCDS();
                }, 1000);
            }
            _this.dataAggiornamento = _services_sync_service__WEBPACK_IMPORTED_MODULE_3__["SyncService"].dataAggiornamento(data);
            _this.dataAggiornamentoCDS = _this.dataAggiornamento;
        }, function (err) {
            if (interattivo) {
                _this.toastCtrl.create({
                    message: 'Non è stato possibile recuparate i dati dal server. Riprovare più tardi.',
                    duration: 3000
                }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
            }
        }).catch(function (err) {
            console.log('Eccezione in aggiornaNewsCDS: ' + err);
        });
    };
    NewsPage.prototype.controllaAggiornamentoNewsCDS = function () {
        var _this = this;
        // La verifica dell'aggiornamento in background la facciamo solo una volta
        if (this.aggiornamentoNewsCDSVerificato) {
            return;
        }
        // Se stiamo caricando dati dal server rimandiamo la verifica
        if (this.sync.loading[this.idServizioCDS]) {
            setTimeout(function () {
                _this.controllaAggiornamentoNewsCDS();
            }, 1000);
        }
        else {
            this.aggiornamentoNewsCDSVerificato = true;
            this.aggiornaNewsCDS(false, false);
        }
    };
    NewsPage.prototype.aggiornaNewsDipartimento = function (interattivo, sync) {
        var _this = this;
        if (this.sync.loading[this.idServizioDipartimento]) {
            this.rinvioAggiornamentoNewsDipartimento = true;
            this.dataAggiornamento = 'in corso';
            this.dataAggiornamentoDipartimento = this.dataAggiornamento;
            this.nrRinvii++;
            // console.log('Rinvio ' + this.nrRinvii);
            if (this.nrRinvii < this.maxNrRinvii) {
                setTimeout(function () {
                    _this.aggiornaNewsDipartimento(interattivo, sync);
                }, 2000);
                return;
            }
            else {
                if (this.http.connessioneLenta) {
                    this.toastCtrl.create({
                        message: 'La connessione è assente o troppo lenta. Riprova ad aggiornare i dati più tardi.',
                        duration: 3000,
                        position: 'bottom'
                    }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
                }
            }
        }
        this.rinvioAggiornamentoNewsDipartimento = false;
        this.nrRinvii = 0;
        this.sync.getJson(this.idServizioDipartimento, sync).then(function (data) {
            if (JSON.stringify(_this.dipartimentoNews) !== JSON.stringify(data['news'])) {
                _this.dipartimentoNews = data['news'];
                _this.setFiltro();
                setTimeout(function () {
                    _this.controllaAggiornamentoNewsDipartimento();
                }, 1000);
            }
            _this.dataAggiornamento = _services_sync_service__WEBPACK_IMPORTED_MODULE_3__["SyncService"].dataAggiornamento(data);
            _this.dataAggiornamentoDipartimento = _this.dataAggiornamento;
        }, function (err) {
            if (interattivo) {
                _this.toastCtrl.create({
                    message: 'Non è stato possibile recuparate i dati dal server. Riprovare più tardi.',
                    duration: 3000
                }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
            }
        }).catch(function (err) {
            console.log('Eccezione in aggiornaNewsCDS: ' + err);
        });
    };
    NewsPage.prototype.controllaAggiornamentoNewsDipartimento = function () {
        var _this = this;
        // La verifica dell'aggiornamento in background la facciamo solo una volta
        if (this.aggiornamentoNewsDipartimentoVerificato) {
            return;
        }
        // Se stiamo caricando dati dal server rimandiamo la verifica
        if (this.sync.loading[this.idServizioDipartimento]) {
            setTimeout(function () {
                _this.controllaAggiornamentoNewsDipartimento();
            }, 1000);
        }
        else {
            this.aggiornamentoNewsDipartimentoVerificato = true;
            this.aggiornaNewsDipartimento(false, false);
        }
    };
    NewsPage.prototype.aggiornaNewsAteneo = function (interattivo, sync) {
        var _this = this;
        if (this.sync.loading[this.idServizioAteneo]) {
            this.rinvioAggiornamentoNewsAteneo = true;
            this.dataAggiornamento = 'in corso...';
            this.dataAggiornamentoAteneo = this.dataAggiornamento;
            this.nrRinvii++;
            if (this.nrRinvii < this.maxNrRinvii) {
                setTimeout(function () {
                    _this.aggiornaNewsAteneo(interattivo, sync);
                }, 2000);
                return;
            }
            else {
                if (this.http.connessioneLenta) {
                    this.toastCtrl.create({
                        message: 'La connessione è assente o troppo lenta. Riprova ad aggiornare i dati più tardi.',
                        duration: 3000,
                        position: 'bottom'
                    }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
                }
            }
        }
        this.rinvioAggiornamentoNewsAteneo = false;
        this.nrRinvii = 0;
        this.sync.getJson(this.idServizioAteneo, sync).then(function (data) {
            if (JSON.stringify(_this.ateneoNews) !== JSON.stringify(data['news'])) {
                _this.ateneoNews = data['news'];
                _this.setFiltro();
                setTimeout(function () {
                    _this.controllaAggiornamentoNewsAteneo();
                }, 1000);
            }
            _this.dataAggiornamento = _services_sync_service__WEBPACK_IMPORTED_MODULE_3__["SyncService"].dataAggiornamento(data);
            _this.dataAggiornamentoAteneo = _this.dataAggiornamento;
        }, function (err) {
            if (interattivo) {
                _this.toastCtrl.create({
                    message: 'Non è stato possibile recuparate i dati dal server. Riprovare più tardi.',
                    duration: 3000
                }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
            }
            console.log('Errore!');
            console.dir(err);
        }).catch(function (err) {
            console.log('Eccezione in aggiornaNewsAteneo: ' + err);
        });
    };
    NewsPage.prototype.controllaAggiornamentoNewsAteneo = function () {
        var _this = this;
        // La verifica dell'aggiornamento in background la facciamo solo una volta
        if (this.aggiornamentoNewsAteneoVerificato) {
            return;
        }
        // Se stiamo caricando dati dal server rimandiamo la verifica
        if (this.sync.loading[this.idServizioAteneo]) {
            setTimeout(function () {
                _this.controllaAggiornamentoNewsAteneo();
            }, 1000);
        }
        else {
            this.aggiornamentoNewsAteneoVerificato = true;
            this.aggiornaNewsAteneo(false, false);
        }
    };
    NewsPage.prototype.date2string = function (stringDate) {
        return _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].formatStringDateTime(stringDate, '-', ':');
    };
    NewsPage.prototype.showDetails = function (newsItem) {
        this.globalData.notizia = newsItem;
        this.globalData.goTo(this.currentPage, '/notizia', 'forward', false);
    };
    NewsPage.prototype.toggleInOut = function () {
        this.flyInOutState === 'out' ? this.flyInOutState = 'in' : this.flyInOutState = 'out';
        this.showSearchBar = !this.showSearchBar;
    };
    NewsPage.prototype.pulisciNews = function (newsItem) {
        return newsItem.replace(/\\r\\n|\\r|\\n/g, '');
    };
    NewsPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-news',
            template: __webpack_require__(/*! ./news.html */ "./src/app/pages/news/news.html"),
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('flyInOut', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('in', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'translateX(0)' })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'translateX(100%)' }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(300)
                    ])
                ])
            ],
            styles: [__webpack_require__(/*! ./news.scss */ "./src/app/pages/news/news.scss")]
        }),
        __metadata("design:paramtypes", [_services_sync_service__WEBPACK_IMPORTED_MODULE_3__["SyncService"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_6__["HttpService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_5__["AccountService"]])
    ], NewsPage);
    return NewsPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-news-news-module.js.map