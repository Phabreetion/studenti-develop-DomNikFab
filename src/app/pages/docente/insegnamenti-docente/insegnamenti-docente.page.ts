import {Component, OnInit} from '@angular/core';
import {AlertController, NavController, PopoverController, ToastController} from '@ionic/angular';

import { trigger, state, style, animate, transition} from '@angular/animations';
import { Storage } from '@ionic/storage';
import {GlobalDataService} from '../../../services/global-data.service';
import {SyncService} from '../../../services/sync.service';
import {HttpService} from '../../../services/http.service';
import {FiltroInsegnamentiPage} from './filtro/filtro-insegnamenti';

@Component({
    selector: 'app-page-insegnamenti-docente',
    templateUrl: 'insegnamenti-docente.page.html',
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateX(0)'})),
            transition('void => *', [
                style({transform: 'translateX(100%)'}),
                animate(300)
            ])
        ])
    ]
})
export class InsegnamentiDocentePage implements OnInit {

    idServizio = 103;

    insegnamenti: Array<any> = [];
    insegnamentiFiltrati: Array<any> = [];
    dataAggiornamento: string;

    color = 'primary';

    filtraAnnoCorrente = true;
    aaCorrente = '';

    searchTerm = '';
    flyInOutState = 'in';
    showSearchBar = false;
    aggiornamentoVerificato = false;
    rinvioAggiornamento = false;
    nrRinvii = 0;
    maxNrRinvii = 5;

    step = 20;
    mostraTutti = false;
    mostraPrimi = true;
    nrElementi = 0;
    nrElementiFiltrati = 0;
    nrElementiDaMostrare = this.step;
    nrElementiNascosti = 0;

    constructor(
        private navCtrl: NavController,
        public globalData: GlobalDataService,
        private sync: SyncService,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,
        public http: HttpService,
        private storage: Storage,
        private popoverCtrl: PopoverController) {
    }

    ngOnInit() {
        this.storage.get('filtroInsegnamenti').then(
            (filtro) => {
                this.searchTerm = filtro;
                this.insegnamentiFiltrati = [];
                if (!this.searchTerm) {
                    this.searchTerm = '';
                }

                this.aggiorna(false, true);
            });
        this.storage.get('annoCorrente').then(
            (filtro) => {
                this.aaCorrente = filtro;
            });
    }


    setFiltro() {
        this.storage.set('filtroInsegnamenti', this.searchTerm);
        this.storage.set('filtraAnnoCorrente', this.filtraAnnoCorrente);

        this.insegnamentiFiltrati = this.filtra(this.searchTerm);
        this.nrElementiFiltrati = this.insegnamentiFiltrati.length;
        this.nrElementiNascosti = this.nrElementiFiltrati - this.nrElementiDaMostrare;
        if (this.nrElementiNascosti < 0) {
            this.nrElementiNascosti = 0;
        }
        if (this.mostraPrimi && this.insegnamentiFiltrati.length > this.nrElementiDaMostrare) {
            this.insegnamentiFiltrati = this.insegnamentiFiltrati.slice(0, this.nrElementiDaMostrare - 1);
            this.mostraTutti = false;
        }
        if (this.insegnamentiFiltrati.length === this.insegnamenti.length) {
            this.color = 'primary';
        } else {
            this.color = 'danger';
        }
    }

    filtra(searchTerm) {

        this.insegnamentiFiltrati = [];

        if (searchTerm == null || searchTerm === undefined) {
            this.searchTerm = '';
            searchTerm = '';
        }

        return this.insegnamenti.filter((item) => {
            try {
                if (this.filtraAnnoCorrente && item.AA_OFF_ID !== this.aaCorrente) {
                    return false;
                }
                return (item.DES_AD.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    (item.AA_OFF_ID.indexOf(searchTerm) > -1) ||
                    (item.AA_OFF_ID.indexOf(searchTerm) > -1);
            } catch (err) {
                console.log(err);
            }
        });
    }

    // showDetails(item: any) {
    //     const confirmAlert = this.alertCtrl.create({
    //         title: item.DES_CDS,
    //         message: item.DES_AD,
    //         buttons: [{
    //             text: 'Chiudi',
    //             role: 'cancel'
    //         }]
    //     });
    //     confirmAlert.present();
    // }


    // Restituisce lo stato di eventuali richieste di sincronizzazione per il JSON associato al servizio
    isLoading() {
        return this.sync.loading[this.idServizio];
    }

    loadData(event) {
        setTimeout(() => {
            this.nrElementiDaMostrare += this.step;
            this.setFiltro();
            event.target.complete();

            // Se non ci sono ulteriori elementi, disabilitiamo lo scroll
            if (this.nrElementiDaMostrare >= this.nrElementi) {
                event.target.disabled = true;
            }
        }, 500);
    }

    // Recupera i dati tramite il sincronizzatore
    // il parametro interattivo indica se mostrare il refresher durante il recupero dei dati dal server
    aggiorna(interattivo: boolean, sync: boolean) {

        if (this.sync.loading[this.idServizio]) {
            this.rinvioAggiornamento = true;
            this.dataAggiornamento = 'in corso';
            this.nrRinvii++;

            // console.log('Rinvio ' + this.nrRinvii);

            if (this.nrRinvii < this.maxNrRinvii) {
                setTimeout(() => {
                    this.aggiorna(interattivo, sync);
                }, 2000);
                return;
            } else {
                if (this.http.connessioneLenta) {
                    this.toastCtrl.create({
                        message: 'La connessione è assente o troppo lenta. Riprova ad aggiornare i dati più tardi.',
                        duration: 3000,
                        position: 'bottom'
                    }).then(toast => { toast.present(); }, (err) => { GlobalDataService.log(2, 'Toast fallito!', err); });
                }
            }
        }
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;

        this.sync.getJson(this.idServizio, null, sync).then(
            (data) => {
                console.log(data);
                if ( this.sync.dataIsChanged(this.insegnamenti, data['insegnamenti']) ) {
                    this.insegnamenti = data['insegnamenti'];
                    if (this.insegnamenti) {
                        this.nrElementi = this.insegnamenti.length;
                    }
                    this.setFiltro();
                    setTimeout(() => {
                        this.controllaAggiornamento();
                    }, 1000);
                }
                this.dataAggiornamento = SyncService.dataAggiornamento(data);
            },
            (err) => {
                if (interattivo) {
                    this.toastCtrl.create({
                        message: 'Non è stato possibile recuparate i dati dal server. Riprovare più tardi.',
                        duration: 3000
                    }).then(toast => { toast.present(); }, (error) => {});
                }

            }).catch(err => {
            }
        );
    }

    controllaAggiornamento() {
        // La verifica dell'aggiornamento in background la facciamo solo una volta
        if (this.aggiornamentoVerificato) {
            return;
        }

        // Se stiamo caricando dati dal server rimandiamo la verifica
        if (this.sync.loading[this.idServizio]) {
            setTimeout(() => {
                this.controllaAggiornamento();
            }, 1000);
        } else {
            this.aggiornamentoVerificato = true;
            this.aggiorna(false, false);
        }
    }

    doRefresh(refresher) {
        this.aggiorna(true, true);
        if (refresher) {
            refresher.complete();
        }
    }

    date2string(stringDate): string {
        // console.log(stringDate);
        return GlobalDataService.formatStringDateTime(stringDate, '-', ':');
    }

    async presentPopover(event: any) {
        const popover = await this.popoverCtrl.create({
            component: FiltroInsegnamentiPage,
            event: event,
            translucent: true,
            componentProps: {
                page: this
            }
        });
        return await popover.present();
    }

    async dismissPopover() {
        return await this.popoverCtrl.dismiss();
    }

    toTitleCase(str) {
        let stringa = str.replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        stringa = stringa
            .replace(' E ', ' e ')
            .replace(' Ed ', ' ed ')
            .replace(' Del ', ' del ')
            .replace(' Dei ', ' dei ')
            .replace(' Delle ', ' delle ')
            .replace(' Della ', ' della ')
            .replace(' Dello ', ' dello ')
            .replace(' Degli ', ' degli ')
            .replace(' Di ', ' di ')
            .replace(' A ', ' a ')
            .replace(' Da ', ' da ')
            .replace(' In ', ' in ')
            .replace(' Con ', ' con ')
            .replace(' Su ', ' su ')
            .replace(' Per ', ' per ')
            .replace(' Tra ', ' tra ')
            .replace(' Fra ', ' fra ')
            .replace(' Il ', ' il ')
            .replace(' Lo ', ' lo ')
            .replace(' La ', ' la ')
            .replace(' I ', ' i ')
            .replace(' Gli ', ' gli ')
            .replace(' Le ', ' le ')
            .replace(' Un ', ' un ')
            .replace(' Una ', ' una ')
            .replace(' Uno ', ' uno ')
            .replace(' L\'', ' l\'');
        return stringa;
    }

    toggleInOut() {
        this.showSearchBar = !this.showSearchBar;
        this.flyInOutState === 'out' ? this.flyInOutState = 'in' : this.flyInOutState = 'out';
    }

    onSearchCancel() {
        this.searchTerm = '';
        this.setFiltro();
    }
}
