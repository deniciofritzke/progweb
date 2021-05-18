const clientesData = require('../data/clienteData');

exports.getClientes = function () {
    return clientesData.getClientes();
}

exports.getCliente = function (clienteID) {
    return clientesData.getCliente(clienteID);
}

exports.deleteCliente = function (clienteID) {
    return clientesData.deleteCliente(clienteID);
}

exports.saveCliente = function (cliente) {
    return clientesData.saveCliente(cliente);
}