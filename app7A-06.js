const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public4')));


// MySQL Connection

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'pranav@2007',
    database: 'movie_booking'

});

db.connect(function(err) {

    if (err) {
        console.log(err);
        return;
    }

    console.log("MySQL Connected Successfully!");

});


// Home Page

app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname, 'public4', 'index4.html'));

});


// ---------------- MOVIES ----------------


// View Movies

app.get('/movies', function(req, res) {

    db.query("SELECT * FROM movies", function(err, result) {

        if (err) return res.status(500).send(err.message);

        res.json(result);

    });

});


// Add Movie

app.post('/movies', function(req, res) {

    const { movie_name, genre, duration } = req.body;

    db.query(
        "INSERT INTO movies (movie_name, genre, duration) VALUES (?, ?, ?)",
        [movie_name, genre, duration],
        function(err, result) {

            if (err) return res.status(500).send(err.message);

            res.send("Movie Added Successfully");

        }
    );

});


// Update Movie

app.put('/movies/:id', function(req, res) {

    const { movie_name, genre, duration } = req.body;

    db.query(
        "UPDATE movies SET movie_name=?, genre=?, duration=? WHERE movie_id=?",
        [movie_name, genre, duration, req.params.id],
        function(err, result) {

            if (err) return res.status(500).send(err.message);

            res.send("Movie Updated Successfully");

        }
    );

});


// Delete Movie

app.delete('/movies/:id', function(req, res) {

    db.query(
        "DELETE FROM movies WHERE movie_id=?",
        [req.params.id],
        function(err, result) {

            if (err) return res.status(500).send(err.message);

            res.send("Movie Deleted Successfully");

        }
    );

});


// ---------------- CUSTOMERS ----------------


// View Customers

app.get('/customers', function(req, res) {

    db.query("SELECT * FROM customers", function(err, result) {

        if (err) return res.status(500).send(err.message);

        res.json(result);

    });

});


// Add Customer

app.post('/customers', function(req, res) {

    const { name, phone, email } = req.body;

    db.query(
        "INSERT INTO customers (name, phone, email) VALUES (?, ?, ?)",
        [name, phone, email],
        function(err, result) {

            if (err) return res.status(500).send(err.message);

            res.send("Customer Added Successfully");

        }
    );

});


// Update Customer

app.put('/customers/:id', function(req, res) {

    const { name, phone, email } = req.body;

    db.query(
        "UPDATE customers SET name=?, phone=?, email=? WHERE customer_id=?",
        [name, phone, email, req.params.id],
        function(err, result) {

            if (err) return res.status(500).send(err.message);

            res.send("Customer Updated Successfully");

        }
    );

});


// Delete Customer

app.delete('/customers/:id', function(req, res) {

    db.query(
        "DELETE FROM customers WHERE customer_id=?",
        [req.params.id],
        function(err, result) {

            if (err) return res.status(500).send(err.message);

            res.send("Customer Deleted Successfully");

        }
    );

});


// ---------------- BOOKINGS ----------------


// View Bookings

app.get('/bookings', function(req, res) {

    db.query("SELECT * FROM bookings", function(err, result) {

        if (err) return res.status(500).send(err.message);

        res.json(result);

    });

});


// Add Booking

app.post('/bookings', function(req, res) {

    const { customer_name, movie_name, booking_date, tickets } = req.body;

    db.query(
        "INSERT INTO bookings (customer_name, movie_name, booking_date, tickets) VALUES (?, ?, ?, ?)",
        [customer_name, movie_name, booking_date, tickets],
        function(err, result) {

            if (err) return res.status(500).send(err.message);

            res.send("Booking Added Successfully");

        }
    );

});


// Update Booking

app.put('/bookings/:id', function(req, res) {

    const { customer_name, movie_name, booking_date, tickets } = req.body;

    db.query(
        "UPDATE bookings SET customer_name=?, movie_name=?, booking_date=?, tickets=? WHERE booking_id=?",
        [customer_name, movie_name, booking_date, tickets, req.params.id],
        function(err, result) {

            if (err) return res.status(500).send(err.message);

            res.send("Booking Updated Successfully");

        }
    );

});


// Delete Booking

app.delete('/bookings/:id', function(req, res) {

    db.query(
        "DELETE FROM bookings WHERE booking_id=?",
        [req.params.id],
        function(err, result) {

            if (err) return res.status(500).send(err.message);

            res.send("Booking Deleted Successfully");

        }
    );

});


// Start Server

app.listen(3000, function() {

    console.log("Server running at http://localhost:3000");

});