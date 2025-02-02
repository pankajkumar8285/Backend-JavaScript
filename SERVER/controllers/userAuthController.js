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

                jwt.sign({ userId : result._id }, process.env.PRIVATE_KEY, { expiresIn: "1d" },
                     function(err, token) {
                    if (err) {
                        console.log(err)
                        res.status(400).json({code:400, message: "Internal Server error", Error: err});
                    }else {
                        res.cookie("token",token, {
                            maxAge: 24 * 60 * 60 * 1000,
                            httpOnly: true,
                            secure: true,
                            sameSite: "strict"
                        });
                        res.status(200).json({code: 200, message: "Login successfully"})
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
        //console.log(err)
        res.status(500).json({code: 500, message: "Internal Server Error", Error: err})

    }
} 

exports.userLogout = async(req,res) => {
    try {
        const cookieOption = {
            expires: new Date(),
            httpOnly: true
        }
        res.cookie("token", null, cookieOption);
        res.status(200).json({code: 200, message: "Logout successfully"});

    }catch (err) {
        res.status(500).json({code: 500, message: "Internal Server Error", Error: err})
        
    }
}