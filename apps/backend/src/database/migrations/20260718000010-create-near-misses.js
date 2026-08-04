'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('near_misses', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false },
      reported_by: { type: Sequelize.UUID, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      plant_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'plants', key: 'id' }, onDelete: 'RESTRICT' },
      department_id: { type: Sequelize.UUID, allowNull: true, references: { model: 'departments', key: 'id' }, onDelete: 'SET NULL' },
      title: { type: Sequelize.STRING(255), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      location: { type: Sequelize.STRING(255), allowNull: true },
      severity_level: { type: Sequelize.ENUM('low', 'medium', 'high', 'critical'), allowNull: false },
      status: { type: Sequelize.ENUM('draft', 'submitted', 'under_review', 'closed'), defaultValue: 'draft', allowNull: false },
      immediate_action: { type: Sequelize.TEXT, allowNull: true },
      root_cause: { type: Sequelize.TEXT, allowNull: true },
      assigned_to: { type: Sequelize.UUID, allowNull: true, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      closed_at: { type: Sequelize.DATE, allowNull: true },
      closed_by: { type: Sequelize.UUID, allowNull: true },
      reported_at: { type: Sequelize.DATE, allowNull: true },
      created_by: { type: Sequelize.UUID, allowNull: true },
      updated_by: { type: Sequelize.UUID, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });

    await queryInterface.addIndex('near_misses', ['reported_by'], { name: 'near_misses_reported_by_idx' });
    await queryInterface.addIndex('near_misses', ['plant_id'], { name: 'near_misses_plant_id_idx' });
    await queryInterface.addIndex('near_misses', ['department_id'], { name: 'near_misses_department_id_idx' });
    await queryInterface.addIndex('near_misses', ['status'], { name: 'near_misses_status_idx' });
    await queryInterface.addIndex('near_misses', ['severity_level'], { name: 'near_misses_severity_level_idx' });
    await queryInterface.addIndex('near_misses', ['created_at'], { name: 'near_misses_created_at_idx' });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('near_misses');
  },
};
