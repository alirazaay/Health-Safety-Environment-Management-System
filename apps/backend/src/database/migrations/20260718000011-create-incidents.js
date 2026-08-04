'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Main incidents table
    await queryInterface.createTable('incidents', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false },
      incident_number: { type: Sequelize.STRING(30), allowNull: true, unique: true },
      reported_by: { type: Sequelize.UUID, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'RESTRICT' },
      plant_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'plants', key: 'id' }, onDelete: 'RESTRICT' },
      department_id: { type: Sequelize.UUID, allowNull: true, references: { model: 'departments', key: 'id' }, onDelete: 'SET NULL' },
      incident_type: {
        type: Sequelize.ENUM('first_aid', 'mtc', 'lti', 'rwc', 'fatality', 'property_damage', 'environmental', 'near_miss_promoted'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('draft', 'reported', 'under_investigation', 'corrective_action', 'closed'),
        defaultValue: 'draft',
        allowNull: false,
      },
      severity_level: { type: Sequelize.ENUM('low', 'medium', 'high', 'critical'), allowNull: false },
      title: { type: Sequelize.STRING(255), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      location: { type: Sequelize.STRING(255), allowNull: true },
      incident_date: { type: Sequelize.DATEONLY, allowNull: false },
      incident_time: { type: Sequelize.TIME, allowNull: true },
      injured_person_id: { type: Sequelize.UUID, allowNull: true, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      injured_person_name: { type: Sequelize.STRING(150), allowNull: true },
      lost_days: { type: Sequelize.INTEGER, allowNull: true },
      restricted_days: { type: Sequelize.INTEGER, allowNull: true },
      first_aid_given: { type: Sequelize.BOOLEAN, defaultValue: false },
      immediate_action: { type: Sequelize.TEXT, allowNull: true },
      investigated_by: { type: Sequelize.UUID, allowNull: true, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      investigation_findings: { type: Sequelize.TEXT, allowNull: true },
      root_cause: { type: Sequelize.TEXT, allowNull: true },
      closed_at: { type: Sequelize.DATE, allowNull: true },
      closed_by: { type: Sequelize.UUID, allowNull: true },
      created_by: { type: Sequelize.UUID, allowNull: true },
      updated_by: { type: Sequelize.UUID, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });

    await queryInterface.addIndex('incidents', ['incident_number'], { unique: true, name: 'incidents_number_unique' });
    await queryInterface.addIndex('incidents', ['reported_by'], { name: 'incidents_reported_by_idx' });
    await queryInterface.addIndex('incidents', ['plant_id'], { name: 'incidents_plant_id_idx' });
    await queryInterface.addIndex('incidents', ['department_id'], { name: 'incidents_department_id_idx' });
    await queryInterface.addIndex('incidents', ['incident_type'], { name: 'incidents_type_idx' });
    await queryInterface.addIndex('incidents', ['status'], { name: 'incidents_status_idx' });
    await queryInterface.addIndex('incidents', ['incident_date'], { name: 'incidents_date_idx' });
    await queryInterface.addIndex('incidents', ['severity_level'], { name: 'incidents_severity_idx' });

    // Incident injuries table
    await queryInterface.createTable('incident_injuries', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false },
      incident_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'incidents', key: 'id' }, onDelete: 'CASCADE' },
      body_part: { type: Sequelize.STRING(100), allowNull: true },
      injury_type: { type: Sequelize.STRING(100), allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
    });

    await queryInterface.addIndex('incident_injuries', ['incident_id'], { name: 'incident_injuries_incident_id_idx' });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('incident_injuries');
    await queryInterface.dropTable('incidents');
  },
};
