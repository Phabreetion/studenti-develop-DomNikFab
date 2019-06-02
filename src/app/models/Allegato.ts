export class Allegato {

    /**
     * Non ne ho la benchè minima idea, serve per passare a materiale didattico
     */
    public AD_ID: number;
    /**
     * ID dell'allegato o file.
     */
    public ALLEGATO_ID: number;
    /**
     * Identifica l'autore dell'allegato.
     */
    public AUTORE: string;
    /**
     * -
     */
    public CLS_ID: number;
    /**
     * -
     */
    public COMUNITA_ID: number;
    /**
     * Data di inserimento del file.
     */
    public DATA_INS: string;
    /**
     * Estensione del file.
     */
    public ESTENSIONE: string;
    /**
     * Nome del file.
     */
    public FILENAME: string;
    /**
     * Descrizione del file.
     */
    public TESTO: string;
    /**
     * Titolo del file.
     */
    public TITOLO: string;

    public SCARICATO: boolean;


    constructor( AD_ID?: number, ALLEGATO_ID?: number, AUTORE?: string, CLS_ID?: number, COMUNITA_ID?: number, DATA_INS?: string, ESTENSIONE?: string, FILENAME?: string, TESTO?: string, TITOLO?: string) {
        this.AD_ID = AD_ID ;
        this.ALLEGATO_ID = ALLEGATO_ID;
        this.AUTORE = AUTORE;
        this.CLS_ID = CLS_ID;
        this.COMUNITA_ID = COMUNITA_ID;
        this.DATA_INS = DATA_INS;
        this.ESTENSIONE = ESTENSIONE;
        this.FILENAME = FILENAME;
        this.TESTO = TESTO;
        this.TITOLO = TITOLO;
    }

    public static toObj(obj: Object): Allegato {
        return Object.assign(new Allegato(), obj);
    }
}
