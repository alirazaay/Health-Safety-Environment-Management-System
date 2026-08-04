'use strict';

const { v4: uuidv4 } = require('uuid');
const { ROLES } = require('../../shared/constants/roles');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('roles', [
      {
        id: uuidv4(),
        name: ROLES.SUPER_ADMIN,
        display_name: 'Super Admin',
        description: 'Full system access — all permissions granted',
        is_system: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        name: ROLES.ADMIN,
        display_name: 'Administrator',
        description: 'Administrative access to most features',
        is_system: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        name: ROLES.MANAGER,
        display_name: 'Manager',
        description: 'Can manage users and view reports',
        is_system: false,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        name: ROLES.USER,
        display_name: 'User',
        description: 'Standard user with basic access',
        is_system: true,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
