import { Component, OnInit } from '@angular/core';
import { ProfessorService } from 'src/app/services/professor.service';
import { UnidadeService } from 'src/app/services/unidade.service';

@Component({
  selector: 'app-vprofessor',
  templateUrl: './vprofessor.component.html',
  styleUrls: ['./vprofessor.component.sass']
})
export class VProfessorComponent implements OnInit {

  unity = '';

  unidades; 
  professores; 

  constructor(private bdService: ProfessorService, 
              private unityService: UnidadeService) { 
    this.unityService.selectUnity([''],['']).subscribe((res: any) => {
      console.log(res.data); 
        switch(res.status){
          case 'get unidade ok': 
            this.unidades = res.data; 
            break;
          default: 
          break;
        }
    });

    this.getProfessores(); 
  }

  getProfessores(){
    this.bdService.getProfessor([''],[this.unity]).subscribe((res: any) => {
      console.log(res.data); 
        switch(res.status){
          case 'get professor ok': 
            this.professores = res.data; 
            break;
          default: 
          break;
        }
    });
  }

  ngOnInit() {
  }

  filterProfessor(){
    console.log('filtrando professores'); 
    this.getProfessores(); 
  }

}


/**   FORMATO DE UM OBJETO PROFESSOR 
 * {
            nome: 'Nilceu', 
            cpf: '123123123', 
            pis: '112313123', 
            dob: '1970-08-12', 
            sexo: 'm', 
            cep: 123123, 
            numero: 12, 
            complemento: '',
            email: 'email1@blabla.com', 
            telefones: ['1234234', '234234234', '12312312']
        }
 */