const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const path = require('path');

exports.getLogin = async (req, res) => {
    console.log('reached')
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
};

exports.getRegister = async (req, res) => {
    console.log('reached')
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
};

exports.getHome = async (req, res) => {
    console.log('reached')
    res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
};

// Register new user
exports.registerUser = async (req, res) => {
    const { name, email, password, phone, profession } = req.body;
    try {
        const user = new User({ name, email, password, phone, profession });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'User registration failed' });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
        console.log(token)
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};
