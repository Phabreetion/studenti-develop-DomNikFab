<?php
class BufferNotifiche {

    private static $bufferNotificheClass = null;
    private $buffer;
    private $dataBuffer;
    private $ultimaModifica;

    private function __construct() {
        $this->buffer = array();
    }

    public static function caricaIstanza() {  //pattern singleton, costante php predefinita __CLASS__ si riferisce alla classe dell'oggetto in questione, funziona con tutte le classi
        if (self::$bufferNotificheClass == null) {
            $c = __CLASS__;
            self::$bufferNotificheClass = new $c;
        }
        return self::$bufferNotificheClass;
    }

    public function aggiungi(string $notifica) {  
            $this->bufferReset();   //TODO TESTARE SE IL BUFFER SI RESETTA CORRETTAMENTE
            array_push($this->buffer, md5($notifica));
            $this->ultimaModifica = time();
    }

    public function sePresente(string $notifica) : bool {
        if(in_array(md5($notifica), $this->buffer)) {
            return true;
        } else {
            return false;
        }
    }

    private function bufferReset() {
        if($this->ultimaModifica > ($this->dataBuffer + (24 * 3600))) {  //24 ORE * SECONDI IN UN'ORA
            
            $this->buffer = array();  //TODO TESTARE SE ARRAY VECCHIO VIENE ELIMINATO
            $this->dataBuffer = time();
        }
    }
}
