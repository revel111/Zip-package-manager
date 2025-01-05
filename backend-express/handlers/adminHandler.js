const {HandlingError} = require("./errorHandler");

module.exports = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user || !user.roles.includes('admin')) {
            return next(new HandlingError(401, 'Unauthorized.'));
        }
        next();
    } catch (err) {
        return next(new HandlingError(401, 'Unauthorized.'));
    }
}