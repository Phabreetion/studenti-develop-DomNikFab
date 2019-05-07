import { Injectable } from '@angular/core';
import {SyncService} from './sync.service';
import {Corso} from '../models/Corso';

@Injectable({
  providedIn: 'root'
})
export class PianoDiStudioService {

  constructor(private sync:SyncService) { }

  public async getLibretto(): Promise<any> {
    return this.sync.getJson(112,null, false);
  }

  public async getEsame(): Promise<any> {
    return this.sync.getJson(112, null, false);
  }
}
