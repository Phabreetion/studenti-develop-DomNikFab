<?php

/**
 * Created by PhpStorm.
 * User: Matteo Omicini
 * Date: 15/05/17
 * Time: 23:17
 */
include_once('GestoreJSON.php');
include_once('Sincronizzatore.php');
include_once '../it.unimol.app.archivio/ConnessioneDB.php';
include_once '../it.unimol.app.servizi/ServizioAppelli.php';
include_once '../it.unimol.app.servizi/ServizioAppelliPrenotati.php';
include_once '../it.unimol.app.servizi/ServizioCarriera.php';
include_once '../it.unimol.app.servizi/ServizioCreditiaScelta.php';
include_once '../it.unimol.app.servizi/ServizioEsamiNonSostenuti.php';
include_once '../it.unimol.app.servizi/ServizioLibretto.php';
include_once '../it.unimol.app.servizi/ServizioMediePreviste.php';
include_once '../it.unimol.app.servizi/ServizioListaDipartimentiCorsi.php';
include_once '../it.unimol.app.servizi/ServizioRubrica.php';
include_once '../it.unimol.app.servizi/VisualizzaQuestionari.php';
include_once '../it.unimol.app.servizi/ServizioNotifiche.php';


class SincronizzatoreSpecializzato extends Sincronizzatore {
    private static $sincronizzatore = null;
    private $query_token = "SELECT idToken FROM caratteristiche_studente";
    private $continuaSincronizzazione = true;
    //costruttore
    //l'array di servizi passati nel costruttore DEVE PARTIRE DA 1
    //poiche l'id dei servizi partono da 1
    //es: array (1 => new Servizio(), new Servizio2);

    public function __construct() {
        parent::__construct();
     /*   $this->setServizio(array(
            1 => new ServizioAppelli(), //OK
            2 => new ServizioEsamiNonSostenuti(), //OK
            3 => new ServizioEsamiNonSostenuti(), //OK
            4 => new ServizioLibretto(), // OK
            5 => new ServizioMediePreviste(), //OK
            6 => new ServizioListaDipartimentiCorsi(), //OK
            7 => new ServizioRubrica(), //OK
            8 => new VisualizzaQuestionari(), //OK
            9 => new ServizioCarriera(), //OK
            10 => new ServizioAppelliPrenotati())); //Ok
*/
        $this->setServizio(array(
            APPELLI => new ServizioAppelli(), //OK
            LIBRETTO => new ServizioLibretto(),//OK
            3 => new ServizioNews())); //OK
            //4 => new ServizioLibretto(), // OK
            //5 => new ServizioMediePreviste(), //OK
            //6 => new VisualizzaQuestionari(), //OK
            //7 => new ServizioAppelliPrenotati()));
            //7 => new ServizioCarriera(), //OK
            //8 => new ServizioAppelliPrenotati())); //Ok

        $this->continuaSincronizzazione = true;
        $this->setGestoreJson(new GestoreJSON());
    }

    public static function caricaIstanza() {
        if (self::$sincronizzatore == null) {
            $c = __CLASS__;
            self::$sincronizzatore = new $c;
        }
        return self::$sincronizzatore;
    }

    //sincronizza tutti gli studenti
    public function sincronizzaTutti() {
        $tokens = $this->getTokens();
        $n = 0;
        while ($this->continuaSincronizzazione) {
            $tokens_count = count($tokens);
            for ($i = 0; $i < $tokens_count; $i++) {
                try {
         	        //print_r("Sto sincronizzando ".$tokens[$i]);
                    $this->sincronizza($tokens[$i]);

                    echo "$i/$tokens_count\n";
                    //echo "Sincronizzato $tokens[$i] <br>\n";
                    //print_r(". Sincronizzato! ");
                } catch (Exception $e) {;}
            }
            //if(++$n == 2){
             exit(0);
            //}
            sleep(600); //aspetta 10 minuti
        }
    }

    //prende i token di tutti gli studenti ordinati per Numero di accessi

    public function getTokens() {

        $dbconn = new ConnessioneDb();
        $connessione_database = $dbconn->Apri();
        $query = mysqli_prepare($connessione_database, $this->query_token);
        $query->execute();
        $risultati = $query->get_result();

        while ($row = mysqli_fetch_row($risultati)) {
            $arrayToken[] = $row[0];
        }

        $arrayToken_ordinato = $this->ordinaToken($arrayToken);
        $dbconn->Chiudi();
        return $arrayToken_ordinato;
    }

    //dato il token recupera il numero di accessi

    private function getAccessi($token): int {
        $gestione = new GestoreStudente($token);
        return $gestione->getNumeroAccessi();
    }

    //algoritmo di ordinamento dei tokens

    private function ordinaToken($array) {
        $alto = count($array);
        while ($alto > 1) {
            for ($i = 0; $i < $alto - 1; $i++) {
                if ($this->getAccessi($array[$i]) < $this->getAccessi($array[$i + 1])) {/* ">" ordinamento crescente. "<" ordinamento decrescente */
                    $tmp = $array[$i];
                    $array[$i] = $array[$i + 1];
                    $array[$i + 1] = $tmp;
                }
                $alto--;
            }
            return $array;
        }
    }

    public function stopSincronizzazione(){
        $this->continuaSincronizzazione = false;
    }
}
