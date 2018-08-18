module.exports=function(app){
    app.get('/resumos/pendentes',(req,res)=>{
            let connection = app.persistencia.connectionFactory();
            connection.connect();
            let resumosDAO = app.persistencia.ResumosDao(connection);
            resumosDAO.listResumosPendentes((error,resultado)=>{
                if(!error){
                    res.status(200);
                    res.json(resultado);
                }else{
                    res.json(404);
                    res.json({
                        message: "Resumos não encontrados",
                        error: error
                    });
                }
                connection.end();
            });
    });
}