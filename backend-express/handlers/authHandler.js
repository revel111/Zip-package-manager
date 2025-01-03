const {HandlingError} = require("./errorHandler");
const {validateToken} = require("../services/jwtService");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return next(new HandlingError(401, 'Unauthorized.'));

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken)
            return next(new HandlingError(401, 'Unauthorized.'));

        const data = validateToken(accessToken, 'accessToken');
        if (!data)
            return next(new HandlingError(401, 'Unauthorized.'));

        req.user = data;
        next();
    } catch (e) {
        return next(new HandlingError(401, 'Unauthorized.'));
    }
};