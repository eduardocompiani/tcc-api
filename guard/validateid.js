module.exports = {
    validate (req, res, next) {
        if (!isNaN(req.params.id)) return next();
        next(new Error('Invalid ID'));
    }
}