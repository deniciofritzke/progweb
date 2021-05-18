const express = require('express');
const router = express.Router();

const clientesService = require('../service/clienteService');

router.get('/clientes', async function (req, res) {
    const clientes = await clientesService.getClientes();
    res.json(clientes);
});

router.get('/cliente/:id', async function (req, res) {
    const cliente = await clientesService.getCliente(req.params.id);
    res.json(cliente);
});

router.delete('/cliente/:id', async function (req, res) {
    const cliente = await booksService.deleteCliente(res.params.id);
    res.json([{ message: 'Cliente excluído com sucesso!' }]);
});

router.put('/cliente', async function (req, res) {
    const cliente = req.body;
    const newCliente = await clientesService.saveCliente(cliente);
    res.json(newCliente);
})

module.exports = router;