import {Injectable} from '@angular/core';
import {SyncService} from './sync.service';
import {Corso} from '../models/Corso';

const ID_SERVIZIO_PIANO_DI_STUDIO: number = 112;
const ID_SERVIZIO_PROPEDEUTICITA: number = 113;

@Injectable({
    providedIn: 'root'
})
export class PianoDiStudioService {


    constructor(private sync: SyncService) {
    }

    public async getPropedeuticita(ad_id: number): Promise<any[]> {
        return new Promise<any[]>(resolve => {
            this.sync.getJson(ID_SERVIZIO_PROPEDEUTICITA, null, false).then(async (data) => {
                let tutteLeProp: any[] = data[0];
                //let propFiltrate = new Map<number, any>();
                let propFiltrate = [];

                let corsi = await this.getCorsi();
                let corsiPropedeutici: Corso[];
                corsiPropedeutici = [];

                console.log(ad_id);
                console.log(tutteLeProp);

                for (let i = 0; i < tutteLeProp.length; i++) {
                    if (parseInt(tutteLeProp[i].AD_ID) == ad_id) {
                        propFiltrate.push(tutteLeProp[i]);
                    }
                }

                for (let i = 0; i < corsi.length; i++) {
                    let j = 0;
                    while(j < propFiltrate.length && propFiltrate[j].AD_PROP_ID != corsi[i].AD_ID) {
                        j++;
                    }

                    if(j<propFiltrate.length) {
                        corsiPropedeutici.push(corsi[i]);
                    }
                }


                console.log(corsiPropedeutici);
                resolve(corsiPropedeutici);
            });
        });
    }

    public async getCorsi(): Promise<Corso[]> {
        return new Promise<Corso[]>(resolve => {
            this.sync.getJson(ID_SERVIZIO_PIANO_DI_STUDIO, null, false).then((data) => {
                const corsi: Corso[] = data[0];

                for (let i = 0; i < corsi.length; i++) {
                    corsi[i] = Corso.toObj(corsi[i]);
                }

                console.log(corsi);
                resolve(corsi);
            });
        });
    }

    public async getCorso(codiceEsame: number): Promise<Corso> {
        return new Promise<Corso>((resolve, reject) => {
            this.getCorsi().then((corsi) => {
                let i = 0;
                while (i < corsi.length && corsi[i].CODICE != codiceEsame) {
                    i++;
                }

                if (i >= corsi.length) {
                    reject();
                } else {
                    resolve(corsi[i]);
                }

            });
        });
    }
}
