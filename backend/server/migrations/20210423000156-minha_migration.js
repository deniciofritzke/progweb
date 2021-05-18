'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('livro_teste', {
      // Campo id
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      editora: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isbn: {
        type: Sequelize.STRING(13),
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      assunto: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      autor: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_ad: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('livro_teste');
  }
};
