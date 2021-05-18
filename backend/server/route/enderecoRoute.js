const express = require('express');
const router = express.Router();

const enderecosService = require('../service/enderecoService');

router.get('/enderecos', async function (req, res) {
    const enderecos = await enderecosService.getenderecos();
    res.json(enderecos);
});

router.get('/endereco/:id', async function (req, res) {
    const endereco = await enderecosService.getEndereco(req.params.id);
    res.json(endereco);
});

router.delete('/endereco/:id', async function (req, res) {
    const endereco = await enderecosService.deleteEndereco(res.params.id);
    res.json([{ message: 'Endereço excluído com sucesso!' }]);
});

router.put('/endereco', async function (req, res) {
    const endereco = req.body;
    const newendereco = await enderecosService.saveEndereco(endereco);
    res.json(newendereco);
})

module.exports = router;