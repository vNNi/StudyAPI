function Usuarios (connection){
    this._connection=connection;
}  

Usuarios.prototype.salvar=function(usuario,callback){
    this._connection.query("insert into usuario set ?",usuario,callback);
}
Usuarios.prototype.getHash=function(email,callback){
    this._connection.query("select usu_senha from usuario where usu_email = ?",email,callback);
}
Usuarios.prototype.verificar=function(email,senha,callback){
    this._connection.query("select * from usuario where email = ? AND senha = ?",[email,senha],callback);
}
Usuarios.prototype.deletar=function(id,callback){
    this._connection.query("UPDATE usuario SET usu_enable = false where usu_id = ? ",id,callback);
}
module.exports=()=>{
    return Usuarios;
}