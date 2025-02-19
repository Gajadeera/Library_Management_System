const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'librarian', 'user', 'superAdmin'], default: 'user' },
    membershipType: { type: String, enum: ['Golden', 'Bronze'], default: 'Bronze' },
    penaltyAmount: { type: Number, default: 0, min: 0 },
    borrowedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
}, { timestamps: true });


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


userSchema.methods.comparePassword = async function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
};


userSchema.statics.authenticate = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) return null;

    const isValid = await user.comparePassword(password);
    return isValid ? user : null;
};

module.exports = mongoose.model('User', userSchema);
