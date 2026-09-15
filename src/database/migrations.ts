/**
 * OneHelp — Database Migrations
 *
 * Version-safe schema migrations that run on every app launch.
 * Each migration is idempotent and forward-only.
 */

import { QuickSQLiteConnection } from 'react-native-quick-sqlite';
import { SCHEMA_TABLES, SCHEMA_INDEXES } from './schema';
import { SEED_HELPLINES } from './seeds/helplineSeeds';
import { SEED_GUIDES } from './seeds/guideSeeds';

export const CURRENT_SCHEMA_VERSION = 1;

interface Migration {
  version: number;
  description: string;
  up: (db: QuickSQLiteConnection) => void;
}

const migrations: Migration[] = [
  {
    version: 1,
    description: 'Initial schema — all tables, indexes, and seed data',
    up: (db: QuickSQLiteConnection) => {
      // Create all tables
      for (const createSQL of Object.values(SCHEMA_TABLES)) {
        db.execute(createSQL);
      }

      // Create all indexes
      for (const indexSQL of SCHEMA_INDEXES) {
        db.execute(indexSQL);
      }

      // Seed helplines
      for (const helpline of SEED_HELPLINES) {
        db.execute(
          `INSERT OR IGNORE INTO helplines (name, number, category, regional_name, state, is_active)
           VALUES (?, ?, ?, ?, ?, 1);`,
          [
            helpline.name,
            helpline.number,
            helpline.category,
            helpline.regional_name ?? null,
            helpline.state ?? 'national',
          ],
        );
      }

      // Seed guides
      for (const guide of SEED_GUIDES) {
        db.execute(
          `INSERT OR IGNORE INTO guides (title, category, content_path, language, icon_name)
           VALUES (?, ?, ?, ?, ?);`,
          [guide.title, guide.category, guide.content_path, guide.language ?? 'en', guide.icon_name ?? null],
        );
      }
    },
  },
];

/**
 * Run all pending migrations in order.
 * Uses PRAGMA user_version to track applied migrations.
 */
export function runMigrations(db: QuickSQLiteConnection): void {
  const currentVersionResult = db.execute('PRAGMA user_version;');
  let currentVersion = 0;
  if (currentVersionResult.rows && currentVersionResult.rows.length > 0) {
    currentVersion = (currentVersionResult.rows.item(0) as { user_version: number }).user_version;
  }

  const pendingMigrations = migrations
    .filter((m) => m.version > currentVersion)
    .sort((a, b) => a.version - b.version);

  if (pendingMigrations.length === 0) {
    return;
  }

  for (const migration of pendingMigrations) {
    db.execute('BEGIN TRANSACTION;');
    try {
      migration.up(db);
      db.execute(`PRAGMA user_version = ${migration.version};`);
      db.execute('COMMIT;');
    } catch (error) {
      db.execute('ROLLBACK;');
      throw new Error(
        `Migration v${migration.version} (${migration.description}) failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }
}
