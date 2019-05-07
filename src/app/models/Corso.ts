export class Corso{
    /**
     *Anno accademico in cui è stato svolto il corso
    */
    public AA_OFF_ID: number;
    /**
     * ID settore accademico
     */
    public ADSCE_ID: number;
    /**
     * Non ne ho la benche minima idea, serve per passare a materiale didattico
     */
    public AD_ID: number;
    /**
     * ANNO del corso
     */
    public ANNO: number;
    /**
     * CFU del corso
     */
    public CFU: number;
    /**
     * Codice corso
     */
    public CODICE: number;
    /**
     * Il cognome nel JSON si riferisce al nome completo del docente titolare del corso
     */
    public COGNOME: string;
    /**
     * Data esame in forma contratta 22-FEB-18
     */
    public DATA_ESAME: string;
    /**
     * Data esame estesa 22/02/2018
     */
    public DATA_ESTESA: string;
    /**
     * Descrizione corso
    */
    public DESCRIZIONE: string;
    /**
     * Docenti appartenenti al corso
     */
    public DOCENTI: string;
    /**
     * GIUDIZIO riguarda gli esami in cui non si ha una valutazione in trentesimi ma ad esempio un idonietà
    */
    public GIUDIZIO: number;
    /**
     * Lode inerente all'esame svolto
     */
    public LODE: number;
    /**
     * NOME nel JSON riguarda un secondo docente appartenente al corso (ES. 2 moduli di un esame e 2 docenti differenti)
    */
    public NOME: string;
    /**
     * Parametro che indica se un esame fa o meno media
     */
    public NO_MEDIA: number;
    /**
     * Scelta corso
    */
    public SCELTA: number;
    /**
     *
     */
    public SORGENTE: number;
    /**
     *
    */
    public SOTTOSCRITTO: number;
    /**
     *
     */
    public SOVRANNUMERARIA: number;
    /**
     * Stato del corso
    */
    public STATO: string;
    /**
     * Valutazione del corso
     */
    public VALUTAZIONE: string;
    /**
     * Voto esame
     */
    public VOTO: number;

    constructor(AA_OFF_ID?: number, ADSCE_ID?: number, ANNO?: number, CFU?: number, CODICE?: number, COGNOME?: string, DESCRIZIONE?: string, DOCENTI?: string, LODE?: number, NO_MEDIA?: number, SCELTA?: number, SORGENTE?: number, SOTTOSCRITTO?: number, SOVRANNUMERARIA?: number, STATO?: string, VALUTAZIONE?: string, VOTO?: number, DATA_ESAME?: string, DATA_ESTESA?: string, GIUDIZIO?: number, NOME?: string) {
        this.AA_OFF_ID = AA_OFF_ID;
        this.ADSCE_ID = ADSCE_ID;
        this.ANNO = ANNO;
        this.CFU = CFU;
        this.CODICE = CODICE;
        this.COGNOME = COGNOME;
        this.DATA_ESAME = DATA_ESAME;
        this.DATA_ESTESA = DATA_ESTESA;
        this.DESCRIZIONE = DESCRIZIONE;
        this.DOCENTI = DOCENTI;
        this.GIUDIZIO = GIUDIZIO;
        this.LODE = LODE;
        this.NOME = NOME;
        this.NO_MEDIA = NO_MEDIA;
        this.SCELTA = SCELTA;
        this.SORGENTE = SORGENTE;
        this.SOTTOSCRITTO = SOTTOSCRITTO;
        this.SOVRANNUMERARIA = SOVRANNUMERARIA;
        this.STATO = STATO;
        this.VALUTAZIONE = VALUTAZIONE;
        this.VOTO = VOTO;
    }

    public static toObj(j: Object): Corso {
        return Object.assign(new Corso(), j);
    }
}
