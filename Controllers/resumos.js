module.exports=function(app){
    app.get('/resumos', (req,res) => {
     var connection = app.persistencia.connectionFactory();
     connection.connect();
     var resumosDao = new app.persistencia.ResumosDao(connection);
      resumosDao.lista((err,resultado) => {
        if (!err)
            res.json(resultado);
        else
            console.log('Error while performing Query.');
      });        
      connection.end();
    });
    app.post('/resumos/resumo', (req, res) => {
        var resumo = req.body;
        //lembrando que os nomes dos campos no BANCO DE DADOS, devem ter o mesmo nome da tag NAME, nos formularios
        // HTML;
        var connection = app.persistencia.connectionFactory();
        var resumosDao = new app.persistencia.ResumosDao(connection);

        resumosDao.salva(resumo,function(error,resultado){
           if(!error){
            console.log('resumo criado');
            res.json(resultado);  
           } 
           else
                console.log("error performing POST");
        });

        
    });
}