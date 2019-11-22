import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/app/services/aluno.service';
import { UnidadeService } from 'src/app/services/unidade.service';

@Component({
  selector: 'app-valuno',
  templateUrl: './valuno.component.html',
  styleUrls: ['./valuno.component.sass']
})
export class VAlunoComponent implements OnInit {

  unity = '';

  unidades; 
  alunos; 


  constructor(private bdService: AlunoService, 
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
    this.getAlunos(); 
  }

  ngOnInit() {
  }

  filterStudent(){
    this.getAlunos(); 
  }

  getAlunos(){
    this.bdService.getStudents([''],[this.unity]).subscribe((res: any) => {
      console.log(res.data); 
        switch(res.status){
          case 'get aluno ok': 
            this.alunos = res.data; 
            break;
          default: 
          break;
        }
    });
  }

}
