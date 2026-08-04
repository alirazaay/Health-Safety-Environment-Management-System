/**
 * Runtime database package boundary.
 * The existing backend Sequelize implementation remains the compatibility
 * implementation during migration; new backend modules should consume this
 * package instead of reaching into application folders.
 */
module.exports = {
  createDatabaseAdapter: (connection) => connection,
};
