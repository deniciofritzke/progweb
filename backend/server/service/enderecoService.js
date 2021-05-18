const enderecosData = require('../data/enderecoData');

exports.getenderecos = function () {
    return enderecosData.getEnderecos();
}

exports.getEndereco = function (enderecoID) {
    return enderecosData.getEndereco(enderecoID);
}

exports.deleteEndereco = function (enderecoID) {
    return enderecosData.deleteEndereco(enderecoID);
}

exports.saveEndereco = function (endereco) {
    return enderecosData.saveEndereco(endereco);
}