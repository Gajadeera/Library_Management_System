const User = require('../models/user');
const session = require('express-session');
const bcrypt = require('bcrypt');


module.exports.getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.render('user/index', { users });
};

module.exports.createUser = async (req, res) => {
    const newUser = new User(req.body);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await newUser.save();
    res.redirect(`users/${newUser._id}`);
};

module.exports.showCreateUserForm = (req, res) => {
    res.render('user/new');
};

module.exports.getUserProfile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('user/profile', { user });
};

module.exports.showLoginForm = (req, res) => {
    res.render('user/login');
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.send('Email or password incorrect');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.send('Email or password incorrect');
        }
        req.session.user = user;
        res.render('user/profile', { user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};


module.exports.showEditUserForm = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('user/edit', { user });
}

module.exports.EditUser = async (req, res) => {
    const { id } = req.params;

    // Only hash the password if it is present in the request body
    if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
        req.body.password = hashedPassword; // Update the password field in the body
    }

    // Use updateOne to update only the fields in req.body (excluding password if not provided)
    await User.updateOne({ _id: id }, { $set: req.body });

    // Fetch the updated user document to render it
    const userAfterUpdate = await User.findById(id);

    // Render the updated user profile page
    res.render('user/profile', { user: userAfterUpdate });
};

module.exports.showDeleteUserForm = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('user/delete', { user });
};

module.exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.redirect('/users', { user: deletedUser });
};
