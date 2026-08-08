import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    try {
        const tokenDecode = jwt.verify(accessToken, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.userId = tokenDecode.id;
        } else {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }

        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.json({ success: false, message: 'Access token expired', expired: true });
        }
        return res.json({ success: false, message: error.message });
    }
}

export default userAuth;