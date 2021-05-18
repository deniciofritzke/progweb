const database = require('../database/database');

exports.getLivros = function () {
    return database.query('select * from livro');
}

exports.getLivro = function (livroID) {
    return database.query('select * from livro where liv_codigo = $1', [livroID]);
}

exports.deleteLivro = (livroID) => {
    return database.none('delete from livro where liv_codigo = $1', [livroID]);
}

exports.saveLivro = (livro) => {
    return database.one('insert into livro (edi_codigo,liv_descricao,liv_assunto,liv_autor,liv_isbn) values ($1,$2,$3,$4,$5) returning *',
        [livro.edi_codigo, livro.liv_descricao, livro.liv_assunto, livro.liv_autor, livro.liv_isbn]);
}