module.exports = {
    valitade(req, res, next) {
        const area = req.body;
        if (typeof area.name == 'string' && area.name.trim() != '') return next();

        return next(new Error("name is required and it should not be empty"));
    }
}