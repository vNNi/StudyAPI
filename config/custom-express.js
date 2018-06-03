const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

//exportando objeto express e incluindo pasta Controllers, com as rotas
// ou endpoints dentro do objeto express


module.exports = function(){
    const app = express();

    //ensinar o objeto express a ler requisoes com o body em json
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    //lib consign faz com que incluimos uma pasta e seus conteudos
    //dentro de um objeto

    consign().include('controllers').into(app);
    return app;
}