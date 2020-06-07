const express = require('express');
const router = express.Router();
const queries = require('../db/queries/evaluation');
const idGuard = require('../guard/validateid');
const evaluationGuard = require('../guard/evaluation');

router.get('/' , (req, res) => {
    queries.getAll().then(evaluations => {
        res.json(evaluations);
    });
});

router.get('/:id', idGuard.validate, (req, res, next) => {
    queries.getById(req.params.id).then(evaluation => {
        if (evaluation) {
            res.json(evaluation);
        } else {
            next();
        }
    });
});

router.post('/', evaluationGuard.valitade, (req, res) => {
    queries.create(req.body).then(evaluations => {
        res.json(evaluations[0]);
    });
});

router.put('/:id', idGuard.validate, evaluationGuard.valitade, (req, res) => {
    queries.update(req.params.id, req.body).then(evaluations => {
        res.json(evaluations[0]);
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