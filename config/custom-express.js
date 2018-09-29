const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const validator = require('express-validator');

//exportando objeto express e incluindo pasta Controllers, com as rotas
// ou endpoints dentro do objeto express
module.exports = function(){
    const app = express();
    console.log("objeto express iniciado com sucesso");
    //ensinar o objeto express a ler requisoes com o body em json
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(validator());

    app.use((req,res,next) =>{
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization');
        next();
    });
    //criando error log para requisições erradas e/ou não encontradas;
    // app.use((req,res,next) => {
    //     const error = new Error('EndPoint não existente/encontrado');
    //     error.status= 404;
    //     next(error);
    // });
    // //passando error para o client da API
    // app.use((error,req,res,next)=>{
    //     console.log("entrei aqui");
    //     res.json({
    //         error:{
    //             message: error.message
    //         }
    //     })
    //     next();
    // })
    //lib consign faz com que incluimos uma pasta e seus conteudos
    //dentro de um objeto
    consign({cwd: process.cwd()+"/app"})
    .include('Controllers')
        .then('persistencia')
            .into(app);
    return app;
}