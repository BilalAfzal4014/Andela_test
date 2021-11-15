const BaseModel = require("../models/base-model");

module.exports = class BaseRepo {
    static startTransaction() {
        return BaseModel.startTransaction();
    }

    static commitTransaction(transaction) {
        if (transaction) return transaction.commit();
    }

    static rollbackTransaction(transaction) {
        if (transaction) return transaction.rollback();
    }

    static findByAttributeWhereIdIsNotAndGivenModel(
        model,
        attributes,
        id,
        extraAttributes,
        dontFetchDeleted
    ) {
        const query = model.query();

        query.where(function (innerQuery) {
            for (let attribute of attributes) {
                innerQuery.orWhere(attribute.key, attribute.value);
            }
        });

        for (let attribute of extraAttributes) {
            query.where(attribute.key, attribute.value);
        }

        if (dontFetchDeleted) {
            query.where("deleted", 0);
        }

        if (id) {
            query.whereNot("id", id);
        }

        return query;
    }
};