const express = require('express');
const app = express();
const db = require('./config/database');

// Middleware for parsing JSON bodies
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Online Appointment Booking System API' });
});

// Routes for Users
app.post('/api/users', (req, res) => {
    const { name, email, password } = req.body;
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.run(sql, [name, email, password], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, message: 'User created successfully' });
    });
});

app.get('/api/users', (req, res) => {
    const sql = 'SELECT id, name, email, created_at FROM users';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ users: rows });
    });
});

app.get('/api/users/:id', (req, res) => {
    const sql = 'SELECT id, name, email, created_at FROM users WHERE id = ?';
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ user: row });
    });
});

// Routes for Appointments
app.post('/api/appointments', (req, res) => {
    const { user_id, service_id, appointment_date } = req.body;
    const sql = 'INSERT INTO appointments (user_id, service_id, appointment_date) VALUES (?, ?, ?)';
    db.run(sql, [user_id, service_id, appointment_date], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, message: 'Appointment created successfully' });
    });
});

app.get('/api/appointments', (req, res) => {
    const sql = `
        SELECT a.*, u.name as user_name, s.name as service_name 
        FROM appointments a 
        JOIN users u ON a.user_id = u.id 
        JOIN services s ON a.service_id = s.id
    `;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ appointments: rows });
    });
});

app.get('/api/appointments/:id', (req, res) => {
    const sql = `
        SELECT a.*, u.name as user_name, s.name as service_name 
        FROM appointments a 
        JOIN users u ON a.user_id = u.id 
        JOIN services s ON a.service_id = s.id 
        WHERE a.id = ?
    `;
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'Appointment not found' });
            return;
        }
        res.json({ appointment: row });
    });
});

app.put('/api/appointments/:id', (req, res) => {
    const { appointment_date, status } = req.body;
    const sql = 'UPDATE appointments SET appointment_date = ?, status = ? WHERE id = ?';
    db.run(sql, [appointment_date, status, req.params.id], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: 'Appointment not found' });
            return;
        }
        res.json({ message: 'Appointment updated successfully' });
    });
});

app.delete('/api/appointments/:id', (req, res) => {
    const sql = 'DELETE FROM appointments WHERE id = ?';
    db.run(sql, [req.params.id], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: 'Appointment not found' });
            return;
        }
        res.json({ message: 'Appointment deleted successfully' });
    });
});

// Routes for Services
app.post('/api/services', (req, res) => {
    const { name, description, duration, price } = req.body;
    const sql = 'INSERT INTO services (name, description, duration, price) VALUES (?, ?, ?, ?)';
    db.run(sql, [name, description, duration, price], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, message: 'Service created successfully' });
    });
});

app.get('/api/services', (req, res) => {
    const sql = 'SELECT * FROM services';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ services: rows });
    });
});

app.get('/api/services/:id', (req, res) => {
    const sql = 'SELECT * FROM services WHERE id = ?';
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'Service not found' });
            return;
        }
        res.json({ service: row });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});