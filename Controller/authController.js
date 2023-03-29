const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const crypto = require("crypto");
const { welcomeSender, forgotPasswordSender } = require("../mailers/senders");

const register = async(data, role, res) => {
    try{
        const userTaken = await validateEmail(data.email);
        if(userTaken){
        
            return res.status(400).json({
                email: "Email is already taken",
                massage: "Registration Failure",
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(data.password, 16);
        const code = crypto.randomInt(100000, 1000000);
        const newUser = new User({
            ...data,
            password: hashedPassword,
            verification: code,
            role
        });
        
        await newUser.save();
        welcomeSender(newUser.email, newUser.name, newUser.verificationCode);
        return res.status(201).json({
            massage: "Account successfully created",
            success: true
        });
    }catch(err){
        return res.status(500).json({
            massage: err.message,
            success: false
        });
    }
};

const login = async (data, res) => {

    try{
        let { email, password } = data;
    const user = await User.findOne({ email });
    if(!user){
        res.status(404).json({
            massage: "Email login attempt",
            email: "Incorrect Mail",
            success: false
        });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        let token = jwt.sign({
            user_id: user._id,
            role: user.role,
            email: user.email,
            name: user.name,

        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7 Days",
        }

        );
        let profile = {
            email: user.user,
            role: user.role,
            name: user.name,

        };

        let result = {
            user: profile,
            token: token,
            expiresIn: 168,
        };

        return res.status(200).json({
            ...result,
            message: "Login success",
            success: true
        });
    }else{
        return res.status(403).json({
            message: "Failed login attempt",
            email: "Incorrect email or password",
            success: false

        });
    }
    }catch(err){
        return res.status(500).json({
            message: err.message,
            success: false

        });
    }
    
}

const verifiy = async (data, res) => {
    try{
       let { code } = data;
       const user = await User.findOne( {verification: code} ); 
       if(!user){
            res.status(404).json({
                massage: "Invalid Code",
                success: false
            });
       }else{
            if(user.isEmailVerified){
                res.status(404).json({
                    massage: "Email already verified",
                    success: false
                });
            }
       }
       await user.update( { isEmailVerified: true } );
       return res.status(201).json({
        massage: "Email vertified successfully",
        success: true
    });
    }catch(err){
        return res.status(500).json({
            message: err.message,
            success: false

        });
    }

    
    
}

const forgotPassword = async (data, res) => {

    try{
        let { email } = data;
        const user = await User.findOne( {email: email} ); 
        if(!user){
            res.status(404).json({
                massage: "Invalid email",
                success: false
            });
       }

       const code = crypto.randomInt(100000, 1000000);
       const passwordResetCode = await bcrypt.hash(code.toString(), 16);
       await user.update({passwordResetCode: passwordResetCode});
       forgotPasswordSender(user.email, user.name, code);
       return res.status(201).json({
        massage: "Verication code sent to your email",
        success: true
        });
    }catch(err){
        return res.status(500).json({
            message: err.message,
            success: false

        });
    }

    
    
}

const resetPassword = async (data, res) => {

    try{
        let { email, code, newPassword} = data;
        const user = await User.findOne( {email: email } ); 
        if(!user){
            res.status(404).json({
                massage: "Invalid email",
                success: false
            });
       }
       
       let isMatch = await bcrypt.compare(code.toString(), user.passwordResetCode);
       console.log("hello");
       if(isMatch){
        const hashedPassword = await bcrypt.hash(newPassword, 16);
        await user.update({password: hashedPassword}, {passwordResetCode: ""});
        return res.status(201).json({
            massage: "Your password has been succesfully reset",
            success: true
            });
        }else{
            return res.status(404).json({
                massage: "Invalid code",
                success: false
                });
        }
    }catch(err){
        return res.status(500).json({
            message: err.message,
            success: false

        });
    }
}

const changePassword = async (req, res) => {
    try { 
        let oldPassword= req.body.oldPassword;
        let newPassword = req.body.newPassword;
        let userId = req.user.id;
        
        const user = await User.findById(userId);
        let isMatch = await bcrypt.compare(oldPassword, user.password);
        if(isMatch) {
            const hashedPassword = await bcrypt.hash(newPassword, 16);
            await user.update({password: hashedPassword});
            return res.status(201).json({
                message: "Your password has been successfully reset",
                success: true
            }); 
        } else {
            return res.status(404).json({
                message: "Your old password is incorrect",
                success: false
            }); 
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
};

const validateEmail = async (email) => {
    let user = await User.findOne({ email });
    if(user){
        return true;
    }else{
        return false;
    }
};

module.exports = {
    login,
    register,
    forgotPassword,
    resetPassword,
    changePassword,
    verifiy
};