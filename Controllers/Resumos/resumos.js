const ApiAuth = require('../../Middlewares/Api-auth');
const TokenAuth = require('../../Middlewares/Token-auth');
const AdminAuth = require('../../Middlewares/AdminToken-auth');
module.exports=function(app){
    app.get('/resumos',ApiAuth,(req,res) => {
     var connection = app.persistencia.connectionFactory();
     connection.connect();
     var resumosDao = new app.persistencia.ResumosDao(connection);
      resumosDao.lista((err,resultado) => {
        if (!err){
            console.log("aqui estou eu");
            res.json(resultado);
        }
        else
            console.log('Error while performing Query.' + err);
      });        
      connection.end();
    });
    app.post('/resumos/resumo', ApiAuth,TokenAuth,(req, res) => {
        const resumo = req.body;
        var validatorTitulo = req.assert('titulo', 'Titulo é obrigatório').notEmpty();
        var erros = req.validationErrors();
        if(erros){
            res.json(erros);    
            res.status(422);
            return;
        }
        //lembrando que os nomes dos campos no BANCO DE DADOS, devem ter o mesmo nome da tag NAME, nos formularios
        // HTML;
        var connection = app.persistencia.connectionFactory();
        var resumosDao = new app.persistencia.ResumosDao(connection);

        resumosDao.salva(resumo,function(error,resultado){
           if(!error){
            console.log('resumo criado');
            res.status(200).json(resultado);  
           } 
           else
                console.log("error performing POST" + error);
        });
        connection.end();
    });
    app.get('/resumos/resumo/:id',ApiAuth,(req,res) => {
        const id = req.params.id;
        let validatorId = req.assert('id', 'id é obrigatório').notEmpty();
        let erros = req.validationErrors();
        if (erros){
            res.json(erros);
            res.status(422);
            return;
        }
        var connection = app.persistencia.connectionFactory();
        var resumosDao = new app.persistencia.ResumosDao(connection);

        resumosDao.listaId(id,(error,resultado)=>{
            if(JSON.stringify(resultado)==='[]'){
                res.status(200);
                res.json({
                    mensagem : 'Resumo não existente'
                });
                return;
            }
            if(!error){
                res.send(resultado);
                res.status(200);
            }
            else{
                res.status(500);
                res.send(error);
            }
        });
        connection.end();
    });
    app.patch('/resumos/resumo/:id',ApiAuth,AdminAuth,(req,res,next)=>{
        const id= req.params.id;
        let validatorId = req.assert('id','id é obrigatório').notEmpty();
        let errors = req.validationErrors();
        if(errors){
            res.json(errors);
            res.status(422)
            return;
        }
        var connection = app.persistencia.connectionFactory();
        var resumosDao = new app.persistencia.ResumosDao(connection);
        resumosDao.editar(id,(erros,callback)=>{
            
        });
    });
}