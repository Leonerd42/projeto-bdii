import { Injectable } from '@angular/core';
import { BancoDeDadosService } from './banco-de-dados.service';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private db: BancoDeDadosService) { }

  sendAluno(object){
    return this.db.insertData('aluno', object);
  }


  getStudents(params: String[], conditional: String[]){
    return this.db.selectData('aluno', params, conditional);
  }
}
