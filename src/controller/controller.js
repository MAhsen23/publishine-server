const { MenstrualCycle, User } = require('../models/model');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).json({ message: 'success', user: user._id });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'error', error: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        const userResponse = {
            id: user._id,
            name: user.name,
            role: user.role,
        };
        res.status(200).json({ message: 'success', token, user: userResponse });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message });
    }
};