 function Resumos(connection){
        this._connection= connection;
    }
    
        Resumos.prototype.salva= function (resumo, callback) {
            this._connection.query('INSERT INTO trabalho set ?',resumo);
        }
        Resumos.prototype.lista= function(callback){
            this._connection.query('select * from trabalho', callback);
        }
        Resumos.prototype.listaId= function(id,callback){
            this._connection.query('select * from trabalho where tra_id = ?',id,callback);
        }
        Resumos.prototype.editar= function(id,callback){
            this._connection.query("update trabalho set trab_inf_post = 1 where usu_id = ? ",id, callback);
        }
        Resumos.prototype.listaResumosPendentes = function(callback){
            this._connection.query('select * from trabalho where tra_verifica = 0',callback);
        };
        Resumos.prototype.salvaUsuario=function(usuario,callback){
            this._connection.query('insert into usuario set ?',usuario,callback);
        };

    module.exports = function(){
        return Resumos;
    }

