import {Injectable} from '@angular/core';
import {SyncService} from './sync.service';
import {Corso} from '../models/Corso';
import {Storage} from '@ionic/storage';
import {FiltroPianoDiStudio} from '../models/FiltroPianoDiStudio';

const ID_SERVIZIO_PIANO_DI_STUDIO = 12;
const ID_SERVIZIO_PROPEDEUTICITA = 113;

@Injectable({
    providedIn: 'root'
})

export class PianoDiStudioService {


    constructor(public sync: SyncService,
                public storage: Storage) {
    }

    public async getPropedeuticita(ad_id_corso: string, corsiMap: Map<string, Corso>): Promise<any[]> {
        return new Promise<any[]>(resolve => {
            this.sync.getJson(ID_SERVIZIO_PROPEDEUTICITA, null, false).then(async (data) => {
                const propedeuticita = data[0];
                let corsiPropedeutici: Corso[];
                corsiPropedeutici = [];

                propedeuticita.forEach( prop => {
                    if (prop.AD_ID === ad_id_corso && corsiMap.get(ad_id_corso).AA_OFF_ID === prop.AA_OFF_ID) {
                        corsiPropedeutici.push(corsiMap.get(prop.AD_PROP_ID));
                    }
                });

                resolve(corsiPropedeutici);
            });
        });
    }

    public async getPropedeuticitaNonSuperate(ad_id_corso: string, corsiMap: Map<string, Corso>): Promise<Corso[]> {
        return new Promise<Corso[]>(resolve => {
            this.getPropedeuticita(ad_id_corso, corsiMap).then( corsiPropedeutici => {
                let corsiNonsuperati: Corso[];
                corsiNonsuperati = [];

                for (let i = 0; i < corsiPropedeutici.length; i++) {
                    if (!corsiPropedeutici[i].isSuperato() ) {
                        corsiNonsuperati.push(corsiPropedeutici[i]);
                    }
                }

                resolve(corsiNonsuperati);
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


    public async getCorsiAsMap(): Promise<Map<string, Corso>> {
        return new Promise<Map<string, Corso>>(resolve => {
            this.sync.getJson(ID_SERVIZIO_PIANO_DI_STUDIO, null, false).then((corsi) => {
                const map = new Map<string, Corso>();

                for (let i = 0; i < corsi[0].length; i++) {
                    const corso = Corso.toObj(corsi[0][i]);
                    map.set(corso.AD_ID, corso);
                }

                resolve(map);
            });
        });
    }

    public areCorsiChanged(newCorsi, oldCorsi) {
        return this.sync.dataIsChanged(newCorsi, oldCorsi);
    }

    public getMaxAnni(): Promise<number> {
        let maxAnni = 0;

        return new Promise<number>((resolve) => {
            this.getCorsi().then(
                corsi => {
                    corsi.forEach(corso => { maxAnni = maxAnni < corso.ANNO ? corso.ANNO : maxAnni; });

                    resolve(maxAnni);
                }, () => { resolve(maxAnni); }
            ).catch( () => { resolve(maxAnni); } );
        });
    }

    public getDataUltimoAggiornamentoCorsi(): string {
        return this.sync.getDataUltimoAggiornamento(ID_SERVIZIO_PIANO_DI_STUDIO);
    }

    public isLoading(): boolean {
        return this.sync.isLoading(ID_SERVIZIO_PIANO_DI_STUDIO);
    }

    public async getCorso(ad_id_corso: string): Promise<Corso> {
        return new Promise<Corso>((resolve, reject) => {
            this.getCorsi().then((corsi) => {
                let i = 0;
                while (i < corsi.length && corsi[i].AD_ID !== ad_id_corso ) {
                    i++;
                }

                i >= corsi.length ? reject() : resolve(corsi[i]);
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
                    if (!filtro) {
                        filtro = new FiltroPianoDiStudio();
                    }
                    resolve(FiltroPianoDiStudio.toObj(filtro));
                }
            );
        });
    }
}
