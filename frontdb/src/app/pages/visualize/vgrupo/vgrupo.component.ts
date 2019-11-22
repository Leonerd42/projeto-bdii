import { Component, OnInit } from '@angular/core';
import { GrupoService } from 'src/app/services/grupo.service';
import { UnidadeService } from 'src/app/services/unidade.service';

@Component({
  selector: 'app-vgrupo',
  templateUrl: './vgrupo.component.html',
  styleUrls: ['./vgrupo.component.sass']
})
export class VGrupoComponent implements OnInit {

  unity = '';

  unidades; 
  grupos = [];

  constructor(private bdService: GrupoService,
              private unityService: UnidadeService) {
    this.unityService.selectUnity(['cod','nome'],['']).subscribe((res: any) => {
      console.log(res.data); 
        switch(res.status){
          case 'get unidade ok': 
            this.unidades = res.data; 
            break;
          default: 
          break;
        }
    });
   }

  ngOnInit() {
  }

  updateGroups(){
    this.bdService.getGroups([''],[this.unity]).subscribe((res: any) => {
      console.log(res.data); 
      switch(res.status){
        case 'get grupos ok': 
          this.grupos = res.data; 
          break;
        default: 
        break;
      }
    });
  }

}

/**   ESTRUTURA DO OBJETO GRUPO 
 * {
    unidade: '2', 
    nome_grupo: 'hello world', 
    cod_grupo: '3254', 
    professor: 'nilça', 
    sala: '5', 
    estilos_danca: ['jazz','forro','break'], 
    horarios_treino: ['none'], 
    alunos: ['xu','xa']
  }
 * 
 */
