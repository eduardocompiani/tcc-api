const categoryDB = require('../db/queries/category');
const journalDB = require('../db/queries/journal');

module.exports = {
    validate(req, res, next) {
        const id_category = req.params.id_category;
        const id_journal = req.params.id_journal;

        const hasCategory = !isNaN(id_category);
        const hasJournal = !isNaN(id_journal);

        if (!hasCategory) next(new Error("category is required and it should not be empty"));
        if (!hasJournal) next(new Error("journal is required and it should not be empty"));

        categoryDB.getById(id_category).then(category => {
            if (category) {
                categoryDB.getById(id_journal).then(journal => {
                    if (journal) {
                        return next();
                    } else {
                        return next(new Error("journal with id {" + id_journal + "} does not exists"));
                    }
                });
            } else {
                return next(new Error("category with id {" + id_category + "} does not exists"));
            }
        });
    }
}