const {DataTypes} = require('sequelize'); //importa o DataTypes do sequelize para definir os tipos de dados das colunas
const sequelize = require('../config/database'); //importa a instância do sequelize configurada no arquivo database.js para criar o modelo de categoria

const categoria = sequelize.define('categoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.ENUM('receita', 'despesa'),
        allowNull: false,
    },
});

module.exports = categoria;