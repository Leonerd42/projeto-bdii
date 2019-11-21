import { Injectable } from '@angular/core';
import { BancoDeDadosService } from './banco-de-dados.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private db: BancoDeDadosService) { }

  sendProfessor(obj: any){
    return this.db.insertData('professor', obj); 
  }
}
