const fetchuser = (req,res,next) =>{
    try {
        const userId = req.header("Authorization");
        if (!userId) {
            return res.status(403).json({ message: 'Invalid User' });
        }
        req.userId = userId;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = fetchuser;