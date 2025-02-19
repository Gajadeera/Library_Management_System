const Report = require('../models/report');
const Transaction = require('../models/transaction');
const Book = require('../models/book');

exports.generateBorrowingTrends = async (req, res) => {
    try {
        const borrowingTrends = await Transaction.aggregate([
            { $group: { _id: "$bookId", totalBorrows: { $sum: 1 } } },
            { $sort: { totalBorrows: -1 } },
            { $limit: 10 }
        ]);
        const report = new Report({ reportType: 'borrowingTrends', data: borrowingTrends });
        await report.save();
        res.status(200).json({ success: true, data: borrowingTrends });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};