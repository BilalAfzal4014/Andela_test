const BusinessError = require('../../errors/business-error');
const BaseRepo = require("../../repositories/base-repo");

module.exports = class BaseUseCase {

    constructor(transaction = null) {
        this.transactionInstance = transaction;
    }

    getTransactionInstance() {
        return BaseRepo.startTransaction()
            .then((transaction) => {
                return this.transactionInstance = transaction;
            });
    }

    commitTransaction() {
        return BaseRepo.commitTransaction(this.transactionInstance);
    }

    rollbackTransaction() {
        return BaseRepo.rollbackTransaction(this.transactionInstance);
    }


    handleErrorIfExist(errorsList, errorType, message, location) {
        if (this.hasError(errorsList)) {
            this.handleError(
                errorsList,
                errorType,
                message,
                location
            );
        }
    }

    hasError(errorsList) {
        return errorsList.length > 0;
    }

    handleError(errorsList, errorType, message, location) {
        throw new BusinessError(
            errorType,
            message,
            errorsList,
            location
        );
    }
}