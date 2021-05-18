const cidadesData = require('../data/cidadeData');

exports.getCidades = function () {
    return cidadesData.getCidades();
}

exports.getCidade = function (cidadeID) {
    return cidadesData.getCidade(cidadeID);
}

exports.deleteCidade = function (cidadeID) {
    return cidadesData.deleteCidade(cidadeID);
}

exports.saveCidade = function (cidade) {
    return cidadesData.saveCidade(cidade);
}