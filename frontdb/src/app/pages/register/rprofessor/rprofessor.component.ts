import { Component, OnInit } from '@angular/core';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-rprofessor',
  templateUrl: './rprofessor.component.html',
  styleUrls: ['./rprofessor.component.sass']
})
export class RProfessorComponent implements OnInit {

  // Avisos 
  // Variaveis para mostrar avisos para o usuario
  alreadyExist: boolean = false; 
  unitySuccess: boolean = false; 
  unknowError: boolean = false; 

  nome; cpf; dob; sexo; cep;
  numero; complemento; email; 
  pis; telefones = [];

  quantPhone = [1];

  constructor(private bdService: ProfessorService) { }

  ngOnInit() {
  }

  sendObject(){
    // Fazer verificação dos campos 

    // Enviando o objeto 
    var objeto = {
      nome: this.nome, 
      cpf: this.cpf, 
      dob: this.dob, 
      sexo: this.sexo, 
      cep: this.cep, 
      numero: this.numero, 
      complemento: this.complemento, 
      email: this.email, 
      pis: this.pis, 
      telefones: this.telefones
    }; 

    // 
    this.bdService.sendProfessor(objeto).subscribe((res: any) => {
        switch(res.status) {
          case 'post professor ok':
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
    this.nome = this.cpf = this.sexo = this.dob = this.pis = this.numero = this.cep = this.complemento = this.email = ''; 
    this.telefones = []; 
  }

  clearErrors(){
    this.alreadyExist = this.unknowError = false; 
  }
}
