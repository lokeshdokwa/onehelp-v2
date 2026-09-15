import { queryAll, execute } from '../DatabaseClient';
export const HazardRepository = {
  insert: (id: string, lat: number, lng: number, type: string) => 
    execute('INSERT INTO hazards (id, latitude, longitude, type, created_at, expires_at) VALUES (?,?,?,?,?,?)', [id, lat, lng, type, Date.now(), Date.now()+86400000]),
  getAll: () => queryAll('SELECT * FROM hazards'),
};
