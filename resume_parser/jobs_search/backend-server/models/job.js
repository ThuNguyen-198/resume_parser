const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    companyName: { type: String },
    jobTitle: { type: String },
    jobID: { type: String },
    jobDescription: { type: String },
    match: { type: Number }
});

module.exports = mongoose.model('Job', jobSchema);