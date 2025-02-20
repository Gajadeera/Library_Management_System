const express = require('express');
const router = express.Router();
const isSuperAdmin = require('../middleware/isSuperAdmin');
const adminConroller = require('../controllers/adminController')

router.get('/createAdmin', isSuperAdmin, adminConroller.showCreateAdminForm);

router.post('/createAdmin', isSuperAdmin, adminConroller.createAdmin);

module.exports = router;