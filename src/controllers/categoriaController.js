const categoria = require('../models/categoria');

const categoriaControllers = {

    async listar(req, res) {
        try {
            const categorias = await categoria.findAll(); 
            res.json(categorias);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar categorias' });
        }
    },

    async criar(req, res) {
        try {
            const { nome, tipo } = req.body;
            if (!nome || !tipo) {
                return res.status(400).json({ erro: 'Nome e tipo são obrigatórios' });
            }
        
            const novaCategoria = await categoria.create({ nome, tipo });
            res.status(201).json(novaCategoria);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao criar categoria' });
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params;
            const categoriaEncontrada = await categoria.findByPk(id);
            
            if (!categoriaEncontrada) {
                return res.status(404).json({ erro: 'Categoria nao encontrada' });
            }
            
            await categoriaEncontrada.destroy();
            res.json({ mensagem: 'Categoria deletada com sucesso' });
        } catch (error) { 
            res.status(500).json({ erro: 'erro ao deletar categoria' });
        }
    }
};

module.exports = categoriaControllers;