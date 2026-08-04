'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('corrective_actions', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false },
      source_type: { type: Sequelize.ENUM('hazard', 'near_miss', 'incident', 'audit', 'inspection'), allowNull: false },
      source_id: { type: Sequelize.UUID, allowNull: false },
      plant_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'plants', key: 'id' }, onDelete: 'RESTRICT' },
      title: { type: Sequelize.STRING(255), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      assigned_to: { type: Sequelize.UUID, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      assigned_by: { type: Sequelize.UUID, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      due_date: { type: Sequelize.DATEONLY, allowNull: false },
      status: { type: Sequelize.ENUM('open', 'in_progress', 'completed', 'verified', 'overdue', 'cancelled'), defaultValue: 'open', allowNull: false },
      priority: { type: Sequelize.ENUM('low', 'medium', 'high', 'critical'), defaultValue: 'medium', allowNull: false },
      completed_at: { type: Sequelize.DATE, allowNull: true },
      completed_by: { type: Sequelize.UUID, allowNull: true },
      verified_at: { type: Sequelize.DATE, allowNull: true },
      verified_by: { type: Sequelize.UUID, allowNull: true, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      verification_notes: { type: Sequelize.TEXT, allowNull: true },
      created_by: { type: Sequelize.UUID, allowNull: true },
      updated_by: { type: Sequelize.UUID, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });

    await queryInterface.addIndex('corrective_actions', ['source_type', 'source_id'], { name: 'ca_source_idx' });
    await queryInterface.addIndex('corrective_actions', ['plant_id'], { name: 'ca_plant_id_idx' });
    await queryInterface.addIndex('corrective_actions', ['assigned_to'], { name: 'ca_assigned_to_idx' });
    await queryInterface.addIndex('corrective_actions', ['status'], { name: 'ca_status_idx' });
    await queryInterface.addIndex('corrective_actions', ['due_date'], { name: 'ca_due_date_idx' });
    await queryInterface.addIndex('corrective_actions', ['priority'], { name: 'ca_priority_idx' });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('corrective_actions');
  },
};
