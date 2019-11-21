import { Injectable } from '@angular/core';
import { BancoDeDadosService } from './banco-de-dados.service';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private db: BancoDeDadosService) { }

  sendAluno(obj: any){
    return this.db.insertData('aluno', obj); 
  }

  getStudents(params: String[]){
    return this.db.selectData('aluno',params);
  }
}
