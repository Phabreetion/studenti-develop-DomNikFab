import {AppelloDisponibile} from './AppelloDisponibile';
import {ExtraEntryPointObject} from '@angular-devkit/build-angular';
import {GlobalDataService} from '../services/global-data.service';
import {Corso} from './Corso';
import {forEach} from '@angular-devkit/schematics';

export const ORDINAMENTO_ALFABETICO_CRESCENTE = 0;
export const ORDINAMENTO_ALFABETICO_DECRESCENTE = 1;
export const ORDINAMENTO_DATA_CRESCENTE = 2;
export const ORDINAMENTO_DATA_DECRESCENTE = 3;
export const ORDINAMENTO_CFU_CRESCENTE = 4;
export const ORDINAMENTO_CFU_DECRESCENTE = 5;

export const NESSUNO =0;
export const SCRITTO =1;
export const ORALE =2;
export const SCRITTO_ORALE =3;


export class FiltroAppelliDisponibili {


    filtroPerAnno: number; //0 non attivo -> altrimenti gli altri
    filtraScrittoOrale: number;
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
        this.filtraScrittoOrale = 0;
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

    filtra(appelli : AppelloDisponibile[], corsi : Map<number,Corso>) : AppelloDisponibile[]{
       //definire filtra anno e filtra scritto orale
        //appelli.filter
       //nel json c'è l'attributo(O,S,SO) che assume i valori 1,2,3---> 1 per scritto, 2 per orale, 3 per scritto orale
        if(this.filtraScrittoOrale==1)
            appelli=appelli.filter(appello=>appello.tipo_iscr_cod==='S');

        if(this.filtraScrittoOrale==2)
            appelli=appelli.filter(appello=>appello.tipo_iscr_cod==='O');

        if(this.filtraScrittoOrale==2)
            appelli=appelli.filter(appello=>appello.tipo_iscr_cod==='SO');

        if (this.filtroPerAnno > 0) {
            appelli = appelli.filter(appello=>corsi.get(appello.ad_id).ANNO==this.filtroPerAnno);
        }

        return appelli;
    }

}

