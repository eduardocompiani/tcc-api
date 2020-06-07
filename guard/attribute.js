const evaluationDB = require('../db/queries/evaluation');
const attributeDB = require('../db/queries/attribute');

module.exports = {
    valitade(req, res, next) {
        const attribute = req.body;

        const hasName = typeof attribute.name == 'string' && attribute.name.trim() != '';
        const hasValueType = !isNaN(attribute.valuetype);
        const hasAttribute = !isNaN(attribute.id_owner);
        const hasEvaluation = !isNaN(attribute.id_evaluation);

        if (!hasName) next(new Error("name is required and it should not be empty"));
        if (!hasValueType) next(new Error("valuetype is required and it should not be empty"));
        if (!hasEvaluation) next(new Error("evaluation is required and it should not be empty"));

        evaluationDB.getById(attribute.id_evaluation).then(evaluation => {
            if (evaluation) {
                if (hasAttribute) {
                    attributeDB.getById(attribute.id_owner).then(attribute => {
                        if (attribute) {
                            return next();
                        } else {
                            return next(new Error("attribute with id {" + attribute.id_owner + "} does not exists"));
                        }
                    })
                } else {
                    return next();
                }
            } else {
                return next(new Error("evaluation with id {" + attribute.id_evaluation + "} does not exists"));
            }
        });
    }
}