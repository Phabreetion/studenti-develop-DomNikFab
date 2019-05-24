import { Injectable } from '@angular/core';
import {LoadingController, ToastController} from '@ionic/angular';
import {GlobalDataService} from './global-data.service';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {

    constructor(
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController) {
    }

    toastGenerico(msg: string) {
        this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'bottom'
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    uscitaApp() {
        this.toastCtrl.create({
            message: 'Premi ancora per uscire',
            duration: 2000,
            position: 'bottom'
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

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

    connessioneLenta() {
        this.toastCtrl.create({
            message: 'La connessione è assente o troppo lenta. Riprova ad aggiornare i dati più tardi.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => { toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    appelloNonAncoraPrenotabile(giorni: number) {
        this.toastCtrl.create({
            message: 'Non è possibile ancora possibile prenotare l\'appello.\nRiprova tra ' + giorni + ' giorni.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => { toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    appelloScaduto(giorni: number) {
        this.toastCtrl.create({
            message: 'Impossible prenotare l\'appello.\nLa finestra di prenotazione è scaduta ' + giorni + ' giorni fa.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => { toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    prenotazioneFallita() {
        this.toastCtrl.create({
            message: 'Impossibile effettuare la prenotazione.\nRiprova più tardi.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => { toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    prenotazioneEffettuataConSuccesso() {
        this.toastCtrl.create({
            message: 'Prenotazione effettuata con successo.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => { toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    prenotazioneAnnullataConSuccesso() {
        this.toastCtrl.create({
            message: 'Prenotazione annullata con successo.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => { toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    annullamentoFallito() {
        this.toastCtrl.create({
            message: 'Impossibile annullare la prenotazione.\nRiprova più tardi.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => { toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    annullamentoNonPiuPossibile() {
        this.toastCtrl.create({
            message: 'Non è più possibile annullare la prenotazione.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => { toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
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

    impossibileAggiornareIlToken() {
        this.toastCtrl.create({
            message: 'Non è stato possibile aggiornare il token.\nSe il problema persiste effetturare nuovamente il login.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    tokenNonDisponibile() {
        this.toastCtrl.create({
            message: 'Il token non è presente nel dispositivo.\nEffettua nuovamente il login.',
            duration: 3000,
            position: 'bottom'
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }

    erroreAggiornamentoDati() {
        this.toastCtrl.create({
            message: 'Si è verificato un errore durante l\'aggiornamento dei dati',
            duration: 3000,
            position: 'bottom'
        }).then(toast => {toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
    }
}
