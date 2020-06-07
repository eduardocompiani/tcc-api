const express = require('express');
const router = express.Router();
const queries = require('../db/queries/source');
const idGuard = require('../guard/validateid');
const sourceGuard = require('../guard/source');

router.get('/' , (req, res) => {
    queries.getAll().then(sources => {
        res.json(sources);
    });
});

router.get('/:id', idGuard.validate, (req, res, next) => {
    queries.getById(req.params.id).then(source => {
        if (source) {
            res.json(source);
        } else {
            next();
        }
    });
});

router.post('/', sourceGuard.valitade, (req, res) => {
    queries.create(req.body).then(sources => {
        res.json(sources[0]);
    });
});

router.put('/:id', idGuard.validate, sourceGuard.valitade, (req, res) => {
    queries.update(req.params.id, req.body).then(sources => {
        res.json(sources[0]);
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