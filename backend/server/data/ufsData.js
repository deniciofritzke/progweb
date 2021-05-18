const database = require('../database/database');

exports.getUfs = function () {
    return database.query('select * from uf');
}

exports.getUf = function (ufID) {
    return database.query('select * from uf where uf_codigo = $1', [ufID]);
}

exports.deleteUf = (ufID) => {
    return database.none('delete from uf where uf_codigo = $1', [ufID]);
}

exports.saveUf = (uf) => {
    return database.one('insert into uf (uf_nome,uf_sigla) values ($1,$2) returning *',
        [uf.uf_nome, uf.uf_sigla]);
}