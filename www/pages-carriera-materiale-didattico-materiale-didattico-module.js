(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-carriera-materiale-didattico-materiale-didattico-module"],{

/***/ "./src/app/pages/carriera/materiale-didattico/materiale-didattico.html":
/*!*****************************************************************************!*\
  !*** ./src/app/pages/carriera/materiale-didattico/materiale-didattico.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n    <ion-grid no-padding>\n        <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n            <ion-col>\n                <ion-label> </ion-label>\n            </ion-col>\n        </ion-row>\n        <ion-row no-padding>\n            <ion-col no-padding>\n                <ion-toolbar>\n                    <ion-buttons slot=\"start\">\n                        <ion-menu-button></ion-menu-button>\n                    </ion-buttons>\n                    <ion-title>\n                        Materiale didattico\n                    </ion-title>\n                    <ion-buttons slot=\"end\">\n                        <ion-back-button defaultHref=\"/carriera\" text=\"Indietro\"></ion-back-button>\n                    </ion-buttons>\n                </ion-toolbar>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-header>\n\n<ion-content>\n\n    <ion-grid *ngIf=\"rinvioAggiornamento && !files\" text-center>\n        <ion-row>\n            <ion-col>\n                <img class=\"progress\" src=\"assets/img/progress.gif\" />\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col text-center>\n                <ion-title><strong>Aggiornamento in corso</strong></ion-title>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col text-center>\n                <ion-label>un attimo di pazienza</ion-label>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n    <ion-list *ngIf=\"!rinvioAggiornamento && files?.length == 0\">\n        <ion-item text-center>\n            <ion-grid>\n                <ion-row>\n                    <ion-col>\n                        <h2>Non è presente materiale per questo insegnamento</h2>\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col>\n                        <img class=\"logo\" src=\"assets/img/sad.png\" />\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-item>\n    </ion-list>\n\n    <ion-list *ngIf=\"files?.length > 0\">\n        <ion-item-sliding *ngFor=\"let file of files\" >\n            <!-- (press)=\"onPress(item)\" -->\n            <!-- <ion-item #item (click)=\"open(slidingItem,item)\" >  -->\n            <ion-item (click)=\"info(file)\">\n                <ion-grid fixed no-padding>\n                    <ion-row>\n                        <ion-col size=\"2\" align-self-center=\"true\">\n                            <img src=\"assets/img/moodle/{{this.selezionaIcona(file)}}.png\" />\n                        </ion-col>\n                        <ion-col size=\"10\">\n                            <ion-grid>\n                                <ion-row>\n                                    <ion-col>\n                                        <div text-wrap>\n                                            <b>{{file.FILENAME}}</b>\n                                            <div *ngIf=\"file.scaricato == 1\"><ion-icon class=\"overlayClass\" name=\"checkmark-circle\"></ion-icon></div>\n                                            <!--<div *ngIf=\"file.scaricato == 0\"><ion-icon class=\"overlayCheckmarkGrigio\" name=\"checkmark-circle\"></ion-icon></div>--> <!--MOD 12 LUG BUG 10-->\n                                        </div>\n                                    </ion-col>\n                                </ion-row>\n                                <ion-row>\n                                    <ion-col>\n                                        <ion-label text-wrap>\n                                            <p [innerHtml]=\"troncaTesto(this.stripHTML(file.TESTO))\"></p>\n                                        </ion-label>\n                                    </ion-col>\n                                </ion-row>\n                            </ion-grid>\n                        </ion-col>\n                    </ion-row>\n                </ion-grid>\n\n            </ion-item>\n            <!-- <ion-item-options side=\"right\" (click)=\"close(slidingItem)\"> -->\n            <ion-item-options side=\"end\">\n\n                <ion-item-option color=\"primary\" (click)=\"apriFile(file)\">\n                    <ion-icon name=\"easel\"></ion-icon>\n                    Visualizza\n                </ion-item-option>\n                <!--\n                <ion-item-option color=\"primary\" (click)=\"info(file)\">\n                    <ion-icon name=\"information-circle\"></ion-icon>\n                    Dettagli\n                </ion-item-option>\n                -->\n                <ion-item-option color=\"danger\" (click)=\"eliminaFile(file)\">\n                    <ion-icon name=\"trash\"></ion-icon>\n                    Rimuovi\n                </ion-item-option>\n\n                <!--\n                <button *ngIf=\"file.scaricato == 1\" class=\"stileIconeFile\" ion-button color=\"danger\" (click)=\"eliminaFile(file)\">\n                    <ion-icon style=\"padding:0;\" name=\"trash\"></ion-icon>\n                    <!--Elimina-->\n                <!--\n                </button>\n                <button *ngIf=\"file.scaricato == 0\" class=\"stileIconeFile\" ion-button color=\"primary\" (click)=\"download(file)\">\n                    <ion-icon style=\"padding:0;\" name=\"md-download\" ></ion-icon>\n                    <!--Download-->\n                <!--\n                </button>\n                <button *ngIf=\"file.scaricato == 1\" class=\"stileIconeFile\" ion-button color=\"light\" (click)=\"apriFile(file, file.tipo_file)\">\n                    <ion-icon style=\"padding:0;\" name=\"md-eye\" color=\"primary\"></ion-icon>\n                    <!--<font color=\"dodgerblue\">Visualizza</font>-->\n                <!--\n                </button>\n                -->\n\n            </ion-item-options>\n        </ion-item-sliding>\n\n    </ion-list>\n\n</ion-content>\n\n<ion-footer  no-padding>\n    <ion-toolbar>\n        <ion-buttons slot=\"start\">\n            <ion-spinner [hidden]=\"!isLoading() || !http.getConnected()\"></ion-spinner>\n            <fa-icon [hidden]=\"isLoading() || !http.getConnected()\" [icon]=\"globalData.faLink\"></fa-icon>\n            <fa-icon [hidden]=\"isLoading() || http.getConnected()\"  [icon]=\"globalData.faUnlink\"></fa-icon>\n        </ion-buttons>\n\n        <div class=\"testo-footer\">\n            Aggiornato al: {{dataAggiornamento}}\n        </div>\n\n        <ion-buttons slot=\"end\" no-padding>\n            <ion-icon slot=\"icon-only\" src=\"assets/icon/blank.png\"></ion-icon>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>"

/***/ }),

/***/ "./src/app/pages/carriera/materiale-didattico/materiale-didattico.module.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/pages/carriera/materiale-didattico/materiale-didattico.module.ts ***!
  \**********************************************************************************/
/*! exports provided: MaterialeDidatticoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialeDidatticoPageModule", function() { return MaterialeDidatticoPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _materiale_didattico__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./materiale-didattico */ "./src/app/pages/carriera/materiale-didattico/materiale-didattico.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var MaterialeDidatticoPageModule = /** @class */ (function () {
    function MaterialeDidatticoPageModule() {
    }
    MaterialeDidatticoPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _materiale_didattico__WEBPACK_IMPORTED_MODULE_5__["MaterialeDidatticoPage"]
                    }
                ])
            ],
            declarations: [_materiale_didattico__WEBPACK_IMPORTED_MODULE_5__["MaterialeDidatticoPage"]]
        })
    ], MaterialeDidatticoPageModule);
    return MaterialeDidatticoPageModule;
}());



/***/ }),

/***/ "./src/app/pages/carriera/materiale-didattico/materiale-didattico.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/pages/carriera/materiale-didattico/materiale-didattico.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ellipsis {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-height: 3.9em;\n  line-height: 1.3em;\n  text-overflow-mode: ellipsis;\n  text-align: left;\n  padding: 0px 3px;\n  display: block; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbnRvbmlvX21hc3Ryb3Bhb2xvL0Rlc2t0b3AvbW9kaWZpY2hlQVBQL3N0dWRlbnRpLW1hc3Rlci9zcmMvYXBwL3BhZ2VzL2NhcnJpZXJhL21hdGVyaWFsZS1kaWRhdHRpY28vbWF0ZXJpYWxlLWRpZGF0dGljby5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQix1QkFBdUI7RUFDdkIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQiw0QkFBNEI7RUFDNUIsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixjQUFjLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9jYXJyaWVyYS9tYXRlcmlhbGUtZGlkYXR0aWNvL21hdGVyaWFsZS1kaWRhdHRpY28uc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5lbGxpcHNpcyB7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICBtYXgtaGVpZ2h0OiAzLjllbTtcbiAgbGluZS1oZWlnaHQ6IDEuM2VtO1xuICB0ZXh0LW92ZXJmbG93LW1vZGU6IGVsbGlwc2lzO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBwYWRkaW5nOiAwcHggM3B4O1xuICBkaXNwbGF5OiBibG9jaztcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/carriera/materiale-didattico/materiale-didattico.ts":
/*!***************************************************************************!*\
  !*** ./src/app/pages/carriera/materiale-didattico/materiale-didattico.ts ***!
  \***************************************************************************/
/*! exports provided: MaterialeDidatticoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialeDidatticoPage", function() { return MaterialeDidatticoPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_sync_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/sync.service */ "./src/app/services/sync.service.ts");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/global-data.service */ "./src/app/services/global-data.service.ts");
/* harmony import */ var _services_db_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/db-service */ "./src/app/services/db-service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/account.service */ "./src/app/services/account.service.ts");
/* harmony import */ var _services_http_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/http.service */ "./src/app/services/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MaterialeDidatticoPage = /** @class */ (function () {
    function MaterialeDidatticoPage(toastCtrl, route, sync, http, globalData, modalCtrl, actionSheetCtrl, localdb, account) {
        this.toastCtrl = toastCtrl;
        this.route = route;
        this.sync = sync;
        this.http = http;
        this.globalData = globalData;
        this.modalCtrl = modalCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.localdb = localdb;
        this.account = account;
        this.currentPage = '/materiale-didattico';
        this.idServizio = 18;
        this.pageloading = false;
        this.aggiornamentoVerificato = false;
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.maxNrRinvii = 5;
        // fileInfo:any;
        // elencoFile:any;
        // ultimoAggiornamento:any;
        // aggiornamentoTmp:any;
        //
        // metodo = 'files';
        //
        // fileScaricati:any = [];
        // showDoubleArrow = true;
        this.noFile = false;
        this.opened = false;
        this.maxLength = 60; // Lunghezza massima del testo da visualizzare
    }
    MaterialeDidatticoPage.prototype.ngOnInit = function () {
        var _this = this;
        this.account.controllaAccount().then(function (ok) {
            _this.pageloading = true;
            _this.ad = _this.route.snapshot.paramMap.get('id');
            _this.currentPage = '/materiale-didattico/' + _this.ad;
            // this.ad = this.navParams.get('ad');
            _this.http.checkConnection();
            _this.aggiorna(false, true);
        }, function (err) {
            _this.globalData.goTo(_this.currentPage, '/login', 'root', false);
        });
    };
    // ngAfterContentInit() {
    //     this.aggiorna(false, true);
    // }
    MaterialeDidatticoPage.prototype.aggiorna = function (interattivo, sync) {
        var _this = this;
        if (this.sync.loading[this.idServizio]) {
            this.rinvioAggiornamento = true;
            this.dataAggiornamento = 'in corso';
            this.nrRinvii++;
            // console.log('Rinvio ' + this.nrRinvii);
            if (this.nrRinvii < this.maxNrRinvii) {
                setTimeout(function () {
                    _this.aggiorna(interattivo, sync);
                }, 2000);
                return;
            }
            else {
                if (this.http.connessioneLenta) {
                    this.toastCtrl.create({
                        message: 'La connessione è assente o troppo lenta. Riprova ad aggiornare i dati più tardi.',
                        duration: 3000,
                        position: 'bottom'
                    }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
                }
            }
        }
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.sync.getJson(this.idServizio, true).then(function (data) {
            _this.pageloading = false;
            var json = data[0];
            var files = _this.filtra(json, _this.ad);
            files.sort(function (a, b) {
                return a.FILENAME.localeCompare(b.FILENAME);
            });
            if (_this.sync.dataIsChanged(_this.files, files)) {
                //
                // if (JSON.stringify(this.files) !== JSON.stringify(files)) {
                _this.files = files;
                setTimeout(function () {
                    _this.controllaAggiornamento();
                }, 1000);
                // console.dir(files)
                // console.dir(this.files);
            }
            _this.dataAggiornamento = _services_sync_service__WEBPACK_IMPORTED_MODULE_2__["SyncService"].dataAggiornamento(data);
        }, function (err) {
        }).catch(function (err) {
            console.dir(err);
        });
    };
    MaterialeDidatticoPage.prototype.filtra = function (items, ad) {
        return items.filter(function (item) {
            try {
                // console.dir(item)
                return (item.AD_ID.indexOf(ad) > -1);
            }
            catch (err) {
                console.dir(err);
            }
        });
    };
    MaterialeDidatticoPage.prototype.controllaAggiornamento = function () {
        var _this = this;
        // La verifica dell'aggiornamento in background la facciamo solo una volta
        if (this.aggiornamentoVerificato) {
            return;
        }
        // Se stiamo caricando dati dal server rimandiamo la verifica
        if (this.sync.loading[this.idServizio]) {
            setTimeout(function () {
                _this.controllaAggiornamento();
            }, 1000);
        }
        else {
            this.aggiornamentoVerificato = true;
            this.aggiorna(false, false);
        }
    };
    MaterialeDidatticoPage.prototype.isLoading = function () {
        return this.sync.loading[this.idServizio];
    };
    MaterialeDidatticoPage.prototype.doRefresh = function (refresher) {
        if (refresher) {
            refresher.target.complete();
        }
        this.aggiorna(true, true);
    };
    MaterialeDidatticoPage.prototype.troncaTesto = function (testo) {
        if (!testo) {
            return '';
        }
        if (testo.length > this.maxLength) {
            testo = testo.substring(0, this.maxLength - 1) + ' ...';
        }
        return testo;
    };
    MaterialeDidatticoPage.prototype.stripHTML = function (html) {
        // return html.replace(/<\/?[^>]+>/gi, "");
        var testo = html;
        if (testo && typeof testo === 'string') {
            // strip script/html tags
            testo = testo.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            testo = testo.replace(/&nbsp;*/gmi, '');
            testo = testo.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            testo = testo.replace(/\\r\\n|\\r|\\n/g, '');
        }
        return testo;
    };
    MaterialeDidatticoPage.prototype.info = function (item) {
        // console.dir(item);
        // this.modalCtrl.create({
        //     component: AllegatoPage,
        //     componentProps: { allegato : item }
        // }).then(
        //     (modal) => modal.present()
        // );
        this.globalData.allegato = item;
        this.globalData.srcPage = '/materiale-didattico';
        this.globalData.goTo('/materiale-didattico', '/allegato', 'forward', false);
    };
    MaterialeDidatticoPage.prototype.download = function (item) {
        this.localdb.download(item);
    };
    MaterialeDidatticoPage.prototype.apriFile = function (item) {
        this.localdb.apriFile(item);
    };
    MaterialeDidatticoPage.prototype.eliminaFile = function (item) {
        this.localdb.eliminaFile(item);
    };
    MaterialeDidatticoPage.prototype.selezionaIcona = function (item) {
        var estensione = item.ESTENSIONE.toLowerCase();
        var nomeIcona = '';
        switch (estensione) {
            case 'pdf':
                nomeIcona = 'pdf1';
                break;
            case 'zip':
                nomeIcona = 'zip';
                break;
            case 'doc':
                nomeIcona = 'doc';
                break;
            case 'docx':
                nomeIcona = 'doc';
                break;
            case 'xls':
                nomeIcona = 'xls';
                break;
            case 'xlsx':
                nomeIcona = 'xls';
                break;
            case 'ppt':
                nomeIcona = 'ppt';
                break;
            case 'pptx':
                nomeIcona = 'ppt';
                break;
            default:
                nomeIcona = 'file1';
                break;
        }
        return nomeIcona;
    };
    MaterialeDidatticoPage.prototype.onPress = function (item) {
        // console.dir(item);
        var _this = this;
        this.actionSheetCtrl.create({
            header: item.DESCRIZIONE,
            buttons: [
                {
                    text: 'Apri',
                    icon: 'easel',
                    handler: function () {
                        _this.apriFile(item);
                    }
                }, {
                    text: 'Dettagli',
                    icon: 'information-circle',
                    handler: function () {
                        _this.info(item);
                    }
                }, {
                    text: 'Rimuovi',
                    icon: 'trash',
                    handler: function () {
                        _this.eliminaFile(item);
                    }
                }, {
                    text: 'Chiudi',
                    icon: 'close',
                    role: 'cancel',
                    handler: function () {
                        // console.log('Cancel clicked');
                    }
                }
            ]
        }).then(function (actionSheet) { return actionSheet.present(); });
    };
    MaterialeDidatticoPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-materiale-didattico',
            template: __webpack_require__(/*! ./materiale-didattico.html */ "./src/app/pages/carriera/materiale-didattico/materiale-didattico.html"),
            styles: [__webpack_require__(/*! ./materiale-didattico.scss */ "./src/app/pages/carriera/materiale-didattico/materiale-didattico.scss")]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _services_sync_service__WEBPACK_IMPORTED_MODULE_2__["SyncService"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_7__["HttpService"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__["GlobalDataService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ActionSheetController"],
            _services_db_service__WEBPACK_IMPORTED_MODULE_4__["DBService"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_6__["AccountService"]])
    ], MaterialeDidatticoPage);
    return MaterialeDidatticoPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-carriera-materiale-didattico-materiale-didattico-module.js.map