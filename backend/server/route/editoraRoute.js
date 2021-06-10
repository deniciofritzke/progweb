const express = require('express');
const router = express.Router();

const editoraService = require('../service/editoraService');

router.get('/editoras', async function (req, res) {
    const editoras = await editoraService.getEditoras();
    res.status(200).json(editoras);
});

router.get('/editora/:id', async function (req, res) {
    const editora = await editoraService.getEditora(req.params.id);
    res.json(editora);
});

router.delete('/editora/:id', async function (req, res) {
    const editora = await editoraService.deleteEditora(req.params.id);
    res.json([{ message: 'Editora excluída com sucesso!' }]);
});

router.put('/editora', async function (req, res) {
    const editora = req.body;
    const novaEditora = await editoraService.saveEditora(livro);
    res.json(novaEditora);
})

module.exports = router;