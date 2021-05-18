const livroData = require('../data/livroData');

exports.getLivros = function () {
    return livroData.getLivros();
}

exports.getLivro = function (livroID) {
    return livroData.getLivro(livroID);
}

exports.deleteLivro = function (livroID) {
    return livroData.deleteLivro(livroID);
}

exports.saveLivro = function (livro) {
    return livroData.saveLivro(livro);
}