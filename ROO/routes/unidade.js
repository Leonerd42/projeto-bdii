var express = require('express');
var router = express.Router();
var database = require('./../oracle/database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('>>> UNIDADE <<< - Get Request'); 
  var projecao = JSON.parse(req.query.project);
  var condicao = JSON.parse(req.query.conditional);

  try{
      // Buscar o dado no banco de dados 
      // Caso fields.length == 0, buscar todas as tuplas

      // Para ser excluido e substituido pela conexão ao bd
      var unidades = [
        {
            cod: 1, 
            nome: 'Bauru', 
            cep: 123123, 
            numero: 12, 
            complemento: '',
            email: 'email1@blabla.com', 
            telefones: ['telefone1', 'telefone2', 'telefone3']
        }, 
        {
            cod: 2, 
            nome: 'Piratininga', 
            cep: 1324, 
            numero: 56, 
            complemento: 'apartamento 3',
            email: 'email2@olaola.com', 
            telefones: ['123123', '67686', '34234']
        }, 
        {
            cod: 3, 
            nome: 'São Paulo', 
            cep: 3135763, 
            numero: 11, 
            complemento: 'casa branca, portão verde',
            email: 'email1@yahoo.com', 
            telefones: ['123123123']
        },
        {
            cod: 4, 
            nome: 'Marilia', 
            cep: 78900, 
            numero: 123, 
            complemento: '',
            email: 'jkkkjkl@asas.com', 
            telefones: ['12314324', '34234324', '34234', '123123123']
        },
        {
            cod: 5, 
            nome: 'Adamantina', 
            cep: 1234325, 
            numero: 98, 
            complemento: '',
            email: 'roça@vacaeboi.com', 
            telefones: ['123123123', '123123123']
        }
      ];
      // Enviando resposta ao usuario
      res.send({status: 'get unidade ok', data: unidades}); 
  } catch(e){
    switch (e) {
      case 1:
          res.send({status: 'not-found'}); 
        break;
    
      default:
          res.send({status: 'unknow-error'}); 
        break;
    }
  }
});

router.post('/', function(req, res, next) {
  console.log('>>> UNIDADE <<< - Post Request'); 
  console.log(req.body);
  try{
    // Inserir o dado no banco
    // --->> Inserir com o sql aqui 

    // Enviar a resposta ao usuario
    res.send({status: 'post unidade ok'});
  } catch(e){
    // Dependendo da conexão com o banco retorna esses tipos de erros;
    switch (e) {
      case 1:
         res.send({status: 'already-exists'});
        break;
    
      default:
          res.send({status: 'unknown-error'});
        break;
    }
  }
 
});

router.delete('/', function(req, res, next) {
  console.log('Recebido delete!!'); 
  console.log(req.query);
  res.send({status: 'delete unidade ok'});
});

module.exports = router;