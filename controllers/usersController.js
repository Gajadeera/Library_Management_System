const User = require('../models/user');
const session = require('express-session');
const bcrypt = require('bcrypt');


const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.render('user/index', { users });
};

const createUser = async (req, res) => {
    const newUser = new User(req.body);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await newUser.save();
    res.redirect(`users/${newUser._id}`);
};

const showCreateUserForm = (req, res) => {
    res.render('user/new');
};

const getUserProfile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('user/profile', { user });
};

const showLoginForm = (req, res) => {
    res.render('user/login');
};

const login = async (req, res) => {
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


const showEditUserForm = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('user/edit', { user });
}

const EditUser = async (req, res) => {
    const { id } = req.params;

    if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
    }
    await User.updateOne({ _id: id }, { $set: req.body });

    const userAfterUpdate = await User.findById(id);

    res.render('user/profile', { user: userAfterUpdate });
};

const showDeleteUserForm = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('user/delete', { user });
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.redirect('/users', { user: deletedUser });
};


const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).send('Failed to log out');
            }

            res.redirect('/login'); // Redirect to login page after logout
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    deleteUser,
    showDeleteUserForm,
    EditUser,
    showEditUserForm,
    login,
    showLoginForm,
    getUserProfile,
    showCreateUserForm,
    createUser,
    getAllUsers,
    logout

}