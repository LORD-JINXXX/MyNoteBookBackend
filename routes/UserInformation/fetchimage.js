const router = require("express").Router();
const { User } = require("../../model/user");
const { Image } = require("../../model/image");

router.get('/', async (req, res) => {
    try {
        //Extract token
        const token = req.header("Authorization");
        if (!token) {
            return res.status(403).json({ message: 'Invalid token' });
        } else {
            const user = await User.findOne({ token: token });
            const image = await Image.findOne({ userId: user._id });
            if (!image) {
                return res.status(404).send({ message: 'Image not found' });
            } else {
                const imagePath = image.image;
                res.status(200).send({imagePath: imagePath});
            }
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;