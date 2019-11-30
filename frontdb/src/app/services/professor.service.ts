import { Injectable } from '@angular/core';
import { BancoDeDadosService } from './banco-de-dados.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private db: BancoDeDadosService) { }

  sendProfessor(obj){
    return this.db.insertData('professor', obj);
  }

  getProfessor(params: String[], conditional: String[]){
      return this.db.selectData('professor', params, conditional);
  }
}
