import { queryAll, execute } from '../DatabaseClient';
export const FamilyCircleRepository = {
  getAll: () => queryAll('SELECT * FROM family_members'),
};
