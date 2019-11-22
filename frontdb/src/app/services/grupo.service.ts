import { Injectable } from '@angular/core';
import { BancoDeDadosService } from './banco-de-dados.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private db: BancoDeDadosService) {

   }

   insertGroup(obj: any){
     return this.db.insertData('grupo',obj); 
   }

   getGroups(project: String[], conditional: String[]){
     return this.db.selectData('grupo',project,conditional); 
   }
}
