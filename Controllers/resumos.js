module.exports=function(app){
    app.get('/resumos', function(req,res){
     var connection = app.persistencia.connectionFactory();
     connection.connect();
     var resumosBanco = new app.persistencia.ResumosDao(connection);
      resumosBanco.lista(function(err,resultado){
        if (!err)
            res.send(resultado);
        else
            console.log('Error while performing Query.');
      });        
      connection.end();
    });
    app.post('/resumos/resumo', function(req, res) {
        var resumo = req.body;
        //lembrando que os nomes dos campos no BANCO DE DADOS, devem ter o mesmo nome da tag NAME, nos formularios
        // HTML;
        console.log('resumo');

        resumo.status="Criado";
        resumo.data= new Date;

        var connection = app.persistencia.connectionFactory();
        var resumoDao = new app.persistencia.ResumosDao(connection);

        resumosDao.salva(resumo,function(error,resultado){
            console.log('resumo criado');
            res.json(resultado); 
        });

        
    });
}