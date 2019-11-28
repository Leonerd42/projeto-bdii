var express = require('express');
var router = express.Router();
var database = require('./../oracle/database.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('>>> SALAS <<< - Get Request'); 
  var projecao = JSON.parse(req.query.project);
  var condicao = JSON.parse(req.query.conditional);
  try{
        // Buscar o dado no banco de dados 
        // Caso fields.length == 0, buscar todas as tuplas

        // Para ser excluido e substituido pela conexão ao bd
        var salas = [
          {
             cod_unity: 1, 
             cod_sala: 1, 
             description: 'kajsdlaslkd'
          },
          {
            cod_unity: 1, 
            cod_sala: 2, 
            description: 'aksjdkaskd as ksdç a'
          },
          {
            cod_unity: 1, 
            cod_sala: 3, 
            description: 'lks dskdj '
          }
        ];
        // Enviando resposta ao usuario
        res.send({status: 'get salas ok', data: salas}); 
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
  console.log('>>> SALAS <<< - Post Request'); 
  console.log(req.body);
  try{
    // Inserir o dado no banco
    // --->> Inserir com o sql aqui 

    // Enviar a resposta ao usuario
    res.send({status: 'post salas ok'});
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
    res.send({status: 'delete salas ok'});
});

module.exports = router;