const express = require('express');
const router = express.Router();
const Borrow = require('../models/borrow');
const Book = require('../models/book');
const mongoose = require('mongoose');
const BorrowController = require('../controllers/borrowController');

router.post('/', BorrowController.makeBorrwow);
module.exports = router;
