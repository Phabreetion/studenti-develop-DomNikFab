import {Appello} from './Appello';
import {Corso} from './Corso';
import {GlobalDataService} from '../services/global-data.service';

export class AppelloPrenotato extends Appello  {

    ad_cod: number;
    ad_des: string;
    adreg_id: number;
    app_des: string;
    app_id: number;
    app_log_id: number;
    applista_id: number;
    cds_id: number;
    gruppo: string;
    mat_id: number;
    nota_studente: string;
    posiz: number;
    presidente: string;
    tipo_esa_cod: string;
    tipo_iscr: string;
    tipo_turno_cod: string;
    prenotazioni: Array<any>;


    constructor(ad_id?: number, adsce_id?: number, data_ora_app?: string, ad_cod?: number, ad_des?: string, adreg_id?: number, app_des?: string, app_id?: number, app_log_id?: number, applista_id?: number, cds_id?: number, gruppo?: string, mat_id?: number, nota_studente?: string, posiz?: number, presidente?: string, tipo_esa_cod?: string, tipo_iscr?: string, tipo_turno_cod?: string) {
        super(ad_id, adsce_id, data_ora_app);

        this.ad_cod = ad_cod;
        this.ad_des = ad_des;
        this.adreg_id = adreg_id;
        this.app_des = app_des;
        this.app_id = app_id;
        this.app_log_id = app_log_id;
        this.applista_id = applista_id;
        this.cds_id = cds_id;
        this.gruppo = gruppo;
        this.mat_id = mat_id;
        this.nota_studente = nota_studente;
        this.posiz = posiz;
        this.presidente = presidente;
        this.tipo_esa_cod = tipo_esa_cod;
        this.tipo_iscr = tipo_iscr;
        this.tipo_turno_cod = tipo_turno_cod;
    }

    static toObj(obj: Object): AppelloPrenotato {
        return Object.assign(new AppelloPrenotato(), obj);
    }


    getDescrizionePulita(): string {
        return this.ad_des.replace(/\\r\\n|\\r|\\n/g, '').replace('?', '\'');
    }

    isPrenotazioneSuperata(corsoMap: Map<number, Corso>): boolean {
        return corsoMap.get(this.ad_id).isSuperato();
    }

    giorniRimanentiPrimaDellEsame(): number {
        const data_esame = GlobalDataService.string2date(this.data_ora_app);
        const data_odierna = new Date();

        return GlobalDataService.differenzaGiorni(data_esame, data_odierna);
    }

    giorniPassatiDopoEsame(): number {
        const data_esame = GlobalDataService.string2date(this.data_ora_app);
        const data_odierna = new Date();

        return GlobalDataService.differenzaGiorni(data_odierna, data_esame);
    }

    isBeforeEsame(): boolean {
        return this.giorniRimanentiPrimaDellEsame() > 0;
    }

    isAfterEsame(): boolean {
        return this.giorniPassatiDopoEsame() > 0;
    }

    isCancellabile(): boolean {
        return this.giorniRimanentiPrimaDellEsame() - 5 > 0;
    }

}
