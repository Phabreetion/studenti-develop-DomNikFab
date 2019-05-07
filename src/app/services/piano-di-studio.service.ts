import {Injectable} from '@angular/core';
import {SyncService} from './sync.service';
import {Corso} from '../models/Corso';

const ID_SERVIZIO_PIANO_DI_STUDIO: number = 12;

@Injectable({
  providedIn: 'root'
})
export class PianoDiStudioService {


  constructor(private sync: SyncService) {
  }

  public async getLibretto(): Promise<Corso[]> {
    return new Promise<Corso[]>(resolve => {
      this.sync.getJson(ID_SERVIZIO_PIANO_DI_STUDIO, null, false).then((data) => {
        const corsi: Corso[] = data[0];

        for(let i = 0; i < corsi.length; i++) {
          corsi[i] = Corso.toObj(corsi[i]);
        }

        console.log(corsi);
        resolve(corsi);
      });
    });
  }

  public async getCorso(codiceEsame: number): Promise<Corso>  {
    return new Promise<Corso>((resolve, reject) => {
      this.getLibretto().then( (corsi) => {
        let i = 0;
        while(i < corsi.length && corsi[i].CODICE != codiceEsame) {
          i++;
        }

        if(i >= corsi.length) {
          reject();
        } else {
          resolve(corsi[i]);
        }

      });
    });
  }
}
