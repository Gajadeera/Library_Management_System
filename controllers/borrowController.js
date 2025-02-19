const mongoose = require('mongoose');
const Borrow = require('../models/borrow');
const Book = require('../models/book');

const makeBorrwow = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/?error=Please log in to borrow a book');
    }

    try {
        const userId = new mongoose.Types.ObjectId(req.session.user._id); // Use 'new' keyword
        const { bookId } = req.body;

        // Check if book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.redirect('/?error=Book not found');
        }

        // Create new borrow record
        const newBorrow = new Borrow({
            user_id: userId,
            book_id: new mongoose.Types.ObjectId(bookId), // Use 'new' keyword
            borrow_date: new Date(),
            due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from today
            status: "active",
            fine_amount: 0.0
        });

        await newBorrow.save();
        console.log('Borrow record saved successfully:', newBorrow);
        return res.redirect('/?success=Book borrowed successfully!');
    } catch (error) {
        console.error('Error saving borrow record:', error);
        return res.redirect('/?error=Error processing request');
    }
};

module.exports = { makeBorrwow };