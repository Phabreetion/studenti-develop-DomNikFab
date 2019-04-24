<?php
include_once '../it.unimol.app.archivio/ConnessioneDB.php';
include_once ('../it.unimol.app.servizi/ServizioLibretto.php');
include_once ('../it.unimol.app.servizi/ServizioAppelli.php');
include_once ('../it.unimol.app.servizi/ServizioNews.php');
include_once ('../it.unimol.app.studente/GestoreStudente.php');
include_once ('BufferNotifiche.php');

include_once("../it.unimol.app.servizi/GestoreSessioneEsse3.php");
include_once("../it.unimol.app.archivio/config_esse3.php");


//DEFINE TESTO NOTIFICHE
//define("API_KEY", "AAAAiq98k_8:APA91bHfdAwtKf-fIcVTTsMlBK_TLSIwV11TA0h4tNMqXHvoxcfnBC3eOgOHEYQ4SAfh5YB8JCcgA2Sxitt0lR8zPSZdQ4NniuH9NmvDDXJQmz8XLeYwD6uCYMvuL9UwaYxPeS2SrBy4");
// define("API_KEY", "AIzaSyD0sQIROxnh6J9eeyo1O31gNfRArc-nKIQ");
define("API_KEY", "AAAAiq98k_8:APA91bEZa5M68JII42FfJpePDiVBgXd4m22tF1zkHRZNQxEj4VV62tO_T-tBpP79vhN9O5wOKe8ddU6kIzUNjH_Gq6QsJr1Jz0Uw9KSUtfNnO6XENRGNTfDI4mWKLFjvCLomIEUVaRSP");
define("TITOLO_NOTIFICA", "APP UNIMOL");

define("TESTO_LIBRETTO", "Hai superato ");
define("TESTO_NEWS_DIPARTIMENTO", "Ci sono novita' per il Dipartimento!");
define("TESTO_NEWS_CDS", "Ci sono novita' per il C.D.S.!");
define("TESTO_NEWS_ATENEO", "Ci sono novita' per l'Ateneo!");
define("TESTO_APPELLI_DISPONIBILI", "E' possibile prenotare ");
define("TESTO_APPELLI_SCADENZA", "La finestra di prenotazione sta per scadere per ");

define("SERVIZIO_APPELLI", 1);
define("SERVIZIO_LIBRETTO", 4);
define("SERVIZIO_NEWS", 6);

define("NOTIFICA_NEWS_ATENEO", 1);
define("NOTIFICA_NEWS_DIPARTIMENTO", 2);
define("NOTIFICA_NEWS_CDS", 3);
define("NOTIFICA_APPELLO_DISPONIBILE", 4);
define("NOTIFICA_ESAME_REGISTRATO", 5);

class GestioneNotifiche {

    private $tokenStudente;
    private $tokenNotifiche;
    private $preferenzeStudente;
    private $bufferNotifiche;

    function __construct(string $tokenStudente) { //TODO ERRORE ISTANCE OF STRING, STRING GIVEN
        $this->tokenStudente = $tokenStudente;

        //INIZIALIZZA METODO DI INVIO NOTIFICHE
        $gs = new GestoreStudente($tokenStudente);
        $this->tokenNotifiche = $gs->getTokenNotifiche($tokenStudente);

        //PRENDE PREFERENZE
        $this->preferenzeStudente = $gs->getPreferenze();
        $this->preferenzeStudente = json_decode($this->preferenzeStudente, true);

        //INIZIALIZZA BUFFER
        $this->bufferNotifiche = BufferNotifiche::caricaIstanza();

    }


    public function notificaStudente(int $idServizio, $servizio) {



        switch ($idServizio) {
            case SERVIZIO_APPELLI:

                $status = $this->preferenzeStudente['esami']['appelli'];
                if ($this->preferenzeStudente == null)
                    $status = 1;

//                file_put_contents("php://stderr", print_r($this->preferenzeStudente, TRUE));
//                file_put_contents("php://stderr", "Status: $status");


                //CONTROLLO NOTIFICHE PER NUOVI APPELLI DISPONIBILI, IL TRUE NEL DECODE FA RESTITUIRE UN ARRAY ASSOCIATIVO
                //if($this->preferenzeStudente['preferenze']['esami']['appelli']){
                if($status){
                    //file_put_contents("php://stderr", "\nNotifica Abilitata per Appelli\n");
                    $daNotificare = json_decode(($servizio->get_appelli_prenotabili($this->tokenStudente)), true);

                    //FETCH ARRAY APPELLI DISPONIBILI
                    foreach($daNotificare as $arrayAppelliDisponibili){
                        //file_put_contents("php://stderr", "Appelli: " . count($daNotificare) . "\n");

                        //COSTRUZIONE NOTIFICA
                        $notifica = TESTO_APPELLI_DISPONIBILI . $arrayAppelliDisponibili['descrizione'];

                        //file_put_contents("php://stderr", $notifica);
                        if ($this->bufferNotifiche->sePresente($notifica) == false) {
                            //file_put_contents("php://stderr", $notifica);
                            $this->bufferNotifiche->aggiungi($notifica);
                            $this->invia('Appello Disponibile', $notifica);
                        }
                    }

                    $daNotificare = json_decode(($servizio->get_appelli_in_scadenza($this->tokenStudente)), true);

                    //FETCH ARRAY APPELLI IN SCADENZA
                    foreach($daNotificare as $arrayAppelliScadenza){

                        //COSTRUZIONE NOTIFICA
                        $notifica = TESTO_APPELLI_SCADENZA . $arrayAppelliScadenza['descrizione'];

                        if ($this->bufferNotifiche->sePresente($notifica) == false) {
                            $this->bufferNotifiche->aggiungi($notifica);
                            $this->invia('Appello in scadenza', $notifica);
                        }
                    }
                }

                break;

            case SERVIZIO_LIBRETTO:  //APPELLI VERBALIZZATI

                //file_put_contents("php://stderr", "\nnotificaStudente $idServizio - SERVIZIO_LIBRETTO");
                $status = $this->preferenzeStudente['esami']['verbalizzati'];
                if ($this->preferenzeStudente == null)
                    $status = 1;


                if($status){
                    //file_put_contents("php://stderr", "\nNotifica Abilitata per esami verbalizzati\n");
                    $daNotificare = json_decode(($servizio->get_esami_superati_oggi($this->tokenStudente)), true);

                    foreach($daNotificare as $arrayVerbalizzati){

                        //COSTRUZIONE NOTIFICA
                        $notifica = TESTO_LIBRETTO . $arrayVerbalizzati['descrizione'] . ' con la votazione di ' . $arrayVerbalizzati['voto'];

                        //CONTROLLO E INVIO NOTIFICA
                        if ($this->bufferNotifiche->sePresente($notifica) == false) {
                            $this->bufferNotifiche->aggiungi($notifica);
                            $this->invia('Nuova verbalizzazione', $notifica);
                        }
                    }
                }

                break;


            case SERVIZIO_NEWS: //DIPARTIMENTO, ATENEO E CDS OGGI

                //file_put_contents("php://stderr", "News: " . $this->preferenzeStudente);

                $status = 0;
                if ($this->preferenzeStudente == null)
                    $status = 1;

                if($status || $this->preferenzeStudente['news']['dipartimento']){
                    //file_put_contents("php://stderr", "\nNotifica Abilitata per News Dipartimento\n");
                    //CONTROLLA SE CI SONO NEWS DIPARTIMENTO, IL TRUE ABILITA QUELLE RIGUARDANTI IL GIORNO CORRENTE
                    $daNotificare = json_decode(($servizio->newsDipartimento($this->tokenStudente, true)), true);
                    //file_put_contents("php://stderr", $daNotificare['timestamp']);

                    if(!empty($daNotificare['news'])) {

                        foreach ($daNotificare as $elemento) {
                            if (is_array($elemento)) {
                                foreach ($elemento as $indice=>$valore) {
                                    //echo "$indice - " . $valore['titolo'] . "\n";

                                    $notifica = $valore['titolo'];
                                    $this->invia('News di Dipartimento', $notifica);

//                                    //CONTROLLO E INVIO NOTIFICA
//                                    if ($this->bufferNotifiche->sePresente($notifica) == false) {
//                                        $this->bufferNotifiche->aggiungi($notifica);
//                                        $this->invia($notifica);
//                                    }
                                }
                            }
                        }
                    }
                }

                if($status || $this->preferenzeStudente['news']['cds']){
                    //file_put_contents("php://stderr", "\nNotifica Abilitata per News CDS\n");
                    //CONTROLLA SE CI SONO NEWS, IL TRUE ABILITA QUELLE RIGUARDANTI IL GIORNO CORRENTE
                    $daNotificare = json_decode(($servizio->newsCDS(true)), true);

                    if(!empty($daNotificare['news'])) {

                        foreach ($daNotificare as $elemento) {
                            if (is_array($elemento)) {
                                foreach ($elemento as $indice=>$valore) {
                                    //echo "$indice - " . $valore['titolo'] . "\n";

                                    $notifica = $valore['titolo'];
                                    $this->invia('News del Corso', $notifica);

//                                    //CONTROLLO E INVIO NOTIFICA
//                                    if ($this->bufferNotifiche->sePresente($notifica) == false) {
//                                        $this->bufferNotifiche->aggiungi($notifica);
//                                        $this->invia($notifica);
//                                    }
                                }
                            }
                        }
                    }
                }

                if($status || $this->preferenzeStudente['news']['ateneo']){
                    //file_put_contents("php://stderr", "\nNotifica Abilitata per News Ateneo\n");
                    //CONTROLLA SE CI SONO NEWS, IL TRUE ABILITA QUELLE RIGUARDANTI IL GIORNO CORRENTE
                    $daNotificare = json_decode(($servizio->newsAteneo(true)), true);

                    if(!empty($daNotificare['news'])) {

                        foreach ($daNotificare as $elemento) {
                            if (is_array($elemento)) {
                                foreach ($elemento as $indice=>$valore) {
                                    //echo "$indice - " . $valore['titolo'] . "\n";

                                    $notifica = $valore['titolo'];
                                    $this->invia('News di Ateneo', $notifica);

//                                    //CONTROLLO E INVIO NOTIFICA
//                                    if ($this->bufferNotifiche->sePresente($notifica) == false) {
//                                        $this->bufferNotifiche->aggiungi($notifica);
//                                        $this->invia($notifica);
//                                    }
                                }
                            }
                        }
                    }
                }

                break;

            default:
                return 0;
            //SERVIZIO NON COLLEGATO ALLE NOTIFICHE, NON INVIA NULLA

        }
    }



    /*
     *  GESTORE TOKEN FIREBASE
     */


    function tokenNotifichePerMatricola($matricola) : array {
        $tokens = array();
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT TokenNotifiche FROM caratteristiche_studente WHERE Matricola_Studente=$matricola";
        $query = $db->prepare($sql);

        if ($query and $query->execute() and $query->bind_result($tokenNotifica)) {
            while ($query->fetch())
                $tokens[] = $tokenNotifica;
        } else {
            error_log("SQL ERROR: " . print_r($db->error, true));
        }

        $connessione->Chiudi();
        return $tokens;
    }


    public function creaGruppoNotifica() {

        $senderID = '595649663999';

        $targets = Array();
        $targets[] = 'eFVabNsCWTw:APA91bES_zdDD82GNwRL1Bx1w70fOm7Zmp1n2r8fEMzp767vdc3OjoElwvd5Abj7aDNL1VrbWCq0Gi2xEb3Xl-8kyR1uoAup8GE9QB029wW5gtB_350_l5u3dPOq69ulKbfF69xxcJ4o';
        $targets[] = '79dff28070121081b6509d8252f86184afdd44d04954064fd666e0b4da0c71db';

        $body = ['operation' => 'create', 'notification_key_name' => 'it.unimol.app.studenti', 'registration_ids' => $targets];


        $json = json_encode($body);

        //file_put_contents("php://stderr", print_r($json, true));

        //INIZIALIZZA FIRECLOUD SERVER
        $ch = curl_init("https://android.googleapis.com/gcm/notification");

        //HEADERS POST
        $headers = array();
        $headers[] = 'Content-Type: application/json';
        $headers[] = 'Authorization: key=' . API_KEY; // API KEY
        $headers[] = 'project_id:' . $senderID;
        //SET CURL, INSERIMENTO HEADER E JSON NOTIFICA
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        //INVIA POST
        $response = curl_exec($ch);

        //file_put_contents("php://stderr", print_r($response, true));

        //CHIUDI RICHIESTA
        curl_close($ch);

    }

    public function rimuoviGruppoNotifica() {

        $senderID = '595649663999';

        $targets = Array();
        $targets[] = 'eFVabNsCWTw:APA91bES_zdDD82GNwRL1Bx1w70fOm7Zmp1n2r8fEMzp767vdc3OjoElwvd5Abj7aDNL1VrbWCq0Gi2xEb3Xl-8kyR1uoAup8GE9QB029wW5gtB_350_l5u3dPOq69ulKbfF69xxcJ4o';
        $targets[] = '79dff28070121081b6509d8252f86184afdd44d04954064fd666e0b4da0c71db';

        $body = ['operation' => 'remove', 'notification_key_name' => 'it.unimol.app.studenti', 'notification_key' => 'APA91bEXGaJULMBACtH0bxdYz3dRVuaRy26Fv07_uR5tD0yxu2ENj-ifNKR51P8EU7dA3iSt3ih6hMmqfSdpPE23Orq0RT8uqWVczQSeGtol4qB_VUyWiFLYQC5mBWIDxDUNkkuqp-pb', 'registration_ids' => $targets];


        $json = json_encode($body);

        //file_put_contents("php://stderr", print_r($json, true));

        //INIZIALIZZA FIRECLOUD SERVER
        $ch = curl_init("https://android.googleapis.com/gcm/notification");

        //HEADERS POST
        $headers = array();
        $headers[] = 'Content-Type: application/json';
        $headers[] = 'Authorization: key=' . API_KEY; // API KEY
        $headers[] = 'project_id:' . $senderID;
        //SET CURL, INSERIMENTO HEADER E JSON NOTIFICA
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        //INVIA POST
        $response = curl_exec($ch);

        //file_put_contents("php://stderr", print_r($response, true));

        //CHIUDI RICHIESTA
        curl_close($ch);

    }


    /*
     *  NOTIFICHE NEWS
     */
    public function creaNotificheNews($tipo, $id_tipo, $link, $titolo) {
        $servizio = new ServizioNews();
        $news = $servizio->getNews($link);

        if (is_array($news)) {
            foreach ($news as $indice=>$valore) {
                $messaggio = $valore['titolo'];
                $descrizione = $valore['descrizione'];
                $contentuo = $valore['contenuto'];
                $dataNotifica = date("Y-m-d H:i:s", strtotime($valore['data']));
                $chiave = $valore['link'];

                if ( !$this->cercaNotifica($tipo, $id_tipo, $chiave) ) {
                    //error_log(print_r($valore, true));

                    $this->salvaNotifica('', $tipo, $id_tipo, $dataNotifica, $titolo, $messaggio, $descrizione, $contentuo, $chiave, 0);
                }
            }
        }
    }


    /*
     *   INVIO NOTIFICHE
     */

    public function inviaNotifica($id, $matricola, $titolo, $messaggio) {
        //TOKEN DISPOSITIVO
        //$token = $this->tokenNotifiche;
        //$token = 'c9Nda39st5k:APA91bFW8Lb99K8MIrON-8cAoU61eWuAuonU62DPvZFE7ZvHrLZ0nd4j1hEilxlnIzStdeWuO_3x5tND3ZOf9UJJvV9HERcTIZQsmUG9RfXIIA9EYAD03I5DgHbW7RGS9kH6IjWqwH73';

        // Escludiamo l'utente di test
        if ($matricola == '123456')
            return;

        //TIOLO DELLA NOTIFICA
        $title = utf8_encode($titolo);

        //CORPO DELLA NOTIFICA
        $body = utf8_encode($messaggio);

        //CREA ARRAY NOTIFICA
        $notification = array('title' => $title, 'text' => $body, 'sound' => 'default', 'badge' => '0');

        $tokens = $this->tokenNotifichePerMatricola($matricola);
        foreach ($tokens as $token) {

            if (strcmp($token,'token non specificato') != 0) {

//                echo "\nInvio a $token \n$titolo \n$messaggio";
//                continue;

                //ARRAY DA POSTARE, TO = TOKEN DEL DISPOSITIVO.
                $arrayToSend = array('to' => $token, 'notification' => $notification, 'data' => $notification, 'priority' => 'high');

                //TRASFORMA ARRAY IN JSON
                $json = json_encode($arrayToSend);


                //INIZIALIZZA FIRECLOUD SERVER
                $ch = curl_init("https://fcm.googleapis.com/fcm/send");

                //HEADERS POST
                $headers = array();
                $headers[] = 'Content-Type: application/json';
                $headers[] = 'Authorization: key=' . API_KEY; // API KEY
                //SET CURL, INSERIMENTO HEADER E JSON NOTIFICA
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
                curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
                curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

                //INVIA POST
                $response = curl_exec($ch);

                //CHIUDI RICHIESTA
                curl_close($ch);
                //echo $response;
            }
        }
        $this->salvaStatoNotifica($id, 1);
    }


    public function inviaPerArgomento($id, $topic, $titolo, $notifica) {

        //echo "\nInvio a $topic - $titolo - $notifica\n";
//        return;

        // $notifica = utf8_encode($notifica);

        //CREA ARRAY NOTIFICA
        $notification = array('title' => $titolo, 'text' => $notifica, 'body' => $notifica, 'sound' => 'default', 'badge' => '0', 'click_action' => 'FCM_PLUGIN_ACTIVITY', 'icon' => 'fcm_push_icon');
        $arrayToSend = array('to' => '/topics/'.$topic, 'notification' => $notification, 'data' => $notification, 'priority' => 'high');

        //echo print_r($arrayToSend, true);
        $json = json_encode($arrayToSend);

        //INIZIALIZZA FIRECLOUD SERVER
        $ch = curl_init("https://fcm.googleapis.com/fcm/send");

        //HEADERS POST
        $headers = array();
        $headers[] = 'Content-Type: application/json';
        $headers[] = 'Authorization: key=' . API_KEY;
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        //INVIA POST
        curl_exec($ch);

        //CHIUDI RICHIESTA
        curl_close($ch);

        if ($id != -1)
            $this->salvaStatoNotifica($id, 1);
    }



    /*
     *  GESTIONE DATABASE NOTIFICHE
     */

    private function salvaNotifica(string $matricola, int $tipo, int $id_tipo, string $data, string $titolo, string $messaggio, string $descrizione, string $contenuto, string $chiave, int $stato) : bool{
        $esito = false;
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $titolo = $db->real_escape_string($titolo);
        $messaggio = $db->real_escape_string($messaggio);
        $descrizione = $db->real_escape_string($descrizione);
        $contenuto = $db->real_escape_string($contenuto);

        $query = "INSERT INTO notifiche (matricola, tipo, id_tipo, data_notifica, titolo, messaggio, descrizione, contenuto, chiave, stato) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stm = $db->prepare($query);

        // if ($stm && $stm->bind_param('siissssi', $matricola, $tipo, $id_tipo, $data, utf8_encode($titolo), utf8_encode($messaggio), $chiave, $stato)) {

        if ($stm && $stm->bind_param('siissssssi', $matricola, $tipo, $id_tipo, $data, $titolo, $messaggio, $descrizione, $contenuto, $chiave, $stato)) {
            $stm->execute();
            $stm->close();
            $esito = $db->errno == 0;
        } else {
            error_log("SQL ERROR: " . print_r($db->error, true));
            $esito = false;
        }

        $connessione->Chiudi();
        return $esito;
    }

    private function salvaStatoNotifica(int $id, int $stato) : bool{
        $esito = false;
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $query = "UPDATE notifiche set stato=? WHERE id=?";
        $stm = $db->prepare($query);

        if ($stm && $stm->bind_param('ii', $stato, $id)) {
            $stm->execute();
            $stm->close();
            $esito = $db->errno == 0;
        } else {
            error_log("SQL ERROR: " . print_r($db->error, true));
            $esito = false;
        }

        $connessione->Chiudi();
        return $esito;
    }

    public function cercaNotifica(int $tipo, int $id_tipo, string $chiave): bool {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();

        $chiave = preg_replace("(^https?://)", "", $chiave );

        $sql = "SELECT id FROM notifiche WHERE tipo = $tipo AND id_tipo = $id_tipo AND chiave LIKE '%$chiave'";

        $result = $db->query($sql)->num_rows;

        //echo $result;

        $connessione->Chiudi();

        return $result!=0;
    }


    function notificheDaInviare() : array {
        $notifiche = array();
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT id, matricola, data_notifica, titolo, messaggio, tipo, id_tipo, chiave  FROM notifiche WHERE stato=0 ORDER BY data_notifica DESC";
        $query = $db->prepare($sql);

        if ($query and $query->execute() and $query->bind_result($id, $matricola, $data, $titolo, $messaggio, $tipo, $id_tipo, $chiave)) {
            while ($query->fetch()) {
                $notifiche[] = [
                    'id' => $id,
                    'matricola' => $matricola,
                    'data' => $data,
                    'titolo' => utf8_decode($titolo),
                    'messaggio' => utf8_decode($messaggio),
                    'tipo' => $tipo,
                    'id_tipo' => $id_tipo,
                    'chiave' => $chiave
                ];
            }
        } else {
            error_log("SQL ERROR: " . print_r($db->error, true));
        }

        $connessione->Chiudi();
        return $notifiche;
    }


    /*
     *  NOTIFICA ESAMI REGISTRARE
     */

    public function creaNotificheEsamiVerbalizzati() {
        $ultimoVerbale = $this->prendiUltimoVerbale(); // prendi max da db

        $titolo = 'Verbalizzazione esame';
        $verbali = $this->esamiVerbalizzatiDaNotificare($ultimoVerbale);

        if (is_array($verbali) && count($verbali) > 0) {
            foreach ($verbali as $verbale) {
                $voto = $verbale['voto'];
                if ($voto >=18 && $voto <=30)
                    $stringVoto = ''.$voto;
                else if ($voto == 31)
                    $stringVoto = '30 e lode';
                else
                    $stringVoto = null; // Idoneo / superato? Nel dubbio non lo specifichiamo nella notifica

                if ($stringVoto != null)
                    $messaggio = $verbale['descrizione'] . " è stato verbalizzato con il voto " . $stringVoto;
                else
                    $messaggio = $verbale['descrizione'] . " è stato verbalizzato";

                $dataNotifica = $this->convertiData($verbale['data']);
                $chiave = $verbale['verbale'];
                if ( !$this->cercaNotifica(NOTIFICA_ESAME_REGISTRATO, 0, $chiave) ) {
                    $this->salvaNotifica($verbale['matricola'], NOTIFICA_ESAME_REGISTRATO, 0, $dataNotifica, $titolo, utf8_encode($messaggio), '', '', $chiave, 0);
                }
            }
        }
    }

    function esamiVerbalizzatiDaNotificare($ultimoVerbale) : array {
        $verbali = array();

        $SYS_ConnOracle = oci_new_connect(USER_ESSE3, PASS_ESSE3, DB_ESSE3, 'AL32UTF8');

        //disabilita wsdl cache
        ini_set('soap.wsdl_cache_enabled', 0);

        // Esclude vot insufficiente (994)
        $sql = "SELECT VERB_NUM, MAT, DATA_ESA, AD_COD, AD_STU, VOTO" .
            " FROM P11_VERBALI " .
            " WHERE VERB_NUM > '$ultimoVerbale' AND voto > 17 and voto != 994 and STATO = 4" .
            " ORDER BY VERB_NUM DESC";

        //echo "\n$sql\n";

        $stmt = oci_parse($SYS_ConnOracle, $sql);
        if ($stmt) {
            oci_execute($stmt, OCI_DEFAULT);

            while ($r = oci_fetch_assoc($stmt)) {
                $verbali[] = [
                    'verbale' => $r['VERB_NUM'],
                    'data' => $r['DATA_ESA'],
                    'matricola' => $r['MAT'],
                    'descrizione' => $r['AD_STU'],
                    'voto' => $r['VOTO']
                ];
            }

            oci_free_statement($stmt);
        }

        oci_close($SYS_ConnOracle);

        return $verbali;
    }

    private function prendiUltimoVerbale() : string {
        $esito = false;
        $ultimoVerbale = '';
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "SELECT max(chiave) as chiave FROM notifiche WHERE tipo=".NOTIFICA_ESAME_REGISTRATO;
        $query = $db->prepare($sql);

        if ($query and $query->execute() and $query->bind_result($chiave) and $query->fetch()) {
            if ($chiave != null) {
                $ultimoVerbale = $chiave;
                $query->close();
                $esito = true;
            }
        } else {
            error_log("SQL ERROR: " . print_r($db->error, true));
        }
        $connessione->Chiudi();
        if (!$esito) {
            $ultimoVerbale = '00048513 0001 2'; // 20/11/2017
            echo "Default value $ultimoVerbale";
        }

        return $ultimoVerbale;
    }

    public function convertiData($stringDate) : string {
        $giorno = intval(substr($stringDate, 0, 2));

        $anno = intval(substr($stringDate, 7, 2));
        if ($anno <=99 && $anno >= 60)
            $anno = 1900 + $anno;
        else
            $anno = 2000 + $anno;
        $mese = 0;
        $strMese = substr($stringDate, 3, 3);
        switch ($strMese) {
            case 'GEN': $mese = 1; break;
            case 'FEB': $mese = 2; break;
            case 'MAR': $mese = 3; break;
            case 'APR': $mese = 4; break;
            case 'MAG': $mese = 5; break;
            case 'GIU': $mese = 6; break;
            case 'LUG': $mese = 7; break;
            case 'AGO': $mese = 8; break;
            case 'SET': $mese = 9; break;
            case 'OTT': $mese = 10; break;
            case 'NOV': $mese = 11; break;
            case 'DIC': $mese = 12; break;
        }
        return date("Y-m-d H:i:s", mktime(0, 0, 0, $mese, $giorno, $anno));
    }

    public function pulisciNotifiche() {
        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $sql = "call pulisci_notifiche()";
        $query = $db->prepare($sql);
        $query->execute();
        $connessione->Chiudi();
    }

    public function pulisciNotifiche2() {

        $pezzotto = "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'â€‹”', '”');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'â€œ', '“');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'â€', '”');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'â€™', '’');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'â€˜', '‘');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'â€”', '–');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'â€“', '—');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'â€œ', '“');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'â€¢', '-');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'Ã', 'à');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'à¬', 'ì');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'Ã¬', 'ì');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'Ã­', 'í');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'Ã²', 'ò');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'Ã³', 'ó');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'Ã¹', 'ù');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'Ãº', 'ú');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'Ã©', 'é');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'à¨', 'è');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'Â°', '°');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'Ã¬', 'ì');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'â‚¬', '€');".
                    "UPDATE notifiche SET messaggio = REPLACE( messaggio, 'â€¦','...');".
                    
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'â€‹”', '”');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'â€œ', '“');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'â€', '”');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'â€™', '’');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'â€˜', '‘');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'â€”', '–');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'â€“', '—');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'â€œ', '“');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'â€¢', '-');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'Ã', 'à');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'à¬', 'ì');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'Ã¬', 'ì');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'Ã­', 'í');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'Ã²', 'ò');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'Ã³', 'ó');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'Ã¹', 'ù');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'Ãº', 'ú');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'Ã©', 'é');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'à¨', 'è');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'Â°', '°');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'Ã¬', 'ì');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'â‚¬', '€');".
                    "UPDATE notifiche SET descrizione = REPLACE( descrizione, 'â€¦','...');".
                    
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'â€‹”', '”');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'â€œ', '“');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'â€', '”');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'â€™', '’');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'â€˜', '‘');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'â€”', '–');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'â€“', '—');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'â€œ', '“');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'â€¢', '-');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'Ã', 'à');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'à¬', 'ì');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'Ã­', 'í');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'Ã²', 'ò');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'Ã³', 'ó');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'Ã¹', 'ù');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'Ãº', 'ú');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'Ã©', 'é');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'à¨', 'è');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'Â°', '°');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'Ã¬', 'ì');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'â‚¬', '€');".
                    "UPDATE notifiche SET contenuto = REPLACE( contenuto, 'â€¦','...');";

      //  error_log( $pezzotto );

        $connessione = new ConnessioneDb();
        $db = $connessione->Apri();
        $db->multi_query($pezzotto);

       // error_log( print_r($db, true) );

        $connessione->Chiudi();
    }
}
