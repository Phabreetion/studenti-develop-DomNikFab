import { Injectable } from '@angular/core';
import {LoadingController, ToastController} from '@ionic/angular';
import {GlobalDataService} from './global-data.service';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {

    constructor(
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController) {}


    connessioneOk() {
        this.toastCtrl.create({
            message: 'Connessione Internet OK',
            duration: 3000,
            position: 'bottom'
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    connessioneOff() {
        this.toastCtrl.create({
            message: 'Connessione Internet assente',
            duration: 3000,
            position: 'bottom'
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    piattaformaNonSupportata() {
        this.toastCtrl.create({
            message: 'Il dispositivo non supporta questa funzionalità',
            duration: 3000,
            position: 'bottom'
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    fileNonScaricato() {
        this.toastCtrl.create({
            message: 'Il file non è presente sul dispositivo. Prova ad eliminarlo e scaricarlo nuovamente.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    downloadCompletatoConfirm() {
        this.toastCtrl.create({
            message: 'Documento salvato nella cartella Download del dispositivo',
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'Ok'
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    downloadCompletato() {
        this.toastCtrl.create({
            message: 'Download completato',
            position: 'bottom',
            duration: 3000
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    // Usare present() per visualizzare e dismiss() per chiuderlo
    caricamentoDownload() {
        return this.loadingCtrl.create({
            spinner: 'crescent',
            message: 'Download in corso...'
        });
    }

    // Usare present() per visualizzare e dismiss() per chiuderlo
    caricamentoGenerico() {
        return this.loadingCtrl.create({
            spinner: 'crescent',
            message: 'Caricamento...'
        });
    }

    spinnerEliminazione() {
        return this.loadingCtrl.create({
            spinner: 'crescent',
            message: 'Eliminazione in corso...'
        });
    }

    successoEliminazione() {
        this.toastCtrl.create({
            message: 'File eliminato correttamente.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    fallimentoEliminazione() {
        this.toastCtrl.create({
            message: 'Il file non esiste.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    nonSupportato() {
        this.toastCtrl.create({
            message: 'L\'accesso ai file non è supportata su questo dispositivo.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    permessoNonAttivo() {
        this.toastCtrl.create({
            message: 'L\'accesso ai file è stato negato per l\'App Studenti. Controlla le impostazioni del dispositivo.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    erroreDownload() {
        this.toastCtrl.create({
            message: 'Si è verificato un errore durante il download del file. Verificare la connessione e riprovare.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    fileNonSupportato() {
        this.toastCtrl.create({
            message: 'Non è presente un\'applicazione per aprire questo tipo di file.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    erroreAperturaFile() {
        this.toastCtrl.create({
            message: 'Si è verificato un errore durante l\'apertura del file.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }
}
