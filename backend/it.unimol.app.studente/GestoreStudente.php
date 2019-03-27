<?php

include_once '../it.unimol.app.archivio/ConnessioneDB.php';

if (!defined('VALORE_NON_TROVATO'))
    define('VALORE_NON_TROVATO', -1);

/**
 * Description of GestoreStudente
 *
 * @author Martina Fantini
 * @author Michele Guerra
 * @author Piera Elena La Rocca
 */
class GestoreStudente {

    private $tokenStudente;

    public function __construct(string $token) {
        $this->tokenStudente = $token;
    }

    public function getCfuTotali(): string {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT CFU FROM caratteristiche_studente WHERE IdToken = ?";
        $query = $db->prepare($sql);
        $query->bind_param('s', $this->tokenStudente);
        $query->execute();

        //Estrae risultato
        $cfu = null;
        $query->bind_result($cfu);
        $query->fetch();
        $query->Close();
        $connessione->Chiudi();

        return ($cfu == null) ? 0 : $cfu;
    }


    public function getCoorte(): string {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT AA_ISCR_ID FROM caratteristiche_studente WHERE IdToken = ?";
        $query = $db->prepare($sql);
        $query->bind_param('s', $this->tokenStudente);
        $query->execute();

        //Estrae risultato
        $coorte = null;
        $query->bind_result($coorte);
        $query->fetch();
        $query->Close();
        $connessione->Chiudi();

        return ($coorte == null) ? false : $coorte;
    }

    public function getCognome(): string {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT Cognome FROM studente JOIN caratteristiche_studente ON Matricola = Matricola_Studente WHERE IdToken = ?";
        $query = $db->prepare($sql);
        $query->bind_param('s', $this->tokenStudente);
        $query->execute();

        //Estrae risultato
        $cognome = null;
        $query->bind_result($cognome);
        $query->fetch();
        $query->Close();
        $connessione->Chiudi();

        return ($cognome == null) ? false : $cognome;
    }

    public function getCorsoDiStudi(): string {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT Nome_CorsodiStudi FROM caratteristiche_studente WHERE IdToken = ?";
        $query = $db->prepare($sql);
        $query->bind_param('s', $this->tokenStudente);
        $query->execute();

        //Estrae risultato
        $corsodistudi = null;
        $query->bind_result($corsodistudi);
        $query->fetch();
        $query->Close();
        $connessione->Chiudi();

        return ($corsodistudi == null) ? false : $corsodistudi;
    }

    public function getDataUltimoAccesso(): int {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        //$sql = "SELECT Data_accesso FROM studente JOIN caratteristiche_studente ON Matricola = Matricola_Studente WHERE IdToken = ?";
        $sql = "SELECT data_ultimo_accesso FROM caratteristiche_studente WHERE IdToken = ?";
        $query = $db->prepare($sql);
        $query->bind_param('s', $this->tokenStudente);
        $query->execute();

        //Estrae risultato
        $dataAccesso = null;
        $query->bind_result($dataAccesso);
        $query->fetch();
        $query->Close();
        $connessione->Chiudi();
        return ($dataAccesso == null) ? 0 : $dataAccesso;
    }

    public function aggiornaDataUltimoAccesso($data) {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        //$sql = 'UPDATE studente JOIN caratteristiche_studente ON Matricola = Matricola_Studente SET Data_accesso = ? WHERE IdToken= ?';
        $sql = 'UPDATE caratteristiche_studente SET data_ultimo_accesso = ?, data_ultimo_accesso_date = FROM_UNIXTIME(?) WHERE IdToken= ?';
        //file_put_contents('php://stderr', "--- SQL ---: $sql\n");
        $pst = $db->prepare($sql);
        $pst->bind_param('iis', $data, $data, $this->tokenStudente);
        $pst->execute();
        if ($pst->execute()) {
            $connessione->Chiudi();
            return true;
        } else {
            $connessione->Chiudi();
            return false;
        }
    }



    public function getStudente(): array {

        $result = array();

        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT matricola, device.mat_id, device.stud_id, device.aa_ord_id, username, nome, cognome, device.cds_id, device.nome_corsodistudi, device.dip_id, device.nome_dipartimento, email, device.sid 
                FROM studente JOIN caratteristiche_studente device ON studente.matricola = device.matricola_studente WHERE idtoken = ?";
        $pst = $db->prepare($sql);
       if ($pst &&
            $pst->bind_param('s', $this->tokenStudente) &&
            $pst->bind_result($matricola, $mat_id, $stud_id, $aa_ord_id, $username, $nome, $cognome,
                $cds_id, $corso_di_studi, $dip_id, $dipartimento, $email, $sid) &&
            $pst->execute() ) {
            if ($pst->fetch()) {
                $result = array('matricola' => $matricola, 'mat_id' => $mat_id,
                    'stud_id' => $stud_id, 'aa_ord_id' => $mat_id, 'username' => $username,
                    'nome' => $nome, 'cognome' => $cognome,
                    'cds_id' => $cds_id, 'cds_nome' => $dipartimento,
                    'dip_id' => $dip_id, 'dip_nome' => $corso_di_studi,
                    'email' => $email, 'sid' => $sid);
            } else {
                error_log("Studente non trovato con query $sql");
            }
        } else {
            error_log("SQL ERROR: " . print_r($db->error, true));
        }

        $connessione->Chiudi();
        return $result;
    }

    public function getStudenteRegistrato($token, $matricola): array {

        $result = array();

        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT matricola, device.mat_id, device.stud_id, device.aa_ord_id, username, nome, cognome, device.cds_id, device.nome_corsodistudi, device.dip_id, device.nome_dipartimento, email, device.sid 
                FROM studente JOIN caratteristiche_studente device ON studente.matricola = device.matricola_studente WHERE idtoken='$token' AND matricola='$matricola'";
        $pst = $db->prepare($sql);

        //error_log("Token: $token -  Matricola: $matricola");

        if ($pst &&
            //$pst->bind_param('ss', $this->tokenStudente, $this->getMatricola()) &&
            $pst->bind_result($matricola, $mat_id, $stud_id, $aa_ord_id, $username, $nome, $cognome,
                $cds_id, $corso_di_studi, $dip_id, $dipartimento, $email, $sid) &&
            $pst->execute() ) {
            if ($pst->fetch()) {
                $result = array('matricola' => $matricola, 'mat_id' => $mat_id,
                    'stud_id' => $stud_id, 'aa_ord_id' => $mat_id, 'username' => $username,
                    'nome' => $nome, 'cognome' => $cognome,
                    'cds_id' => $cds_id, 'cds_nome' => $dipartimento,
                    'dip_id' => $dip_id, 'dip_nome' => $corso_di_studi,
                    'email' => $email, 'sid' => $sid);
            } else {
                error_log("Studente non trovato con query $sql");
            }
        } else {
            error_log("SQL ERROR: " . print_r($db->error, true));
        }

        $connessione->Chiudi();
        return $result;
    }
    /*
     *  DIPARTIMENTO
     */

    /**
     * @deprecated
     */
    public function inserisciDipartimento(string $dipartimento) {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = 'UPDATE caratteristiche_studente SET Nome_Dipartimento = ? WHERE IdToken= ?';
        $pst = $db->prepare($sql);
        $pst->bind_param('ss', $dipartimento, $this->tokenStudente);
        if ($pst->execute()) {
            $connessione->Chiudi();
            return true;
        } else {
            $connessione->Chiudi();
            return false;
        }
    }

    /**
     * @deprecated
     */
    public function getDipartimentoOLD(): string {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT Nome_Dipartimento FROM caratteristiche_studente WHERE IdToken = ?";
        $query = $db->prepare($sql);
        $query->bind_param('s', $this->tokenStudente);
        $query->execute();

        //Estrae risultato
        $dipartimento = null;
        $query->bind_result($dipartimento);
        $query->fetch();
        $query->Close();
        $connessione->Chiudi();
        return ($dipartimento == null) ? "NON DEFINITO" : $dipartimento;
    }

    public function getIdDipartimento(): int {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT DIP_ID FROM caratteristiche_studente WHERE IdToken = ?";
        $query = $db->prepare($sql);
        $query->bind_param('s', $this->tokenStudente);
        $query->execute();

        //Estrae risultato
        $dip_id = null;
        $query->bind_result($dip_id);
        $query->fetch();
        $query->Close();
        $connessione->Chiudi();

        // Vecchio utente. Aggiorniamo l'anagrafica con l'indicazione dell'ID del Dipartimento ed la nuova descrizione
        if ($dip_id == null) {
            $dati = $this->aggiornaDatiDipartimento();
            if (is_array($dati) && count($dati) > 0)
                $dip_id = $dati['dip_id'];
        }

        return ($dip_id == null) ? 0 : $dip_id;
    }


    public function getDipartimento(): string {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT DIP_ID, Nome_Dipartimento FROM caratteristiche_studente WHERE IdToken = ?";
        $query = $db->prepare($sql);
        $query->bind_param('s', $this->tokenStudente);
        $query->execute();

        //Estrae risultato
        $dip_id = null;
        $dipartimento = null;
        $query->bind_result($dip_id, $dipartimento);
        $query->fetch();
        $query->Close();
        $connessione->Chiudi();

        // Vecchio utente. Aggiorniamo l'anagrafica con l'indicazione dell'ID del Dipartimento ed la nuova descrizione
        if ($dip_id == null) {
            $dati = $this->aggiornaDatiDipartimento();
            if (is_array($dati) && count($dati) > 0)
                $dipartimento = $dati['descrizione'];
        }

        return ($dipartimento == null) ? "NON DEFINITO" : $dipartimento;
    }

    public function aggiornaDatiDipartimento(): array {
        $result = array();
        $anagrafiche = Anagrafiche::caricaIstanza();
        $dati = $anagrafiche->getDipartimentoDaIdCorso($this->getCdsId($this->tokenStudente));

        if (is_array($dati) && count($dati) > 0) {
            $dip_id = intval($dati['dip_id']);
            $descrizione = $dati['descrizione'];

            $connessione = new ConnessioneDb();
            $db = $connessione->Apri();
            $sql = "UPDATE caratteristiche_studente SET DIP_ID = ?, Nome_Dipartimento = ? WHERE IdToken=?;";
            $pst = $db->prepare($sql);
            $pst->bind_param('iss', $dip_id, $descrizione, $this->tokenStudente);
            if ($pst->execute() && $pst->affected_rows>0) {
                echo "OK";
            } else {
                echo "NOT OK";
            }

            $connessione->Chiudi();
            $result = array('dip_id' => $dip_id, 'descrizione' => $descrizione);
        }
        return $result;
    }



    public function getEmail(): string {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT Email FROM studente JOIN caratteristiche_studente ON Matricola = Matricola_Studente WHERE IdToken = ?";
        $query = $db->prepare($sql);
        $query->bind_param('s', $this->tokenStudente);
        $query->execute();

        //Estrae risultato
        $email = null;
        $query->bind_result($email);
        $query->fetch();
        $query->Close();
        $connessione->Chiudi();
        return ($email == null) ? false : $email;
    }

    /**
     * @deprecated @use getCdsId()
     */
    public function getIdCorsodiStudi() {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sqlSelectIdCorsodiStudi = "SELECT Id_Corso_di_Studi FROM caratteristiche_studente Car_stud JOIN corso_di_studi AS CdS ON S.Nome_CorsodiStudi = CdS.Nome_CorsodiStudi WHERE IdToken = ?";
        $query = $db->prepare($sqlSelectIdCorsodiStudi);
        $query->bind_param('s', $this->tokenStudente);
        $query->execute();

        //Estrae risultato
        $idcorsodistudi = null;
        $query->bind_result($idcorsodistudi);
        $query->fetch();
        $query->Close();
        $connessione->Chiudi();
        return ($idcorsodistudi == null) ? false : $idcorsodistudi;
    }

    public function getCdsId() {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT CDS_ID FROM caratteristiche_studente WHERE IdToken = ?";
        $query = $db->prepare($sql);
        $query->bind_param('s', $this->tokenStudente);
        $query->execute();

        //Estrae risultato
        $cds_id = null;
        $query->bind_result($cds_id);
        $query->fetch();
        $query->Close();
        $connessione->Chiudi();

        return ($cds_id == null) ? 0 : $cds_id;
    }

    public function getMatricola(): string {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT Matricola_Studente FROM caratteristiche_studente WHERE IdToken = ?";
        $query = $db->prepare($sql);
        $query->bind_param('s', $this->tokenStudente);
        $query->execute();

        //Estrae risultato
        $matricola = null;
        $query->bind_result($matricola);
        $query->fetch();
        $query->Close();
        $connessione->Chiudi();
        return ($matricola == null) ? false : $matricola;
    }

    public function getNome(): string {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT Nome FROM studente JOIN caratteristiche_studente ON Matricola = Matricola_Studente WHERE IdToken = ?";
        $query = $db->prepare($sql);
        $query->bind_param('s', $this->tokenStudente);
        $query->execute();

        //Estrae risultato
        $nome = null;
        $query->bind_result($nome);
        $query->fetch();
        $query->Close();
        $connessione->Chiudi();
        return ($nome == null) ? false : $nome;
    }

    public function getNumeroAccessi(): int {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT Num_accessi FROM studente JOIN caratteristiche_studente ON Matricola = Matricola_Studente WHERE IdToken = ?";
        $query = $db->prepare($sql);
        $query->bind_param('s', $this->tokenStudente);
        $query->execute();

        //Estrae risultato
        $numeriAccessi = 0;
        $query->bind_result($numeriAccessi);
        $query->fetch();
        $query->Close();
        $connessione->Chiudi();
        return ($numeriAccessi == null) ? false : $numeriAccessi;
    }

    public function getPreferenze() {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sqlSelectPreferenze = "SELECT Preferenze FROM caratteristiche_studente WHERE IdToken = ?";
        $query = $db->prepare($sqlSelectPreferenze);
        $query->bind_param('s', $this->tokenStudente);
        $query->execute();

        //Estrae risultato
        $preferenze = null;
        $query->bind_result($preferenze);
        $query->fetch();
        $query->Close();
        $connessione->Chiudi();
        return ($preferenze == null) ? false : base64_decode($preferenze);
    }

    public function getTokenNotifiche(): string { //TODO: CONTROLLARE VALORE DI RITORNO
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();

        $sqlTokenNotifiche = 'SELECT tokenNotifiche FROM caratteristiche_studente WHERE IdToken = ?';
        $qTokenNotifiche = $db->prepare($sqlTokenNotifiche);
        $qTokenNotifiche->bind_param('s', $this->tokenStudente);
        $qTokenNotifiche->execute();

        //estrae risultato
        $tokenNotifiche = null;
        $qTokenNotifiche->bind_result($tokenNotifiche);   //$tokenNotifiche è il risultato della query
        $qTokenNotifiche->fetch();
        $qTokenNotifiche->Close();   //chiude statement e connessione
        $connessione->Chiudi();

        return ($tokenNotifiche == null) ? false : $tokenNotifiche;
    }

    public function aggiornaDeviceInfo($appVersion, $cordovaVersion, $model, $platform, $osVersion, $manufacturer, $isVirtual, $uuid) {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();

        $tokenStudente = $this->tokenStudente;

        $sql =
            "UPDATE caratteristiche_studente " .
            "SET appVersion = '$appVersion', " .
            "   cordovaVersion = '$cordovaVersion', " .
            "   model = '$model', " .
            "   platform = '$platform', " .
            "   osVersion = '$osVersion', " .
            "   manufacturer = '$manufacturer', " .
            "   isVirtual = '$isVirtual', " .
            "   uuid = '$uuid' " .
            "WHERE IdToken = '$tokenStudente'";

        $this->query = mysqli_query($db, $sql);

        if ($db->error) {
            return false;
        }

        $connessione->Chiudi();
        return true;
    }

    public function controllaMessaggi(): string { //TODO: CONTROLLARE VALORE DI RITORNO

        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();

        $sql = 'SELECT messaggio FROM caratteristiche_studente WHERE IdToken = ?';
        $qMessaggio = $db->prepare($sql);
        $qMessaggio->bind_param('s', $this->tokenStudente);
        $qMessaggio->execute();

        //estrae risultato
        $messaggio = null;
        $qMessaggio->bind_result($messaggio);   //$messaggio è il risultato della query
        $qMessaggio->fetch();
        $qMessaggio->Close();   //chiude statement e connessione
        $connessione->Chiudi();

        if ($messaggio == null)
            $messaggio = "";

        return $messaggio;
    }

    public function reimpostaMessaggi() { //TODO: CONTROLLARE VALORE DI RITORNO
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $tokenStudente = $this->tokenStudente;

        $sql =
            "UPDATE caratteristiche_studente " .
            "SET messaggio = 'NULL' " .
            "WHERE IdToken = '$tokenStudente'";

        $this->query = mysqli_query($db, $sql);

        if ($db->error) {
            return false;
        }

        $connessione->Chiudi();
        return true;
    }

    public function aggiornaTokenNotifiche($tokenNotifiche) {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();

        $tokenStudente = $this->tokenStudente;
        // file_put_contents('php://stderr', "token: $this->tokenStudente\n");
        // file_put_contents('php://stderr', "tokenNotifiche: $tokenNotifiche\n");


        $this->query = mysqli_query($db, "UPDATE caratteristiche_studente SET tokenNotifiche = '$tokenNotifiche' WHERE IdToken = '$tokenStudente'");
        if ($db->error) {
            return false;
        }

        // Rimuoviamo eventuali token duplicati per il medesimo dispositivo
        if (($tokenNotifiche != null) AND ($tokenNotifiche != '') AND ($tokenNotifiche != 'token non specificato'))
            $this->query = mysqli_query($db, "DELETE FROM caratteristiche_studente WHERE tokenNotifiche='$tokenNotifiche' AND IdToken <> '$tokenStudente'");

        $connessione->Chiudi();
        return true;
    }

    public function incrementaNumeroAccessi() {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $this->query = mysqli_query($db, "UPDATE studente JOIN caratteristiche_studente ON Matricola = Matricola_Studente SET Num_accessi =(Num_accessi + 1) WHERE IdToken = '$this->tokenStudente'");
        if ($db->error) {
            return false;
        }
        $connessione->Chiudi();
    }

    public function inserisciCoorte(string $coorte) {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = 'UPDATE caratteristiche_studente SET AA_ISCR_ID = ? WHERE IdToken= ?';
        $pst = $db->prepare($sql);
        $pst->bind_param('ss', $coorte, $this->tokenStudente);
        if ($pst->execute()) {
            $connessione->Chiudi();
            return true;
        } else {
            $connessione->Chiudi();
            return false;
        }
    }

    public function inserisciCorsoDiStudi(string $corso) {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = 'UPDATE caratteristiche_studente SET Nome_CorsodiStudi = ? WHERE IdToken= ?';
        $pst = $db->prepare($sql);
        $pst->bind_param('ss', $corso, $this->tokenStudente);
        if ($pst->execute()) {
            $connessione->Chiudi();
            return true;
        } else {
            $connessione->Chiudi();
            return false;
        }
    }



    public function inserisciPreferenze($Json) {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();

        foreach ((array) $Json as $key => $value) {
            $this->Json[$key] = base64_encode($value);
        }

        $risultato = json_encode($this->Json);

        $sql = 'UPDATE caratteristiche_studente SET Preferenze = ? WHERE IdToken = ?';
        $pst = $db->prepare($sql);
        $pst->bind_param('ss', $risultato, $this->tokenStudente);
        if ($pst->execute()) {
            $connessione->Chiudi();
            return true;
        } else {
            $connessione->Chiudi();
            return false;
        }
    }

    public function sottoscriviCorso(string $matricola, string $corso, bool $stato): bool {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = '';
        if ($stato)
            $sql = "INSERT INTO studente_segue_corso (matricola, codice_corso) VALUES (?, ?)";
        else
            $sql = "DELETE FROM studente_segue_corso WHERE matricola=? AND codice_corso=?";

        $pst = $db->prepare($sql);
        $pst->bind_param('ss', $matricola,$corso);

        if ($pst->execute()) {
            $connessione->Chiudi();
            return true;
        } else {
            $connessione->Chiudi();
            return false;
        }
    }

    public function haSottoscrittoCorso(string $matricola, string $corso): int {
        $result = 0;
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT count(*) FROM studente_segue_corso WHERE matricola=? AND codice_corso=?";

        //error_log("Mat: " . $matricola . " COD: " . $corso);

        $pst = $db->prepare($sql);

        if ($pst &&
            $pst->bind_param('ss', $matricola,$corso) &&
            $pst->bind_result($result) &&
            $pst->execute()  &&
            $pst->fetch()) {
            //OK
        } else {
            error_log("SQL ERROR: " . print_r($db->error, true));
        }

        $pst->Close();
        $connessione->Chiudi();
        return $result;

    }

    public function corsiSottoscritti($matricola): array {
        $corsi = array();
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT codice_corso FROM studente_segue_corso WHERE matricola=?";
        $pst = $db->prepare($sql);
        $pst->bind_param('s', $matricola);

        if ($pst &&
            $pst->execute() &&
            $pst->bind_result($corso)){
            while ($pst->fetch()) {
                $corsi[] = $corso;
            }
        } else {
            error_log("SQL ERROR: " . print_r($db->error, true));
        }

        $connessione->Chiudi();
        return $corsi;
    }

}
