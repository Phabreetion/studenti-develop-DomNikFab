import {Injectable} from '@angular/core';
import {SyncService} from './sync.service';
import {Corso} from '../models/Corso';

const ID_SERVIZIO_PIANO_DI_STUDIO = 112;
const ID_SERVIZIO_PROPEDEUTICITA = 113;

@Injectable({
    providedIn: 'root'
})
export class PianoDiStudioService {


    constructor(private sync: SyncService) {
    }

    public async getPropedeuticita(ad_id: number): Promise<any[]> {
        return new Promise<any[]>(resolve => {
            this.sync.getJson(ID_SERVIZIO_PROPEDEUTICITA, null, false).then(async (data) => {
                const tutteLeProp: any[] = data[0];
                //let propFiltrate = new Map<number, any>();
                const propFiltrate = [];

                const corsi = await this.getCorsi();
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
                    while (j < propFiltrate.length && propFiltrate[j].AD_PROP_ID != corsi[i].AD_ID) {
                        j++;
                    }

                    if (j < propFiltrate.length) {
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

    public async getCorsiAsMap(): Promise<Map<string,Corso>> {
        return new Promise<Map<string,Corso>>(resolve => {
            this.sync.getJson(ID_SERVIZIO_PIANO_DI_STUDIO, null, false).then((corsi) => {
                let map = new Map<string, Corso>();

                for (let i = 0; i < corsi[0].length; i++) {
                    map.set(corsi[0][i].DESCRIZIONE, Corso.toObj(corsi[0][i]));
                }

                console.log(map);
                resolve(map);
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
