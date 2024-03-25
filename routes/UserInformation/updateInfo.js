const router = require("express").Router();
const { User } = require("../../model/user");


router.post("/", async (req, res) => {

    try {

        const token = req.header("Authorization");

        if (!token) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        let user = await User.findOne({token: token});

        if (!user) {
            return res.status(403).json({ message: 'Invalid user' });
        }

        const { firstName, lastName, email } = req.body;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        await user.save();
        return res.status(200).send({ message: "User information updated successfully!" });


    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }

});



module.exports = router;