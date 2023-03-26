'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipo_transacao', [
      {
        nom_tipo_transacao: 'Venda produtor',
        nom_natureza_transacao: 'Entrada',
        sinal_transacao: '+'
      },
      {
        nom_tipo_transacao: 'Venda afiliado',
        nom_natureza_transacao: 'Entrada',
        sinal_transacao: '+'
      },
      {
        nom_tipo_transacao: 'Comissão paga',
        nom_natureza_transacao: 'Saída',
        sinal_transacao: '-'
      },
      {
        nom_tipo_transacao: 'Comissão recebida',
        nom_natureza_transacao: 'Entrada',
        sinal_transacao: '+'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
