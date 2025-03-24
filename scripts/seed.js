const db = require('../config/database');

// Insert dummy users
const insertUsers = () => {
    const users = [
        ['John Doe', 'john@example.com', 'password123'],
        ['Jane Smith', 'jane@example.com', 'password456'],
        ['Mike Johnson', 'mike@example.com', 'password789']
    ];

    users.forEach(user => {
        db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', user, (err) => {
            if (err) console.error('Error inserting user:', err.message);
        });
    });
};

// Insert dummy services
const insertServices = () => {
    const services = [
        ['Haircut', 'Basic haircut service', 30, 25.00],
        ['Massage', 'Full body massage', 60, 50.00],
        ['Dental Cleaning', 'Basic dental cleaning', 45, 75.00]
    ];

    services.forEach(service => {
        db.run('INSERT INTO services (name, description, duration, price) VALUES (?, ?, ?, ?)', service, (err) => {
            if (err) console.error('Error inserting service:', err.message);
        });
    });
};

// Insert dummy appointments
const insertAppointments = () => {
    const appointments = [
        [1, 1, '2024-03-20 10:00:00', 'pending'],
        [2, 2, '2024-03-21 14:00:00', 'confirmed'],
        [3, 3, '2024-03-22 11:00:00', 'completed']
    ];

    appointments.forEach(appointment => {
        db.run('INSERT INTO appointments (user_id, service_id, appointment_date, status) VALUES (?, ?, ?, ?)', appointment, (err) => {
            if (err) console.error('Error inserting appointment:', err.message);
        });
    });
};

// Insert dummy notifications
const insertNotifications = () => {
    const notifications = [
        [1, 1, 'Your appointment has been scheduled'],
        [2, 2, 'Appointment confirmed for tomorrow'],
        [3, 3, 'Thank you for using our service']
    ];

    notifications.forEach(notification => {
        db.run('INSERT INTO notifications (user_id, appointment_id, message) VALUES (?, ?, ?)', notification, (err) => {
            if (err) console.error('Error inserting notification:', err.message);
        });
    });
};

// Execute all insertions
const seedDatabase = () => {
    insertUsers();
    setTimeout(insertServices, 500);
    setTimeout(insertAppointments, 1000);
    setTimeout(insertNotifications, 1500);
    
    // Exit after all insertions are done
    setTimeout(() => {
        console.log('Database seeded successfully!');
        process.exit(0);
    }, 2000);
};

// Run the seeding
seedDatabase();