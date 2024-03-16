'use strict'

import { DataTypes, QueryInterface } from 'sequelize'

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Interactions', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      ispb: {
        type: DataTypes.STRING(8),
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
    return await queryInterface.dropTable('Interactions')
  },
}
