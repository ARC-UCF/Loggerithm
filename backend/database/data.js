import Database from "better-sqlite3";
const db = new Database("database.db");

db.pragma('journal mode = WAL');


db.prepare(`
    CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        operator TEXT,
        station TEXT,
        contact TEXT,
        contact_ops TEXT,
        state TEXT,
        region TEXT,
        contact_parks TEXT,
        frequency TEXT,
        band TEXT,
        mode TEXT,
        rst_sent TEXT,
        rst_received TEXT,
        radio TEXT,
        type TEXT,
        comments TEXT,
        logged TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
        lastupdated TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
    )
`);

db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_logs_operator ON logs(operator);
    CREATE INDEX IF NOT EXISTS idx_logs_station ON logs(station);
    CREATE INDEX IF NOT EXISTS idx_logs_contact ON logs(contact);
    CREATE INDEX IF NOT EXISTS idx_logs_radio ON logs(radio);
    CREATE INDEX IF NOT EXISTS idx_logs_logged ON logs(logged);
    CREATE INDEX IF NOT EXISTS idx_logs_lastupdated ON logs(lastupdated);
    CREATE INDEX IF NOT EXISTS idx_logs_band ON logs(band);
    CREATE INDEX IF NOT EXISTS idx_logs_type ON logs(type);
    CREATE INDEX IF NOT EXISTS idx_logs_region ON logs(region);
    CREATE INDEX IF NOT EXISTS idx_logs_state ON logs(state);
    CREATE INDEX IF NOT EXISTS idx_logs_id ON logs(id);
    CREATE INDEX IF NOT EXISTS idx_logs_mode ON logs(mode);
`);

db.prepare(`
    CREATE TRIGGER update_logs_timestamp
    AFTER UPDATE ON logs
    FOR EACH ROW
    BEGIN
        UPDATE logs
        SET lastupdated = (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
        WHERE id = OLD.id;
    END;
`);


