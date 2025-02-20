const User = require('../models/user');
const session = require('express-session');

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.render('user/index', { users, user: req.session.user });
    console.log(req.session.user);
};

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.redirect(`users/${newUser._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
};

const showCreateUserForm = (req, res) => res.render('user/new', { user: req.session.user });

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('user/profile', { user });
};

const showLoginForm = (req, res) => res.render('user/login');

const login = async (req, res) => {
    try {
        const user = await User.authenticate(req.body.email, req.body.password);
        if (!user) return res.send('Email or password incorrect');

        req.session.user = user;
        res.render('user/profile', { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

const showEditUserForm = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('user/edit', { user });
};

const editUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        await User.findByIdAndUpdate(id, req.body, { new: true });
        const updatedUser = await User.findById(id);

        res.render('user/profile', { user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user');
    }
};

const showDeleteUserForm = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('user/delete', { user });
};

const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
};

const logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Failed to log out');
        }
        res.redirect('/');
    });
};

module.exports = {
    deleteUser,
    showDeleteUserForm,
    editUser,
    showEditUserForm,
    login,
    showLoginForm,
    getUserProfile,
    showCreateUserForm,
    createUser,
    getAllUsers,
    logout
};
