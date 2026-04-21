import Database from "better-sqlite3";
const db = new Database("database.db");

db.pragma('journal mode = WAL');

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        callsign TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        class TEXT NOT NULL,
        discorduser TEXT NOT NULL,
        rank INTEGER NOT NULL DEFAULT 0,
        role TEXT DEFAULT 'member',
        disabled INTEGER DEFAULT 0 CHECK (disabled IN (0, 1)),
        created_at INTEGER DEFAULT (strftime('%s', 'now'))
    )
`).run();

db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_users_role
    ON users(role)
`).run();

db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_users_disabled
    ON users(disabled)
`).run();

db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_users_email
    ON users(email)
`).run();

db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_user_discord
    ON users(discorduser)
`).run();

db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_user_class
    ON users(class)
`).run();

db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_user_callsign
    ON users(callsign)
`).run();

db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_user_id
    ON users(id)
`).run();

    
db.prepare(`
    CREATE TABLE IF NOT EXISTS account_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        submitted_at INTEGER DEFAULT (strftime('%s', 'now')),
        ip TEXT,
        nation TEXT,
        region TEXT,
        city TEXT,
        approved TEXT DEFAULT 'pending'
)`).run();

db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_request_id
    ON account_requests(id)
`).run();

db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_request_email
    ON account_requests(email)
`).run();

db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_request_nation
    ON account_requests(nation)
`).run();

db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_request_region
    ON account_requests(region)
`).run();

db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_request_status
    ON account_requests(approved)
`).run();