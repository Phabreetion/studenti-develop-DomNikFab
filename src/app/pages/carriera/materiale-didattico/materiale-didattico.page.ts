import {Component, OnInit, ViewChild} from '@angular/core';
import {
    ActionSheetController, AlertController,
    ModalController, Platform, ToastController
} from '@ionic/angular';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {MaterialeDidatticoDbService} from '../../../services/materiale-didattico-db-service';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '../../../services/account.service';
import {HttpService} from '../../../services/http.service';
import {ToastsService} from '../../../services/toasts.service';

@Component({
    selector: 'app-materiale-didattico',
    templateUrl: 'materiale-didattico.page.html',
    styleUrls: ['./materiale-didattico.page.scss'],

})

export class MaterialeDidatticoPage implements OnInit {
    currentPage = '/materiale-didattico';
    idServizio = 18;
    ad: string;
    files: Array<any>;
    fileTrovati: File[];



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

    //ricerca
    //ricerca
    @ViewChild('searchbar') searchbar: any;
    isSearchbarOpened = false;
    searchKey: string;

    constructor(
        private toastCtrl: ToastController,
        public route: ActivatedRoute,
        public alertController: AlertController,
        public sync: SyncService,
        public http: HttpService,
        public globalData: GlobalDataService,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
        public localdb: MaterialeDidatticoDbService,
        public toastsService: ToastsService,
        public account: AccountService,
        public platform: Platform) {
        this.searchKey = '';
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

        this.sync.getJson(this.idServizio, null, true).then(
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

                    this.files.forEach(file => {
                        this.localdb.isAllegatoScaricato(file).then(
                            () => {file.scaricato = true; },
                            () => {file.scaricato = false; }
                        );
                    });

                    setTimeout(() => {
                        this.controllaAggiornamento();
                    }, 1000);

                    // console.dir(files)
                    // console.dir(this.files);
                }

                this.fileTrovati = this.files;

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

    async presentAlertConfermaDownload(item) {
        const alertConfermaRimozione = await this.alertController.create({
            header: 'Download file',
            message: 'Sei sicuro di\' voler scaricare il file sul dispositivo?',
            buttons: [
                {
                    text: 'Si',
                    handler: () => {
                        this.download(item);

                    }
                },
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });

        await alertConfermaRimozione.present();
    }


    newApriFile(item) {
        if ( this.localdb.isPiattaformaSupportata()) {

            this.localdb.isAllegatoScaricato(item).then(
                () => this.apriFile(item),
                () => this.presentAlertConfermaDownload(item)
            );
        } else {
            this.toastsService.piattaformaNonSupportata();
        }
    }

    async newRimuoviFile(item) {
        if (this.localdb.isPiattaformaSupportata()) {
            await this.localdb.isAllegatoScaricato(item).then(
                () => this.presentAlertConfermaRimozione(item),
                () => this.toastsService.fileNonScaricato()
            );
        } else {
            this.toastsService.piattaformaNonSupportata();
        }
    }


    async presentAlertConfermaRimozione(item) {
        const alertConfermaRimozione = await this.alertController.create({
            header: 'Rimozione file',
            message: 'Sei sicuro di\ voler eliminare il file sul dispositivo?',
            buttons: [
                {
                    text: 'Si',
                    handler: () => {
                        this.eliminaFile(item);
                    }
                },
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });

        await alertConfermaRimozione.present();
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
                        this.newApriFile(item);
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
                        this.newRimuoviFile(item);
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


    search() {
        this.fileTrovati = this.files;

        const searchKeyLowered = this.searchKey.toLowerCase();
        this.fileTrovati = this.files.filter(file => file.FILENAME.toLowerCase().search(searchKeyLowered) >= 0);
    }


    toogleSearchbar() {
        this.isSearchbarOpened = !this.isSearchbarOpened;

        if (this.isSearchbarOpened) {
            setTimeout(() => { this.searchbar.setFocus(); }, 150);
        }

        this.searchKey = '';
        this.search();
    }




}