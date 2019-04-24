<?php

include_once '../it.unimol.app.studente/GestoreStudente.php';

class GestoreJSON {

    public function __construct() {
        
    }

    public function prendiJson($id, $tokenStudente) {
        //error_log("Prendo json $id");
        $conn = new ConnessioneDb();
        $db = $conn->Apri();

        $query = "SELECT File_JSON FROM (json JOIN studente_has_json ON Id_Json = Json_Id_Json) JOIN caratteristiche_studente ON Studente_Matricola = Matricola_Studente WHERE Id_Servizio = ? AND IdToken = ?";

        $stm = $db->prepare($query);
        $stm->bind_param("is", $id, $tokenStudente);

        if ($stm->execute()) {
            $File_Json = NULL;
            $stm->bind_result($File_Json);
            $stm->fetch();
            $stm->close();
            $conn->Chiudi();

            if ($File_Json != NULL) {
                $decode = base64_decode($File_Json);
                return $decode;
            } else {
                return null;
            }
        }
    }

    public function salvaJson($id, $tokenStudente, $Json) {
        //error_log("Salvo json per $id");
        $conn = new ConnessioneDb();
        $db = $conn->Apri();

//        foreach ((array) $Json as $key => $value) {
//            $json_base64 = base64_encode($value);
//            //error_log("BASE64 = $json_base64");
//        }
//        $risultato = json_encode($json_base64, JSON_FORCE_OBJECT);

        foreach ((array) $Json as $key => $value) {
            $this->Json[$key] = base64_encode($value);
        }
        $risultato = json_encode($this->Json);

        if ($this->jsonPresente($id, $tokenStudente)) {

            $query = "UPDATE (json JOIN studente_has_json ON Id_Json = Json_Id_Json) JOIN caratteristiche_studente ON Studente_Matricola = Matricola_Studente SET File_JSON = ? WHERE Id_Servizio = ? AND IdToken = ?";
            $stm = $db->prepare($query);
            $stm->bind_param('sis', $risultato, $id, $tokenStudente);
            if ($stm->execute()) {
                $stm->close();
                $conn->Chiudi();
                return TRUE;
            }
            $stm->close();
            $conn->Chiudi();
        } else {
            $query = "INSERT INTO json ( Id_Servizio, File_JSON) VALUES ( ?, ?)";

            $stm = $db->prepare($query);
            $stm->bind_param('is', $id, $risultato);

            if ($stm->execute()) {
                $idJson = mysqli_insert_id($db);
                $gestoreStudente = new GestoreStudente($tokenStudente);
                $matricola = $gestoreStudente->getMatricola();
                $query = "INSERT INTO studente_has_json (Studente_Matricola, Json_Id_Json) VALUES (?, ?)";
                $stm = $db->prepare($query);
                $stm->bind_param('si', $matricola, $idJson);

                if ($stm->execute()) {
                    $stm->close();
                    $conn->Chiudi();
                    return TRUE;
                }   
            }
        }

        return false;        
    }

    public function jsonPresente($id, $tokenStudente) {
        $conn = new ConnessioneDb();
        $db = $conn->Apri();
        $query = "SELECT File_JSON FROM (json JOIN studente_has_json ON Id_Json = Json_Id_Json) JOIN caratteristiche_studente ON Studente_Matricola = Matricola_Studente WHERE Id_Servizio = ? AND IdToken = ?";

        $stm = $db->prepare($query);

        if ($stm &&
            $stm->bind_param("is", $id, $tokenStudente) &&
            $stm->execute()) {
                $stm->bind_result($File_Json);
                $stm->fetch();
                $stm->close();

                if ($File_Json != NULL) {
                    $conn->Chiudi();
                    return TRUE;
                } else {
                    $conn->Chiudi();
                    return FALSE;
                }
            } else {
            error_log(__FILE__ . " (jsonPresente) - SQL ERROR: " . print_r($db->error, true));
        }
    }

}

//Le stampe sono di prova

$Gest_json = new GestoreJSON();