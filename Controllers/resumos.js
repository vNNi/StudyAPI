module.exports=function(app){
    app.get('/resumos', function(req,res){
        console.log('Recebi requisicao de resumos');
        res.send('felipe gay');
    });

    app.post('/resumos/resumo', function(req, res) {
        var resumo = req.body;
        console.log('Criando resumo');

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