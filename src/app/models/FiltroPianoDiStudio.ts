import {Corso} from './Corso';

export const ORDINAMENTO_ALFABETICO_CRESCENTE = 0;
export const ORDINAMENTO_ALFABETICO_DECRESCENTE = 1;
export const ORDINAMENTO_ANNO_CRESCENTE = 2;
export const ORDINAMENTO_ANNO_DECRESCENTE = 3;
export const ORDINAMENTO_CFU_CRESCENTE = 4;
export const ORDINAMENTO_CFU_DECRESCENTE = 5;
export const ORDINAMENTO_VOTO_CRESCENTE = 6;
export const ORDINAMENTO_VOTO_DECRESCENTE = 7;

export class FiltroPianoDiStudio {

    filtroSuperatiAttivo: boolean;
    filtroNonSuperatiAttivo: boolean;
    filtroPerAnno: number; //0 non attivo -> altrimenti gli altri
    idOrdinamento: number;
    tipoOrdinamento: number; //0 crescente --- 1 decrescente
    maxAnni: number;


    constructor() {
        //default value
        this.reset();
    }


    static toObj(obj: Object): FiltroPianoDiStudio {
        return Object.assign(new FiltroPianoDiStudio(), obj);
    }

    isActive(): boolean {
        return this.filtroSuperatiAttivo || this.filtroNonSuperatiAttivo || this.filtroPerAnno > 0;
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
        this.filtroSuperatiAttivo = false;
        this.filtroNonSuperatiAttivo = false;
        this.filtroPerAnno = 0;
        this.idOrdinamento = 2;
        this.tipoOrdinamento = 0;
    }

    ordina(corsi: Corso[]): Corso[] {
        //il primo ordinamento viene eseguito per crescente crescente
        switch (this.idOrdinamento + this.tipoOrdinamento) {
            case ORDINAMENTO_ALFABETICO_CRESCENTE: //alfabetico crescente
                corsi.sort(
                    (one, two) => {
                        //effettuo l'ordinamento sulle stringhe no case sensitive
                        if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                            return 1;
                        }

                        if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                            return -1;
                        }
                        //se i nomi sono uguali(molto improbabile) non si gestiscono le collisioni
                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_ALFABETICO_DECRESCENTE: //alfabetico decrescente
                corsi.sort(
                    (one, two) => {
                        //effettuo l'ordinamento sulle stringhe no case sensitive
                        if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                            return 1;
                        }

                        if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                            return -1;
                        }
                        //se i nomi sono uguali non gestisco le collisioni
                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_ANNO_CRESCENTE: //anno crescente
                corsi.sort(
                    (one, two) => {
                        if (one.ANNO - two.ANNO !== 0) {
                            return one.ANNO - two.ANNO;
                        }

                        //gestiso le collisioni sui corsi con stesso anno
                        //alfabetico
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

            case ORDINAMENTO_ANNO_DECRESCENTE: //anno crescente
                corsi.sort(
                    (one, two) => {
                        if (two.ANNO - one.ANNO !== 0) {
                            return two.ANNO - one.ANNO;
                        }

                        //gestiso le collisioni sui corsi con stesso anno
                        //alfabetico
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

            case ORDINAMENTO_CFU_CRESCENTE: //CFU crescente
                corsi.sort(
                    (one, two) => {
                        if (one.CFU - two.CFU !== 0) {
                            return one.CFU - two.CFU;
                        }

                        //gestiso le collisioni sui corsi con stesso anno
                        //alfabetico
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

            case ORDINAMENTO_CFU_DECRESCENTE: //CFU crescente
                corsi.sort(
                    (one, two) => {
                        if (two.CFU - one.CFU !== 0) {
                            return two.CFU - one.CFU;
                        }

                        //gestiso le collisioni sui corsi con stesso anno
                        //alfabetico
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

            case ORDINAMENTO_VOTO_CRESCENTE: //voto crescente
                corsi.sort((one, two) => {
                    if (!one.isSuperato() && two.isSuperato()) {
                        return -1;
                    }

                    if (one.isSuperato() && !two.isSuperato()) {
                        return 1;
                    }

                    if (one.VOTO < two.VOTO) {
                        return -1;
                    }
                    if (one.VOTO > two.VOTO) {
                        return 1;
                    }

                    //gestiso le collisioni sui corsi con stesso voto
                    //alfabetico
                    if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                        return 1;
                    }

                    if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                        return -1;
                    }
                });
                break;

            case ORDINAMENTO_VOTO_DECRESCENTE: //voto crescente
                corsi.sort((one, two) => {
                    if (one.isSuperato() && !two.isSuperato()) {
                        return -1;
                    }

                    if (!one.isSuperato() && two.isSuperato()) {
                        return 1;
                    }

                    if (one.VOTO > two.VOTO) {
                        return -1;
                    }
                    if (one.VOTO < two.VOTO) {
                        return 1;
                    }
                    if (one.VOTO === two.VOTO && one.LODE <= two.LODE) {
                        return 1;
                    }
                    if (one.VOTO === two.VOTO && one.LODE >= two.LODE) {
                        return -1;
                    }

                    if (one.VOTO === two.VOTO && one.LODE === two.LODE) {
                        return 1;
                    }
                    if (one.VOTO === two.VOTO && one.LODE === two.LODE) {
                        return -1;
                    }


                    //gestiso le collisioni sui corsi con stesso voto
                    //alfabetico
                    if (one.DESCRIZIONE.toLowerCase() > two.DESCRIZIONE.toLowerCase()) {
                        return 1;
                    }

                    if (one.DESCRIZIONE.toLowerCase() < two.DESCRIZIONE.toLowerCase()) {
                        return -1;
                    }
                });
                break;
        }

        return corsi;
    }

    filtra(corsi: Corso[]): Corso[] {
        if (this.filtroSuperatiAttivo) {
            corsi = corsi.filter(corso => corso.isSuperato());
        }

        if (this.filtroNonSuperatiAttivo) {
            corsi = corsi.filter(corso => !corso.isSuperato());
        }

        if (this.filtroPerAnno > 0) {
            corsi = corsi.filter(corso => corso.ANNO == this.filtroPerAnno);
        }

        return corsi;
    }

}
