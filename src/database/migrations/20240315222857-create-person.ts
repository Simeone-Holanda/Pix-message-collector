'use strict'

import { DataTypes, QueryInterface } from 'sequelize'

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Persons', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      cpfCnpj: {
        type: DataTypes.STRING(14),
        allowNull: false,
      },
      ispb: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      agencia: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      contaTransacional: {
        type: DataTypes.STRING(6),
        allowNull: false,
      },
      tipoConta: {
        type: DataTypes.STRING(4),
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
    return await queryInterface.dropTable('Persons')
  },
}
