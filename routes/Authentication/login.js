const router = require("express").Router();
const { User } = require("../../model/user");
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require('jsonwebtoken');


router.post("/", async (req, res) => {

    try {

        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }
        else {
            const validPassword = await bcrypt.compare(
                password, user.password
            );

            if (!validPassword) {
                return res.status(401).send({ message: "Invalid Email or Password" });
            }
            else {
                if (!user.verified) {
                    return res.status(401).send({ message: "Please verify your email before login" });
                }

                else {

                    const payload = {
                        user: {
                            userId: user._id,
                            email: user.email
                        }
                    }

                    jwt.sign(payload,process.env.JWT_SECRET,(error,token)=>{
                        if (error) {
                            console.log(error);
                        }
                        user.token = token;
                        user.save();
                        return res.status(200).send({message:"User logged in successfully!",token:token,userId: user._id});
                    })
                    //return res.status(200).send({message:"User logged in successfully!"});
        
                }
            }
    }
}

    catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

const validate = (data) => {

    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password"),
    });

    return schema.validate(data);
};


module.exports = router;