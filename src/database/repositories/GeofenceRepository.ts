import { queryAll } from '../DatabaseClient';
export const GeofenceRepository = {
  getAll: () => queryAll('SELECT * FROM geofences'),
};
