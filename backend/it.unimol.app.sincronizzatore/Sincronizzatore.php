<?php

//error_reporting(E_ALL);
//ini_set('display_errors', 'On');

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Sincronizzatore
 */

include_once 'Utils.php';
include_once 'GestioneNotifiche.php';
include_once '../it.unimol.app.archivio/ConnessioneDB.php';
include_once '../it.unimol.app.studente/GestoreStudente.php';

if (!defined("APPELLI")) {
    define("APPELLI", 1);
    define("ESAMI_DA_SOSTENERE", 2);
    define("CREDITI_A_SCELTA", 3);
    define("LIBRETTO", 4);
    define("MEDIE_PREVISTE", 5);
    define("NEWS", 6);
    define("RUBRICA", 7);
    define("QUESTIONARI", 8);
    define("CARRIERA", 9);
    define("APPELLI_PRENOTATI", 10);
    define("TASSE", 11);
    define("PIANO_Di_STUDI", 12);
    define("NOTIFICHE", 13);
    define("SERVIZIO_NEWS_DIPARTIMENTO", 14);
    define("SERVIZIO_NEWS_CDS", 15);
    define("SERVIZIO_NEWS_ATENEO", 16);
    define("SERVIZIO_CALENDARIO", 17);
    define("SERVIZIO_MATERIALE_DIDATTICO", 18);
    define("SERVIZIO_ACCOUNTS", 19);

}

abstract class Sincronizzatore {

    public function getServizio(): array {
        return $this->servizio;
    }

    public function setServizio(array $servizio) {
        $this->servizio = $servizio;
    }

    protected function __construct() {

    }

    protected $servizio = array();

    public function sincronizza($token, $idServizio) {

        if ( $idServizio == null || !is_numeric($idServizio) || $idServizio <= 0 || !Utils::tokenEsiste($token)) {
            return null;
        }

        try {
            return $this->servizio[$idServizio]->aggiorna($token);
        } catch (Exception $e) {
            // error_log("ERRORE: " . print_r($e, true));
        }

        return null;
    }




}
