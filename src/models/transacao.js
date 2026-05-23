const {DataTypes} = require('sequelize'); //importa o DataTypes do sequelize para definir os tipos de dados das colunas
const sequelize = require('../config/database'); //importa a instância do sequelize configurada no arquivo database.js para criar o modelo de transação
const categoria = require('./categoria');//importa o modelo de categoria para criar a associação entre transação e categoria

const transacao = sequelize.define('transacao', { //nome do modelo no singular
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    tipo: {
        type: DataTypes.ENUM('receita', 'despesa'),
        allowNull: false,
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        references: {
            model: categoria,
            key: 'id',
        } 
    },
});
transacao.belongsTo(categoria, { foreignKey: 'categoriaId', as: 'categoria' });

module.exports = transacao;