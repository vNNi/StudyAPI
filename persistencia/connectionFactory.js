var mysql = require('mysql');

function createDBConnection(){
    return mysql.createConnection({
        host: 'mysql427.umbler.com',
        user: 'study',
        database:'studyja',
        password: 'HjyyvsJLU3'
    });
}

module.exports=function(){
    return createDBConnection();
}