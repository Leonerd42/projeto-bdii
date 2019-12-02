var express = require('express');
var router = express.Router();
var database = require('./../oracle/database.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('>>> APRESENTAÇÃO <<< - Get Request'); 
  var projecao = JSON.parse(req.query.project);
  var condicao = JSON.parse(req.query.conditional);
  var sql = "Select codigo_apresentacao,a.codigo_grupo.nome as nome_grupo, lugar, data_apresentacao, horario from apresentacoes a"
  database.SelectApresentacoes(sql).then((dados) => {//parametros enviados n tao mudando nd
    console.log(dados);
    var grupos = dados.map((item) => {
       return {
        nome_grupo: item.NOME_GRUPO, 
        cod_apresentacao: item.CODIGO_APRESENTACAO, 
        local: item.LUGAR, 
        data: item.DATA_APRESENTACAO, 
        horario: item.HORARIO
       };
    });
    res.send({status: 'get apresentacao ok', data: grupos}); 
  }).catch((e) => {
    switch (e) {
      case 1:
          res.send({status: 'not-found', data: e}); 
        break;
    
      default:
          res.send({status: 'unknow-error', data : e}); 
        break;
    }
    console.log(e);
  } );
    /*try{
          // Buscar o dado no banco de dados 
          // Caso fields.length == 0, buscar todas as tuplas
  
          // Para ser excluido e substituido pela conexão ao bd
          var apresentacao = [
            {
               cod_grupo: 1, 
               cod_apresentacao: 1, 
               local: 'kajsdlaslkd', 
               datetime: 'asasa'
            }
          ];
          // Enviando resposta ao usuario
          res.send({status: 'get apresentacao ok', data: apresentacao}); 
      } catch(e){
        switch (e) {
          case 1:
              res.send({status: 'not-found'}); 
            break;
        
          default:
              res.send({status: 'unknow-error'}); 
            break;
        }
      }*/
  });
  

  router.post('/', function(req, res, next) {
    console.log('>>> apresentacao <<< - Post Request'); 
    console.log(req.body);
    var obj = req.body;
    var sql = "insert into apresentacoes values(Apresenta_TY("+obj.cod_apresentacao+",\
      (select ref(f) from Grupos f where f.codigo_grupo ="+obj.cod_grupo+"),'"+obj.local+"',\
      TO_DATE('"+obj.data+"','yyyy-mm-dd'),'"+obj.horario+"'))";
    //falta adicionar descricao pq o tipo SALA_TY n tem descricao
    console.log(sql); 
    
    database.Insert(sql).then((response) => {
      console.log(response); 
      res.send({status: 'post apresentacao ok'});  
    }).catch((err) => {
      console.log(err);
      switch (err.errorNum) {
        case 1:
          res.send({status: 'already-exists'});
          break;
      
        default:
            res.send({status: 'unknown-error'});
        break;
      }
    });
    /*try{
     /* // Inserir o dado no banco
      // --->> Inserir com o sql aqui 
  
      // Enviar a resposta ao usuario
      res.send({status: 'post apresentacao ok'});
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
    }*/
    });
    
  
router.delete('/', function(req, res, next) {
    res.send('unidade');
});
module.exports = router;