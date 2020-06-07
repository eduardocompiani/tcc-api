const categoryDB = require('../db/queries/category');
const journalDB = require('../db/queries/journal');

module.exports = {
    valitade(req, res, next) {
        const journal = req.body;

        const hasName = typeof journal.name == 'string' && journal.name.trim() != '';
        if (!hasName) next(new Error("name is required and it should not be empty"));

        next();
    }
}