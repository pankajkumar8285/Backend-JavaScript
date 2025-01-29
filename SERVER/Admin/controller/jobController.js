const jobModels = require("../../models/jobModels");

exports.createJob = async(req,res) => {
    try {
        const {title,posts,location,qualification} = req.body;
        const data = {
            title: title,
            posts:posts,
            location:location,
            qualification:qualification
        };
        await jobModels.create(data);
        res.status(201).json({code: 200, message: "Job created successfully"});

    }catch (err) {
        res.status(500).json({code: 500, message: "Internal Server Error", Error: err})
    }
}