import { Injectable } from '@angular/core';
import { BancoDeDadosService } from './banco-de-dados.service';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(private db: BancoDeDadosService) { }

  sendRoom(obj: any) {
    return this.db.insertData('salas', obj);
  }
}
