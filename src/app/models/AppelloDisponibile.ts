import {Appello} from './Appello';
import {GlobalDataService} from '../services/global-data.service';


export class AppelloDisponibile extends Appello  {
    codice: number;
    descrizione: string;
    doc_pres_id: number;
    mat_id: number;
    p10_app_ad_id: number;
    p10_app_app_id: number;
    p10_app_cds_id: number;
    p10_app_data_fine_iscr: string;
    p10_app_data_inizio_iscr: string;
    p10_app_des: string;
    p10_app_note: string;
    p10_app_tipo_app_cod: string;
    p10_app_tipo_iscr_cod: string;
    p10_app_tipo_iscr_cod_prev: string;
    prenotabile_flg: string;
    stu_id: number;
    tipo_iscr_cod: string;
    tipo_iscr_des: string;
    tot_iscritti: number;

    constructor(ad_id?: number, adsce_id?: number, data_ora_app?: string, codice?: number, descrizione?: string, doc_pres_id?: number, mat_id?: number, p10_app_ad_id?: number, p10_app_app_id?: number, p10_app_cds_id?: number, p10_app_data_fine_iscr?: string, p10_app_data_inizio_iscr?: string, p10_app_des?: string, p10_app_note?: string, p10_app_tipo_app_cod?: string, p10_app_tipo_iscr_cod?: string, p10_app_tipo_iscr_cod_prev?: string, prenotabile_flg?: string, stu_id?: number, tipo_iscr_cod?: string, tipo_iscr_des?: string, tot_iscritti?: number) {
        super(ad_id, adsce_id, data_ora_app);

        this.codice = codice;
        this.descrizione = descrizione;
        this.doc_pres_id = doc_pres_id;
        this.mat_id = mat_id;
        this.p10_app_ad_id = p10_app_ad_id;
        this.p10_app_app_id = p10_app_app_id;
        this.p10_app_cds_id = p10_app_cds_id;
        this.p10_app_data_fine_iscr = p10_app_data_fine_iscr;
        this.p10_app_data_inizio_iscr = p10_app_data_inizio_iscr;
        this.p10_app_des = p10_app_des;
        this.p10_app_note = p10_app_note;
        this.p10_app_tipo_app_cod = p10_app_tipo_app_cod;
        this.p10_app_tipo_iscr_cod = p10_app_tipo_iscr_cod;
        this.p10_app_tipo_iscr_cod_prev = p10_app_tipo_iscr_cod_prev;
        this.prenotabile_flg = prenotabile_flg;
        this.stu_id = stu_id;
        this.tipo_iscr_cod = tipo_iscr_cod;
        this.tipo_iscr_des = tipo_iscr_des;
        this.tot_iscritti = tot_iscritti;
    }

    static toObj(obj: Object): AppelloDisponibile {
        return Object.assign(new AppelloDisponibile(), obj);
    }

    getDescrizionePulita(): string {
        return this.descrizione.replace(/\\r\\n|\\r|\\n/g, '').replace('?', '\'');
    }

    getDataEsame(): Date {
        const dataEsame = GlobalDataService.string2date(this.data_ora_app);
        dataEsame.setHours(0, 0, 0, 0);
        return dataEsame;
    }

    giorniRimanentiPrimaDellApertura(): number {
        const data_apertura_iscrizione = GlobalDataService.string2date(this.p10_app_data_inizio_iscr);
        const data_odierna = new Date();

        return GlobalDataService.differenzaGiorni(data_apertura_iscrizione, data_odierna);
    }

    giorniRimanentiPrimaDellaChiusura(): number {
        const data_chiusura_iscrizione = GlobalDataService.string2date(this.p10_app_data_fine_iscr);
        const data_odierna = new Date();

        return GlobalDataService.differenzaGiorni(data_chiusura_iscrizione, data_odierna);
    }

    giorniPassatiDopoLaChiusura(): number {
        const data_chiusura_iscrizione = GlobalDataService.string2date(this.p10_app_data_inizio_iscr);
        const data_odierna = new Date();

        return GlobalDataService.differenzaGiorni(data_odierna, data_chiusura_iscrizione);
    }

    isBeforeApertura(): boolean {
        return this.giorniRimanentiPrimaDellApertura() > 0;
    }

    isAfterApertura(): boolean {
        return this.giorniRimanentiPrimaDellApertura() <= 0;
    }

    isBeforeChiusura(): boolean {
        return this.giorniRimanentiPrimaDellaChiusura() >= 0;
    }

    isAfterChiusura(): boolean {
        return this.giorniRimanentiPrimaDellaChiusura() < 0;
    }

    isPrenotabile(): boolean {
        return this.isBeforeChiusura() && this.isAfterApertura();
    }
}
