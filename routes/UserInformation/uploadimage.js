const router = require("express").Router();
const { User } = require("../../model/user");
const { Image } = require("../../model/image");
const multer = require('multer');
const path = require('path');

// Set storage for uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/profilepicture");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(403).json({ message: 'Invalid token' });
        } else {
            let user = await User.findOne({ token: token });
            if (!user) {
                return res.status(403).json({ message: 'Invalid user' });
            } else {
                const userId = user._id;
                const image = req.file.filename;

                const upload = await Image.create({
                    userId: userId,
                    image: image
                });
                upload.save();
                res.status(201).json({ message: 'Image uploaded and saved successfully' });
            }
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;