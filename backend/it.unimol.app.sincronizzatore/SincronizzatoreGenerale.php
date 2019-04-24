<?php

/**
 * Created by PhpStorm.
 * User: Matteo Omicini
 * Date: 15/05/17
 * Time: 23:18
 */
include_once 'Sincronizzatore.php';
include_once 'GestoreJSON.php';
include_once 'Utils.php';
include_once '../it.unimol.app.archivio/ConnessioneDB.php';
include_once '../it.unimol.app.servizi/ServizioAppelli.php';
include_once '../it.unimol.app.servizi/ServizioAppelliPrenotati.php';
include_once '../it.unimol.app.servizi/ServizioCarriera.php';
include_once '../it.unimol.app.servizi/ServizioPianoDiStudi.php';
include_once '../it.unimol.app.servizi/ServizioCreditiaScelta.php';
include_once '../it.unimol.app.servizi/ServizioEsamiNonSostenuti.php';
include_once '../it.unimol.app.servizi/ServizioLibretto.php';
include_once '../it.unimol.app.servizi/ServizioMediePreviste.php';
include_once '../it.unimol.app.servizi/ServizioListaDipartimentiCorsi.php';
include_once '../it.unimol.app.servizi/ServizioRubrica.php';
include_once '../it.unimol.app.servizi/VisualizzaQuestionari.php';
include_once '../it.unimol.app.servizi/ServizioNews.php';
include_once '../it.unimol.app.servizi/ServizioTasse.php';
include_once '../it.unimol.app.servizi/ServizioNotifiche.php';
include_once '../it.unimol.app.servizi/ServizioNewsDipartimento.php';
include_once '../it.unimol.app.servizi/ServizioNewsCDS.php';
include_once '../it.unimol.app.servizi/ServizioNewsAteneo.php';
include_once '../it.unimol.app.servizi/ServizioCalendario.php';
include_once '../it.unimol.app.servizi/ServizioMaterialeDidattico.php';
include_once '../it.unimol.app.servizi/ServizioAccounts.php';

class SincronizzatoreGenerale extends Sincronizzatore {

    /**
     * SincronizzatoreGenerale constructor.
     */
    public function __construct() {
        parent::__construct();

        $this->servizi = array(
            APPELLI => new ServizioAppelli(), //OK
            ESAMI_DA_SOSTENERE => new ServizioEsamiNonSostenuti(), //OK
            CREDITI_A_SCELTA => new ServizioCreditiaScelta(), //OK
            LIBRETTO => new ServizioLibretto(), // OK
            MEDIE_PREVISTE => new ServizioMediePreviste(), //OK
            NEWS => new ServizioNews(),
            RUBRICA => new ServizioRubrica(), //OK
            QUESTIONARI => new VisualizzaQuestionari(), //OK
            CARRIERA => new ServizioCarriera(), //OK
            APPELLI_PRENOTATI => new ServizioAppelliPrenotati(), //Ok
            TASSE => new ServizioTasse(),
            PIANO_Di_STUDI => new ServizioPianoDiStudi(),
            NOTIFICHE => new ServizioNotifiche(),
            SERVIZIO_NEWS_DIPARTIMENTO => new ServizioNewsDipartimento(),
            SERVIZIO_NEWS_CDS => new ServizioNewsCDS(),
            SERVIZIO_NEWS_ATENEO => new ServizioNewsAteneo(),
            SERVIZIO_CALENDARIO => new ServizioCalendario(),
            SERVIZIO_MATERIALE_DIDATTICO => new ServizioMaterialeDidattico(),
            SERVIZIO_ACCOUNTS => new ServizioAccounts());

        $this->setServizio($this->servizi);
    }

}
