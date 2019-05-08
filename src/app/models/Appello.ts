export class Appello {


    public NOME: string; // nome appello

    public DATA: string; // data in cui si svolge l'appello

    public ORARIO: string; // ora dell'appello

    public TIPOLOGIA: string; // scritto/orale

    public CODICE_ESAME: number; // codice esame

    public ISCRITTI_APPELLO: number; // iscritti all'appello


    constructor(NOME?: string, DATA?: string, ORARIO?: string, TIPOLOGIA?: string, CODICE_ESAME?: number, ISCRITTI_APPELLO?: number) {
        this.NOME = NOME;
        this.DATA = DATA;
        this.ORARIO = ORARIO;
        this.TIPOLOGIA = TIPOLOGIA;
        this.CODICE_ESAME = CODICE_ESAME;
        this.ISCRITTI_APPELLO = ISCRITTI_APPELLO;
    }
}
