const jobModel = require("../models/jobModels");
const appliedJobModel = require("../models/jobAppliedSchema");
const {ObjectId} = require("mongodb");

exports.jobList = async(req,res) => {
    try {
        const result = await jobModel.find();
        res.status(200).json({code: 200, message: "Job List", data: result});

    }catch (err) {
        res.status(500).json({code: 500, message: "Internal server error", Error: err})
    }
}

exports.applyJob = async(req,res) => {
    try {
        const {userId,jobId} = req.body;
        const data = {
            userId:userId,
            jobId:jobId

        }
        await appliedJobModel.create(data);
        res.status(201).json({code: 201, message: "Job Applied"});
    

    }catch (err) {
        console.log(err)
        res.status(500).json({code: 500, message: "Internal server error", Error: err})
    }
}


exports.getAppliedJob = async(req, res) => {
    try {
    const pipeline = [
        {
            $match: {
                userId: new ObjectId(req.decoded.userId)
            }
        }, {
            $lookup: {
                from: "user",
                localField: "userId",
                foreignField: "_id",
                as: "usersDetails"
            }
        }, {
            $unwind: "$usersDetails",
        }, {
            $unwind: "$jobsDetails",
        },
        {
            $project: {
                usersDetails: 1,
                jobsDetails: 1,
            }
        }
    ];

    const result = await appliedJobModel.aggregate(pipeline);
    // const filter = {
    //     userId: req.decoded.userId
    // }
    //const result = await appliedJobModel.find(filter).populate("userId").populate("jobId");

    res.status(200).json({code: 200, message: "Applied jobs list", data: result});
    } catch (err) {
        console.log(err);
        res.status(500).json({code: 500, message: "Internal server error"});
    }
}