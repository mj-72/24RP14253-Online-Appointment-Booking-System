const db = require('../config/database');

beforeAll(async () => {
    // Create test tables
    await new Promise((resolve) => {
        db.serialize(() => {
            // Create users table
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            // Create services table
            db.run(`CREATE TABLE IF NOT EXISTS services (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                duration INTEGER,
                price DECIMAL(10,2),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            // Create appointments table
            db.run(`CREATE TABLE IF NOT EXISTS appointments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                service_id INTEGER NOT NULL,
                appointment_date DATETIME NOT NULL,
                status TEXT DEFAULT 'pending',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (service_id) REFERENCES services (id)
            )`, [], (err) => {
                if (err) console.error(err);
                resolve();
            });
        });
    });

    // Insert test service
    await new Promise((resolve) => {
        db.run(`INSERT INTO services (name, description, duration, price) 
               VALUES (?, ?, ?, ?)`,
            ['Test Service', 'Service for testing', 60, 99.99],
            (err) => {
                if (err) console.error(err);
                resolve();
            });
    });
});

afterAll(async () => {
    // Clean up test database
    await new Promise((resolve) => {
        db.serialize(() => {
            db.run('DROP TABLE IF EXISTS appointments');
            db.run('DROP TABLE IF EXISTS services');
            db.run('DROP TABLE IF EXISTS users', [], (err) => {
                if (err) console.error(err);
                resolve();
            });
        });
    });
});