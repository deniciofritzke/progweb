const express = require('express');
const router = express.Router();

const livroService = require('../service/livroService');

router.get('/livros', async function (req, res) {
    const livros = await livroService.getLivros();
    res.json(books);
});

router.get('/livro/:id', async function (req, res) {
    const livro = await livroService.getLivro(req.params.id);
    res.json(livro);
});

router.delete('/livro/:id', async function (req, res) {
    const livro = await livroService.deleteLivro(res.params.id);
    res.json([{ message: 'Livro excluído com sucesso!' }]);
});

router.put('/livro', async function (req, res) {
    const livro = req.body;
    const novoLivro = await livroService.saveLivro(livro);
    res.json(novoLivro);
})

module.exports = router;