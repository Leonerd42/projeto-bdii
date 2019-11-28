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

        sql = `SELECT * FROM estudante`;
        binds = {};
        options = {
        outFormat: oracledb.OBJECT   // query result format
        // extendedMetaData: true,   // get extra metadata
        // fetchArraySize: 100       // internal buffer allocation size for tuning
        };

        result = await connection.execute(sql, binds, options);
        return result; 
    }
};

/** 
 *  OS METODOS PRINCIPAIS DEVEM SER IMPLEMENTADOS AQUI E CHAMADOS PELOS 
 * METODOS DENTRO DOS ARQUIVOS DE ROUTES 
 * 
 */