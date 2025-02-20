const Book = require('../models/book');


const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.render('book/index', { books, user: req.session.user });
    } catch (err) {
        res.status(500).send('Error retrieving books.');
    }
};

const addBook = async (req, res) => {
    try {
        const { title, author, genre, publishedYear, availableCopies, imageUrl } = req.body;
        const book = new Book({ title, author, genre, publishedYear, availableCopies, imageUrl });
        await book.save();
        res.redirect('/books');
    } catch (err) {
        res.status(400).send('Error adding book.');
    }
};

const renderEditBookForm = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).send('Book not found.');
        res.render('book/edit', { book });
    } catch (err) {
        res.status(500).send('Error loading edit form.');
    }
};


const updateBook = async (req, res) => {
    try {
        const { title, author, genre, publishedYear, availableCopies } = req.body;
        await Book.findByIdAndUpdate(req.params.id, { title, author, genre, publishedYear, availableCopies, imageUrl });
        res.redirect('/books');
    } catch (err) {
        res.status(400).send('Error updating book.');
    }
};

const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect('/books');
    } catch (err) {
        res.status(500).send('Error deleting book.');
    }
};

const searchbook = async (req, res) => {
    try {
        const book_name = req.query.title;

        const book = await Book.findOne({ title: new RegExp(`^${book_name}$`, 'i') });

        if (!book) {
            return res.status(404).send('Book not found');
        }

        res.render('book/search', { book });
    } catch (err) {
        res.status(500).send('Error retrieving books.');
    }
};


module.exports = {
    getAllBooks,
    addBook,
    renderEditBookForm,
    updateBook,
    deleteBook,
    searchbook
};
