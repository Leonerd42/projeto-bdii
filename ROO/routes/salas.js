var express = require('express');
var router = express.Router();
var database = require('./../oracle/database.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('>>> SALAS <<< - Get Request'); 
  var projecao = JSON.parse(req.query.project);
  console.log("projecao:")
  console.log(projecao);
  var condicao = JSON.parse(req.query.conditional);
  console.log("condicao:")
  console.log(condicao.params[0]);
  var sql_condicao = "";
  if(condicao.params[0] != "") sql_condicao ="where un.codigo_unidade = "+condicao.params[0];
  var sql = "select s.* from unidades_escola un, TABLE(un.salas) s "+sql_condicao;
  database.SelectSalas(sql).then((response) => {
    var salas = response.map((item) => {
      return {
        cod_sala : item.CODIGO_SALA
      };
   });
    console.log(response); 
    res.send({status: 'get salas ok', data: salas}); 
  }).catch((e) =>{
    switch (e) {
      case 1:
          res.send({status: 'not-found'}); 
        break;
    
      default:
          res.send({status: 'unknow-error'}); 
        break;
    }
  })
});


router.post('/', function(req, res, next) {
  console.log('>>> SALAS <<< - Post Request'); 
  console.log(req.body);
  
  var obj = req.body;
  console.log(obj);
  if(obj.sala_cod != null || obj.sala_cod != undefined){
  //var sql = "insert into (Select TABLE(a.Salas) from unidades_escola a where a.codigo_unidade = "+obj.unity_cod+") values(SALA_TY("+obj.sala_cod+", '"+obj.sala_description+"'))";
    var sql = "insert into TABLE(Select salas from unidades_escola un where un.codigo_unidade ="+obj.unity_cod+") \
      values(SALA_TY("+obj.sala_cod+"))";
    //falta adicionar descricao pq o tipo SALA_TY n tem descricao
    console.log(sql); 
    
    database.Insert(sql).then((response) => {
      console.log(response); 
      res.send({status: 'post salas ok'});  
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
  }
});
  
router.delete('/', function(req, res, next) {
    res.send({status: 'delete salas ok'});
});

module.exports = router;