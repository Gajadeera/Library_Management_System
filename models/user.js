const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'librarian', 'user'], default: 'user' },
    membershipType: { type: String, enum: ['Golden', 'Bronze'], default: 'Bronze' },
    penaltyAmount: { type: Number, default: 0 },
    borrowedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
