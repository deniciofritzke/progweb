const editoraData = require('../data/editoraData');

exports.getEditoras = function () {
    return editoraData.getEditoras();
}

exports.getEditora = function (editoraID) {
    return editoraData.getEditora(editoraID);
}

exports.deleteEditora = function (editoraID) {
    return editoraData.deleteEditora(editoraID);
}

exports.saveEditora = function (editora) {
    return editoraData.saveEditoraLivro(editora);
}