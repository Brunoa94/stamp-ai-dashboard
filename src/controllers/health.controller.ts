import { getHealthStatus } from '../services/health.service';

export async function getHealth() {
  return getHealthStatus();
}
