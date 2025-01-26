const adminProfileModel = require("../models/adminProfileSchema");
const bcrypt = require("bcrypt");

exports.createAdminProfile= async(req,res) => {
    try {
        const {email,password} = req.body;
        bcrypt.genSalt(10, async function (err, salt) {
                    bcrypt.hash(password, salt, async function (err, hash) {
                        if (err) {
                            res
                                .status(400)
                                .json({ code: 400, message: "Error hashing password", Error: err });
                        } else {
                            const data = {
                                email: email,
                                password: hash,
                            };
                            await adminProfileModel.create(data);
                            res
                                .status(201)
                                .json({ code: 201, message: "Admin profile created successfully" });
                        }
                    });
                });
        
    }catch (err) {
        console.log(err)
        res.status(500).json({code: 500, message: "Internal Server Error", Error: err})
    }
}

exports.adminProfileUpdate = async(req,res) => {
    try {
        const {email} = req.body;
        const id = req.params.id;
        const filter = {
            _id: id
        }
        const data = {
            email : email
        }
        await adminProfileModel.findByIdAndUpdate(filter,data)
        res.status(200).json({code: 200, message: "Admin profile updated successfully"});


    }catch (err) {
        res.status(500).json({code: 500, message: "Internal Server Error", Error: err})
    }
}

exports.adminProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = {
            _id: id,
        };
        const temp = {
            password: 0,
            createdAt: 0,
        };
        const result = await adminProfileModel.findOne(filter, temp);
        res
            .status(200)
            .json({ code: 200, message: "User profile fetched", user: result });
    } catch (err) {
        res
            .status(500)
            .json({ code: 500, message: "Internal Server Error", Error: err });
    }
};
