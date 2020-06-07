const express = require('express');
const router = express.Router();
const queries = require('../db/queries/journal');
const issnQuery = require('../db/queries/issn');
const categoriesOfJournalQuery = require('../db/queries/categoriesofjournal');
const idGuard = require('../guard/validateid');
const journalGuard = require('../guard/journal');
const categoriesOfJournalGuard = require('../guard/categoriesofjournal');

router.get('/' , (req, res) => {
    queries.getAll().then(journals => {
        res.json(journals);
    });
});

router.get('/:id', idGuard.validate, (req, res, next) => {
    queries.getById(req.params.id).then(journal => {
        if (journal) {
            res.json(journal);
        } else {
            next();
        }
    });
});

router.post('/', journalGuard.valitade, (req, res) => {
    queries.create(req.body).then(journals => {
        res.json(journals[0]);
    });
});

router.put('/:id', idGuard.validate, journalGuard.valitade, (req, res) => {
    queries.update(req.params.id, req.body).then(journals => {
        res.json(journals[0]);
    });
});

router.delete('/:id', idGuard.validate, (req, res) => {
    queries.delete(req.params.id).then(() => {
      res.json({
        deleted: true
      });
    });
});

//lista os issns associados ao journal
router.get('/:id/issn', idGuard.validate, (req, res) => {
    const id_journal = req.params.id;

    issnQuery.getByJournalId(id_journal).then(list => {
        res.json(list);
    });
});

// Associacao entre journal e categoria
router.post('/:id_journal/category/:id_category', categoriesOfJournalGuard.validate, (req, res) => {
    const id_category = req.params.id_category;
    const id_journal = req.params.id_journal;

    const data = {
        id_category: id_category,
        id_journal: id_journal
    };

    categoriesOfJournalQuery.create(data).then(association => {
        res.json(association[0]);
    });
});

router.get('/:id/categories', (req, res) => {
    const id_journal = req.params.id;

    categoriesOfJournalQuery.searchByJournal(id_journal).then(list => {
        res.json(list);
    });
});

router.delete('/:id_journal/category/:id_category', categoriesOfJournalGuard.validate, (req, res) => {
    const id_category = req.params.id_category;
    const id_journal = req.params.id_journal;

    categoriesOfJournalQuery.deleteByJournalAndCategory(id_journal, id_category).then(() => {
        res.json({
            deleted: true
        });
    });
});

router.delete('/:id_journal/categories', (req, res) => {
    const id_journal = req.params.id_journal;

    categoriesOfJournalQuery.deleteByJournal(id_journal).then(() => {
        res.json({
            deleted: true
        });
    });
});

module.exports = router;