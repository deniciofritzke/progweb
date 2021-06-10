const database = require('../database/database');

exports.getEditoras = function () {
    return database.query('select * from editora');
}

exports.getEditora = function (editoraID) {
    return database.query('select * from editora where edi_codigo = $1', [editoraID]);
}

exports.deleteEditora = (editoraID) => {
    return database.none('delete from editora where edi_codigo = $1', [editoraID]);
}

exports.saveEditora = (editora) => {

    if (editora.edi_codigo && editora.edi_codigo > 0) {
        return database.none('update editora set edi_nome = $1, edi_nome_gerente = $2 where edi_codigo = $3',
        [editora.edi_nome, editora.edi_nome_gerente, editora.edi_codigo]);
    }
    else {
        return database.one('insert into editora (edi_nome, edi_nome_gerente) values ($1,$2) returning *',
        [editora.edi_nome, editora.edi_nome_gerente]);
    }
}