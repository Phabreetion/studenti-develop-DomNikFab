import {AppelloDisponibile} from './AppelloDisponibile';
import {GlobalDataService} from '../services/global-data.service';
import {Corso} from './Corso';


const DISATTIVO = 0;
const FILTRO_SCRITTO = 1;
const FILTRO_ORALE = 2;
const FILTRO_SCRITTO_E_ORALE = 3;


const ORDINAMENTO_DATA = 0;
const ORDINAMENTO_ALFABETICO = 2;
const ORDINAMENTO_CFU = 4;
const ORDINAMENTO_ANNO = 6;

const CRESCENTE = 0;
const DECRESCENTE = 1;

export class FiltroAppelliDisponibili {

    //serve per determinare quel è il massimo filtro per anno
    maxAnni: number;

    //filtro
    filtroPerAnno: number; //0 non attivo -> altrimenti gli altri
    filtroPerTipologia: number; //0 non attivo -- 1 scritto -- 2 orale -- 3 scritto+orale

    //ordinamento
    idOrdinamento: number;  //0 data --- 2 alfabetico --- 4 cfu --- 6 anno
    tipoOrdinamento: number; //0 crescente --- 1 decrescente


    constructor() {
        //default value
        this.reset();
    }

    static toObj(obj: Object): FiltroAppelliDisponibili {
        return Object.assign(new FiltroAppelliDisponibili(), obj);
    }

    isActive(): boolean {
        return this.filtroPerAnno > DISATTIVO || this.filtroPerTipologia > DISATTIVO;
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
        //Filtri
        this.filtroPerAnno = DISATTIVO;
        this.filtroPerTipologia = DISATTIVO;

        //Ordinamento
        this.idOrdinamento = ORDINAMENTO_DATA;
        this.tipoOrdinamento = CRESCENTE;
    }

    filtra(appelli: AppelloDisponibile[], corsi: Map<number, Corso>): AppelloDisponibile[] {
        if (this.isActive()) {
            if (this.filtroPerAnno > DISATTIVO && this.filtroPerAnno <= this.maxAnni) {
                appelli = appelli.filter(appello => corsi.get(appello.ad_id).ANNO == this.filtroPerAnno);
            }

            switch (this.filtroPerTipologia) {
                case FILTRO_SCRITTO:
                    appelli = appelli.filter(appello => appello.tipo_iscr_cod === 'S');

                    break;
                case FILTRO_ORALE:
                    appelli = appelli.filter(appello => appello.tipo_iscr_cod === 'O');

                    break;
                case FILTRO_SCRITTO_E_ORALE:
                    appelli = appelli.filter(appello => appello.tipo_iscr_cod === 'SO');

                    break;
            }
        }

        return appelli;
    }

    ordina(appelli: AppelloDisponibile[], mappaCorsi: Map<number, Corso>): AppelloDisponibile[] {

        switch (this.idOrdinamento + this.tipoOrdinamento) {

            case ORDINAMENTO_DATA + CRESCENTE:
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

            case ORDINAMENTO_DATA + DECRESCENTE:
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

            case ORDINAMENTO_ALFABETICO + CRESCENTE:
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

            case ORDINAMENTO_ALFABETICO + DECRESCENTE:
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

            case ORDINAMENTO_CFU + CRESCENTE:
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

            case ORDINAMENTO_CFU + DECRESCENTE:
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

            case ORDINAMENTO_ANNO + CRESCENTE:
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

            case ORDINAMENTO_ANNO + DECRESCENTE:
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

}

