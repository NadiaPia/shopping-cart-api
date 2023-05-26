const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.cookies['access-tokennn'];
    if(!accessToken) return res.json({error: "User not logged in!"});

    try {
        const validToken = verify(accessToken, process.env.SECRET_KEY);
        req.user = validToken;
        if (validToken) {
            return next();
        }
    } catch (err) {
        return res.json({error: err});
    }

}

module.exports = {validateToken};