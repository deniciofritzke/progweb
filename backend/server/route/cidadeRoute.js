const express = require('express');
const router = express.Router();

const cidadesService = require('../service/cidadeService');

router.get('/cidades', async function (req, res) {
    const cidade = await cidadesService.getCidades();
    res.json(cidade);
});

router.get('/cidade/:id', async function (req, res) {
    const cidade = await cidadesService.getCidade(req.params.id);
    res.json(cidade);
});

router.delete('/cidade/:id', async function (req, res) {
    const cidade = await cidadesService.deleteCidade(res.params.id);
    res.json([{ message: 'Cidade excluída com sucesso!' }]);
});

router.put('/cidade', async function (req, res) {
    const cidade = req.body;
    const newCidade = await cidadesService.saveCidade(cidade);
    res.json(newCidade);
})

module.exports = router;