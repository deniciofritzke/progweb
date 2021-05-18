const express = require('express');
const router = express.Router();

const ufsService = require('../service/ufService');

router.get('/ufs', async function (req, res) {
    const uf = await ufsService.getUfs();
    res.json(uf);
});

router.get('/uf/:id', async function (req, res) {
    const uf = await ufsService.getUf(req.params.id);
    res.json(uf);
});

router.delete('/uf/:id', async function (req, res) {
    const uf = await ufsService.deleteUf(res.params.id);
    res.json([{ message: 'UF excluída com sucesso!' }]);
});

router.put('/uf', async function (req, res) {
    const uf = req.body;
    const newUf = await ufsService.saveUf(uf);
    res.json(newUf);
})

module.exports = router;