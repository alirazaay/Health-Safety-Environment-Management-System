'use strict';

/**
 * XSS Sanitization Middleware.
 * Uses the xss-clean package to strip dangerous HTML from all string values
 * in req.body, req.query, and req.params.
 */
const xssClean = require('xss-clean');

module.exports = xssClean();
