const mongoose = require('mongoose');
const ReportSchema = new mongoose.Schema({
    reportType: String,
    data: mongoose.Schema.Types.Mixed,
    generatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Report', ReportSchema);