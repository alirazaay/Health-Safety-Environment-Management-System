'use strict';

const ROLES = Object.freeze({
  // ─── Existing System Roles ─────────────────────────────────────────────────
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
  GUEST: 'guest',

  // ─── HSE Management Roles ──────────────────────────────────────────────────
  PLANT_MANAGER: 'plant_manager',
  HSE_MANAGER: 'hse_manager',
  HSE_OFFICER: 'hse_officer',
  SUPERVISOR: 'supervisor',
  EMPLOYEE: 'employee',
  INTERN: 'intern',
});

module.exports = { ROLES };
