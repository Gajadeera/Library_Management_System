
module.exports = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'super admin') {
        next();
    } else {
        res.status(403).send('Forbidden: You do not have permission to access this page.');
    }
};

