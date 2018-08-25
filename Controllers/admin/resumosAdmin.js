module.exports=function(app){
    app.get('/resumos/resumosPendentes',(req,res) => {
        let connection = app.persistencia.connectionFactory();
        connection.connect();
        let resumosDAO = new app.persistencia.ResumosDao(connection);
        resumosDAO.listaResumosPendentes((error,resultado)=>{
            if(!error){
                res.status(200);
                res.json(resultado);
            }else{
                res.status(404);
                res.json({
                    message: error
                });
            }
        })
    });
}