var express = require('express');
var router = express.Router();
var database = require('./../oracle/database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('>>> UNIDADE <<< - Get Request'); 
  var projecao = JSON.parse(req.query.project);
  var condicao = JSON.parse(req.query.conditional);
  console.log(projecao); 
  console.log(condicao); 
  
  database.SelectUnidades().then((dados) => {//parametros enviados n tao mudando nd
    console.log(dados);
    var array = dados.map((item) => {
       return {
        cod: item.CODIGO_UNIDADE, 
        nome: item.NOME,
        cep: item.CEP, 
        numero: item.NUMERO, 
        complemento: item.COMPLEMENTO,
        email: item.EMAIL, 
        telefones: item.TELEFONES,
        salas: ((item.SALAS)? item.SALAS:'0'),
       };
    });
    res.send({status: 'get unidade ok', data: array}); 
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
});

router.post('/', function(req, res, next) {
  console.log('>>> UNIDADE <<< - Post Request'); 
  var obj = req.body;
  console.log(obj);
  obj.telefones = obj.telefones.join('\',\''); // pro obj telefone ficar ('telf1','telf2')

  var sql = "insert into unidades_escola values("+obj.codigo+", '"+obj.nome+"',\
  ENDERECO_TY("+obj.CEP+","+obj.numero+","+((obj.complemento == '') ? "null" : "'"+obj.complemento+"'") +"), "+obj.email+", \
  TELEFONE_NT('"+obj.telefones+"'), SALA_NT(SALA_TY(null)))";
  
  console.log(sql); 
  database.Insert(sql).then((response) => {
    console.log(response); 
    res.send({status: 'post unidade ok'});
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
});

router.delete('/', function(req, res, next) {
  console.log('Recebido delete!!'); 
  console.log(req.query);
  res.send({status: 'delete unidade ok'});
});

module.exports = router;