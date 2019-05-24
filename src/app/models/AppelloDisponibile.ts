import {Appello} from './Appello';
import {GlobalDataService} from '../services/global-data.service';


export class AppelloDisponibile extends Appello  {
    // @TODO
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

    prenotazioni: Array <any>;

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


    controllaPrenotazioniOutOfTime() {
        this.prenotazioni = this.prenotazioni.filter((prenotazione)=>{!this.isOutOfTime(prenotazione)} );
    }


    isOutOfTime(appello): boolean {
        let dataInizioSplittata: string[] = appello.data_ora_app.toString().split('/'); // [dd],[mm],[yyyy]

        const data_esame = new Date(parseInt(dataInizioSplittata[2]), parseInt(dataInizioSplittata[1]) - 1, parseInt(dataInizioSplittata[0])); // YYYY/MM//DD
        const data_odierna = new Date();


        return data_odierna.getTime() >= data_esame.getTime(); // && data_odierna <= data_fine;
    }

    giorniRimanentiPerEsame(appello): number {
        const MS_GIORNO = 24 * 60 * 60 * 1000; // numero di millisecondi in un giorno

        let dataEsameSplittata: string[] = appello.data_ora_app.toString().split('/'); // [dd],[mm],[yyyy]
        const data_esame = new Date(parseInt(dataEsameSplittata[2]), parseInt(dataEsameSplittata[1]) -1, parseInt(dataEsameSplittata[0])); // YYYY/MM/DD
        const data_odierna = new Date();

        return Math.ceil(Math.abs(data_odierna.getTime() - data_esame.getTime()) / MS_GIORNO);
    }

    giorniRimanentiPrimaDellApertura(): number {
        const data_apertura_iscrizione = GlobalDataService.string2date(this.p10_app_data_inizio_iscr);
        const data_odierna = new Date();

        return GlobalDataService.differenzaGiorni(data_apertura_iscrizione, data_odierna);
    }

    giorniRimanentiPrimaDellaChiusura(): number {
        const data_chiusura_iscrizione = GlobalDataService.string2date(this.p10_app_data_inizio_iscr);
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
        return this.giorniRimanentiPrimaDellApertura() < 0;
    }

    isBeforeChiusura(): boolean {
        return this.giorniRimanentiPrimaDellaChiusura() > 0;
    }

    isAfterChiusura(): boolean {
        return this.giorniRimanentiPrimaDellaChiusura() < 0;
    }

    isPrenotabile(): boolean {
        console.log(this.descrizione + ' ' + this.isBeforeChiusura() + ' ' + this.isAfterApertura());
        return this.isBeforeChiusura() && this.isAfterApertura();
    }
}
