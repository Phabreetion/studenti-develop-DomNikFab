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

  public async getLibretto(): Promise<any> {
    return this.sync.getJson(ID_SERVIZIO_PIANO_DI_STUDIO, null, false);
     /*   .then((data) => {
      const corsi: Corso[] = data[0];

      corsi.forEach(corso => Corso.toObj(corso));
      //resolve(corsi);
    });*/
  }

  public async getEsame() {
    return this.sync.getJson(ID_SERVIZIO_PIANO_DI_STUDIO, null, false);
  }
}
