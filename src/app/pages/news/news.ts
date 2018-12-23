import {Component, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import { trigger, state, style, animate, transition} from '@angular/animations';
import {SyncService} from '../../services/sync.service';
import {GlobalDataService} from '../../services/global-data.service';
import {AccountService} from '../../services/account.service';
import {HttpService} from '../../services/http.service';

@Component({
    selector: 'app-page-news',
    templateUrl: 'news.html',
    styleUrls: ['./news.scss'],
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

export class NewsPage implements OnInit {

    currentPage = '/news';
    idServizioDipartimento = 14;
    idServizioCDS = 15;
    idServizioAteneo = 16;

    sezioni: string;
    // private newsList: any;
    ateneoNews = [];
    ateneoNewsFiltrate = [];
    dipartimentoNews = [];
    dipartimentoNewsFiltrate = [];
    corsoNews = [];
    corsoNewsFiltrate = [];
    searchTerm = '';

    nrNewsAteneo = '';
    nrNewsDipartimento = '';
    nrNewsCDS = '';

    dataAggiornamento: string;
    dataAggiornamentoAteneo = 'Mai';
    dataAggiornamentoDipartimento = 'Mai';
    dataAggiornamentoCDS = 'Mai';

    flyInOutState = 'in';
    showSearchBar = false;

    aggiornamentoNewsDipartimentoVerificato = false;
    aggiornamentoNewsAteneoVerificato = false;
    aggiornamentoNewsCDSVerificato = false;

    rinvioAggiornamentoNewsAteneo = false;
    rinvioAggiornamentoNewsDipartimento = false;
    rinvioAggiornamentoNewsCDS = false;
    nrRinvii = 0;
    maxNrRinvii = 5;

    step = 10;
    nrElementi = 0;
    nrElementiFiltrati = 0;
    nrElementiDaMostrare: number = this.step;

    infiniteScrollCtrl: any;

    constructor(
        public sync: SyncService,
        public http: HttpService,
        public toastCtrl: ToastController,
        public globalData: GlobalDataService,
        public account: AccountService) {

        this.sezioni = this.globalData.sezioneNews;

        if (!this.sezioni) {
            this.sezioni = 'ateneo';
        }
    }

    ngOnInit() {
        this.globalData.srcPage = this.currentPage;

        this.account.controllaAccount().then(
            (ok) => {
                this.showSearchBar = false;
                this.http.getConnected();
                this.aggiorna(false, true);
            }, (err) => {
                this.globalData.goTo(this.currentPage, '/login', 'root', false);
            }
        );
    }

    onViewChange(data) {
        this.doRefresh(null);

        // Ripristiniamo il controllo InfiniteScroll che potrebbe essere stato disabilitato
        // nel caso in cui da un'altra sezione avessimo raggiunto l'ultimo elemento
        if (this.infiniteScrollCtrl) {
            this.infiniteScrollCtrl.disabled = false;
        }

        // Inizializziamo nuovamente il nr di elementi da visualizzare per questa sezione
        this.nrElementiDaMostrare = this.step;
        this.setFiltro();
    }

    loadData(event) {
        setTimeout(() => {
            // Salviamo in una variabile il controllo InifineScroll per poterlo
            // eventualmente riabilitate quando si passa ad una diversa sezione
            this.infiniteScrollCtrl = event.target;

            this.nrElementiDaMostrare += this.step;
            this.setFiltro();
            event.target.complete();

            // Se non ci sono ulteriori elementi, disabilitiamo lo scroll
            if (this.nrElementiDaMostrare >= this.nrElementi) {
                event.target.disabled = true;
            }
        }, 500);
    }

    setFiltro() {
        this.ateneoNewsFiltrate = [];
        this.dipartimentoNewsFiltrate = [];
        this.corsoNewsFiltrate = [];
        this.ateneoNewsFiltrate = this.filtra(this.ateneoNews, this.searchTerm);
        if (this.ateneoNewsFiltrate) {
            this.nrNewsAteneo = '(' + this.ateneoNewsFiltrate.length + ')';
        } else {
            this.nrNewsAteneo = '';
        }
        this.dipartimentoNewsFiltrate = this.filtra(this.dipartimentoNews, this.searchTerm);
        if (this.dipartimentoNewsFiltrate) {
            this.nrNewsDipartimento = '(' + this.dipartimentoNewsFiltrate.length + ')';
        } else {
            this.nrNewsDipartimento = '';
        }
        this.corsoNewsFiltrate = this.filtra(this.corsoNews, this.searchTerm);
        if (this.corsoNewsFiltrate) {
            this.nrNewsCDS = '(' + this.corsoNewsFiltrate.length + ')' ;
        } else {
            this.nrNewsCDS = '';
        }

        switch (this.sezioni) {
            case 'ateneo' : {
                this.nrElementi = this.ateneoNews.length;
                this.nrElementiFiltrati = this.ateneoNewsFiltrate.length;
                if (this.ateneoNewsFiltrate.length > this.nrElementiDaMostrare) {
                    this.ateneoNewsFiltrate = this.ateneoNewsFiltrate.slice(0, this.nrElementiDaMostrare - 1);
                }
                break;
            }
            case 'dipartimento' : {
                this.nrElementi = this.dipartimentoNews.length;
                this.nrElementiFiltrati = this.dipartimentoNewsFiltrate.length;
                if (this.dipartimentoNewsFiltrate.length > this.nrElementiDaMostrare) {
                    this.dipartimentoNewsFiltrate = this.dipartimentoNewsFiltrate.slice(0, this.nrElementiDaMostrare - 1);
                }
                break;
            }
            case 'cds' : {
                this.nrElementi = this.corsoNews.length;
                this.nrElementiFiltrati = this.corsoNewsFiltrate.length;
                if (this.corsoNewsFiltrate.length > this.nrElementiDaMostrare) {
                    this.corsoNewsFiltrate = this.corsoNewsFiltrate.slice(0, this.nrElementiDaMostrare - 1);
                }
                break;
            }
        }

    }

    onSearchCancel() {
        this.searchTerm = '';
        this.setFiltro();
    }

    filtra(items, searchTerm) {
        if (searchTerm == null || searchTerm === undefined || searchTerm === '') {
            return items;
        }

        return items.filter((item) => {
            try {
                return (item.messaggio.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    (item.descrizione.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
            } catch (err) {
                console.dir(err);
            }
        });
    }

    aggiorna(automatico: boolean, sync: boolean) {
        this.aggiornaNewsAteneo(automatico, sync);
        this.aggiornaNewsDipartimento(automatico, sync);
        this.aggiornaNewsCDS(automatico, sync);
    }

    isLoading() {
        switch (this.sezioni) {
            case 'cds':
                return this.sync.loading[this.idServizioCDS];
            case 'dipartimento':
                return this.sync.loading[this.idServizioDipartimento];
            default :
                return this.sync.loading[this.idServizioAteneo];
        }
    }

    doRefresh(refresher) {
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
            default :
                this.aggiornaNewsAteneo(true, true);
                break;
        }

    }

    aggiornaNewsCDS(interattivo: boolean, sync: boolean) {

        if (this.sync.loading[this.idServizioCDS]) {
            this.rinvioAggiornamentoNewsCDS = true;
            this.dataAggiornamento = 'in corso';
            this.dataAggiornamentoCDS = this.dataAggiornamento;

            this.nrRinvii++;

            // console.log('Rinvio ' + this.nrRinvii);

            if (this.nrRinvii < this.maxNrRinvii) {
                setTimeout(() => {
                    this.aggiornaNewsCDS(interattivo, sync);
                }, 2000);
                return;
            } else {
                if (this.http.connessioneLenta) {
                    this.toastCtrl.create({
                        message: 'La connessione è assente o troppo lenta. Riprova ad aggiornare i dati più tardi.',
                        duration: 3000,
                        position: 'bottom'
                    }).then( (toast) => {toast.present(); }, (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                }
            }
        }
        this.rinvioAggiornamentoNewsCDS = false;
        this.nrRinvii = 0;

        this.sync.getJson(this.idServizioCDS, sync).then(
            (data) => {
                if (JSON.stringify(this.corsoNews) !== JSON.stringify(data['news'])) {
                    this.corsoNews = data['news'];
                    this.setFiltro();
                    setTimeout(() => {
                        this.controllaAggiornamentoNewsCDS();
                    }, 1000);
                }
                this.dataAggiornamento = SyncService.dataAggiornamento(data);
                this.dataAggiornamentoCDS = this.dataAggiornamento;
            },
            (err) => {
                if (interattivo) {
                    this.toastCtrl.create({
                        message: 'Non è stato possibile recuparate i dati dal server. Riprovare più tardi.',
                        duration: 3000
                    }).then( (toast) => {toast.present(); }, (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                }
            }).catch(err => {
            console.log('Eccezione in aggiornaNewsCDS: ' + err);
        });
    }

    controllaAggiornamentoNewsCDS() {

        // La verifica dell'aggiornamento in background la facciamo solo una volta
        if (this.aggiornamentoNewsCDSVerificato) {
            return;
        }

        // Se stiamo caricando dati dal server rimandiamo la verifica
        if (this.sync.loading[this.idServizioCDS]) {
            setTimeout(() => {
                this.controllaAggiornamentoNewsCDS();
            }, 1000);
        } else {
            this.aggiornamentoNewsCDSVerificato = true;
            this.aggiornaNewsCDS(false, false);
        }
    }

    aggiornaNewsDipartimento(interattivo: boolean, sync: boolean) {

        if (this.sync.loading[this.idServizioDipartimento]) {
            this.rinvioAggiornamentoNewsDipartimento = true;
            this.dataAggiornamento = 'in corso';
            this.dataAggiornamentoDipartimento = this.dataAggiornamento;
            this.nrRinvii++;

            // console.log('Rinvio ' + this.nrRinvii);

            if (this.nrRinvii < this.maxNrRinvii) {
                setTimeout(() => {
                    this.aggiornaNewsDipartimento(interattivo, sync);
                }, 2000);
                return;
            } else {
                if (this.http.connessioneLenta) {
                    this.toastCtrl.create({
                        message: 'La connessione è assente o troppo lenta. Riprova ad aggiornare i dati più tardi.',
                        duration: 3000,
                        position: 'bottom'
                    }).then( (toast) => {toast.present(); }, (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                }
            }
        }
        this.rinvioAggiornamentoNewsDipartimento = false;
        this.nrRinvii = 0;

        this.sync.getJson(this.idServizioDipartimento, sync).then(
            (data) => {
                if (JSON.stringify(this.dipartimentoNews) !== JSON.stringify(data['news'])) {
                    this.dipartimentoNews = data['news'];
                    this.setFiltro();
                    setTimeout(() => {
                        this.controllaAggiornamentoNewsDipartimento();
                    }, 1000);
                }
                this.dataAggiornamento = SyncService.dataAggiornamento(data);
                this.dataAggiornamentoDipartimento = this.dataAggiornamento;
            },
            (err) => {
                if (interattivo) {
                    this.toastCtrl.create({
                        message: 'Non è stato possibile recuparate i dati dal server. Riprovare più tardi.',
                        duration: 3000
                    }).then( (toast) => {toast.present(); }, (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                }
            }).catch(err => {
            console.log('Eccezione in aggiornaNewsCDS: ' + err);
        });
    }

    controllaAggiornamentoNewsDipartimento() {
        // La verifica dell'aggiornamento in background la facciamo solo una volta
        if (this.aggiornamentoNewsDipartimentoVerificato) {
            return;
        }

        // Se stiamo caricando dati dal server rimandiamo la verifica
        if (this.sync.loading[this.idServizioDipartimento]) {
            setTimeout(() => {
                this.controllaAggiornamentoNewsDipartimento();
            }, 1000);
        } else {
            this.aggiornamentoNewsDipartimentoVerificato = true;
            this.aggiornaNewsDipartimento(false, false);
        }
    }


    aggiornaNewsAteneo(interattivo: boolean, sync: boolean) {

        if (this.sync.loading[this.idServizioAteneo]) {
            this.rinvioAggiornamentoNewsAteneo = true;
            this.dataAggiornamento = 'in corso...';
            this.dataAggiornamentoAteneo = this.dataAggiornamento;

            this.nrRinvii++;

            if (this.nrRinvii < this.maxNrRinvii) {
                setTimeout(() => {
                    this.aggiornaNewsAteneo(interattivo, sync);
                }, 2000);
                return;
            } else {
                if (this.http.connessioneLenta) {
                    this.toastCtrl.create({
                        message: 'La connessione è assente o troppo lenta. Riprova ad aggiornare i dati più tardi.',
                        duration: 3000,
                        position: 'bottom'
                    }).then( (toast) => {toast.present(); }, (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                }
            }
        }
        this.rinvioAggiornamentoNewsAteneo = false;
        this.nrRinvii = 0;

        this.sync.getJson(this.idServizioAteneo, sync).then(
            (data) => {
                if (JSON.stringify(this.ateneoNews) !== JSON.stringify(data['news'])) {
                    this.ateneoNews = data['news'];
                    this.setFiltro();
                    setTimeout(() => {
                        this.controllaAggiornamentoNewsAteneo();
                    }, 1000);
                }
                this.dataAggiornamento = SyncService.dataAggiornamento(data);
                this.dataAggiornamentoAteneo = this.dataAggiornamento;
            },
            (err) => {
                if (interattivo) {
                    this.toastCtrl.create({
                        message: 'Non è stato possibile recuparate i dati dal server. Riprovare più tardi.',
                        duration: 3000
                    }).then( (toast) => {toast.present(); }, (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                }
                console.log('Errore!');
                console.dir(err);
            }).catch(err => {
            console.log('Eccezione in aggiornaNewsAteneo: ' + err);
        });
    }

    controllaAggiornamentoNewsAteneo() {
        // La verifica dell'aggiornamento in background la facciamo solo una volta
        if (this.aggiornamentoNewsAteneoVerificato) {
            return;
        }

        // Se stiamo caricando dati dal server rimandiamo la verifica
        if (this.sync.loading[this.idServizioAteneo]) {
            setTimeout(() => {
                this.controllaAggiornamentoNewsAteneo();
            }, 1000);
        } else {
            this.aggiornamentoNewsAteneoVerificato = true;
            this.aggiornaNewsAteneo(false, false);
        }
    }


    date2string(stringDate): string {
        return GlobalDataService.formatStringDateTime(stringDate, '-', ':');
    }

    showDetails(newsItem) {
        this.globalData.notizia = newsItem;
        this.globalData.goTo(this.currentPage, '/notizia', 'forward', false);
    }

    toggleInOut() {
        this.flyInOutState === 'out' ? this.flyInOutState = 'in' : this.flyInOutState = 'out';
        this.showSearchBar = !this.showSearchBar;
    }

    pulisciNews(newsItem: string): string {
        return newsItem.replace(/\\r\\n|\\r|\\n/g, '');
    }
}
