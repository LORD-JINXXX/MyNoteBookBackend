const router = require("express").Router();
const { User } = require("../../model/user");
const bcrypt = require("bcrypt");



router.post("/", async(req,res)=>{
    try {

        //Find the token
        const token = req.header("Authorization");
        if (!token) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        //Find the user
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(404).send({ message: 'Invalid user' });
        }

        if (req.body.password!==req.body.confirmPassword){
            res.status(401).send({message: "Password does not match"});
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        user.password = hashPassword;
        await user.save();

        res.status(200).send({message: "Password changed successfully!"});

    } catch (error) {
        return res.status(500).send({message: "Internal Server Error"});
    }
});



module.exports = router;