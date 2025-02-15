const mongoose = require('mongoose');
const User = require('../Library_Management_System/models/user');
const bcrypt = require('bcrypt');

const MONGO_URI = 'mongodb://127.0.0.1:27017/Library_System';

const createSuperAdmin = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000
        });

        console.log('Database connected...');

        const hashedPassword = await bcrypt.hash('noKidding123', 10);

        const superAdmin = new User({
            name: 'dayan',
            email: 'dayan@gmail.com',
            password: hashedPassword,
            role: 'superAdmin',
            membershipType: 'Golden',
            penaltyAmount: 0,
            borrowedBooks: []
        });

        await superAdmin.save();
        console.log('Super admin account created successfully')

    } catch (error) {
        console.log(error.error);
    } finally {
        mongoose.connection.close();
        console.log('Database connection closed.')
    }
};

createSuperAdmin();
