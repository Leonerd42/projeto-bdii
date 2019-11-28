var express = require('express');
var router = express.Router();
var database = require('./../oracle/database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('>>> ALUNO <<< - Get Request'); 
  var projecao = JSON.parse(req.query.project);
  var condicao = JSON.parse(req.query.conditional);

  try{
      // Buscar o dado no banco de dados 
      // Caso fields.length == 0, buscar todas as tuplas

      // Para ser excluido e substituido pela conexão ao bd
      var alunos = [
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
        }, 
        {
          nome: 'Pedro', 
          cpf: '12378812398',  
          dob: '2019-07-19', 
          sexo: 'm', 
          cep: 554535, 
          numero: 112, 
          complemento: '',
          email: '12313@unesp.com', 
          telefones: ['1234234', '91823913'], 
          emergencia: '25425635'
        }, 
        {
          nome: 'Tania', 
          cpf: '98796765',  
          dob: '2019-11-09', 
          sexo: 'f', 
          cep: 123123132, 
          numero: 2102, 
          complemento: '',
          email: 'tania@unesp.com', 
          telefones: ['1234234'], 
          emergencia: '25425635'
        },{
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
      }, 
      {
        nome: 'Pedro', 
        cpf: '12378812398',  
        dob: '2019-07-19', 
        sexo: 'm', 
        cep: 554535, 
        numero: 112, 
        complemento: '',
        email: '12313@unesp.com', 
        telefones: ['1234234', '91823913'], 
        emergencia: '25425635'
      }, 
      {
        nome: 'Tania', 
        cpf: '98796765',  
        dob: '2019-11-09', 
        sexo: 'f', 
        cep: 123123132, 
        numero: 2102, 
        complemento: '',
        email: 'tania@unesp.com', 
        telefones: ['1234234'], 
        emergencia: '25425635'
      },{
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
    }, 
    {
      nome: 'Pedro', 
      cpf: '12378812398',  
      dob: '2019-07-19', 
      sexo: 'm', 
      cep: 554535, 
      numero: 112, 
      complemento: '',
      email: '12313@unesp.com', 
      telefones: ['1234234', '91823913'], 
      emergencia: '25425635'
    }, 
    {
      nome: 'Tania', 
      cpf: '98796765',  
      dob: '2019-11-09', 
      sexo: 'f', 
      cep: 123123132, 
      numero: 2102, 
      complemento: '',
      email: 'tania@unesp.com', 
      telefones: ['1234234'], 
      emergencia: '25425635'
    } ,{
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
  }, 
  {
    nome: 'Pedro', 
    cpf: '12378812398',  
    dob: '2019-07-19', 
    sexo: 'm', 
    cep: 554535, 
    numero: 112, 
    complemento: '',
    email: '12313@unesp.com', 
    telefones: ['1234234', '91823913'], 
    emergencia: '25425635'
  }, 
  {
    nome: 'Tania', 
    cpf: '98796765',  
    dob: '2019-11-09', 
    sexo: 'f', 
    cep: 123123132, 
    numero: 2102, 
    complemento: '',
    email: 'tania@unesp.com', 
    telefones: ['1234234'], 
    emergencia: '25425635'
  } ,{
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
}, 
{
  nome: 'Pedro', 
  cpf: '12378812398',  
  dob: '2019-07-19', 
  sexo: 'm', 
  cep: 554535, 
  numero: 112, 
  complemento: '',
  email: '12313@unesp.com', 
  telefones: ['1234234', '91823913'], 
  emergencia: '25425635'
}, 
{
  nome: 'Tania', 
  cpf: '98796765',  
  dob: '2019-11-09', 
  sexo: 'f', 
  cep: 123123132, 
  numero: 2102, 
  complemento: '',
  email: 'tania@unesp.com', 
  telefones: ['1234234'], 
  emergencia: '25425635'
} ,{
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
        }, 
        {
          nome: 'Pedro', 
          cpf: '12378812398',  
          dob: '2019-07-19', 
          sexo: 'm', 
          cep: 554535, 
          numero: 112, 
          complemento: '',
          email: '12313@unesp.com', 
          telefones: ['1234234', '91823913'], 
          emergencia: '25425635'
        }, 
        {
          nome: 'Tania', 
          cpf: '98796765',  
          dob: '2019-11-09', 
          sexo: 'f', 
          cep: 123123132, 
          numero: 2102, 
          complemento: '',
          email: 'tania@unesp.com', 
          telefones: ['1234234'], 
          emergencia: '25425635'
        },{
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
      }, 
      {
        nome: 'Pedro', 
        cpf: '12378812398',  
        dob: '2019-07-19', 
        sexo: 'm', 
        cep: 554535, 
        numero: 112, 
        complemento: '',
        email: '12313@unesp.com', 
        telefones: ['1234234', '91823913'], 
        emergencia: '25425635'
      }, 
      {
        nome: 'Tania', 
        cpf: '98796765',  
        dob: '2019-11-09', 
        sexo: 'f', 
        cep: 123123132, 
        numero: 2102, 
        complemento: '',
        email: 'tania@unesp.com', 
        telefones: ['1234234'], 
        emergencia: '25425635'
      }  
      ];
      // Enviando resposta ao usuario
      res.send({status: 'get aluno ok', data: alunos}); 
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
  console.log('>>> ALUNO <<< - Post Request'); 
  console.log(JSON.parse(req.body));
  try{
    // Inserir o dado no banco
    // --->> Inserir com o sql aqui 

    // Enviar a resposta ao usuario
    res.send({status: 'post aluno ok'});
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
  res.send({status: 'delete aluno ok'});
});

module.exports = router;