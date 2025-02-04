const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// List all books
router.get('/', bookController.getAllBooks);

// Render form to add a new book
router.get('/add', (req, res) => res.render('book/new'));

// Add a new book
router.post('/add', bookController.addBook);

// Render edit form for a book
router.get('/edit/:id', bookController.renderEditBookForm);

// Update book details
router.post('/edit/:id', bookController.updateBook);

// Delete a book
router.post('/delete/:id', bookController.deleteBook);

module.exports = router;
