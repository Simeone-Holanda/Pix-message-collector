'use strict'

import { DataTypes, QueryInterface } from 'sequelize'

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Pixmessages', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      endToEndId: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      valor: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      pagadorId: {
        type: DataTypes.UUID,
        references: { model: 'Persons', key: 'id' },
        onDelete: 'SET DEFAULT',
        allowNull: false,
      },
      recebedorId: {
        type: DataTypes.UUID,
        references: { model: 'Persons', key: 'id' },
        onDelete: 'SET DEFAULT',
        allowNull: false,
      },
      campoLivre: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      txId: {
        type: DataTypes.STRING(6),
        allowNull: false,
      },
      dataHoraPagamento: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      sent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    })
  },

  async down(queryInterface: QueryInterface) {
    return await queryInterface.dropTable('Pixmessages')
  },
}
