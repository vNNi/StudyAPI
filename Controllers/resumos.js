module.exports=function(app){
    app.get('/resumos', (req,res) => {
     var connection = app.persistencia.connectionFactory();
     connection.connect();
     var resumosDao = new app.persistencia.ResumosDao(connection);
      resumosDao.lista((err,resultado) => {
        if (!err){
            res.status(200);
            res.json(resultado);
        }
        else
            console.log('Error while performing Query.' + err);
      });        
      connection.end();
    });
    app.post('/resumos/resumo', (req, res) => {
        var resumo = req.body;
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
                console.log("error performing POST");
        });
        connection.end();
    });
    app.get('/resumos/resumo/:id',(req,res) => {
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
    app.patch('/resumos/resumo/:id',(req,res,next)=>{
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