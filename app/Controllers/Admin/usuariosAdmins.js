const jwt = require('jsonwebtoken');
const crypto= require('crypto');

module.exports=(app)=>{
    app.post("/admin/login",(req,res)=>{
        let email = req.body.usu_email;
        let senha= req.body.usu_senha;
        let validate = false;
        const connection= app.persistencia.connectionFactory();
        const adminDao= new app.persistencia.AdminDao(connection);
        adminDao.getHash(email,(error,resultado)=>{
            if(!error){
             let hash = resultado[0].usu_senha;
             let decipher= crypto.createDecipher('aes192','teste');
             let decrypted= decipher.update(hash,'hex','utf8');
             decrypted+=decipher.final('utf8');
             validate = senha==decrypted?true:false;
             if(!validate){
                 res.status(401).json({
                     message:"Autenticação falhou"
                 });
             }
             if(validate){
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