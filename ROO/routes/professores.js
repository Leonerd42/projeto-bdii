var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('>>> PROFESSORES <<< - Get Request'); 
  var projecao = JSON.parse(req.query.project);
  var condicao = JSON.parse(req.query.conditional);

  try{
      // Buscar o dado no banco de dados 
      // Caso fields.length == 0, buscar todas as tuplas

      // Para ser excluido e substituido pela conexão ao bd
      var professores = [
        {
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
        }, 
        {
          nome: 'Marcia', 
          cpf: '348923495', 
          pis: '080293849', 
          dob: '1975-06-25', 
          sexo: 'f', 
          cep: 24234, 
          numero: 12, 
          complemento: 'casa rosa',
          email: 'email1@blabla.com', 
          telefones: ['1234234', '234234234', '12312312']
      }
      ];
      // Enviando resposta ao usuario
      res.send({status: 'get professor ok', data: professores}); 
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
  console.log('>>> PROFESSORES <<< - Post Request'); 
  console.log(req.body);
  try{
    // Inserir o dado no banco
    // --->> Inserir com o sql aqui 

    // Enviar a resposta ao usuario
    res.send({status: 'post professor ok'});
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
  console.log('recebido delete request professor');
  res.send({status: 'delete professor ok'});
});

module.exports = router;