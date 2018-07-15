var mysql = require('mysql');

function createDBConnection(){
    return mysql.createConnection({
        host: 'mysql427.umbler.com',
        port: '41890',
        user: 'study',
        database:'studyja',
        password: 'HjyyvsJLU3'
    });
}
console.log("Conexão ligada" + createDBConnection());
module.exports=function(){
    return createDBConnection;
}