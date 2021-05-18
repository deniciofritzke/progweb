const database = require('../database/database');

exports.getCidades = function () {
    return database.query('select * from cidade');
}

exports.getCidade = function (cidadeID) {
    return database.query('select * from cidade where cid_codigo = $1', [cidadeID]);
}

exports.deleteCidade = (cidadeID) => {
    return database.none('delete from cidade where cid_codigo = $1', [cidadeID]);
}

exports.saveCidade = (cidade) => {
    return database.one('insert into cidade (uf_codigo,cid_nome) values ($1,$2) returning *',
        [cidade.uf_codigo, cidade.cid_nome]);
}