module.exports = {
    valitade(req, res, next) {
        const sorce = req.body;

        const hasName = typeof sorce.name == 'string' && sorce.name.trim() != '';
        const hasHomePage = typeof sorce.homepage == 'string' && sorce.homepage.trim() != '';

        if (!hasName) return next(new Error("name is required and it should not be empty"));
        if (!hasHomePage) return next(new Error("homepage is required and it should not be empty"));

        return next();
    }
}