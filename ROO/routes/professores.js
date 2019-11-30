var express = require('express');
var router = express.Router();
var database = require('./../oracle/database.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('>>> PROFESSORES <<< - Get Request'); 
  var projecao = JSON.parse(req.query.project);
  var condicao = JSON.parse(req.query.conditional);
  console.log("projecao");
  console.log(projecao);
  var condicao = JSON.parse(req.query.conditional);
  console.log('condicao: ', condicao);
  var alunos;
  database.SelectProfessores().then((dados) => {//parametros enviados n tao mudando nd
    console.log(dados);
    var array = dados.map((item) => {
       return {
        nome: item.NOME, 
        cpf: item.CPF,  
        dob: item.DATANASCIMENTO, 
        sexo: item.SEXO, 
        cep: item.CEP, 
        numero: item.NUMERO, 
        complemento: item.COMPLEMENTO,
        email: item.EMAIL, 
        telefones: item.TELEFONES, 
        pis: item.NUMERO_PIS
       };
    });
    res.send({status: 'get professor ok', data: array}); 
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
  }*/
});


router.post('/', function(req, res, next) {
  console.log('>>> Professores <<< - Post Request'); 
  var obj = req.body;
  console.log(obj);
  obj.telefones = obj.telefones.join('\',\''); // pro obj telefone ficar ('telf1','telf2')
  //obj.telefones = obj.telefones.replace(",", "','");
  var sql = "insert into professores values(PROFESSOR_TY("+obj.cpf+", '"+obj.nome+"','"+obj.sexo+"',TO_DATE('"+obj.dob+"','yyyy-mm-dd'),'"+obj.email+"',\
  ENDERECO_TY("+obj.cep+","+obj.numero+","+((obj.complemento == '') ? "null" : "'"+obj.complemento+"'") +"), \
  TELEFONE_NT('"+obj.telefones+"'),"+obj.pis+"))";
  console.log(sql); 
  
  database.Insert(sql).then((response) => {
    console.log(response); 
    res.send({status: 'post professor ok'});
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
  console.log('recebido delete request professor');
  res.send({status: 'delete professor ok'});
});

module.exports = router;