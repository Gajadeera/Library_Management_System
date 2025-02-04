const Book = require('../models/book');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.render('book/index', { books });
    } catch (err) {
        res.status(500).send('Error retrieving books.');
    }
};

const addBook = async (req, res) => {
    try {
        const { title, author, genre, publishedYear, availableCopies } = req.body;
        const book = new Book({ title, author, genre, publishedYear, availableCopies });
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
        res.render('books/editBook', { book });
    } catch (err) {
        res.status(500).send('Error loading edit form.');
    }
};


const updateBook = async (req, res) => {
    try {
        const { title, author, genre, publishedYear, availableCopies } = req.body;
        await Book.findByIdAndUpdate(req.params.id, { title, author, genre, publishedYear, availableCopies });
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

module.exports = {
    getAllBooks,
    addBook,
    renderEditBookForm,
    updateBook,
    deleteBook,
};
