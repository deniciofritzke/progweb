const database = require('../database/database');

exports.getEnderecos = function () {
    return database.query('select * from endereco');
}

exports.getEndereco = function (enderecoID) {
    return database.query('select * from endereco where end_codigo = $1', [enderecoID]);
}

exports.deleteEndereco = (enderecoID) => {
    return database.none('delete from endereco where end_codigo = $1', [enderecoID]);
}

exports.saveEndereco = (endereco) => {
    return database.one('insert into endereco (cid_codigo, end_cep, end_logradouro, end_endereco, end_bairro) values ($1,$2,$3,$4,$5) returning *',
        [endereco.cid_codigo, endereco.end_cep, endereco.end_logradouro, endereco.end_endereco, endereco.end_bairro]);
}