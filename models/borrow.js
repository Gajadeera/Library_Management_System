const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    book_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Book' },
    borrow_date: { type: Date, required: true, default: Date.now },
    due_date: { type: Date, required: true },
    return_date: { type: Date },
    status: { type: String, enum: ["active", "returned"], required: true, default: "active" },
    fine_amount: { type: Number, default: 0.0 }
});

const Borrow = mongoose.model('Borrow', borrowSchema);

module.exports = Borrow;
