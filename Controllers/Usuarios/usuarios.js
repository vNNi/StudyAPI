const bcrypt = require('bcrypt');
module.exports=(app)=>{
    app.post("/usuarios/cadastro", (req,res) =>{ 
       const usuario = req.body;
            let connection = app.persistencia.connectionFactory();
            connection.connect();
            let usuariosDAO = new app.persistencia.UsuariosDAO(connection);
            let salt = bcrypt.genSaltSync(5);
            let hash = bcrypt.hashSync(req.body.usu_senha,salt);
            usuario.usu_senha = hash;
            usuariosDAO.salvar(usuario,function(err,resultado){
                if(!err){
                    res.status(201);
                    res.json({
                        message: "usuário criado com sucesso",
                        resultado: resultado
                    });
                }else{
                        if(err.errno==1062){
                            res.status(400).json({
                            message: "usuário ja existente",
                            error: err
                        });
                    }else{
                        res.status(500).json({
                            message:err
                        });
                    }
                }
                connection.end();
            });
    });
    app.post("/usuarios/login",(req,res)=>{
        let email = req.body.email;
        let senha = req.body.senha;
        let hash;
        let connection = app.persistencia.connectionFactory();
        connection.connect();
        let usuariosDAO = new app.persistencia.usuariosDAO(connection);
        usuariosDAO.getHash(email,(err,resultado)=>{
            if(!err || resultado.length >=1 ) hash=resultado.usu_senha;
            else { res.status(404).json({
                messageUsu: "usuario não encontrado",
                messageDev :err
            });
            return;
            }
        });
        let validate = bcrypt.compareSync(senha,hash);
        if(validate){
            res.status(200);
            //retornar JWT;
        }
    });
    app.delete("/usuarios/:id",(req,res,next)=>{
        let id = req.params.id;
        let connection = app.persistencia.connectionFactory();
        connection.connect;
        let UsuariosDAO = new app.persistencia.UsuariosDAO(connection);
        UsuariosDAO.deletar(id,(err,resultado)=>{
            if(resultado.affectedRows<1){
                res.status(404).json({
                    message: "usuário não encontrado"
                });
                return;
            }
             if(!err){
                res.status(200).json({
                    message: "usuário deletado com sucesso",
                    resultado: resultado
                });
            }else{
                res.json({
                    error: err,
                })
            }
        });
    });
}