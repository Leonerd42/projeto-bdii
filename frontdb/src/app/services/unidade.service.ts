import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BancoDeDadosService } from './banco-de-dados.service';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {

  constructor(private dbService: BancoDeDadosService) { 
  }

  // Inserir uma nova unidade
  insertUnity(object){
    return this.dbService.insertData('unidade', object);
  }

  // Ler somente o código da unidade e o nome dela 
  selectUnity(params: String[], conditional: String[]){
    return this.dbService.selectData('unidade',params, conditional);
  }
}
