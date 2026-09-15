import { getDatabase, queryAll, execute } from '../DatabaseClient';
import { HelplineSeed } from '../seeds/helplineSeeds';

export interface Helpline extends HelplineSeed {
  id: number;
  is_active: number;
}

export const HelplineRepository = {
  /**
   * Search helplines by name, number, or regional name
   */
  search: (query: string): Helpline[] => {
    const q = `%${query}%`;
    return queryAll<Helpline>(
      `SELECT * FROM helplines 
       WHERE is_active = 1 
       AND (name LIKE ? OR number LIKE ? OR regional_name LIKE ?)
       ORDER BY state = 'national' DESC, name ASC`,
      [q, q, q]
    );
  },

  /**
   * Get all helplines for a specific category
   */
  getByCategory: (category: string): Helpline[] => {
    return queryAll<Helpline>(
      `SELECT * FROM helplines 
       WHERE category = ? AND is_active = 1 
       ORDER BY state = 'national' DESC, name ASC`,
      [category]
    );
  },

  /**
   * Get all active helplines
   */
  getAll: (): Helpline[] => {
    return queryAll<Helpline>(
      `SELECT * FROM helplines WHERE is_active = 1 ORDER BY name ASC`
    );
  },

  /**
   * Insert a custom user helpline
   */
  insertCustom: (helpline: Omit<Helpline, 'id' | 'is_active'>): number => {
    return execute(
      `INSERT INTO helplines (name, number, category, regional_name, state)
       VALUES (?, ?, ?, ?, ?)`,
      [
        helpline.name,
        helpline.number,
        helpline.category,
        helpline.regional_name ?? null,
        helpline.state ?? 'custom',
      ]
    );
  },

  /**
   * Soft delete a custom helpline
   */
  deactivate: (id: number): void => {
    execute(`UPDATE helplines SET is_active = 0 WHERE id = ? AND state = 'custom'`, [id]);
  },
};
