// routes/admin.js
const express = require('express');
const router = express.Router();
const isSuperAdmin = require('../middleware/isSuperAdmin');

// Apply middleware to restrict access to super admins
router.get('/dashboard', isSuperAdmin, (req, res) => {
    res.render('admin/dashboard');
});

router.get('/createAdmin', isSuperAdmin, (req, res) => {
    res.render('admin/createAdmin');
});

router.post('/createAdmin', isSuperAdmin, (req, res) => {
    // Logic to create a new admin
});

module.exports = router;