'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hazards', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false },
      reported_by: { type: Sequelize.UUID, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      plant_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'plants', key: 'id' }, onDelete: 'RESTRICT' },
      department_id: { type: Sequelize.UUID, allowNull: true, references: { model: 'departments', key: 'id' }, onDelete: 'SET NULL' },
      category: { type: Sequelize.ENUM('physical', 'chemical', 'biological', 'ergonomic', 'electrical', 'fire', 'environmental', 'behavioral', 'other'), allowNull: false },
      severity_level: { type: Sequelize.ENUM('low', 'medium', 'high', 'critical'), allowNull: false },
      title: { type: Sequelize.STRING(255), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      location: { type: Sequelize.STRING(255), allowNull: true },
      status: { type: Sequelize.ENUM('draft', 'submitted', 'under_review', 'resolved', 'closed'), defaultValue: 'draft', allowNull: false },
      assigned_to: { type: Sequelize.UUID, allowNull: true, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      action_taken: { type: Sequelize.TEXT, allowNull: true },
      resolved_at: { type: Sequelize.DATE, allowNull: true },
      resolved_by: { type: Sequelize.UUID, allowNull: true },
      closed_at: { type: Sequelize.DATE, allowNull: true },
      closed_by: { type: Sequelize.UUID, allowNull: true },
      reported_at: { type: Sequelize.DATE, allowNull: true },
      created_by: { type: Sequelize.UUID, allowNull: true },
      updated_by: { type: Sequelize.UUID, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });

    await queryInterface.addIndex('hazards', ['reported_by'], { name: 'hazards_reported_by_idx' });
    await queryInterface.addIndex('hazards', ['plant_id'], { name: 'hazards_plant_id_idx' });
    await queryInterface.addIndex('hazards', ['department_id'], { name: 'hazards_department_id_idx' });
    await queryInterface.addIndex('hazards', ['status'], { name: 'hazards_status_idx' });
    await queryInterface.addIndex('hazards', ['severity_level'], { name: 'hazards_severity_level_idx' });
    await queryInterface.addIndex('hazards', ['category'], { name: 'hazards_category_idx' });
    await queryInterface.addIndex('hazards', ['created_at'], { name: 'hazards_created_at_idx' });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('hazards');
  },
};
