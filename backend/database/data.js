import Database from "better-sqlite3";
const db = new Database("database.db");

export function startup() {
    db.pragma('journal mode = WAL').run();

    // Create our logs table.

    // Lastupdated will be more authoritative than logged. Logged will be the time the contact was made, which will be overwritten from default if adding a log later in the day after the contact was made.
    db.prepare(`
        CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            operator TEXT,
            station TEXT,
            contact TEXT,
            contact_ops TEXT,
            power TEXT,
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
            logged INTEGER DEFAULT (strftime('%s', 'now')),
            lastupdated INTEGER DEFAULT (strftime('%s', 'now'))
        )
        `).run();

    // Create indexes on all the values we want to quickly search for. 
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
    `).run();

    // Trigger to automatically update updated time to logs.
    db.prepare(`
        CREATE TRIGGER IF NOT EXISTS update_logs_timestamp
        AFTER UPDATE ON logs
        FOR EACH ROW
        BEGIN
            UPDATE logs
            SET lastupdated = (strftime('%s', 'now'))
            WHERE id = OLD.id;
        END;
    `).run();

    // Action log table. Will store things like log updates, etc.
    db.prepare(`
        CREATE TABLE IF NOT EXISTS action_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            operator TEXT,
            action TEXT,
            executed INTEGER DEFAULT (strftime('%s', 'now')),
        )
    `).run();

    // Create indexes for the table.
    db.prepare(`
        CREATE INDEX IF NOT EXISTS idx_actions_op ON action_logs(operator);
        CREATE INDEX IF NOT EXISTS idx_actions_action ON action_logs(action);
        CREATE INDEX IF NOT EXISTS idx_actions_executed ON action_logs(executed);
        CREATE INDEX IF NOT EXISTS idx_actions_id ON action_logs(id);
    `).run();
}


