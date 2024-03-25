const router = require("express").Router();
const { User } = require("../../model/user");


router.get('/', async (req, res) => {

    //Extract token
    const token = req.header("Authorization");

    if (!token) {
        return res.status(403).json({ message: 'Invalid token' });
    } else {
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(403).json({ message: 'Invalid User' });
        } else{
            res.status(200).json({userId: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email})
        }
    }

});


module.exports = router;