import {Component, OnInit} from '@angular/core';
import {
    ActionSheetController,
    ModalController, NavController, ToastController
} from '@ionic/angular';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {DBService} from '../../../services/db-service';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '../../../services/account.service';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-materiale-didattico',
    templateUrl: 'materiale-didattico.html',
    styleUrls: ['./materiale-didattico.scss'],

})

export class MaterialeDidatticoPage implements OnInit {
    currentPage = '/materiale-didattico';
    idServizio = 18;
    ad: string;
    files: Array<any>;

    pageloading = false;

    loading: any;
    dataAggiornamento: string;
    aggiornamentoVerificato = false;
    rinvioAggiornamento = false;
    nrRinvii = 0;
    maxNrRinvii = 5;

    url: string;
    // fileInfo:any;
    // elencoFile:any;
    // ultimoAggiornamento:any;
    // aggiornamentoTmp:any;
    //
    // metodo = 'files';
    //
    // fileScaricati:any = [];
    // showDoubleArrow = true;
    noFile = false;
    token: any;
    IPServer: any;
    iS: any;
    i: any;
    opened = false;
    maxLength = 60; // Lunghezza massima del testo da visualizzare

    constructor(
        private toastCtrl: ToastController,
        public route: ActivatedRoute,
        public sync: SyncService,
        public http: HttpService,
        public globalData: GlobalDataService,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
        public localdb: DBService,
        public account: AccountService) {
    }

    ngOnInit() {
        this.account.controllaAccount().then(
            (ok) => {
                this.pageloading = true;
                this.ad = this.route.snapshot.paramMap.get('id');
                this.currentPage = '/materiale-didattico/' + this.ad;
                // this.ad = this.navParams.get('ad');
                this.http.checkConnection();
                this.aggiorna(false, true);
            }, (err) => {
                this.globalData.goTo(this.currentPage, '/login', 'root', false);
            }
        );
    }

    // ngAfterContentInit() {
    //     this.aggiorna(false, true);
    // }

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
                    }).then( (toast) => {toast.present(); }, (toastErr) => { GlobalDataService.log(2, 'Toast fallito!', toastErr); });
                }
            }
        }
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;

        this.sync.getJson(this.idServizio, true).then(
            (data) => {

                this.pageloading = false;
                const json = data[0];
                const files = this.filtra(json, this.ad);
                files.sort(function (a, b) {
                    return a.FILENAME.localeCompare(b.FILENAME);
                });

                if ( this.sync.dataIsChanged(this.files, files) ) {
                    //
                    // if (JSON.stringify(this.files) !== JSON.stringify(files)) {
                    this.files = files;
                    setTimeout(() => {
                        this.controllaAggiornamento();
                    }, 1000);

                    // console.dir(files)
                    // console.dir(this.files);
                }

                this.dataAggiornamento = SyncService.dataAggiornamento(data);
            },
            (err) => {
            }).catch(err => {
                console.dir(err);
            }
        );
    }

    filtra(items, ad) {
        return items.filter((item) => {
            try {
                // console.dir(item)
                return (item.AD_ID.indexOf(ad) > -1);
            } catch (err) {
                console.dir(err);
            }
        });
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

    isLoading() {
        return this.sync.loading[this.idServizio];
    }

    doRefresh(refresher) {
        if (refresher) {
            refresher.target.complete();
        }

        this.aggiorna(true, true);
    }

    troncaTesto(testo: string) {
        if (!testo) {
            return '';
        }
        if (testo.length > this.maxLength) {
            testo = testo.substring(0, this.maxLength - 1) + ' ...';
        }
        return testo;
    }

    stripHTML(html) {

        // return html.replace(/<\/?[^>]+>/gi, "");
        let testo = html;
        if (testo && typeof testo === 'string') {
            // strip script/html tags
            testo = testo.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            testo = testo.replace(/&nbsp;*/gmi, '');
            testo = testo.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            testo = testo.replace(/\\r\\n|\\r|\\n/g, '');
        }

        return testo;
    }

    info(item) {
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
    }

    download(item) {
        this.localdb.download(item);
    }

    apriFile(item) {
        this.localdb.apriFile(item);
    }

    eliminaFile(item) {
        this.localdb.eliminaFile(item);
    }


    selezionaIcona(item) {
        const estensione: string = item.ESTENSIONE.toLowerCase();
        let nomeIcona = '';
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
    }

    onPress(item) {
        // console.dir(item);

        this.actionSheetCtrl.create({
            header: item.DESCRIZIONE,
            buttons: [
                {
                    text: 'Apri',
                    icon: 'easel',
                    handler: () => {
                        this.apriFile(item);
                    }
                }, {
                    text: 'Dettagli',
                    icon: 'information-circle',
                    handler: () => {
                        this.info(item);
                    }
                }, {
                    text: 'Rimuovi',
                    icon: 'trash',
                    handler: () => {
                        this.eliminaFile(item);
                    }
                }, {
                    text: 'Chiudi',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        // console.log('Cancel clicked');
                    }
                }
            ]
        }).then(
            (actionSheet) => actionSheet.present()
        );
    }
}
