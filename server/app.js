const express = require('express');
const bcrypt = require('bcryptjs');  // For password hashing
const jwt = require('jsonwebtoken'); // For generating tokens
const User = require('./models/User'); // Import User model
const Faculty = require('./models/Faculty');
require('dotenv').config(); // Load environment variables
require('./config/dbConn'); // Connect to the database
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple greeting route
app.get('/', (req, res) => {
    res.json({ message: 'Hello bhai' });
});

// Faculty routes
app.get('/faculty', async (req, res) => {
    const users = await Faculty.find({});
    if (JSON.stringify(users) === "[]") return res.status(203).json({ message: "No user found" });
    res.json(Array.isArray(users) ? users : [users]);
});

app.patch('/faculty/:faculty_id', async (req, res) => {
    const { faculty_id } = req.params;
    const faculty = await Faculty.findOne({ faculty_id }).exec();
    let leaves = Number(faculty.leaves);
    leaves++;
    faculty.leaves = "" + leaves;
    await faculty.save();
    res.json({ message: leaves });
});

// Register route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
        name,
        email,
        password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
    });

    res.json({ message: 'Login successful', token });
});

// Catch-all route for 404
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
});

// Server setup
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});