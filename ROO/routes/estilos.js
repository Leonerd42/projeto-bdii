var express = require('express');
var router = express.Router();
var database = require('./../oracle/database.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('>>> ESTILOS DE DANÇA <<< - Get Request'); 
  var projecao = JSON.parse(req.query.project);
  var condicao = JSON.parse(req.query.conditional);

  try{
      // Buscar o dado no banco de dados 
      // Caso fields.length == 0, buscar todas as tuplas

      // Para ser excluido e substituido pela conexão ao bd
      var estilos = [
          'tango', 
          'hip-hop', 
          'jazz', 
          'break', 
          'arrocha', 
          'samba', 
          'forró', 
          'samba-rock', 
          'valsa'
      ];

      // Enviando resposta ao usuario
      res.send({status: 'get estilos ok', data: estilos}); 
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

});
  
router.delete('/', function(req, res, next) {

});

module.exports = router;