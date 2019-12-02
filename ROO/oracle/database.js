var oracledb = require('oracledb'); 
oracledb.autoCommit = true;
var config = require('./dbconfig'); 
var connection;

module.exports = {
    Connect: async function () {
        console.log(config); 
        try {
            connection = await oracledb.getConnection(config);
            console.log('>>> Conectado ao banco <<< ');
        } catch (e) {
            console.log(e);
        }
    }, 
    Insert: async function (sql) {
        console.log(">>> Inserindo no banco <<< SQL: "+ sql)
        let  binds, options, result; 
        binds = {};
        options = {
        outFormat: oracledb.OBJECT   // query result format
        // extendedMetaData: true,   // get extra metadata
        // fetchArraySize: 100       // internal buffer allocation size for tuning 
        };

        result = await connection.execute(sql, binds, options);
        return result; 
    }, 
    Select: async function (){
        let sql, binds, options, result; 

        sql = `SELECT Nome FROM alunos`;
        binds = {};
        options = {
        outFormat: oracledb.OBJECT   // query result format
        // extendedMetaData: true,   // get extra metadata
        // fetchArraySize: 100       // internal buffer allocation size for tuning 
        };

        result = await connection.execute(sql, binds, options);
        return result; 
    },
    SelectAlunos: async function (){
        let sql, binds, options, result;         
        sql ="Select al.CPF,al.NOME,al.SEXO,al.DATANASCIMENTO,al.EMAIL,al.CONTATO_EMERGENCIA,al.endereco.cep as cep, \
        al.endereco.numero as numero, al.endereco.complemento as complemento,  \
        tabe.telefones From (SELECT CPF, LISTAGG(telefone,',') WITHIN GROUP (ORDER BY telefone) AS Telefones \
        From (Select a.CPF as CPF,t.column_value as telefone from alunos a, TABLE(a.Telefones) t) tab GROUP BY CPF) tabe, \
        alunos al where al.cpf = tabe.cpf order by al.nome" ;
        binds = {};
        options = {
        outFormat: oracledb.OBJECT   // query result format
        // extendedMetaData: true,   // get extra metadata
        // fetchArraySize: 100       // internal buffer allocation size for tuning
        };
        
        result = await connection.execute(sql, binds, options);
        //console.log(result);
        //console.log(result.rows);
        return result.rows; 
    },
    SelectProfessores: async function (){
        let sql, binds, options, result; 
        
        sql ="Select pr.CPF,pr.NOME,pr.SEXO,pr.DATANASCIMENTO,pr.EMAIL,pr.endereco.cep as cep, pr.endereco.numero as numero, pr.endereco.complemento as complemento,pr.NUMERO_PIS,  tabe.telefones From (SELECT CPF, LISTAGG(telefone,',') WITHIN GROUP (ORDER BY telefone) AS Telefones From (Select a.CPF as CPF,t.column_value as telefone from professores a, TABLE(a.Telefones) t) tab GROUP BY CPF) tabe, professores pr where pr.cpf = tabe.cpf order by pr.nome" ;
        binds = {};
        options = {
        outFormat: oracledb.OBJECT   // query result format
        // extendedMetaData: true,   // get extra metadata
        // fetchArraySize: 100       // internal buffer allocation size for tuning
        };
        
        result = await connection.execute(sql, binds, options);
        //console.log(result);
        //console.log(result.rows);
        return result.rows; 
    },
    SelectUnidades: async function (){
        let sql, binds, options, result; 
        sql ="Select un.CODIGO_UNIDADE,un.NOME,un.EMAIL,un.endereco.cep as cep, un.endereco.numero as numero, un.endereco.complemento as complemento,\
        rooms.SALAS, \
        tabe.telefones From (SELECT CODIGO_UNIDADE, LISTAGG(telefone,',') WITHIN GROUP (ORDER BY telefone) AS Telefones From (Select a.codigo_unidade as CODIGO_UNIDADE,t.column_value as telefone from unidades_escola a, TABLE(a.Telefones) t) tab GROUP BY CODIGO_UNIDADE) tabe, \
        (SELECT CODIGO_UNIDADE, LISTAGG(CODIGO_SALA,',') WITHIN GROUP (ORDER BY CODIGO_SALA) AS SALAS FROM(Select un.codigo_unidade, s.* from unidades_escola un, TABLE(un.salas) s) GROUP BY CODIGO_UNIDADE) rooms, \
        unidades_escola un where un.codigo_unidade = tabe.codigo_unidade and un.codigo_unidade = rooms.codigo_unidade order by un.nome" ;
        binds = {};
        options = {
        outFormat: oracledb.OBJECT   // query result format
        // extendedMetaData: true,   // get extra metadata
        // fetchArraySize: 100       // internal buffer allocation size for tuning
        };
        
        result = await connection.execute(sql, binds, options);
        //console.log(result);
        //console.log(result.rows);
        return result.rows; 
    },
    SelectSalas: async function (sql){
        let  binds, options, result; 
        binds = {};
        options = {
        outFormat: oracledb.OBJECT   // query result format
        // extendedMetaData: true,   // get extra metadata
        // fetchArraySize: 100       // internal buffer allocation size for tuning
        };
        
        result = await connection.execute(sql, binds, options);
        //console.log(result);
        //console.log(result.rows);
        return result.rows; 
    },
    SelectGrupos: async function (unidade){
        let sql_unidade = "";
        if(unidade != "") sql_unidade = "and m.codigo_unidade.codigo_unidade = "+unidade;
        let sql, binds, options, result; 
        sql ="select m.codigo_unidade.codigo_unidade as unidade,\
        m.codigo_grupo.nome as nome_grupo, m.codigo_grupo.codigo_grupo as cod_grupo,\
        m.professor_cpf.nome as professor,m.codigo_sala as sala,\
        m.codigo_hora.hora_inicio as inicio,m.codigo_hora.hora_fim as fim,\
        alunos1.Nomes as alunos,dances.Estilos_dancas as estilos_danca From \
        (SELECT CODIGO_GRUPO, LISTAGG(danca,',') WITHIN GROUP (ORDER BY danca) AS Estilos_Dancas From (Select a.codigo_grupo as CODIGO_GRUPO,t.nome as danca from grupos a, TABLE(a.Estilos_Dancas) t) tab GROUP BY CODIGO_GRUPO) dances,\
        (SELECT codigo_grupo, LISTAGG(nome,',') WITHIN GROUP (ORDER BY nome) AS Nomes From (select m.codigo_grupo.codigo_grupo as codigo_grupo,alunos.nome as nome from alunos,ministra m where alunos.grupo = m.codigo_grupo) group by codigo_grupo) alunos1, \
        ministra m where dances.CODIGO_GRUPO = m.codigo_grupo.codigo_grupo and alunos1.codigo_grupo = m.codigo_grupo.codigo_grupo "
        +sql_unidade ;
        binds = {};
        options = {
        outFormat: oracledb.OBJECT   // query result format
        // extendedMetaData: true,   // get extra metadata
        // fetchArraySize: 100       // internal buffer allocation size for tuning
        };
        
        result = await connection.execute(sql, binds, options);
        //console.log(result);
        //console.log(result.rows);
        return result.rows; 
    },
    SelectApresentacoes: async function (sql){
        let  binds, options, result; 
        binds = {};
        options = {
        outFormat: oracledb.OBJECT   // query result format
        // extendedMetaData: true,   // get extra metadata
        // fetchArraySize: 100       // internal buffer allocation size for tuning
        };
        
        result = await connection.execute(sql, binds, options);
        //console.log(result);
        //console.log(result.rows);
        return result.rows; 
    },
};

/** 
 *  OS METODOS PRINCIPAIS DEVEM SER IMPLEMENTADOS AQUI E CHAMADOS PELOS 
 * METODOS DENTRO DOS ARQUIVOS DE ROUTES 
 * 
 */