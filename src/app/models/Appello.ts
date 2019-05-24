export class Appello {



    ad_id: number; //
    adsce_id: number; //
    data_ora_app: string; //


    constructor(ad_id?: number, adsce_id?: number, data_ora_app?: string) {
        this.ad_id = ad_id;
        this.adsce_id = adsce_id;
        this.data_ora_app = data_ora_app;
    }

    public static toObj(obj: Object): Appello {
        return Object.assign(new Appello(), obj);
    }
}
