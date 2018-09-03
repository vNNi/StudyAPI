const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    app.post("/usuarios/login",(req,res,next)=>{
        let email = req.body.usu_email;
        let senha = req.body.usu_senha;
        let connection = app.persistencia.connectionFactory();
        connection.connect();
        let usuariosDAO = new app.persistencia.UsuariosDAO(connection);
        usuariosDAO.getHash(email,(err,resultado)=>{
            if(!err){ 
                let hash = resultado[0].usu_senha;
                console.log(resultado);
                let validate = bcrypt.compareSync(senha,hash);
                if(!validate){
                    res.status(401).json({
                        message: "Auth Failed"
                    });  
                }if(validate){
                    const token =jwt.sign({
                        email: email,
                        userId : resultado[0].usu_id
                    },
                    "HJGLSFK20@255D",
                    {
                        expiresIn: "1h"
                    }
                );
                    res.status(200).json({
                        message:"Auth sucessful",
                        token: token
                    })
                }
            }
            else { 
               res.json({
                    messageDev:err,
                    message: "Auth Failed"
               });
            }   
            });
     
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