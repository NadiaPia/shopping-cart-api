const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.cookies['access-tokennn'];
    if(!accessToken) return res.status(401).json({error: "User not logged in!"}); //401 is important as it indicates that request
    // was not succesful and this response should be handled in catch in the FE instead of then (I had an error when userr logged in)

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