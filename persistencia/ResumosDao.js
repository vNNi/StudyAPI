function Resumos(connection){
    this._connection= connection;
}

Resumos.prototype.salva= function (resumo, callback) {
    this._connection.query('INSERT INTO resumos set ?',resumo);
}
Resumos.prototype.lista= function(resumo,callback){
    this._connection.query('select * from resumos', callback);
}
