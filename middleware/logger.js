function logger(req, res, next) {
    console.log(`${req.method} ${req.originalUrl} at ${new Date().toLocaleString()}`);

    next();
}

module.exports = logger;