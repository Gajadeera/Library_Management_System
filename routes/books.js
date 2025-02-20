const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');


router.get('/', bookController.getAllBooks);

router.get('/add', (req, res) => res.render('book/new'));

router.post('/add', bookController.addBook);

router.get('/edit/:id', bookController.renderEditBookForm);

router.post('/edit/:id', bookController.updateBook);

router.post('/delete/:id', bookController.deleteBook);

router.get('/search', bookController.searchbook)

module.exports = router;
