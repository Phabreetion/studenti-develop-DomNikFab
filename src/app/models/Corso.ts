export class Corso {

    /**
     * Anno accademico in cui è stato svolto il corso.
     */
    public AA_OFF_ID: number;


    /**
     * ID settore accademico
     */
    public ADSCE_ID: number;


    /**
     * Identificativo dell'attività didattiva. A volte potrebbe essere null.
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
     * Data corso in forma contratta 22-FEB-18
     */
    public DATA_ESAME: string;


    /**
     * Data corso estesa 22/02/2018
     */
    public DATA_ESTESA: string;


    /**
     * Data della verbalizzazione del'esame
     */
    public DATA_VERBALE: string;


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
     * Lode inerente all'corso svolto
     */
    public LODE: number;


    /**
     * NOME nel JSON riguarda un secondo docente appartenente al corso (ES. 2 moduli di un corso e 2 docenti differenti)
    */
    public NOME: string;


    /**
     * Parametro che indica se un corso fa o meno media
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
     * Voto corso
     */
    public VOTO: number;

    /**
     * Eventuali propedeuticità
     */
    public PREREQUISITI: string;

    /**
     * Contenuti del corso, descrizione del contenuto dei singoli CFU del corso
     */
    public CONTENUTI: string;

    /**
     * Testi consigliati per il corso
     */
    public TESTI: string;

    /**
     * Obiettivi formativi del corso
     */
    public OBIETTIVI_FORMATIVI: string;

    /**
     * Questa funzione permette di effettuare la conversione da oggetto generico ad un istenza della classe Corso.
     *
     * @param obj: L'oggetto generico da convertire in istanza della classe Corso
     */
    static toObj(obj: Object): Corso {
        return Object.assign(new Corso(), obj);
    }

    /**
     * @param AA_OFF_ID
     * @param ADSCE_ID
     * @param AD_ID
     * @param ANNO
     * @param CFU
     * @param CODICE
     * @param COGNOME
     * @param DESCRIZIONE
     * @param DOCENTI
     * @param LODE
     * @param NO_MEDIA
     * @param SCELTA
     * @param SORGENTE
     * @param SOTTOSCRITTO
     * @param SOVRANNUMERARIA
     * @param STATO
     * @param VALUTAZIONE
     * @param VOTO
     * @param DATA_ESAME
     * @param DATA_ESTESA
     * @param DATA_VERBALE
     * @param GIUDIZIO
     * @param NOME
     * @param CONTENUTI
     * @param TESTI
     * @param OBIETTIVI_FORMATIVI
     */
    constructor(AA_OFF_ID?: number, ADSCE_ID?: number, AD_ID?: number, ANNO?: number, CFU?: number, CODICE?: number, COGNOME?: string, CONTENUTI?: string, DESCRIZIONE?: string, DOCENTI?: string, LODE?: number, NO_MEDIA?: number, SCELTA?: number, SORGENTE?: number, SOTTOSCRITTO?: number, SOVRANNUMERARIA?: number, STATO?: string, VALUTAZIONE?: string, VOTO?: number, DATA_ESAME?: string, DATA_ESTESA?: string,  DATA_VERBALE?: string, GIUDIZIO?: number, NOME?: string, TESTI?: string, OBIETTIVI_FORMATIVI?:string) {
        this.AA_OFF_ID = AA_OFF_ID;
        this.ADSCE_ID = ADSCE_ID;
        this.AD_ID = AD_ID;
        this.ANNO = ANNO;
        this.CFU = CFU;
        this.CODICE = CODICE;
        this.COGNOME = COGNOME;
        this.CONTENUTI = CONTENUTI;
        this.DATA_ESAME = DATA_ESAME;
        this.DATA_ESTESA = DATA_ESTESA;
        this.DATA_VERBALE = DATA_VERBALE;
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
        this.TESTI = TESTI;
        this.VALUTAZIONE = VALUTAZIONE;
        this.VOTO = VOTO;
        this.OBIETTIVI_FORMATIVI = OBIETTIVI_FORMATIVI;
    }

    public getFormatedContenutiCorso() {
        let contenutiFormatted = this.CONTENUTI;
        contenutiFormatted = contenutiFormatted.replace(/\\r\\n|\\r|\\n/g, '<br>');
        return contenutiFormatted;
    }
    public pippo(): string {
        if (this.CONTENUTI) {
            return this.CONTENUTI.replace(/\\r\\n|\\r|\\n/g, '<br>');
        } else {
            return '';
        }
    }



    public isSuperato(): boolean {
        return this.STATO === 'S';
    }
}
