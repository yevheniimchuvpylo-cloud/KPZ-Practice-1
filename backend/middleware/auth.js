const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({message: 'No token provided'});

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        req.user = {
            googleId: payload.sub,
            name: payload.name,
            email: payload.email,
            photo: payload.picture
        };
        next();
    } catch (err) {
        res.status(401).json({message: 'Invalid token'});
    }
};

module.exports = authMiddleware;