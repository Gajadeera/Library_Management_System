const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/login', usersController.showLoginForm);
router.post('/login', usersController.login);
router.get('/logout', usersController.logout);
router.get('/', usersController.getAllUsers);
router.get('/new', usersController.showCreateUserForm);
router.post('/', usersController.createUser);
router.get('/:id', usersController.getUserProfile);
router.get('/:id/edit', usersController.showEditUserForm);
router.put('/:id', usersController.editUser);
router.get('/:id/delete', usersController.showDeleteUserForm);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
