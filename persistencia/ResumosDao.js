 function Resumos(connection){
        this._connection= connection;
    }
    
        Resumos.prototype.salva= function (resumo, callback) {
            this._connection.query('INSERT INTO usuarios set ?',resumo);
        }
        Resumos.prototype.lista= function(callback){
            this._connection.query('select * from usuario', callback);
        }
        Resumos.prototype.listaId= function (id,callback){
            this._connection.query('select * from usuario where usu_id = ?',id,callback);
        }
        Resumos.prototype.editar= function(id,callback){
            this._connection.query("update trabalho set trab_inf_post = 1 where usu_id = ? ",id, callback);
        }
        Resumos.prototype.listaResumosPendentes=(callback)=>{
            this._connection.query('select * from resumos where trab_verifica = 0',callback);
        };

    module.exports = function(){
        return Resumos;
    }

