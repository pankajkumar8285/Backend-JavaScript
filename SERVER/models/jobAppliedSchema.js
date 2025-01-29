const mongoose = require("mongoose");

const appliedJobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true
    },
    jobId: {
        type: mongoose.Types.ObjectId,
        ref: "Job",
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('AppliedJob',appliedJobSchema);