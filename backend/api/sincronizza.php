<?php

include_once '../it.unimol.app.sincronizzatore/SincronizzatoreGenerale.php';
include_once '../it.unimol.app.sincronizzatore/Utils.php';
include_once '../it.unimol.app.studente/GestoreStudente.php';



//PARAMETRI PER POST DA IONIC, GLI ACCESS CONTROL HEADERS VENGONO RICEVUTI DOPO LA REQUEST OPTIONS
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

$req = json_decode(file_get_contents('php://input'), true);

ini_set('max_execution_time', 60); //60 seconds

$token = $req['token'];
$uuid = $req['uuid'];
$idServizio = $req['id_servizio'];

if (isset($token) && isset($idServizio)) {
     if (Utils::tokenValido($token,$uuid)) {

         $sincronizzatore = new SincronizzatoreGenerale();
         // error_log("Syncing $idServizio for $token ");
         $json = $sincronizzatore->sincronizza($token, $idServizio);

         if ($json != null) {
             // aggiorniamo la data ultimo accesso sull'anagrafica
             $gs = new GestoreStudente($token);
             $gs->aggiornaDataUltimoAccesso(time());
             // headers to tell that result is JSON
             header('Content-type: application/json');
             http_response_code(200);
             echo $json;
         } else {
             //  error_log("json is null - $jsons[0]");
             header('Content-type: application/json; charset="utf-8"');
             http_response_code(500);
             echo json_encode(array("codice" => -1, "msg" => "Impossibile raggiungere il server di Esse3. Riprova più tardi", "eccezione" => "JSON nullo"));
         }
     } else {

         header('Content-type: application/json');
         http_response_code(401);

         echo json_encode(array("codice" => -2, "msg" => "Token non valido"));
     }
} else {
    http_response_code(400);
    echo "Bad request. Parametri non validi";
    Utils::errorLogInsert(__FILE__, $token, "errore parametri");
}
