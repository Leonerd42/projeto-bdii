import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BancoDeDadosService {

  url = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) {}

  /**
   *    IMPORTANTE 
   * 
   *   >>> ENDPOINT 
   *    Esse parametro deve ser uma string e indicar o caminho da ação a ser feita, 
   *  esse caminho será passado pelos próprios serviços referente a cada tabela de informação 
   *    Os possíveis endpoints são: aluno, apresentacao, grupo, professor, sala, unidade
   * 
   *   >>> PARAMS - selectData 
   * 
   *    Caso você queira buscar campos especificos de uma tupla no banco de dados , passe 
   * os campos que deseja buscar em cada item de um vetor de strings e passe esse vetor como
   * sendo o parametro params. 
   * 
   *  >>> PRIMARYKEY - delete 
   * 
   *    Passe o campo e o valor para que esse dado seje encontrado no banco de dados e excluido.
   */

  insertData(endpoint: String, dados: any){
    // Retorna para o service que chamou
    return this.http.post(`${this.url}/${endpoint}`, dados);
  }

  selectData(endpoint: String, params: Array<String>){
    var keys = '';
    // Pega os parametros passados e coloca na string 
    params.forEach((item, index, array) => keys += item + '&');

    // Retorna para o service chamado
    return this.http.get(`${this.url}/${endpoint}?${keys}`);
  }

  deleteData(endpoint: String, primaryKey: String) {
    return this.http.delete(`${this.url}/${endpoint}?${primaryKey}`);
  }  
}
