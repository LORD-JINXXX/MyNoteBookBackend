const router = require("express").Router();
const { User, validate } = require("../../model/user");
const bcrypt = require("bcrypt");
const Token = require("../../model/token");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");

router.post("/", async (req, res) => {

    try {

        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(409).send({ message: "User with given email already exist!" })
        }

        if (req.body.password !== req.body.confirmPassword) {
            res.status(401).send({ message: "Password does not match" });
        } else {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            user = await new User({ ...req.body, password: hashPassword }).save();

            const token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save();

            const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;

            await sendEmail(user.email, "Verify your account", url,user.firstName);

            res.status(201).send({ message: "An email sent to your mail id. Please verify!" });
        }



    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});



module.exports = router;