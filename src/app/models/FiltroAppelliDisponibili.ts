import {AppelloDisponibile} from './AppelloDisponibile';
import {ExtraEntryPointObject} from '@angular-devkit/build-angular';
import {GlobalDataService} from '../services/global-data.service';
import {Corso} from './Corso';

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

    ordina(appelli: AppelloDisponibile[], mappaCorsi: Map<number, Corso> ): AppelloDisponibile[] {
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

                appelli.sort(
                    (one, two) => {

                        if(GlobalDataService.string2date(two.data_ora_app) < GlobalDataService.string2date(one.data_ora_app)) {
                            return 1;
                        }

                        if(GlobalDataService.string2date(two.data_ora_app) > GlobalDataService.string2date(one.data_ora_app)) {
                            return -1;
                        }


                        return 0;
                    }
                );



                break;

            case ORDINAMENTO_DATA_DECRESCENTE:
                appelli.sort(
                    (one, two) => {

                        if(GlobalDataService.string2date(two.data_ora_app) > GlobalDataService.string2date(one.data_ora_app)) {
                            return 1;
                        }

                        if(GlobalDataService.string2date(two.data_ora_app) < GlobalDataService.string2date(one.data_ora_app)) {
                            return -1;
                        }


                        return 0;
                    }
                );


                break;

            case ORDINAMENTO_CFU_CRESCENTE:

                appelli.sort(
                        (one,two) => {

                            if(mappaCorsi.get(two.ad_id).CFU - mappaCorsi.get(one.ad_id).CFU !== 0)  {
                                return mappaCorsi.get(two.ad_id).CFU - mappaCorsi.get(one.ad_id).CFU;
                            }



                            return 0;
                        }
                    );

                    break;

            case ORDINAMENTO_CFU_DECRESCENTE:
                appelli.sort(
                    (one, two) => {

                        if(mappaCorsi.get(one.ad_id).CFU - mappaCorsi.get(two.ad_id).CFU !== 0)  {
                            return mappaCorsi.get(one.ad_id).CFU - mappaCorsi.get(two.ad_id).CFU;
                        }

                        return 0;
                    }
                );
                console.log(appelli);

                break;
        }
        return appelli;
    }

    getIterableAnni(): any[] {
        const arr = [];

        for (let i = 0; i < this.maxAnni; i++) {
            arr.push(i + 1);
        }

        return arr;
    }
}

