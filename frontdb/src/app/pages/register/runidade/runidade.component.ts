import { Component, OnInit } from '@angular/core';
import { UnidadeService } from 'src/app/services/unidade.service';

@Component({
  selector: 'app-runidade',
  templateUrl: './runidade.component.html',
  styleUrls: ['./runidade.component.sass']
})
export class RUnidadeComponent implements OnInit {

  constructor(private bdService: UnidadeService) { }

  // Variaveis para mostrar avisos para o usuario
  alreadyExist: boolean = false; 
  unitySuccess: boolean = false; 
  unknowError: boolean = false; 

  quantPhone = [1];

  // Campos do formulário
  nome; cod; cep; numero; 
  complemento; email; telefones = [];

  ngOnInit() {
  }

  sendObject(){
      // Verificação dos campos 
      var objeto = {
          nome: this.nome, 
          codigo: this.cod, 
          CEP: this.cep, 
          numero: this.numero, 
          complemento: this.complemento, 
          email: this.email, 
          telefones: this.telefones
      }; 
      
      // Enviando os dados ao banco de dados  
      this.bdService.insertUnity(objeto)
      .subscribe((res: any) => {
        console.log(res); 
          switch(res.status) {
            case 'post unidade ok':
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
    this.nome = this.cod = this.numero = this.cep = this.complemento = this.email = ''; 
    this.telefones = []; 
  }

  clearErrors(){
    this.alreadyExist = this.unknowError = false; 
  }
}
