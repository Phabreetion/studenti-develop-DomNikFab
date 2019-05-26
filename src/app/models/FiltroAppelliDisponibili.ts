import {AppelloDisponibile} from './AppelloDisponibile';
import {ExtraEntryPointObject} from '@angular-devkit/build-angular';
import {GlobalDataService} from '../services/global-data.service';
import {Corso} from './Corso';
import {forEach} from '@angular-devkit/schematics';

export const ORDINAMENTO_DATA_CRESCENTE = 0;
export const ORDINAMENTO_DATA_DECRESCENTE = 1;
export const ORDINAMENTO_ALFABETICO_CRESCENTE = 2;
export const ORDINAMENTO_ALFABETICO_DECRESCENTE = 3;
export const ORDINAMENTO_CFU_CRESCENTE = 4;
export const ORDINAMENTO_CFU_DECRESCENTE = 5;
export const ORDINAMENTO_ANNO_CRESCENTE = 6;
export const ORDINAMENTO_ANNO_DECRESCENTE = 7;

export const DISATTIVO = 0;
export const ATTIVO = 1;


export class FiltroAppelliDisponibili {

    //serve per determinare quel è il massimo filtro per anno
    maxAnni: number;

    //filtro
    filtroPerAnno: number; //0 non attivo -> altrimenti gli altri
    filtraScrittoOraleAttivo: boolean;
    filtraOraleAttivo: boolean;
    filtraScrittoAttivo: boolean;

    //ordinamento
    idOrdinamento: number;
    tipoOrdinamento: number; //0 crescente --- 1 decrescente



    constructor() {
        //default value
        this.reset();
    }


    static toObj(obj: Object): FiltroAppelliDisponibili {
        return Object.assign(new FiltroAppelliDisponibili(), obj);
    }

    reset() {
        this.filtroPerAnno = 0;

        this.filtraScrittoOraleAttivo = false;
        this.filtraScrittoAttivo = false;
        this.filtraOraleAttivo = false;

        this.idOrdinamento = 0;
        this.tipoOrdinamento = 0;
    }

    ordina(appelli: AppelloDisponibile[], mappaCorsi: Map<number, Corso>): AppelloDisponibile[] {

        switch (this.idOrdinamento + this.tipoOrdinamento) {

            case ORDINAMENTO_DATA_CRESCENTE:
                appelli.sort(
                    (one, two) => {
                        //conforonta le date degli appelli per decidere quale viene prima
                        if (two.getDataEsame() < one.getDataEsame()) {
                            return 1;
                        }

                        if (two.getDataEsame() > one.getDataEsame()) {
                            return -1;
                        }


                        //nel caso di appelli con stessa data, ordino per alfabetico
                        if (one.descrizione.toLowerCase() > two.descrizione.toLowerCase()) {
                            return 1;
                        }

                        if (one.descrizione.toLowerCase() < two.descrizione.toLowerCase()) {
                            return -1;
                        }

                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_DATA_DECRESCENTE:
                appelli.sort(
                    (one, two) => {
                        //conforonta le date degli appelli per decidere quale viene prima
                        if (two.getDataEsame() > one.getDataEsame()) {
                            return 1;
                        }

                        if (two.getDataEsame() < one.getDataEsame()) {
                            return -1;
                        }


                        //nel caso di appelli con stessa data, ordino per alfabetico
                        if (one.descrizione.toLowerCase() > two.descrizione.toLowerCase()) {
                            return 1;
                        }

                        if (one.descrizione.toLowerCase() < two.descrizione.toLowerCase()) {
                            return -1;
                        }

                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_ALFABETICO_CRESCENTE:
                appelli.sort(
                    (one, two) => {
                        //conforonta le descrizioni degli appelli per decidere quale viene prima
                        if (one.descrizione.toLowerCase() > two.descrizione.toLowerCase()) {
                            return 1;
                        }

                        if (one.descrizione.toLowerCase() < two.descrizione.toLowerCase()) {
                            return -1;
                        }


                        //nel caso di appelli con stessa descrizione -> ordino con data
                        if (GlobalDataService.string2date(two.data_ora_app) < GlobalDataService.string2date(one.data_ora_app)) {
                            return 1;
                        }

                        if (GlobalDataService.string2date(two.data_ora_app) > GlobalDataService.string2date(one.data_ora_app)) {
                            return -1;
                        }

                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_ALFABETICO_DECRESCENTE:
                appelli.sort(
                    (one, two) => {
                        //conforonta le descrizioni degli appelli per decidere quale viene prima
                        if (one.descrizione.toLowerCase() < two.descrizione.toLowerCase()) {
                            return 1;
                        }

                        if (one.descrizione.toLowerCase() > two.descrizione.toLowerCase()) {
                            return -1;
                        }


                        //nel caso di appelli con stessa descrizione -> ordino con data
                        if (GlobalDataService.string2date(two.data_ora_app) < GlobalDataService.string2date(one.data_ora_app)) {
                            return 1;
                        }

                        if (GlobalDataService.string2date(two.data_ora_app) > GlobalDataService.string2date(one.data_ora_app)) {
                            return -1;
                        }

                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_CFU_CRESCENTE:
                appelli.sort(
                    (one, two) => {
                        //conforonta i CFU degli appelli per decidere quale viene prima
                        if (mappaCorsi.get(two.ad_id).CFU - mappaCorsi.get(one.ad_id).CFU !== 0) {
                            return mappaCorsi.get(two.ad_id).CFU - mappaCorsi.get(one.ad_id).CFU;
                        }

                        //nel caso di appelli con stessi CFU, ordino per alfabetico
                        if (one.descrizione.toLowerCase() > two.descrizione.toLowerCase()) {
                            return 1;
                        }

                        if (one.descrizione.toLowerCase() < two.descrizione.toLowerCase()) {
                            return -1;
                        }

                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_CFU_DECRESCENTE:
                appelli.sort(
                    (one, two) => {
                        //conforonta i CFU degli appelli per decidere quale viene prima
                        if (mappaCorsi.get(one.ad_id).CFU - mappaCorsi.get(two.ad_id).CFU !== 0) {
                            return mappaCorsi.get(one.ad_id).CFU - mappaCorsi.get(two.ad_id).CFU;
                        }

                        //nel caso di appelli con stessi CFU, ordino per alfabetico
                        if (one.descrizione.toLowerCase() > two.descrizione.toLowerCase()) {
                            return 1;
                        }

                        if (one.descrizione.toLowerCase() < two.descrizione.toLowerCase()) {
                            return -1;
                        }

                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_ANNO_CRESCENTE:
                appelli.sort(
                    (one, two) => {
                        //conforonta gli anni degli appelli per decidere quale viene prima
                        if (mappaCorsi.get(one.ad_id).ANNO - mappaCorsi.get(two.ad_id).ANNO !== 0) {
                            return mappaCorsi.get(one.ad_id).ANNO - mappaCorsi.get(two.ad_id).ANNO;
                        }

                        //nel caso di appelli con stesso anno, ordino per alfabetico
                        if (one.descrizione.toLowerCase() > two.descrizione.toLowerCase()) {
                            return 1;
                        }

                        if (one.descrizione.toLowerCase() < two.descrizione.toLowerCase()) {
                            return -1;
                        }

                        return 0;
                    }
                );
                break;

            case ORDINAMENTO_ANNO_DECRESCENTE:
                appelli.sort(
                    (one, two) => {
                        //conforonta gli anni degli appelli per decidere quale viene prima
                        if (mappaCorsi.get(two.ad_id).ANNO - mappaCorsi.get(one.ad_id).ANNO !== 0) {
                            return mappaCorsi.get(two.ad_id).ANNO - mappaCorsi.get(one.ad_id).ANNO;
                        }

                        //nel caso di appelli con stesso anno, ordino per alfabetico
                        if (one.descrizione.toLowerCase() > two.descrizione.toLowerCase()) {
                            return 1;
                        }

                        if (one.descrizione.toLowerCase() < two.descrizione.toLowerCase()) {
                            return -1;
                        }

                        return 0;
                    }
                );
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

    isActive(): boolean {
        return this.filtraOraleAttivo || this.filtraScrittoAttivo || this.filtraScrittoOraleAttivo || this.filtroPerAnno > 0;
    }

    filtra(appelli: AppelloDisponibile[], corsi: Map<number, Corso>): AppelloDisponibile[] {
        if (this.filtraScrittoAttivo) {
            appelli = appelli.filter(appello => appello.tipo_iscr_cod === 'S');
        }
        if (this.filtraOraleAttivo) {
            appelli = appelli.filter(appello => appello.tipo_iscr_cod === 'O');
        }
        if (this.filtraScrittoOraleAttivo) {
            appelli = appelli.filter(appello => appello.tipo_iscr_cod === 'SO');
        }

        if (this.filtroPerAnno > DISATTIVO) {
            appelli = appelli.filter(appello => corsi.get(appello.ad_id).ANNO == this.filtroPerAnno);
        }

        return appelli;
    }

}

