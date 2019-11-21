import { Component, OnInit } from '@angular/core';
import { SalaService } from 'src/app/services/sala.service';
import { UnidadeService } from 'src/app/services/unidade.service';

@Component({
  selector: 'app-rsala',
  templateUrl: './rsala.component.html',
  styleUrls: ['./rsala.component.sass']
})
export class RsalaComponent implements OnInit {

  // Avisos 
  alreadyExist: boolean = false; 
  unitySuccess: boolean = false; 
  unknowError: boolean = false; 

  unity; cod; description; 

  unidades; 

  constructor(private bdService: SalaService, private unityService: UnidadeService) {
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
    // Fazer verificação 

    // Criando o objeto sala 
    var objeto = {
      unity_cod: this.unity, 
      sala_cod: this.cod, 
      sala_description: this.description
    }; 

    this.bdService.sendRoom(objeto).subscribe((res: any) => {
      switch(res.status) {
        case 'post salas ok':
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

  clearData() {
    this.cod = this.unity = this.description = ''; 
  }

  clearErrors(){
    this.alreadyExist = this.unknowError = false; 
  }
}
