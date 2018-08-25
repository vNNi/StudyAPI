const bcrypt = require('bcrypt');
module.exports=(app)=>{
    app.post("/usuarios", (req,res) =>{ 
       const usuario = req.body;
            let connection = app.persistencia.connectionFactory();
            connection.connect();
            let resumosDAO = new app.persistencia.ResumosDao(connection);
            let salt = bcrypt.genSaltSync(5);
           let hash = bcrypt.hashSync(req.body.usu_senha,salt);
            console.log(hash);
            usuario.usu_senha = hash;
            resumosDAO.salvaUsuario(usuario,function(err,resultado){
                if(!err){
                    res.status(201);
                    res.json({
                        message: "usuário criado com sucesso"
                    });
                }else{
                    res.status(400).json({
                        error: err
                    });
                }
                connection.end();
            });
    });
    app.get("/usuarios",(req,res)=>{

    });
}