'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transacao', { 
      seq_transacao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nom_produto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      num_valor: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nom_vendedor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dth_transacao: {
        type: Sequelize.DATE,
        allowNull: false
      },
      cod_tipo_transacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipo_transacao',
          key: 'seq_tipo_transacao'
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
