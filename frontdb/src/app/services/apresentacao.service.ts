import { Injectable } from '@angular/core';
import { BancoDeDadosService } from './banco-de-dados.service';

@Injectable({
  providedIn: 'root'
})
export class ApresentacaoService {

  constructor(private db: BancoDeDadosService) { }

  sendPresentation(apre: any){
    return this.db.insertData('apresentacao', apre);
  }

  getPresentation(project: String[], conditional: String[]){
    return this.db.selectData('apresentacao', project, conditional);
  }
}
