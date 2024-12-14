class HandlingError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorHandler = (err, req, res, next) => {
    if (err instanceof HandlingError) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        console.error(err);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
};

module.exports = { HandlingError, errorHandler };