import { queryAll, execute } from '../DatabaseClient';
export const AuditLogRepository = {
  insert: (id: string, type: string, method: string) => execute('INSERT INTO audit_logs (id, incident_type, trigger_method, created_at) VALUES (?, ?, ?, ?)', [id, type, method, Date.now()]),
};
