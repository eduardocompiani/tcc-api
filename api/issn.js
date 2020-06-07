const express = require('express');
const router = express.Router();
const queries = require('../db/queries/issn');
const idGuard = require('../guard/validateid');
const issnGuard = require('../guard/issn');

router.get('/' , (req, res) => {
    queries.getAll().then(issns => {
        res.json(issns);
    });
});

router.get('/:id', idGuard.validate, (req, res, next) => {
    queries.getById(req.params.id).then(issn => {
        if (issn) {
            res.json(issn);
        } else {
            next();
        }
    });
});

router.post('/', issnGuard.valitade, (req, res) => {
    queries.create(req.body).then(issns => {
        res.json(issns[0]);
    });
});

router.put('/:id', idGuard.validate, issnGuard.valitade, (req, res) => {
    queries.update(req.params.id, req.body).then(issns => {
        res.json(issns[0]);
    });
});

router.delete('/:id', idGuard.validate, (req, res) => {
    queries.delete(req.params.id).then(() => {
      res.json({
        deleted: true
      });
    });
});

module.exports = router;