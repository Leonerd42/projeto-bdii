var express = require('express');
var router = express.Router();
var database = require('./../oracle/database.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('>>> GRUPOS <<< - Get Request'); 
  var projecao = JSON.parse(req.query.project);
  var condicao = JSON.parse(req.query.conditional);
  console.log(condicao.params[0]);
  database.SelectGrupos(condicao.params[0]).then((dados) => {//parametros enviados n tao mudando nd
    console.log(dados);
    var grupos = dados.map((item) => {
       return {
        unidade: item.UNIDADE, 
        nome_grupo: item.NOME_GRUPO, 
        cod_grupo: item.COD_GRUPO, 
        professor: item.PROFESSOR, 
        sala: item.SALA, 
        estilos_danca: item.ESTILOS_DANCA, 
        //horarios_treino: ['none'],
        horario_inicio: item.INICIO,
        horario_fim: item.FIM, 
        alunos: item.ALUNOS
       };
    });
    res.send({status: 'get grupos ok', data: grupos}); 
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
    }*/
});



router.post('/', function(req, res, next) {
  console.log('>>> GRUPOS <<< - Post Request'); 
  console.log(req.body);
  var obj = req.body;
  //console.log(obj.estilos_danca.length);
  var sql = "Insert into Grupos values (Grupo_TY("+obj.cod_grupo+",'"+obj.nome_grupo+"',Estilo_danca_NT(";
  for(var i =0; i<obj.estilos_danca.length;i++){
    if(i == 0) {
      sql+= "Estilo_danca_TY('"+obj.estilos_danca[i]+"')";
    }else{
      sql+= ",Estilo_danca_TY('"+obj.estilos_danca[i]+"')";
    }
  }
  sql+= ")))";
  var erros = 0;
  database.Insert(sql).then((response) => {
    console.log(response); 
    for(var i =0;i< obj.alunos.length;i++){
      if(obj.alunos[i] != ''){
        sql = "update alunos set Grupo = (select ref(f) from Grupos f where f.codigo_grupo ="+obj.cod_grupo+") where alunos.cpf = "+obj.alunos[i];
        database.Insert(sql).then((response) =>{
          console.log(response);
          console.log("aluno "+obj.alunos[i] + " ok");
        }).catch((err) => {
          console.log(err);
          erros++;
          console.log("Erro aluno "+obj.alunos[i]);
        })
      }
    }
    sql = "insert into ministra values (Ministra_TY((select ref(p) from professores p where p.CPF = "+obj.professor+"),(select ref(h) from horarios h where h.codigo_horario = "+obj.horarios_treino+"),"+obj.sala+",(select ref(u) from unidades_escola u where u.codigo_unidade ="+obj.unidade+"),(select ref(g) from grupos g where g.codigo_grupo = "+obj.cod_grupo+")))";
    database.Insert(sql).then((response) =>{
      console.log(response);
      console.log("ministra ok");
    }).catch((err) => {
      console.log(err);
      erros++;
      console.log("Erro ministra ");
    })
    if(erros ==0)res.send({status: 'post grupo ok'});
    else res.send({status: 'unknown-error'});
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
    res.send('grupos');
  });

module.exports = router;