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


exports.updateJob = async(req,res) => {
    try {
        const id =req.params.id;
        const {title,posts,location,qualification} = req.body;
        const filter = {
            _id: id
        }
        const data = {
            title: title,
            posts:posts,
            location:location,
            qualification:qualification
        }
        await jobModels.findByIdAndUpdate(filter,data);
        res.status(200).json({code: 200, message: "Job updated Successfully"})

    }catch (err) {
        res.status(500).json({code: 500, message: "Internal Server Error", Error: err})
    }
}

exports.deleteJob = async(req, res) => {
    try {
        const id = id;
        const filter = {
            _id : id
        };
        await jobModels.findByIdAndDelete(filter);
        res.status(200).json({code: 200, message: "Job deleted successfully"})

    }catch (err) {
        res.status(500).json({code: 500, message: "Internal Server Error", Error: err})
    }
}