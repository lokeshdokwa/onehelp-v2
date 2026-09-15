/**
 * OneHelp — SQLite Database Client
 *
 * Singleton connection to the local SQLite database via react-native-quick-sqlite.
 * All database operations go through this client.
 * Thread-safe, WAL mode enabled for concurrent read performance.
 */

import { open, QuickSQLiteConnection } from 'react-native-quick-sqlite';
import { runMigrations, CURRENT_SCHEMA_VERSION } from './migrations';

const DB_NAME = 'onehelp.db';

let dbInstance: QuickSQLiteConnection | null = null;

/**
 * Returns the singleton database connection.
 * Initializes on first call, runs migrations, enables WAL mode.
 */
export function getDatabase(): QuickSQLiteConnection {
  if (dbInstance) {
    return dbInstance;
  }

  try {
    dbInstance = open({ name: DB_NAME });

    // Enable Write-Ahead Logging for better concurrent read performance
    dbInstance.execute('PRAGMA journal_mode = WAL;');
    // Enable foreign keys
    dbInstance.execute('PRAGMA foreign_keys = ON;');
    // Set busy timeout to 5 seconds to avoid SQLITE_BUSY errors
    dbInstance.execute('PRAGMA busy_timeout = 5000;');

    // Run schema migrations
    runMigrations(dbInstance);
  } catch (error) {
    console.log('Database init error:', error);
    // Prevent hard crash if DB already exists or throws during migrations
  }

  return dbInstance as QuickSQLiteConnection;
}

/**
 * Execute a query and return all rows.
 */
export function queryAll<T>(sql: string, params: (string | number | null)[] = []): T[] {
  const db = getDatabase();
  const result = db.execute(sql, params);
  if (!result.rows || result.rows.length === 0) {
    return [];
  }
  // Convert RowSet to array of typed objects
  const rows: T[] = [];
  for (let i = 0; i < result.rows.length; i++) {
    rows.push(result.rows.item(i) as T);
  }
  return rows;
}

/**
 * Execute a query and return the first row or null.
 */
export function queryFirst<T>(sql: string, params: (string | number | null)[] = []): T | null {
  const results = queryAll<T>(sql, params);
  return results.length > 0 ? results[0] : null;
}

/**
 * Execute an INSERT/UPDATE/DELETE and return rows affected.
 */
export function execute(
  sql: string,
  params: (string | number | null | Uint8Array)[] = [],
): number {
  const db = getDatabase();
  const result = db.execute(sql, params);
  return result.rowsAffected ?? 0;
}

/**
 * Execute multiple statements in a transaction.
 * Rolls back on any error.
 */
export function executeTransaction(
  operations: Array<{
    sql: string;
    params?: (string | number | null | Uint8Array)[];
  }>,
): void {
  const db = getDatabase();
  db.execute('BEGIN TRANSACTION;');
  try {
    for (const op of operations) {
      db.execute(op.sql, op.params ?? []);
    }
    db.execute('COMMIT;');
  } catch (error) {
    db.execute('ROLLBACK;');
    throw error;
  }
}

/**
 * Get the current schema version.
 */
export function getSchemaVersion(): number {
  try {
    const db = getDatabase();
    const result = db.execute('PRAGMA user_version;');
    if (result.rows && result.rows.length > 0) {
      return (result.rows.item(0) as { user_version: number }).user_version;
    }
  } catch {
    // Database not yet initialized
  }
  return 0;
}

/**
 * Close the database connection.
 * Used during app shutdown or testing.
 */
export function closeDatabase(): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}
