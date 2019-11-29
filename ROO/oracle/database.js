var oracledb = require('oracledb'); 
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
    Insert: function () {
        console.log('inserindo dados');
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
    Select: async function (campos,tabelas,condicoes){
        let sql, binds, options, result; 
        //sql ="Select a.CPF,a.NOME,a.SEXO,a.DATANASCIMENTO,a.EMAIL,t.column_value as telefone,a.CONTATO_EMERGENCIA from alunos a, TABLE(a.Telefones) t";
        sql ="Select al.CPF,al.NOME,al.SEXO,al.DATANASCIMENTO,al.EMAIL,al.CONTATO_EMERGENCIA,al.endereco.cep as cep, al.endereco.numero as numero, al.endereco.complemento as complemento,  tabe.telefones From (SELECT CPF, LISTAGG(telefone,',') WITHIN GROUP (ORDER BY telefone) AS Telefones From (Select a.CPF as CPF,t.column_value as telefone from alunos a, TABLE(a.Telefones) t) tab GROUP BY CPF) tabe, alunos al where al.cpf = tabe.cpf";
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
    }
};

/** 
 *  OS METODOS PRINCIPAIS DEVEM SER IMPLEMENTADOS AQUI E CHAMADOS PELOS 
 * METODOS DENTRO DOS ARQUIVOS DE ROUTES 
 * 
 */