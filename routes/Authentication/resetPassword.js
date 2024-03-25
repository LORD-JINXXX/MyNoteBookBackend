const router = require("express").Router();
const {User} = require("../../model/user");
const bcrypt = require("bcrypt");
const joi = require("joi");
const Token = require("../../model/token");
const resetPasswordMail = require("../../utils/resetPasswordMail");
const crypto = require("crypto");

//Forgot password
router.post("/", async (req,res) =>{

    try {
        //Get the email
        const emailSchema = joi.object({
            email: joi.string().email().required().label("Email")
        });

        //Checking the error
        const {error} = emailSchema.validate(req.body);
        if (error) {
            return res.status(400).send({message: error.details[0].message}); 
        }

        //Find the user 
        const {email} = req.body;
        let user = await User.findOne({email: email});
        if (!user) {
            return res.status(409).send({message: "User with this given email doesn't exist!"});
        }

        //Find the token
        let token = await Token.findOne({userId: user._id});
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save();
        }

        const url = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}`
        await resetPasswordMail(user.email,"Reset your password",url, user.firstName);
        
        res.status(201).send({message: "Password reset link sent to your email id"});

        
    } catch (error) {
        return res.status(500).send({message: "Internal Server Error"});
    }

});

//Verify link

router.get("/:userId/:token", async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.params.userId});
        if(!user) {
            return res.status(400).render('400');
        }

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });

        if (!token) {
            return res.status(400).render('400');
        }

        return res.status(200).render('ResetPassword',{userId:req.params.userId,token:token.token});
    } catch (error) {
        return res.status(500).render('500');
    }
});


//Reset password

router.post("/:userId/:token", async(req,res)=>{
    try {

        //Find the user
        const user = await User.findOne({_id:req.params.userId});
        if(!user) {
            return res.status(400).send({message: "Invalid link!"});
        }

        //Find the token
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });

        if (!token) {
            return res.status(400).send({message: "Invalid link!"});
        }

        if (!user.verified) {
            user.verified = true;
        }

        if (req.body.password!==req.body.confirmPassword){
            res.status(401).send({message: "Password does not match"});
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        user.password = hashPassword;
        await user.save();
        await Token.findByIdAndRemove(token._id);

        res.status(200).send({message: "Password reset successfully! Now you can login with your account."});

    } catch (error) {
        return res.status(500).send({message: "Internal Server Error"});
    }
});



module.exports = router;