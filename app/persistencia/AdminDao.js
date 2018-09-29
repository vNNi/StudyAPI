function Admin(connection){
    this._connection=connection;
}
    Admin.prototype.verificar=function(email,senha,callback){
        this._connection.query("select * from usuario where usu_email= ?, usu_senha= ? AND usu_per_id=1",[email,senha],callback);
    }
    Admin.prototype.getHash=function(email,callback){
        this._connection.query("select usu_senha,usu_id from usuario where usu_email= ? AND usu_per_id=1",email,callback);
    }
    
    module.exports=()=>{
        return Admin;
    }