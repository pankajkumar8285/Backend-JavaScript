const userProfileModel = require("../models/schemas");

exports.createProfile = async(req,res) => {

    try {
        const {name,dob,phone,email,password} = req.body;
        const data = {
            name:name,
            dob:dob,
            phone:phone,
            email:email,
            password:password

        };
            await userProfileModel.create(data);
            res.status(201).json({code:201, message:"Account Created Successfully"});

    } catch (err) {
        res.status(500).json({code:500, message: "Internal Server error", Error: err});
    }
};

exports.updateProfile = async(req,res) => {
    try {
        const id = req.params.id;
        const {name,dob,phone,email} = req.body;
        const data ={
            name:name,
            dob:dob,
            phone:phone,
            email:email
        };
        const filter = {
            _id : id
        }
        const options = {
            new : true
        }
        await userProfileModel.findByIdAndUpdate(filter,data,options);
        res.status(200).json({code:200, message: "User profile updated successfully"});
    } catch(err) {
        res.status(500).json({code:500, message: "Internal Server error", Error: err});
    }
}

exports.deleteProfile = async(req,res) => {
    try {
        const id = req.params.id;
        const {status} = req.body;
        const data = {
            status:status.toUpperCase()
        };
        const filter = {
            _id:id
        }
        await userProfileModel.findByIdAndUpdate(filter,data);
        res.status(200).json({code: 200, message: "User profile deleted successfully"});

    } catch (err) {
        res.status(500).json({code:500, message: "Internal Server error", Error: err});

    }

}

exports.userProfile = async(req,res) => {
    try {
        const id = req.params.id;
        const filter = {
            _id:id
        }
        const result = await userProfileModel.findOne(filter);
        res.status(200).json({code:200, message: "User profile fetched",user: result});

    } catch (err) {
        res.status(500).json({code:500, message: "Internal Server Error", Error: err})
    }
}