import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
    {path: 'home-docente', loadChildren: './pages/docente/home-docente/home-docente.module#HomeDocentePageModule'},
    {path: 'accounts', loadChildren: './pages/account/accounts/accounts.module#AccountsPageModule'},
    {path: 'dettagli-allegato', loadChildren: './pages/carriera/materiale-didattico/dettagli-allegato/dettagli-allegato.module#DettagliAllegatoPageModule'},
    {path: 'appelli', loadChildren: './pages/carriera/appelli/appelli.module#AppelliPageModule'},
    {path: 'appelli/:id/:nome_corso', loadChildren: './pages/carriera/appelli/appelli.module#AppelliPageModule'},
    {path: 'appelli-docente', loadChildren: './pages/docente/appelli/appelli-docente.module#AppelliDocentePageModule'},
    {path: 'appello-docente', loadChildren: './pages/docente/appelli/appello/appello.module#AppelloPageModule'},
   // {path: 'calendario', loadChildren: './pages/servizi/calendario/calendario.module#CalendarioPageModule'},
    {path: 'contatto', loadChildren: './pages/servizi/rubrica/contatto/contatto.module#ContattoPageModule'},
    {path: 'carriere', loadChildren: './pages/account/login/carriere/carriere.module#CarrierePageModule'},
    {path: 'dettagli-studente', loadChildren: './pages/home/dettagli-utente/dettagli-utente.module#DettagliUtentePageModule'},
    {path: 'disconnetti', loadChildren: './pages/account/disconnetti/disconnetti.module#DisconnettiPageModule'},
    {path: 'dettagli-corso', loadChildren: './pages/carriera/dettagli-corso/dettagli-corso.module#DettagliCorsoPageModule'},
    {path: 'lock', loadChildren: './pages/account/lock/lock.module#LockPageModule'},
    {path: 'login', loadChildren: './pages/account/login/login.module#LoginPageModule'},
    {path: 'materiale-didattico/', loadChildren: './pages/carriera/materiale-didattico/materiale-didattico-corso/materiale-didattico-corso.module#MaterialeDidatticoCorsoPageModule'},
    {path: 'materiale-didattico/:id/:nome_corso', loadChildren: './pages/carriera/materiale-didattico/materiale-didattico-corso/materiale-didattico-corso.module#MaterialeDidatticoCorsoPageModule'},
    {path: 'medie', loadChildren: './pages/carriera/medie/medie.module#MediePageModule'},
    {path: 'news', loadChildren: './pages/news/news.module#NewsPageModule'},
    {path: 'notifiche', loadChildren: './pages/notifiche/notifiche.module#NotifichePageModule'},
    {path: 'notizia', loadChildren: './pages/news/notizia/notizia.module#NotiziaPageModule'},
    {path: 'preferenze', loadChildren: './pages/preferenze/preferenze.module#PreferenzePageModule'},
    {path: 'questionari', loadChildren: './pages/servizi/questionari/questionari.module#QuestionariPageModule'},
    {path: 'rubrica', loadChildren: './pages/servizi/rubrica/rubrica.module#RubricaPageModule'},
    {path: 'servizi-online', loadChildren: './pages/servizi/servizi-online/servizi-online.module#ServiziOnlinePageModule'},
    {path: 'tasse', loadChildren: './pages/servizi/tasse/tasse.module#TassePageModule'},
    {path: 'tutorial', loadChildren: './pages/account/tutorial/tutorial.module#TutorialPageModule'},
    {path: 'orario', loadChildren: './pages/orario/orario.module#OrarioPageModule'},
    {path: 'piano-di-studio', loadChildren: './pages/carriera/piano-di-studio/piano-di-studio.module#PianoDiStudioPageModule'},
    {path: 'materiale-didattico-scaricato', loadChildren: './pages/carriera/materiale-didattico/materiale-didattico-scaricato/materiale-didattico-scaricato.module#MaterialeDidatticoScaricatoPageModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
