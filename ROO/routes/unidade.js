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
        telefones: item.TELEFONES 
        //salas: item.SALAS
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

  /*try{
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
  }*/
});

router.post('/', function(req, res, next) {
  console.log('>>> UNIDADE <<< - Post Request'); 
  var obj = req.body;
  console.log(obj);
  obj.telefones = obj.telefones.join('\',\''); // pro obj telefone ficar ('telf1','telf2')

  var sql = "insert into unidades_escola values("+obj.codigo+", '"+obj.nome+"',\
  ENDERECO_TY("+obj.CEP+","+obj.numero+","+((obj.complemento == '') ? "null" : "'"+obj.complemento+"'") +"), "+obj.email+", \
  TELEFONE_NT('"+obj.telefones+"'), null)";
  
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