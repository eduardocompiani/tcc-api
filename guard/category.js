const areaDB = require('../db/queries/area');

module.exports = {
    valitade(req, res, next) {
        const category = req.body;

        const hasName = typeof category.name == 'string' && category.name.trim() != '';
        const hasarea = !isNaN(category.id_area);

        if (!hasName) next(new Error("name is required and it should not be empty"));
        if (!hasarea) next(new Error("area is required and it should not be empty"));

        areaDB.getById(category.id_area).then(area => {
            if (area) {
                return next();
            } else {
                return next(new Error("area with id {" + category.id_area + "} does not exists"));
            }
        });
    }
}