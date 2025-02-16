const User = require('../models/user');
const session = require('express-session');
const bcrypt = require('bcrypt');

const createAdmin = async (req, res) => {
    const newAdmin = new User(req.body);
    newAdmin.password = await bcrypt.hash(newUser.password, 10);
    await newAdmin.save();
    res.redirect(`admin/${newAdmin._id}`);
};

const showCreateAdminForm = (req, res) => {
    res.render('admin/createAdmin');
};

module.exports = {
    showCreateAdminForm,
    createAdmin
};
