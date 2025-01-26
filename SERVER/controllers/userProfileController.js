const userProfileModel = require("../models/userProfileSchema");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.createProfile = async (req, res) => {
    try {
        const {name,dob,phone,email,password} = req.body;
        
        bcrypt.genSalt(10, async function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    res
                        .status(400)
                        .json({ code: 400, message: "Error hashing password", Error: err });
                } else {
                    const data = {
                        name: name,
                        dob: dob,
                        phone: phone,
                        email: email,
                        password: hash,
                    };
                    await userProfileModel.create(data);
                    res
                        .status(201)
                        .json({ code: 201, message: "User Created Successfully" });
                }
            });
        });
    } catch (err) {
        res
            .status(500)
            .json({ code: 500, message: "Internal Server error", Error: err });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, dob, phone, email } = req.body;
        const filter = {
            _id: id
        };
        const data = {
            name: name,
            dob: dob,
            phone: phone,
            email: email,
            image: req.file.filename
        };
        const options = {
            new: true,
        };
       const result = await userProfileModel.findByIdAndUpdate(filter, data, options);
    //    const result = await userProfileModel.findOne(filter);
    //     req.name = name;
    //     req.dob = dob;
    //     req.phone = phone;
    //     req.email = email;
    //     image = req.file.filename;
    //     console.log(result)
        //await result.save();
        res
            .status(200)
            .json({ code: 200, message: "User profile updated successfully" });
    } catch (err) {
        console.log(err)
        res
            .status(500)
            .json({ code: 500, message: "Internal Server error", Error: err });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const data = {
            status: status.toUpperCase(),
        };
        const filter = {
            _id: id,
        };
        await userProfileModel.findByIdAndUpdate(filter, data);
        res
            .status(200)
            .json({ code: 200, message: "User profile deleted successfully" });
    } catch (err) {
        res
            .status(500)
            .json({ code: 500, message: "Internal Server error", Error: err });
    }
};

exports.userProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = {
            _id: id,
        };
        const temp = {
            password: 0,
            createdAt: 0,
        };
        const result = await userProfileModel.findOne(filter, temp);
        res
            .status(200)
            .json({ code: 200, message: "User profile fetched", user: result });
    } catch (err) {
        res
            .status(500)
            .json({ code: 500, message: "Internal Server Error", Error: err });
    }
};
