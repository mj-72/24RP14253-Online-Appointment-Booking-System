const request = require('supertest');
const app = require('../server');
const db = require('../config/database');

beforeAll(async () => {
    // Setup test database
    await new Promise((resolve) => {
        db.serialize(() => {
            db.run('DELETE FROM appointments');
            db.run('DELETE FROM services');
            db.run('DELETE FROM users', [], (err) => {
                if (err) console.error(err);
                resolve();
            });
        });
    });

    // Insert test service for appointments
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

describe('API Endpoints', () => {
    describe('GET /', () => {
        it('should return welcome message', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Welcome to Online Appointment Booking System API');
        });
    });

    describe('Users API', () => {
        it('should create a new user', async () => {
            const res = await request(app)
                .post('/api/users')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'password123'
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id');
        });

        it('should get all users', async () => {
            const res = await request(app).get('/api/users');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body.users)).toBeTruthy();
        });
    });

    describe('Appointments API', () => {
        it('should create a new appointment', async () => {
            const res = await request(app)
                .post('/api/appointments')
                .send({
                    user_id: 1,
                    service_id: 1,
                    appointment_date: '2024-03-20T10:00:00.000Z'
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id');
        });

        it('should get all appointments', async () => {
            const res = await request(app).get('/api/appointments');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body.appointments)).toBeTruthy();
        });
    });
});

afterAll(async () => {
    // Clean up test database
    await new Promise((resolve) => {
        db.close((err) => {
            if (err) console.error(err);
            resolve();
        });
    });
});