<?php

/**
 * Description of Utils
 *
 * @author Stefano Dalla Palma
 */
include_once '../it.unimol.app.archivio/ConnessioneDB.php';

class Utils {

    public static function tokenEsiste($token) {
        if ($token == null) {
            return false;
        }
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT IdToken FROM caratteristiche_studente WHERE IdToken = ?";
        $query = $db->prepare($sql);
        $query->bind_param('s', $token);
        $query->execute();

        //Estrae risultato
        $risultato = "";
        $query->bind_result($risultato);
        $query->fetch();
        $query->Close();
        $connessione->Chiudi();
        if ($risultato != "") {
            return true;
        } else {
            return false;
        }
    }

    // Restituisce -1 se il token non è presente, 0 se è scaduto e l'ultimo timestamp se è valido
    public static function tokenValido($token, $uuid) {
        if ($token == null) {
            return false;
        }
        $limite = 1 * 60 * 15; // 15 minuti

        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT data_ultimo_accesso FROM caratteristiche_studente WHERE IdToken = ? AND (uuid IS NULL OR uuid = ?)";
        $query = $db->prepare($sql);
        $query->bind_param('ss', $token, $uuid);
        $query->execute();

        //Estrae risultato
        $risultato = 0;
        $query->bind_result($risultato);
        $query->fetch();
        $query->Close();
        $connessione->Chiudi();
        if ($risultato != 0) {
            $tempo =  time() - $risultato;
//            error_log("Tempo trascorso: " . $tempo);
//            error_log("Tempo ultimo: " . $risultato);
//            error_log("Tempo limite: " . $limite);
            if ($tempo < $limite)
                return $risultato;
            else
                return 0;
        } else {
            return -1;
        }
    }

    public static function errorLogInsert( $file, $token, $message) {
        $t = time();
        $d = date('d/m/Y H:i:s');
        $ip = Utils::get_client_ip();

        if (is_array($message) && isset($message['errore']))
            $message = message['errore'];

        file_put_contents('/home/service/studenti-unimol.err', "$d; $t ; $ip; $file, $token ; $message \r\n", FILE_APPEND);
        return true;
    }


    public static function logInsert( $file, $token, $message) {
        $t = time();
        $d = date('d/m/Y H:i:s');
        $ip = Utils::get_client_ip();


        file_put_contents('/home/service/studenti-unimol.log', "$d; $t ; $ip; $file, $token ; $message \r\n", FILE_APPEND);

/*        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();

        $sql =
            "INSERT INTO log " .
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
*/
        return true;
    }

    public static function get_client_ip() {
        $ipaddress = '';
        if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_X_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        else if(isset($_SERVER['REMOTE_ADDR']))
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }
}
