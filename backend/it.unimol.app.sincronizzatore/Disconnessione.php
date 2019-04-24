<?php

/**
 * Description of Disconnessione
 *
 * @author Stefano Dalla Palma
 */
include_once 'Utils.php';
include_once '../it.unimol.app.archivio/ConnessioneDB.php';
include_once '../it.unimol.app.studente/GestoreStudente.php';

class Disconnessione {

    private static $disconnettore = null;

    private function __construct() {

    }

    public static function disconnetti($token) {
        if (self::$disconnettore == null) {
            $c = __CLASS__;
            self::$disconnettore = new $c;      //istanzio la variabile se è null
        }
        $disconnettore = self::$disconnettore;


        if (!Utils::tokenEsiste($token)) {
            return false;
        }

        $gestoreStudente = new GestoreStudente($token);
        $matricola = $gestoreStudente->getMatricola();
        $eliminato = $disconnettore->eliminaToken($token);
        if ($disconnettore->numeroTokensMatricola($matricola) == 0)
            $disconnettore->eliminaStudente($matricola);

        return $eliminato;
    }

    private function eliminaToken($token) {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "DELETE FROM caratteristiche_studente WHERE IdToken = ?";
        $query = $db->prepare($sql);
        $query->bind_param('s', $token);
        $esito = false;
        if ($query->execute()) {
            $esito = true;
        }
        $query->Close();
        $connessione->Chiudi();
        return $esito;
    }

    private function numeroTokensMatricola($matricola) {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();

        $sql = "SELECT count(*) FROM caratteristiche_studente WHERE Matricola_Studente = ?";
        $query = $db->prepare($sql);
        $query->bind_param('s', $matricola);
        $esito = 0;

        if ($query && $query->execute() && $query->bind_result($nrDevice) && $query->fetch()) {
            $esito = $nrDevice;
        } else {
            error_log("SQL fail in numeroTokensMatricola: " . print_r($db, true));
        }

        $query->Close();
        $connessione->Chiudi();
        return $esito;
    }


    private function eliminaStudente($matricola) {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "DELETE FROM studente_has_json WHERE Studente_Matricola = ?";
        $query = $db->prepare($sql);
        if ($query &&
            $query->bind_param('s', $matricola) &&
            $query->execute()){
            $esito = true;
        } else {
            error_log("STUDENTE NON VALIDO: " . print_r($db, true));
            $esito = false;
        }


        $sql = "DELETE FROM studente WHERE Matricola = ?";
        $query = $db->prepare($sql);
        if ($esito &&
            $query &&
            $query->bind_param('s', $matricola) &&
            $query->execute()){
            $esito = true;
        } else {
            error_log("STUDENTE NON VALIDO: " . print_r($db, true));
            $esito = false;
        }

        $query->Close();
        $connessione->Chiudi();
        return $esito;
    }




    private function eliminaStudentiSenzaToken() {
        // IMPLENATARE??
        $cleanSQL =
            "delete from studente_has_json where Studente_Matricola in (
            select Matricola FROM (
            SELECT studente.Matricola, (SELECT count(*) as tokens FROM caratteristiche_studente WHERE Matricola_Studente = Matricola) as tokens 
            FROM studente
            having tokens=0) as s );
            
            delete from studente where Matricola in (
            select Matricola FROM (
            SELECT studente.Matricola, (SELECT count(*) as tokens FROM caratteristiche_studente WHERE Matricola_Studente = Matricola) as tokens 
            FROM studente
            having tokens=0) as s )";
        }
}
