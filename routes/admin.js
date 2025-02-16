// routes/admin.js
const express = require('express');
const router = express.Router();
const isSuperAdmin = require('../middleware/isSuperAdmin');
const adminConroller = require('../controllers/adminController')


// // Apply middleware to restrict access to super admins
// router.get('/', isSuperAdmin, (req, res) => {
//     res.render('admin/dashboard');
// });

router.get('/createAdmin', isSuperAdmin, adminConroller.showCreateAdminForm);

router.post('/createAdmin', isSuperAdmin, adminConroller.createAdmin);




module.exports = router;