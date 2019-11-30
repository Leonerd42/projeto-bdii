import { Injectable } from '@angular/core';
import { BancoDeDadosService } from './banco-de-dados.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private db: BancoDeDadosService) { }

  sendProfessor(obj){
    return this.db.insertData('professores', obj);
  }

  getProfessor(project: String[], params: String[]){
      return this.db.selectData('professores', project, params); 
  }
}
