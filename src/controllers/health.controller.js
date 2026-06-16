const { getHealthStatus } = require('../services/health.service');

async function getHealth() {
  return getHealthStatus();
}

module.exports = {
  getHealth,
};
