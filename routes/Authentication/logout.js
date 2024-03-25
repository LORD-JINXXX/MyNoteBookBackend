const router = require("express").Router();
const { User } = require("../../model/user");

router.get('/', async (req, res) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(403).json({ message: 'Invalid token' });
    } else {
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(403).json({ message: 'Invalid User' });
        } else{
            user.token = "";
            await user.save();
            res.status(200).send({message: "User logged out successfully!"})
        }
    }
});




module.exports = router;