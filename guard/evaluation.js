const journalDB = require('../db/queries/journal');
const sourceDB = require('../db/queries/source');

module.exports = {
    valitade(req, res, next) {
        const evaluation = req.body;

        const hasjournal = !isNaN(evaluation.id_journal);
        const hassource = !isNaN(evaluation.id_source);

        let journalExists = false;
        let sourceExists = false;

        if (!hasjournal) next(new Error("journal is required and it should not be empty"));
        if (!hassource) next(new Error("source is required and it should not be empty"));

        journalDB.getById(evaluation.id_journal).then(journal => {
            if (journal) {
                sourceDB.getById(evaluation.id_source).then(source => {
                    if (source) {
                        return next()
                    } else {
                        return next(new Error("source with id {" + evaluation.id_source + "} does not exists"));
                    }
                });
            } else {
                return next(new Error("journal with id {" + evaluation.id_journal + "} does not exists"));
            }
        });
    }
}