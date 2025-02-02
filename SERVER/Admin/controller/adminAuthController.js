 const adminProfileModel = require("../../models/adminProfileSchema");
 const bcrypt = require("bcryptjs");
 const jwt = require("jsonwebtoken");
 require("dotenv").config();

 exports.adminProfileLogin = async (req,res) => {
    try {
        const {email,password} = req.body;
        const data = {
            email: email
        }
        const result = await adminProfileModel.findOne(data);
        const flag = bcrypt.compareSync(password, result.password);
        if (result) {
            if (flag) {
                jwt.sign({ email : email }, process.env.PRIVATE_KEY, { expiresIn: "1d" }, function(err, token) {
                            if (err) {
                
                                res.status(400).json({code:400, message: "Internal Server error", Error: err});
                            }else {
                                res.status(200).json({code: 200, message: "Login successfully", Token : token})
                            }
                    });

            }else {
                res.status(200).json({code: 200, message: "Password does not match"})
            }

        }else {
            res.status(400).json({code: 400, message: "Admin not found"})
        }
    }catch (err) {
        res.status(500).json({code: 500, message: "Internal server error"})
    }
 }
 exports.adminLogout = async(req,res) => {
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
