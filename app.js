const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');
const adminRoutes = require('./routes/admin');
const borrowRoutes = require('./routes/borrow');
const reportRoutes = require('./routes/report');
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


app.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        const shuffledBooks = books.sort(() => 0.5 - Math.random());
        const selectedBooks = shuffledBooks.slice(0, 5);
        res.render("index", { books: selectedBooks, user: req.session.user });
    } catch (err) {

        res.status(500).send("Server Error");
    }
});

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/admin', adminRoutes);
app.use('/borrow', borrowRoutes);
app.use('/report', reportRoutes);

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});

app.listen(8080, (req, res) => {
    console.log('Server running on port 8080');
});