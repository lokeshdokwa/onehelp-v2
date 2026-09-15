/**
 * OneHelp — Database Schema Definitions
 *
 * All CREATE TABLE statements for the local SQLite database.
 * These are the canonical table definitions used by migrations.
 */

export const SCHEMA_TABLES = {
  helplines: `
    CREATE TABLE IF NOT EXISTS helplines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      number TEXT NOT NULL,
      category TEXT NOT NULL,
      regional_name TEXT,
      state TEXT DEFAULT 'national',
      is_active INTEGER DEFAULT 1
    );
  `,

  guides: `
    CREATE TABLE IF NOT EXISTS guides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      content_path TEXT NOT NULL,
      language TEXT DEFAULT 'en',
      icon_name TEXT
    );
  `,

  hazards: `
    CREATE TABLE IF NOT EXISTS hazards (
      id TEXT PRIMARY KEY,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      type TEXT NOT NULL,
      description TEXT,
      photo_path TEXT,
      created_at INTEGER NOT NULL,
      expires_at INTEGER NOT NULL,
      verified_count INTEGER DEFAULT 0,
      reported_by TEXT
    );
  `,

  geofences: `
    CREATE TABLE IF NOT EXISTS geofences (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      polygon TEXT NOT NULL,
      severity TEXT DEFAULT 'medium',
      source TEXT DEFAULT 'government',
      is_active INTEGER DEFAULT 1,
      updated_at INTEGER
    );
  `,

  family_members: `
    CREATE TABLE IF NOT EXISTS family_members (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT,
      public_key TEXT NOT NULL,
      last_known_lat REAL,
      last_known_lng REAL,
      last_seen_at INTEGER,
      status TEXT DEFAULT 'unknown',
      battery_level INTEGER
    );
  `,

  missing_children: `
    CREATE TABLE IF NOT EXISTS missing_children (
      id TEXT PRIMARY KEY,
      name TEXT,
      age_at_missing INTEGER,
      face_embedding BLOB NOT NULL,
      guardian_phone TEXT NOT NULL,
      guardian_name TEXT NOT NULL,
      missing_since INTEGER,
      police_case_number TEXT,
      thumbnail_path TEXT
    );
  `,

  audit_logs: `
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      incident_type TEXT NOT NULL,
      trigger_method TEXT,
      latitude REAL,
      longitude REAL,
      stress_score REAL,
      audio_evidence_path TEXT,
      dispatch_method TEXT,
      created_at INTEGER NOT NULL,
      resolved_at INTEGER,
      response_rating INTEGER,
      response_notes TEXT
    );
  `,
} as const;

/** Index definitions for query performance */
export const SCHEMA_INDEXES = [
  'CREATE INDEX IF NOT EXISTS idx_helplines_category ON helplines(category);',
  'CREATE INDEX IF NOT EXISTS idx_helplines_state ON helplines(state);',
  'CREATE INDEX IF NOT EXISTS idx_guides_category ON guides(category);',
  'CREATE INDEX IF NOT EXISTS idx_guides_language ON guides(language);',
  'CREATE INDEX IF NOT EXISTS idx_hazards_type ON hazards(type);',
  'CREATE INDEX IF NOT EXISTS idx_hazards_expires ON hazards(expires_at);',
  'CREATE INDEX IF NOT EXISTS idx_hazards_location ON hazards(latitude, longitude);',
  'CREATE INDEX IF NOT EXISTS idx_geofences_type ON geofences(type);',
  'CREATE INDEX IF NOT EXISTS idx_geofences_active ON geofences(is_active);',
  'CREATE INDEX IF NOT EXISTS idx_family_status ON family_members(status);',
  'CREATE INDEX IF NOT EXISTS idx_audit_type ON audit_logs(incident_type);',
  'CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at);',
] as const;

export type TableName = keyof typeof SCHEMA_TABLES;
