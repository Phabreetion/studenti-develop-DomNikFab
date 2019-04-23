(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-servizi-calendario-calendario-module"],{

/***/ "./src/app/pages/servizi/calendario/calendario.html":
/*!**********************************************************!*\
  !*** ./src/app/pages/servizi/calendario/calendario.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>\n     <!-- <ion-label (click)=\"today()\"><b>{{ viewTitle }}</b></ion-label> -->\n    </ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button>\n       <!-- <ion-icon color=\"primary\" style=\"font-size: 28px;\" name=\"calendar\" (click)=\"today()\"></ion-icon> -->\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content no-padding>\n<!--\n  <calendar [locale]=\"calendar.locale\"\n            [eventSource]=\"eventSource\"\n            [calendarMode]=\"calendar.mode\"\n            [currentDate]=\"calendar.currentDate\"\n            [monthviewEventDetailTemplate]=\"monthView\"\n            [noEventsLabel]=\"calendar.noEventsLabel\"\n            (onCurrentDateChanged)=\"onCurrentDateChanged($event)\"\n            (onRangeChanged)=\"reloadSource(startTime, endTime)\"\n            (onEventSelected)=\"onEventSelected($event)\"\n            (onTitleChanged)=\"onViewTitleChanged($event)\"\n            (onTimeSelected)=\"onTimeSelected($event)\"\n            step=\"30\">\n  </calendar>\n\n  <ng-template #monthView let-showEventDetail=\"showEventDetail\" let-selectedDate=\"selectedDate\" let-noEventsLabel=\"noEventsLabel\">\n    <ion-list class=\"event-detail-container\" has-bouncing=\"false\" *ngIf=\"showEventDetail\">\n      <ion-item *ngFor=\"let event of selectedDate?.events\" (click)=\"eventSelected(event)\">\n        <ion-grid class=\" esame\" no-padding>\n          <ion-row>\n            <ion-col size=\"3\" text-wrap><b>Orario</b></ion-col>\n            <ion-col size=\"9\" text-wrap>{{event.startTime|date: 'HH:mm'}} - {{event.endTime|date: 'HH:mm'}}</ion-col>\n          </ion-row>\n          <ion-row *ngIf=\"event.title\">\n            <ion-col size=\"3\" text-wrap><b>Evento</b></ion-col>\n            <ion-col size=\"9\" text-wrap>{{event.title}}</ion-col>\n          </ion-row>\n          <ion-row  *ngIf=\"event.docente\">\n            <ion-col size=\"3\" text-wrap><b>Docente</b></ion-col>\n            <ion-col size=\"9\" text-wrap>{{event.docente}}</ion-col>\n          </ion-row>\n          <ion-row  *ngIf=\"event.aula\">\n            <ion-col size=\"3\" text-wrap><b>Aula</b></ion-col>\n            <ion-col size=\"9\" text-wrap>{{event.aula}}</ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n      <ion-item *ngIf=\"selectedDate?.events.length==0\">\n        <div class=\"no-events-label\">{{noEventsLabel}}</div>\n      </ion-item>\n    </ion-list>\n  </ng-template>\n\n  -->\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/servizi/calendario/calendario.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/pages/servizi/calendario/calendario.module.ts ***!
  \***************************************************************/
/*! exports provided: CalendarioPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarioPageModule", function() { return CalendarioPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _calendario__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./calendario */ "./src/app/pages/servizi/calendario/calendario.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var CalendarioPageModule = /** @class */ (function () {
    function CalendarioPageModule() {
    }
    CalendarioPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _calendario__WEBPACK_IMPORTED_MODULE_5__["CalendarioPage"]
                    }
                ])
            ],
            declarations: [_calendario__WEBPACK_IMPORTED_MODULE_5__["CalendarioPage"]]
        })
    ], CalendarioPageModule);
    return CalendarioPageModule;
}());



/***/ }),

/***/ "./src/app/pages/servizi/calendario/calendario.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/servizi/calendario/calendario.ts ***!
  \********************************************************/
/*! exports provided: CalendarioPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarioPage", function() { return CalendarioPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_sync_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/sync.service */ "./src/app/services/sync.service.ts");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/global-data.service */ "./src/app/services/global-data.service.ts");
/* harmony import */ var _services_http_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/http.service */ "./src/app/services/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import * as moment from 'moment';



/**
 * Generated class for the CalendarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CalendarioPage = /** @class */ (function () {
    function CalendarioPage(navParams, sync, http, globalData, toastCtrl, alertCtrl) {
        this.navParams = navParams;
        this.sync = sync;
        this.http = http;
        this.globalData = globalData;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.idServizio = 17;
        this.eventi = [];
        this.eventSource = [];
        this.selectedDay = new Date();
        this.aggiornamentoVerificato = false;
        this.calendar = {
            mode: 'month',
            currentDate: new Date(),
            // locale: 'it-IT',
            autoSelect: false,
            noEventsLabel: 'Nessun evento',
        };
    }
    CalendarioPage.prototype.ngOnInit = function () {
        this.http.getConnected();
        // this.aggiorna(false, true);
    };
    CalendarioPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-calendario',
            template: __webpack_require__(/*! ./calendario.html */ "./src/app/pages/servizi/calendario/calendario.html"),
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["NavParams"],
            _services_sync_service__WEBPACK_IMPORTED_MODULE_2__["SyncService"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__["GlobalDataService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"]])
    ], CalendarioPage);
    return CalendarioPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-servizi-calendario-calendario-module.js.map