import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-raluno',
  templateUrl: './raluno.component.html',
  styleUrls: ['./raluno.component.sass']
})
export class RalunoComponent implements OnInit {

  // Variaveis do formulário
  nome; cpf; dob; sexo; cep;
  numero; complemento; email; 
  emergencia; telefones = [];

  quantPhone = [1];

  alreadyExist: boolean = false; 
  unitySuccess: boolean = false; 
  unknowError: boolean = false; 

  constructor(private bdService: AlunoService) { }

  ngOnInit() {
  }

  sendObject(){
    // Verifica os dados 

    // Cria o objeto 
    var objeto = {
      nome: this.nome, 
      cpf: this.cpf, 
      dob: this.dob, 
      sexo: this.sexo, 
      cep: this.cep, 
      numero: this.numero, 
      complemento: this.complemento, 
      email: this.email, 
      emergencia: this.emergencia, 
      telefones: this.telefones
    }; 

    //envia o dado 
    this.bdService.sendAluno(objeto).subscribe((res: any) => {
      console.log(res); 
      switch(res.status) {
        case 'post aluno ok':
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

  addPhoneNumber(){
    var sizeArray = this.quantPhone.length; 
    if(sizeArray < 4)
      this.quantPhone.push(sizeArray+1);
  } 

  removePhoneNumber(){
    var sizeArray = this.quantPhone.length; 
    if(sizeArray > 1)
      this.quantPhone.pop(); 
  }

  clearData() {
    this.nome = this.cpf = this.sexo = this.dob = this.emergencia = this.numero = this.cep = this.complemento = this.email = ''; 
    this.telefones = []; 
  }

  clearErrors(){
    this.alreadyExist = this.unknowError = false; 
  }

}
