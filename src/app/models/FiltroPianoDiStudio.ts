import {Corso} from './Corso';

const ORDINAMENTO_ANNO = 0;
const ORDINAMENTO_ALFABETICO = 2;
const ORDINAMENTO_CFU = 4;
const ORDINAMENTO_VOTO = 6;

const CRESCENTE = 0;
const DECRESCENTE = 1;

const FILTRO_ESAME_SOSTENUTO = 1;
const FILTRO_PER_NON_SOSTENUTO = 2;

const DISATTIVO = 0;

export class FiltroPianoDiStudio {
    //serve per avere il massimo degli anni
    maxAnni: number;

    //filtri
    filtroPerTipologia: number;
    filtroPerAnno: number; //0 non attivo -> altrimenti gli altri

    //ordinamento
    idOrdinamento: number;
    tipoOrdinamento: number; //0 crescente --- 1 decrescente


    constructor() {
        //default value
        this.reset();
    }


    static toObj(obj: Object): FiltroPianoDiStudio {
        return Object.assign(new FiltroPianoDiStudio(), obj);
    }

    isActive(): boolean {
        return this.filtroPerTipologia > DISATTIVO ||  this.filtroPerAnno > DISATTIVO;
    }

    setMaxAnni(maxAnni: number) {
        this.maxAnni = maxAnni;
    }

    getIterableAnni(): any[] {
        const arr = [];

        for (let i = 0; i < this.maxAnni; i++) {
            arr.push(i + 1);
        }

        return arr;
    }

    reset() {
        this.idOrdinamento = 0;
        this.tipoOrdinamento = 0;

        this.filtroPerAnno = DISATTIVO;
        this.filtroPerTipologia = DISATTIVO;
    }

    ordina(corsi: Corso[]): Corso[] {

        switch (this.idOrdinamento + this.tipoOrdinamento) {

            case ORDINAMENTO_ANNO + CRESCENTE:
                corsi.sort(
                    (one, two) => {
                        //conforonta l'anno dei corsi per decidere quale viene prima
                        if (one.ANNO - two.ANNO !== 0) {
                            return one.ANNO - two.ANNO;
                        }


                        //nel caso di coris con stesso anno, ordino per alfabetico
                        if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                            return 1;
                        }
                        if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                            return -1;
                        }

                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_ANNO + DECRESCENTE:
                corsi.sort(
                    (one, two) => {
                        //conforonta l'anno dei corsi per decidere quale viene prima
                        if (two.ANNO - one.ANNO !== 0) {
                            return two.ANNO - one.ANNO;
                        }


                        //nel caso di corsi con stesso anno, ordino per alfabetico
                        if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                            return 1;
                        }
                        if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                            return -1;
                        }

                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_ALFABETICO + CRESCENTE:
                corsi.sort(
                    (one, two) => {
                        //conforonta la descrizione dei corsi per decidere quale viene prima
                        if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                            return 1;
                        }
                        if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                            return -1;
                        }

                        //se i nomi sono uguali(molto improbabile) non si gestisce la situazione
                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_ALFABETICO + DECRESCENTE:
                corsi.sort(
                    (one, two) => {
                        //conforonta la descrizione dei corsi per decidere quale viene prima
                        if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                            return 1;
                        }
                        if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                            return -1;
                        }

                        //se i nomi sono uguali(molto improbabile) non si gestisce la situazione
                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_CFU + CRESCENTE:
                corsi.sort(
                    (one, two) => {
                        //conforonta i CFU dei corsi per decidere quale viene prima
                        if (one.CFU - two.CFU !== 0) {
                            return one.CFU - two.CFU;
                        }


                        //nel caso di corsi con stessi CFU, ordino per alfabetico
                        if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                            return 1;
                        }
                        if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                            return -1;
                        }

                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_CFU + DECRESCENTE:
                corsi.sort(
                    (one, two) => {
                        //conforonta i CFU dei corsi per decidere quale viene prima
                        if (two.CFU - one.CFU !== 0) {
                            return two.CFU - one.CFU;
                        }


                        //nel caso di corsi con stessi CFU, ordino per alfabetico
                        if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                            return 1;
                        }
                        if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                            return -1;
                        }

                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_VOTO + CRESCENTE:
                corsi.sort((one, two) => {
                    //conforonta i corsi superati con quelli superati
                    if (!one.isSuperato() && two.isSuperato()) {
                        return -1;
                    }
                    if (one.isSuperato() && !two.isSuperato()) {
                        return 1;
                    }


                    //ordina prima i superati con voto e poi i giudizi
                    if (one.isSuperatoConGiudizio() && two.isSuperatoConVoto()) {
                        return -1;
                    }
                    if (one.isSuperatoConVoto() && two.isSuperatoConGiudizio()) {
                        return 1;
                    }


                    //ordina prima i superati con sup e poi quelli con ido
                    if (one.isSuperatoConSup() && two.isSuperatoConIdo()) {
                        return -1;
                    }
                    if (one.isSuperatoConIdo() && two.isSuperatoConSup()) {
                        return 1;
                    }


                    //ordina prima i superati con voto minore
                    if (one.VOTO < two.VOTO) {
                        return -1;
                    }
                    if (one.VOTO > two.VOTO) {
                        return 1;
                    }


                    //se hanno voto uguale vai a vedere le lodi
                    if (one.isSuperatoConVotoSenzaLode() && two.isSuperatoConVotoELode()) {
                        return -1;
                    }
                    if (one.isSuperatoConVotoELode() && two.isSuperatoConVotoSenzaLode()) {
                        return 1;
                    }


                    //nel caso di corsi con stesso voto, ordino per alfabetico
                    if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                        return 1;
                    }

                    if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                        return -1;
                    }

                    return 0;
                });
                break;

            case ORDINAMENTO_VOTO + DECRESCENTE:
                corsi.sort((one, two) => {
                    //conforonta i corsi superati con quelli superati
                    if (one.isSuperato() && !two.isSuperato()) {
                        return -1;
                    }
                    if (!one.isSuperato() && two.isSuperato()) {
                        return 1;
                    }


                    //ordina prima i superati con voto e poi i giudizi
                    if (one.isSuperatoConVoto() && two.isSuperatoConGiudizio()) {
                        return -1;
                    }
                    if (one.isSuperatoConGiudizio() && two.isSuperatoConVoto()) {
                        return 1;
                    }


                    //ordina prima i superati con voto e poi i giudizi
                    if (one.isSuperatoConIdo() && two.isSuperatoConSup()) {
                        return -1;
                    }
                    if (one.isSuperatoConSup() && two.isSuperatoConIdo()) {
                        return 1;
                    }


                    //ordina prima i superati con voto minore
                    if (one.VOTO > two.VOTO) {
                        return -1;
                    }
                    if (one.VOTO < two.VOTO) {
                        return 1;
                    }


                    //se hanno voto uguale vai a vedere le lodi
                    if (one.isSuperatoConVotoELode() && two.isSuperatoConVotoSenzaLode()) {
                        return -1;
                    }
                    if (one.isSuperatoConVotoSenzaLode() && two.isSuperatoConVotoELode()) {
                        return 1;
                    }


                    //nel caso di corsi con stesso voto, ordino per alfabetico
                    if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                        return 1;
                    }
                    if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                        return -1;
                    }

                    return 0;
                });
                break;
        }
        return corsi;
    }

    filtra(corsi: Corso[]): Corso[] {

        switch (this.filtroPerTipologia) {
            case FILTRO_ESAME_SOSTENUTO:
                corsi = corsi.filter(corso => corso.isSuperato());
                break;
            case FILTRO_PER_NON_SOSTENUTO:
                corsi = corsi.filter(corso => !corso.isSuperato());
                break;
        }

        if (this.filtroPerAnno > 0) {
            corsi = corsi.filter(corso => corso.ANNO == this.filtroPerAnno);
        }
        return corsi;
    }

}
