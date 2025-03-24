const express = require('express');
const app = express();
const db = require('../config/database');

// Middleware for parsing JSON bodies
app.use(express.json());

// Create notifications table
db.run(`CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    appointment_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (appointment_id) REFERENCES appointments (id)
)`);

// Get all notifications
app.get('/notifications', (req, res) => {
    const sql = `
        SELECT n.*, u.name as user_name, a.appointment_date 
        FROM notifications n
        JOIN users u ON n.user_id = u.id
        JOIN appointments a ON n.appointment_id = a.id
    `;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ notifications: rows });
    });
});

// Create a new notification
app.post('/notifications', (req, res) => {
    const { user_id, appointment_id, message } = req.body;
    const sql = 'INSERT INTO notifications (user_id, appointment_id, message) VALUES (?, ?, ?)';
    db.run(sql, [user_id, appointment_id, message], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, message: 'Notification created successfully' });
    });
});

// Mark notification as read
app.put('/notifications/:id', (req, res) => {
    const sql = 'UPDATE notifications SET status = ? WHERE id = ?';
    db.run(sql, ['read', req.params.id], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: 'Notification not found' });
            return;
        }
        res.json({ message: 'Notification marked as read' });
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Notification service is running on port ${PORT}`);
});