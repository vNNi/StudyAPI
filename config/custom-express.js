const express = require('express');
const bodyParser = require('body-parser');
const autoLoad = require('express-load');
var consign = require('consign');
var validator = require('express-validator');
const middlewares = require('../Middlewares/Middlewares');

//exportando objeto express e incluindo pasta Controllers, com as rotas
// ou endpoints dentro do objeto express
module.exports = function(){
    const app = express();
    console.log("objeto express iniciado com sucesso");
    //ensinar o objeto express a ler requisoes com o body em json
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(validator());
    // app.use(middlewares);

    //lib consign faz com que incluimos uma pasta e seus conteudos
    //dentro de um objeto
    consign()
    .include('Controllers')
        .then('persistencia')
            .into(app);
    // autoLoad('Controllers').then('persistencia').into(app);
    return app;
}