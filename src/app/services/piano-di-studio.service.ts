import {Injectable} from '@angular/core';
import {SyncService} from './sync.service';
import {Corso} from '../models/Corso';
import {Storage} from '@ionic/storage';
import {FiltroPianoDiStudio} from '../models/FiltroPianoDiStudio';

const ID_SERVIZIO_PIANO_DI_STUDIO = 112;
const ID_SERVIZIO_PROPEDEUTICITA = 113;

@Injectable({
    providedIn: 'root'
})

export class PianoDiStudioService {


    constructor(public sync: SyncService,
                public storage: Storage) {
    }

    public async getPropedeuticita(ad_id_corso: number, corsiMap: Map<number, Corso>): Promise<any[]> {
        return new Promise<any[]>(resolve => {
            this.sync.getJson(ID_SERVIZIO_PROPEDEUTICITA, null, false).then(async (data) => {
                const propedeuticita = data[0];
                let corsiPropedeutici: Corso[];
                corsiPropedeutici = [];

                propedeuticita.forEach( prop => {
                    if (prop.AD_ID == ad_id_corso && corsiMap.get(ad_id_corso).AA_OFF_ID === prop.AA_OFF_ID) {
                        corsiPropedeutici.push(corsiMap.get(prop.AD_PROP_ID));
                    }
                });

                resolve(corsiPropedeutici);
            });
        });
    }



    public async getCorsi(): Promise<Corso[]> {
        return new Promise<Corso[]>( (resolve, reject) => {
            return this.sync.getJson(ID_SERVIZIO_PIANO_DI_STUDIO, null, false).then((data) => {
                const corsi: Corso[] = data[0];

                //conversione di tutti i corsi in istanze dalla classe Corso
                for (let i = 0; i < corsi.length; i++) {
                    corsi[i] = Corso.toObj(corsi[i]);
                }

                resolve(corsi);
            }).catch( (err) => {
                reject(err);
            });
        });
    }


    /**
     * Restituisce una Promise di corsi aggiornati
     */
    public async getCorsiAggiornati(): Promise<Corso[]> {
        return new Promise<Corso[]>( (resolve, reject) => {
            return this.sync.getJsonAggiornato(ID_SERVIZIO_PIANO_DI_STUDIO, null).then((data) => {
                const corsi: Corso[] = data[0];

                //conversione di tutti i corsi in istanze dalla classe Corso
                for (let i = 0; i < corsi.length; i++) {
                    corsi[i] = Corso.toObj(corsi[i]);
                }

                //aggiuntamento in background delle prop
                this.sync.getJsonAggiornato(ID_SERVIZIO_PROPEDEUTICITA, null).then();

                resolve(corsi);
            }).catch( (err) => {
                reject(err);
            });
        });
    }


    public async getCorsiAsMap(): Promise<Map<number, Corso>> {
        return new Promise<Map<number, Corso>>(resolve => {
            this.sync.getJson(ID_SERVIZIO_PIANO_DI_STUDIO, null, false).then((corsi) => {
                const map = new Map<number, Corso>();

                for (let i = 0; i < corsi[0].length; i++) {
                    map.set(corsi[0][i].AD_ID, Corso.toObj(corsi[0][i]));
                }

                console.log(map);
                resolve(map);
            });
        });
    }

    public areCorsiChanged(newCorsi, oldCorsi) {
        return this.sync.dataIsChanged(newCorsi, oldCorsi);
    }

    public isLoading() {
        this.sync.isLoading(ID_SERVIZIO_PIANO_DI_STUDIO);
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

    public memorizzaFiltri(filtro: FiltroPianoDiStudio) {
        this.storage.set('filtroPianoDiStudio', filtro).then();
    }

    public async loadFiltriFromStorage(): Promise<FiltroPianoDiStudio> {
        return new Promise<FiltroPianoDiStudio>((resolve) => {
            this.storage.get('filtroPianoDiStudio').then(
                filtro => {
                    resolve(FiltroPianoDiStudio.toObj(filtro));
                }
            );
        });
    }
}
