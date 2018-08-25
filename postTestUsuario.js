var http = require('http');

var config={
    hostname: 'localhost',
    port: 3000,
    path: '/usuarios',
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
    usu_nome: 'Vinicius',
    usu_sobrenome: 'Komninakis',
    usu_naturalidade: 'Brasileiro',
    usu_sexo:'M',
    usu_dat_nascimento:'1999-12-08',
    usu_email:'vinicius_k2013@hotmail.com',
    usu_senha:'admin',
    usu_cpf: '47473552826',
    usu_dat_registro: new Date(),
    usu_dat_atualizacao: new Date(),
    usu_dat_autenticacao: new Date()
}
client.end(JSON.stringify(produto));