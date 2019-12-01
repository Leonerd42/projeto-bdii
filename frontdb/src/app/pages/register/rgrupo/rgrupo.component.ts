import { Component, OnInit } from '@angular/core';
import { GrupoService } from 'src/app/services/grupo.service';
import { UnidadeService } from 'src/app/services/unidade.service';
import { AlunoService } from 'src/app/services/aluno.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { SalaService } from 'src/app/services/sala.service';
import { DancaService } from 'src/app/services/danca.service';

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
  alunos = []; estilos_danca = []; horarios_treino = ''; 

  // Manipulação do formulário
  InputEstilos = [1]; InputEstudantes = new Array(15);

  //Dias da semana
  weekDays = [false, false, false, false, false, false, false];
  nameDaysWeek = ['segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sabado','domingo'];
  hora;

  constructor(private bdService: GrupoService,
              private unityService: UnidadeService,
              private alunoService: AlunoService, 
              private professorService: ProfessorService, 
              private salasService: SalaService, 
              private dancaService: DancaService) {
    for(let i =0; i<15; i++)
      this.alunos[i] = '';
      
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

  sendObject() {
    // Verificação de dados 

    // Criando o objeto 
    var grupo = {
      unidade: this.unity, 
      nome_grupo: this.nome_grupo, 
      cod_grupo: this.cod_grupo, 
      professor: this.professor, 
      sala: this.sala, 
      estilos_danca: this.estilos_danca, 
      horarios_treino: this.horarios_treino, 
      alunos: this.alunos
    };

    this.bdService.insertGroup(grupo).subscribe((res: any) => {
      switch(res.status) {
        case 'post grupo ok':
            console.log('dado inserido com sucesso!!!'); 
            this.clearErrors(); 
            this.unitySuccess = true; 
            setTimeout(() => {
              // Removendo o aviso depois de algum tempo!
              this.clearData(); 
              this.unitySuccess = false; 
            }, 4000);
            break;
          case 'already-exits': 
            this.alreadyExist = true; 
            break; 
          default: 
            this.unknowError = true; 
            break; 
      }
    });
  }

  searchFiels() {
    console.log('foi'); 
    // Selecionando os alunos
    this.alunoService.getStudents(['nome','cpf'],[this.unity]).subscribe((res: any) => {
      switch(res.status) {
        case 'get aluno ok':
          this.BDAlunos = res.data; 
          break; 
        default: 
          console.log('erro'); 
          break; 
      }
    });

    // Selecionando os professores 
    this.professorService.getProfessor(['nome','cpf'],[this.unity]).subscribe((res: any) => {
      switch(res.status) {
        case 'get professor ok':
          this.BDProfessores = res.data; 
          break; 
        default: 
          console.log('erro'); 
          break; 
      }
    });

    this.salasService.getRoom([''],[this.unity]).subscribe((res: any) => {
      switch(res.status) {
        case 'get salas ok':
          this.BDSala = res.data; 
          break; 
        default: 
          console.log('erro'); 
          break; 
      }
    });

    this.dancaService.getStyles([''],['']).subscribe((res: any)=>{
      switch(res.status) {
        case 'get estilos ok':
          this.BDEstilos_danca = res.data; 
          console.log(res.data);
          break; 
        default: 
          console.log('erro'); 
          break; 
      }
    });
  }

  // registerTime(){
  //   console.log(this.weekDays)
  //   var days = ''; 
  //   this.weekDays.forEach((item, index) => {
  //      if(item){
  //         days += `${this.nameDaysWeek[index]}, `; 
  //      }
  //   });
  //   // save data 
  //   var horario = {
  //     dias_semana: days, 
  //     horario: this.hora
  //   };

  //   this.horarios_treino.push(horario);
  //   // clear 
  //   this.weekDays = [false, false, false, false, false, false, false];
  //   this.hora = '';
  // }

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

  clearData() {
    this.cod_grupo = this.unity = this.nome_grupo = this.professor = this.sala = this.horarios_treino =  ''; 
    this.estilos_danca = []; 
    for(let i = 0; i < 15; i++)
      this.alunos[i] = '';
    this.weekDays = [false, false, false, false, false, false, false];
  }

  clearErrors(){
    this.alreadyExist = this.unknowError = false; 
  }

}
