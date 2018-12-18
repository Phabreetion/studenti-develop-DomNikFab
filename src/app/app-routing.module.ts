import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
    { path: 'accounts', loadChildren: './pages/account/accounts/accounts.module#AccountsPageModule' },
    { path: 'allegato', loadChildren: './pages/carriera/materiale-didattico/allegato/allegato.module#AllegatoPageModule' },
    { path: 'appelli', loadChildren: './pages/carriera/appelli/appelli.module#AppelliPageModule'},
    { path: 'appelli/:id', loadChildren: './pages/carriera/appelli/appelli.module#AppelliPageModule'},
    { path: 'calendario', loadChildren: './pages/servizi/calendario/calendario.module#CalendarioPageModule' },
    { path: 'carriera', loadChildren: './pages/carriera/tabs-carriera/carriera.module#CarrieraPageModule' },
    { path: 'carriere', loadChildren: './pages/account/login/carriere/carriere.module#CarrierePageModule' },
    { path: 'contatto', loadChildren: './pages/servizi/rubrica/contatto/contatto.module#ContattoPageModule' },
    { path: 'dettagli-utente', loadChildren: './pages/home/dettagli-utente/dettagli-utente.module#DettagliUtentePageModule'},
    { path: 'disconnetti', loadChildren: './pages/account/disconnetti/disconnetti.module#DisconnettiPageModule' },
    { path: 'esame', loadChildren: './pages/carriera/esame/esame.module#EsamePageModule' },
    { path: 'libretto', loadChildren: './pages/carriera/libretto/libretto.module#LibrettoPageModule' },
    { path: 'lock', loadChildren: './pages/account/lock/lock.module#LockPageModule'},
    { path: 'login', loadChildren: './pages/account/login/login.module#LoginPageModule'},
    { path: 'materiale-didattico/:id',
        loadChildren: './pages/carriera/materiale-didattico/materiale-didattico.module#MaterialeDidatticoPageModule' },
    { path: 'medie', loadChildren: './pages/carriera/medie/medie.module#MediePageModule' },
    { path: 'news', loadChildren: './pages/news/news.module#NewsPageModule' },
    { path: 'notifiche', loadChildren: './pages/notifiche/notifiche.module#NotifichePageModule' },
    { path: 'notizia', loadChildren: './pages/news/notizia/notizia.module#NotiziaPageModule' },
    { path: 'preferenze', loadChildren: './pages/preferenze/preferenze.module#PreferenzePageModule' },
    { path: 'questionari', loadChildren: './pages/servizi/questionari/questionari.module#QuestionariPageModule' },
    { path: 'rubrica', loadChildren: './pages/servizi/rubrica/rubrica.module#RubricaPageModule' },
    { path: 'servizi-online', loadChildren: './pages/servizi/servizi-online/servizi-online.module#ServiziOnlinePageModule' },
    { path: 'storico-esami', loadChildren: './pages/carriera/storico-esami/storico-esami.module#StoricoEsamiPageModule' },
    { path: 'tasse', loadChildren: './pages/servizi/tasse/tasse.module#TassePageModule' },
    { path: 'tutorial', loadChildren: './pages/account/tutorial/tutorial.module#TutorialPageModule' }
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
