const router = require("express").Router();
const { User } = require("../../model/user");
const Token = require("../../model/token");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");


router.post("/", async (req,res) =>{

    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).send({ message: "Invalid User!" });
        }

        let token = await Token.findOne({userId: user._id});

        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save();
    
            const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
    
            await sendEmail(user.email,"Verify Email",url);
            
            return res.status(201).send({message: "An email sent to your mail id. Please verify!"});
        } else {
            await Token.findByIdAndRemove(token._id);

            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save();
    
            const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
    
            await sendEmail(user.email,"Verify your account",url,user.firstName);
            
            return res.status(201).send({message: "An email sent to your mail id. Please verify!"});
        }

        
        
    } catch (error) {
        return res.status(500).send({message: "Internal Server Error"});
    }

});


module.exports = router;