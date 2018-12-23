import {Storage} from '@ionic/storage';
import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {AccountService} from '../../../services/account.service';

@Component({
    selector: 'app-page-tutorial',
    templateUrl: 'tutorial.html',
    styleUrls: ['./tutorial.scss'],
})

export class TutorialPage implements OnInit {


    currentPage = '/tutorial';

    ticks = 0;
    show: boolean;
    timer: any;
    sub: any;
    progress: any;
    showProgress: boolean;
    time = 20; // soglia tempo
    slides = [
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

    constructor(
        private sync: SyncService,
        private menu: MenuController,
        private storage: Storage,
        public globalData: GlobalDataService,
        public account: AccountService) {
    }

    // ionViewWillEnter() {
    //     this.menu.enable(false);
    // }
    //
    // ionViewWillLeave() {
    //     this.menu.enable(true);
    // }

    ngOnInit() {
        // this.timer = Observable.timer(500);
        // this.timer.subscribe(x => this.progressChange());
        this.account.controllaAccount().then(
            (ok) => {
                this.scaricaTutto();
                this.show = true;
                this.showProgress = true;
                this.progress = 'Aggiornamento dati in corso...';
            }, (err) => {
                this.globalData.goTo(this.currentPage, '/login', 'root', false);
            }
        );
    }

    progressChange() {
        this.time --;
        this.storage.get('progress').then((val) => {
            this.progress = val;
            if (this.time > 0) {
                this.timer.subscribe(() => this.progressChange());
            }
        });
    }

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

    scaricaTutto() {
        this.sync.sincronizza();
    }

    doContinua() {
        this.globalData.goTo(this.currentPage, '/home', 'root', false);
    }

    // goToLastSlide() {
    //     this.slidesCtrl.slideTo(this.slides.length);
    // }

}
