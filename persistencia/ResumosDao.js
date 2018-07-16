 function Resumos(connection){
        this._connection= connection;
    }
    
        Resumos.prototype.salva= function (resumo, callback) {
            this._connection.query('INSERT INTO usuarios set ?',resumo);
        }
        Resumos.prototype.lista= function(callback){
            this._connection.query('select * from usuarios', callback);
    }

    module.exports = function(){
        return Resumos;
    }

