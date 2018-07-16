var http = require('http');

var config={
    hostname: 'localhost',
    port: 3000,
    path: '/resumos/resumo',
    method: 'post',
    headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
    }
};


var client= http.request(config,function(res){
    console.log(res.statusCode);
    res.on('data',function(body){
        console.log("Corpo: "+ body);
    });
});

var produto = {
    nome: 'Felipe',
    cpf: '47473552826',
    pais: 'EUA ',
    estado:'New Jersey',
    email: 'Fezao@gmail.com',
    data_registro: new Date()
}
client.end(JSON.stringify(produto));