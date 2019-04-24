<?php

include_once "Servizio.php";
include_once "GestoreSessioneEsse3.php";
include_once '../it.unimol.app.sincronizzatore/GestioneNotifiche.php';

class ServizioNotifiche implements Servizio {

    private $istanza;

    function __construct() {
        $this->istanza = GestoreSessioneEsse3::caricaIstanza();
    }

    function aggiorna(string $token) {
        $studente = new GestoreStudente($token);
        $matricola = $studente->getMatricola();
        $cds_id = $studente->getCdsId();
        $dip_id = $studente->getIdDipartimento();

        $t = time();

        $notifiche = $this->getNotifiche($matricola, $cds_id, $dip_id);
        //TODO modificare id
        $result = array("id" => NOTIFICHE, "timestamp" => $t, "notifiche" => $notifiche);

        //error_log( print_r($result, true));
        //error_log(json_encode($result));

        return json_encode($result);
    }

    function getNotifiche($matricola, $cds_id, $dip_id) : array {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT data_notifica, titolo, messaggio, tipo, chiave  FROM notifiche WHERE matricola='$matricola' OR tipo=" . NOTIFICA_NEWS_ATENEO . " OR (tipo=" . NOTIFICA_NEWS_DIPARTIMENTO . " AND id_tipo=$dip_id) OR (tipo=" . NOTIFICA_NEWS_CDS . " AND id_tipo=$cds_id) ORDER BY data_notifica DESC";
        //error_log($sql);

        $query = $db->prepare($sql);
        $query->execute();
        $query->bind_result($data, $titolo, $messaggio, $tipo, $chiave);
        $notifiche = array();
        while ($query->fetch()) {
            $notifiche[] = [
                'data' => $data,
                'titolo' => $titolo,
                'messaggio' => $messaggio,
                'tipo' => $tipo,
                'chiave' => $chiave
            ];
        }
        $connessione->Chiudi();

        return $notifiche;
    }


}
