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

        res.send(resumo); 
    });
}