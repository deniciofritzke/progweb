const ufsData = require('../data/ufsData');

exports.getUfs = function () {
    return ufsData.getUfs();
}

exports.getUf = function (ufID) {
    return ufsData.getUf(ufID);
}

exports.deleteUf = function (ufID) {
    return ufsData.deleteUf(ufID);
}

exports.saveUf = function (uf) {
    return ufsData.saveUf(uf);
}