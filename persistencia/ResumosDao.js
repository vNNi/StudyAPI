 function Resumos(connection){
        this._connection= connection;
    }
    
        Resumos.prototype.salvaResumoLivro= function (resumo, callback) {
            this._connection.query('INSERT INTO trabalho set ?',resumo);
        }
        Resumos.prototype.listaResumosLivro= function(callback){
            this._connection.query('select t.*,l.*,u.usu_nome from trabalho t inner join livro l on t.tra_id = l.tra_id inner join usuario u on t.tra_usu_id=u.usu_id', callback);
        }
        Resumos.prototype.listaResumosArtigo= function(callback){
            this._connection.query('select t.*,a.*,u.usu_nome from trabalho t inner join artigo a on t.tra_id = a.tra_id inner join usuario u on t.tra_usu_id=u.usu_id', callback);
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
        Resumos.prototype.listaCategorias=function(callback){
            this._connection.query('select * from categoria',callback);
        }
        Resumos.prototype.resumosLivroCategoria=function(id,callback){
            this._connection.query('select t.*, l.* from trabalho t inner join livro l on t.tra_id=l.tra_id where tra_cat_id = ?',id,callback);
        }
        

    module.exports = function(){
        return Resumos;
    }

