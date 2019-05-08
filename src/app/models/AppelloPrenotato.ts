import {Appello} from './Appello';

export class AppelloPrenotato extends Appello  {

    public DESCRIZIONE: string; // descrizione dell'appello

    public DOCENTE: string; // docente che sostiene l'esame


    constructor(NOME?: string, DATA?: string, ORARIO?: string, TIPOLOGIA?: string, CODICE_ESAME?: number, ISCRITTI_APPELLO?: number, DESCRIZIONE?: string, DOCENTE?: string) {
        super(NOME, DATA, ORARIO, TIPOLOGIA, CODICE_ESAME, ISCRITTI_APPELLO);
        this.DESCRIZIONE = DESCRIZIONE;
        this.DOCENTE = DOCENTE;
    }
}
