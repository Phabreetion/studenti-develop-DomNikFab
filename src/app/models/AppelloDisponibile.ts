import {Appello} from './Appello';


export class AppelloDisponibile extends Appello  {
    // @TODO


    public DATA_INIT: string; // data da cui è possibile prenotare l'appello

    public DATA_FINISH: string; // data entro cui è possibile prenotare l'appello


    constructor(NOME?: string, DATA?: string, ORARIO?: string, TIPOLOGIA?: string, CODICE_ESAME?: number, ISCRITTI_APPELLO?: number, DATA_INIT?: string, DATA_FINISH?: string) {
        super(NOME, DATA, ORARIO, TIPOLOGIA, CODICE_ESAME, ISCRITTI_APPELLO);
        this.DATA_INIT = DATA_INIT;
        this.DATA_FINISH = DATA_FINISH;
    }
}
