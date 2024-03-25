const router = require("express").Router();
const {User} = require("../../model/user");
const Token = require("../../model/token");

router.get("/:id/verify/:token", async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.params.id});
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

        const tokenCreatedAt = new Date(token.createdAt);
        const expirationDuration = 60 * 60 * 1000;
        const currentTime = new Date(); 

        const expirationTime = new Date(tokenCreatedAt.getTime() + expirationDuration);

        if (currentTime > expirationTime) {
            await Token.findByIdAndRemove(token._id);
            return res.status(498).render('498');
        }

        await User.updateOne({_id:user._id},{$set: {verified:true}});
        await Token.findByIdAndRemove(token._id);

        return res.status(200).render('VerifyEmail');
    } catch (error) {
        return res.status(500).render('500');
    }
});

module.exports = router;