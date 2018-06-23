const express = require('express');
const bodyParser = require('body-parser');
const autoLoad = require('express-load');

//exportando objeto express e incluindo pasta Controllers, com as rotas
// ou endpoints dentro do objeto express


module.exports = function(){
    const app = express();
    console.log("objeto express iniciado com sucesso");
    //ensinar o objeto express a ler requisoes com o body em json
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    //lib consign faz com que incluimos uma pasta e seus conteudos
    //dentro de um objeto

    autoLoad('Controllers', {cwd:""}).then('persistencia').into(app);
    return app;
}