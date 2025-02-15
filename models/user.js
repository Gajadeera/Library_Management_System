const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    password: { type: String, required: true }, // Hashing will be done in the controller
    role: { type: String, enum: ['admin', 'librarian', 'user', 'superAdmin'], default: 'user' },
    membershipType: { type: String, enum: ['Golden', 'Bronze'], default: 'Bronze' },
    penaltyAmount: { type: Number, default: 0, min: 0 },
    borrowedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
