import { queryAll } from '../DatabaseClient';
export const GuideRepository = {
  getAll: () => queryAll('SELECT * FROM guides'),
};
