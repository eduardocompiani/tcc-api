const express = require('express');
const router = express.Router();
const queries = require('../db/queries/category');
const idGuard = require('../guard/validateid');
const categoryGuard = require('../guard/category');

router.get('/' , (req, res) => {
    queries.getAll().then(areas => {
        res.json(areas);
    });
});

router.get('/:id', idGuard.validate, (req, res, next) => {
    queries.getById(req.params.id).then(area => {
        if (area) {
            res.json(area);
        } else {
            next();
        }
    });
});

router.post('/', categoryGuard.valitade, (req, res) => {
    queries.create(req.body).then(areas => {
        res.json(areas[0]);
    });
});

router.put('/:id', idGuard.validate, categoryGuard.valitade, (req, res) => {
    queries.update(req.params.id, req.body).then(areas => {
        res.json(areas[0]);
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