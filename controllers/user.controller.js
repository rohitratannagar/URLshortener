const bcrypt = require('bcrypt'); // Make sure bcrypt is installed
const User = require('../models/user.models');
const Request = require('../models/request.models');
const { setUser } = require('../utils/auth.utils');

async function signupUser(req, res) {
    let { name, email, password } = req.body;
    email = email.toLowerCase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = setUser({
        _id: user._id,
        email: user.email,
        role: user.role,
    });

    res.cookie('uid', token);
    res.cookie('success', 'Signup successful', { maxAge: 3000, httpOnly: false });
    return res.status(201).json({ message: 'user created successfully' });
}

async function loginUser(req, res) {
    let { email, password } = req.body;
    email = email.toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = setUser({
        _id: user._id,
        email: user.email,
        role: user.role,
    });

    res.cookie('uid', token);
    res.cookie('success', 'Login successful', { maxAge: 3000, httpOnly: false }); // lasts 3 seconds
    return res.status(201).json({ message: 'user logged in successfully' });
}

async function logoutUser(req, res) {
    if (!req.user) return res.redirect('/');

    res.cookie('uid', "", { maxAge: 1 });
    res.set('Cache-Control', 'no-store');
    return res.redirect("/");
}

async function handleRequest(req, res) {
    const { message } = req.body;

    try {
        const request = await Request.create({
            user: req.user._id,
            message,
        });

        if (!request) {
            return res.status(500).send('Server error');
        }

        return res.render("makeRequest", {
            currentPage: 'profile',
            success: true
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Something went wrong');
    }
}

module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    handleRequest
};
