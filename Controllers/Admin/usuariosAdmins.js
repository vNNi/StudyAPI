const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports=(app)=>{
    app.post("/admin/login",(req,res)=>{
        let email = req.body.usu_email;
        let senha= req.body.usu_senha;
        const connection= app.persistencia.connectionFactory();
        const adminDao= new app.persistencia.AdminDao(connection);
        adminDao.getHash(email,(error,resultado)=>{
            if(!error){
             let hash = resultado[0].usu_senha;
             let validade = bcrypt.compare(senha,hash);
             if(!validade){
                 res.status(401).json({
                     message:"Autenticação falhou"
                 });
             }
             if(validade){
                 const token = jwt.sign({
                     email:email,
                     userId:resultado[0].usu_id
                 },"ADMINSSCRETSTRING",{
                    expiresIn:"1h"
                 }
                );
                res.status(200).json({
                    message: "Autenticação feita com sucesso",
                    token:token
                })
             }
            }
            else{
                res.status(200).json({
                    message:"Autenticação falhou"
                })
            }
        });
    });
}