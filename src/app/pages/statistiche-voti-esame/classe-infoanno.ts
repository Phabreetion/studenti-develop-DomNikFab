/**
 * Classe relativa alle statistiche di un esame per singolo anno.
 */

export class InfoAnno {
    numEsamiSuperati: number;
    media: number;
    occorrenzeVoti:  Array<number>;

    //ovvero dopo quanti anni dalla frequentazione del corso
    //è stato passato l'esame
    puntualitaSup: Array<number>;
    sommaVoti: number;


    constructor() {
        this.numEsamiSuperati = 0;
        this.sommaVoti = 0;
        this.puntualitaSup = [];
        this.occorrenzeVoti = [];

        for (let i = 0; i < 31 - 17; i++) {
            this.occorrenzeVoti.push(0);
        }
        for (let i = 0; i < 4; i++) {
            this.puntualitaSup.push(0);
        }
    }
}
