const express = require('express');
const router = express.Router();
const queries = require('../db/queries/attribute');
const idGuard = require('../guard/validateid');
const attributeGuard = require('../guard/attribute');

router.get('/' , (req, res) => {
    queries.getAll().then(attributes => {
        res.json(attributes);
    });
});

router.get('/:id', idGuard.validate, (req, res, next) => {
    queries.getById(req.params.id).then(attribute => {
        if (attribute) {
            res.json(attribute);
        } else {
            next();
        }
    });
});

router.post('/', attributeGuard.valitade, (req, res) => {
    queries.create(req.body).then(attributes => {
        res.json(attributes[0]);
    });
});

router.put('/:id', idGuard.validate, attributeGuard.valitade, (req, res) => {
    queries.update(req.params.id, req.body).then(attributes => {
        res.json(attributes[0]);
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