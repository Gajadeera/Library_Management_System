const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');
const adminRoutes = require('./routes/admin');
const borrowRoutes = require('./routes/borrow');
const methodOverride = require('method-override');
const session = require('express-session');
const Book = require('./models/book');

app.set('views', path.join(__dirname, 'views'));
app.use('/Content', express.static(path.join(__dirname, 'Content')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


app.use(session({
    secret: 'Univotech',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

mongoose.connect('mongodb://127.0.0.1:27017/Library_System', {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000
});
const db = mongoose.connection.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected...');
})

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const books = await Book.find().sort({ _id: 1 }); // Fetch all books in order
        res.render('index', { books });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/admin', adminRoutes);
app.use('/borrow', borrowRoutes);

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});

app.listen(8080, (req, res) => {
    console.log('Server running on port 8080');
});