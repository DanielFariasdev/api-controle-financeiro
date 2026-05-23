const { fn, col } = require('sequelize'); // Importamos utilitários do Sequelize
const Transacao = require('../models/Transacao');
const Categoria = require('../models/Categoria');

const transacaoController = {

  async listar(req, res) {
    try {
      const transacoes = await Transacao.findAll({
        include: [{ model: Categoria, as: 'categoria' }],
        order: [['data', 'DESC']],
      });
      res.json(transacoes);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar transações' });
    }
  },

  async criar(req, res) {
    try {
      const { descricao, valor, tipo, data, categoriaId } = req.body;
      if (!descricao || !valor || !tipo || !data) {
        return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios' });
      }
      const transacao = await Transacao.create({ descricao, valor, tipo, data, categoriaId });
      res.status(201).json(transacao);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao criar transação' });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const transacao = await Transacao.findByPk(id);
      if (!transacao) {
        return res.status(404).json({ erro: 'Transação não encontrada' });
      }
      await transacao.update(req.body);
      res.json(transacao);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar transação' });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const transacao = await Transacao.findByPk(id);
      if (!transacao) {
        return res.status(404).json({ erro: 'Transação não encontrada' });
      }
      await transacao.destroy();
      res.json({ mensagem: 'Transação deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar transação' });
    }
  },

  // Método resumo otimizado para o Banco de Dados trabalhar por você:
  async resumo(req, res) {
    try {
      // Buscamos a soma dos valores agrupando pelo tipo ('receita' ou 'despesa')
      const resultados = await Transacao.findAll({
        attributes: [
          'tipo',
          [fn('SUM', col('valor')), 'total']
        ],
        group: ['tipo']
      });

      let receitas = 0;
      let despesas = 0;

      // Organizamos os totais que o banco devolveu
      resultados.forEach(r => {
        const totalNum = parseFloat(r.getDataValue('total')) || 0;
        if (r.tipo === 'receita') receitas = totalNum;
        if (r.tipo === 'despesa') despesas = totalNum;
      });

      res.json({
        receitas: receitas.toFixed(2),
        despesas: despesas.toFixed(2),
        saldo: (receitas - despesas).toFixed(2),
      });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao calcular resumo' });
    }
  },

};

module.exports = transacaoController;