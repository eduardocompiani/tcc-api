const journalDB = require('../db/queries/journal');

module.exports = {
    valitade(req, res, next) {
        const issn = req.body;

        const hasValue = typeof issn.value == 'string' && issn.value.trim() != '';
        const hasjournal = !isNaN(issn.id_journal);
        let journalExists = false;

        if (!hasValue) next(new Error("value is required and it should not be empty"));
        if (!hasjournal) next(new Error("journal is required and it should not be empty"));

        journalDB.getById(issn.id_journal).then(journal => {
            if (journal) {
                journalExists = true;
            }

            if (!journalExists) next(new Error("journal with id {" + issn.id_journal + "} does not exists"));

            return next();
        });
    }
}