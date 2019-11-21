import { Component, OnInit } from '@angular/core';
import { GrupoService } from 'src/app/services/grupo.service';
import { UnidadeService } from 'src/app/services/unidade.service';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-rgrupo',
  templateUrl: './rgrupo.component.html',
  styleUrls: ['./rgrupo.component.sass']
})
export class RgrupoComponent implements OnInit {

  alreadyExist: boolean = false; 
  unitySuccess: boolean = false; 
  unknowError: boolean = false; 

  // Variaveis retornadas do Banco de dados 
  BDEstilos_danca = []; BDProfessores = []; BDAlunos = []; BDSala = [];

  unidades; 

  //Variaveis únicas do fomulário
  unity = ''; cod_grupo; nome_grupo; professor = ''; sala = ''; 

  //Vetores do fomulário
  alunos = []; estilos_danca = []; horarios_treino = []; 

  // Manipulação do formulário
  InputEstilos = [1]; InputEstudantes = new Array(15);

  constructor(private bdService: GrupoService,
              private unityService: UnidadeService,
              private alunoService: AlunoService) {
    this.unityService.selectUnity(['cod','nome']).subscribe((res: any) => {
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

  sendObject() {
  }

  searchFiels() {
    console.log('foi'); 
    this.alunoService.getStudents(['']).subscribe((res: any) => {
      switch(res.status) {
        case 'get aluno ok':
          this.BDAlunos = res.data; 
          break; 
        default: 
          console.log('erro'); 
          break; 
      }
    });
  }

  addDanceStyle(){
    var sizeArray = this.InputEstilos.length; 
    if(sizeArray < 4)
      this.InputEstilos.push(sizeArray+1);
  }

  removeDanceStyle() {
    var sizeArray = this.InputEstilos.length; 
    if(sizeArray > 1)
      this.InputEstilos.pop(); 
  }

  addStudent(){
    var sizeArray = this.InputEstudantes.length; 
    if(sizeArray < 15)
      this.InputEstudantes.push(sizeArray+1);
  }

  removeStudent(){
    var sizeArray = this.InputEstudantes.length; 
    if(sizeArray > 1)
      this.InputEstudantes.pop(); 
  }

}
