var express = require('express');
var router = express.Router();
var database = require('./../oracle/database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('>>> ALUNO <<< - Get Request'); 
  //console.log(req);
  var projecao = JSON.parse(req.query.project);
  console.log("projecao");
  console.log(projecao);
  var condicao = JSON.parse(req.query.conditional);
  console.log('condicao: ', condicao);
  var alunos;
  database.SelectAlunos().then((dados) => {//parametros enviados n tao mudando nd
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
        emergencia: item.CONTATO_EMERGENCIA
       };
    });
    res.send({status: 'get aluno ok', data: array}); 
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
      console.log("Alunos: " + alunos);
      // Para ser excluido e substituido pela conexão ao bd
      var alunos1 = [
        {
            nome: 'Leonardo', 
            cpf: '123412543',  
            dob: '2019-11-20', 
            sexo: 'm', 
            cep: 17065439, 
            numero: 2102, 
            complemento: 'portão verde enferrujado',
            email: 'email1@unesp.com', 
            telefones: ['1234234'], 
            emergencia: '25425635'
        }, */

});


router.post('/', function(req, res, next) {
  console.log('>>> Alunos <<< - Post Request'); 
  var obj = req.body;
  console.log(obj);
  obj.telefones = obj.telefones.join('\',\''); // pro obj telefone ficar ('telf1','telf2')

  var sql = "insert into alunos values(ALUNO_TY("+obj.cpf+", '"+obj.nome+"','"+obj.sexo+"',TO_DATE('"+obj.dob+"','yyyy-mm-dd'),'"+obj.email+"',\
  ENDERECO_TY("+obj.cep+","+obj.numero+","+((obj.complemento == '') ? "null" : "'"+obj.complemento+"'") +"), \
  TELEFONE_NT('"+obj.telefones+"'),'"+obj.emergencia+"', null))";
  console.log(sql); 
  
  database.Insert(sql).then((response) => {
    console.log(response); 
    res.send({status: 'post aluno ok'});
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
  res.send({status: 'delete aluno ok'});
});

module.exports = router;