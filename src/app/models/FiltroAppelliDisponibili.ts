import {AppelloDisponibile} from './AppelloDisponibile';
import {ExtraEntryPointObject} from '@angular-devkit/build-angular';

export const ORDINAMENTO_ALFABETICO_CRESCENTE = 0;
export const ORDINAMENTO_ALFABETICO_DECRESCENTE = 1;
export const ORDINAMENTO_DATA_CRESCENTE = 2;
export const ORDINAMENTO_DATA_DECRESCENTE = 3;
export const ORDINAMENTO_CFU_CRESCENTE = 4;
export const ORDINAMENTO_CFU_DECRESCENTE = 5;


export class FiltroAppelliDisponibili {

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


    static toObj(obj: Object): FiltroAppelliDisponibili {
        return Object.assign(new FiltroAppelliDisponibili(), obj);
    }

    reset() {
        this.filtroSuperatiAttivo = false;
        this.filtroNonSuperatiAttivo = false;
        this.filtroPerAnno = 0;
        this.idOrdinamento = 0;
        this.tipoOrdinamento = 0;
    }

    ordina(appelli: AppelloDisponibile[]): AppelloDisponibile[] {
        //il primo ordinamento viene eseguito per crescente crescente
        switch (this.idOrdinamento + this.tipoOrdinamento) {
            case ORDINAMENTO_ALFABETICO_CRESCENTE: //alfabetico crescente
                appelli.sort(
                    (one, two) => {
                        //effettuo l'ordinamento sulle stringhe no case sensitive
                        if (one.descrizione.toLowerCase() > two.descrizione.toLowerCase()) {
                            return 1;
                        }

                        if (one.descrizione.toLowerCase() < two.descrizione.toLowerCase()) {
                            return -1;
                        }
                        //se i nomi sono uguali(molto improbabile) non si gestiscono le collisioni
                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_ALFABETICO_DECRESCENTE: //alfabetico decrescente
                appelli.sort(
                    (one, two) => {
                        //effettuo l'ordinamento sulle stringhe no case sensitive
                        if (one.descrizione.toLowerCase() < two.descrizione.toLowerCase()) {
                            return 1;
                        }

                        if (one.descrizione.toLowerCase() > two.descrizione.toLowerCase()) {
                            return -1;
                        }
                        //se i nomi sono uguali non gestisco le collisioni
                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_DATA_CRESCENTE:

                break;

            case ORDINAMENTO_DATA_DECRESCENTE:

                break;

            case ORDINAMENTO_CFU_CRESCENTE:

                break;

            case ORDINAMENTO_CFU_DECRESCENTE:

                break;
        }
        return appelli;
    }
}

