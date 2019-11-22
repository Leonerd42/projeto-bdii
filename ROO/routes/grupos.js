var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('>>> GRUPOS <<< - Get Request'); 
  var projecao = JSON.parse(req.query.project);
  var condicao = JSON.parse(req.query.conditional);
  try{
        // Buscar o dado no banco de dados 
        // Caso fields.length == 0, buscar todas as tuplas

        // Para ser excluido e substituido pela conexão ao bd
        var grupos = [
          {
            unidade: '1', 
            nome_grupo: 'hakuna matata', 
            cod_grupo: '252', 
            professor: 'xuriço', 
            sala: '3', 
            estilos_danca: ['jazz','forro','break'], 
            horarios_treino: ['none'], 
            alunos: ['xu','xa']
          },
          {
            unidade: '2', 
            nome_grupo: 'hello world', 
            cod_grupo: '3254', 
            professor: 'nilça', 
            sala: '5', 
            estilos_danca: ['jazz','forro','break'], 
            horarios_treino: ['none'], 
            alunos: ['xu','xa']
          }
        ];
        // Enviando resposta ao usuario
        res.send({status: 'get grupos ok', data: grupos}); 
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
  console.log('>>> GRUPOS <<< - Post Request'); 
  console.log(req.body);
  try{
    // Inserir o dado no banco
    // --->> Inserir com o sql aqui 

    // Enviar a resposta ao usuario
    res.send({status: 'post grupo ok'});
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
    res.send('grupos');
  });

module.exports = router;