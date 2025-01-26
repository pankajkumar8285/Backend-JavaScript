const userProfileModel = require("../models/userProfileSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.userProfileLogin = async(req,res) => {
    try {
        const {phone, password} = req.body;

        const data = {
            phone: phone
        } 
        const result = await userProfileModel.findOne(data);
        const flag = bcrypt.compareSync(password, result.password);
        if (result) {
            if (flag) {

                jwt.sign({ phone : phone }, process.env.PRIVATE_KEY, { expiresIn: "1d" }, function(err, token) {
                    if (err) {
                        console.log(err)
                        res.status(400).json({code:400, message: "Internal Server error", Error: err});
                    }else {
                        res.status(200).json({code: 200, message: "Login successfully", Token : token})
                    }
                  });
            }
            else {
                res.status(200).json({code: 200, message: "Wrong Password"});
            }

        }else {
            res.status(400).json({code: 400, message: "User Not Found"})
        }


    } catch (err) {
        console.log(err)
        res.status(500).json({code: 500, message: "Internal Server Error", Error: err})

    }
} 