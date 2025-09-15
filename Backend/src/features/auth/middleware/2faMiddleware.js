

export const TwoFA = async (req, res, next) => {
    try {
        const user = req.user;

        if(user.twoFASecret && user.is2FAVerified === false) return res.status(401).json({ message: '2FA verification required' });
        
        return next();
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ message: 'Error 2FA middleware' });
    }
}