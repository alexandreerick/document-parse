'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tipo_transacao', { 
      cod_tipo_transacao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nom_tipo_transacao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nom_natureza_transacao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sinal_transacao: {
        type: Sequelize.STRING,
        allowNull: false
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
