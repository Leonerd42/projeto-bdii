import { Injectable } from '@angular/core';
import { BancoDeDadosService } from './banco-de-dados.service';

@Injectable({
  providedIn: 'root'
})
export class DancaService {

  constructor(private db: BancoDeDadosService) { }

  getStyles(project: String[], params: String[]){
    return this.db.selectData('estilos', project, params); 
  }
}
