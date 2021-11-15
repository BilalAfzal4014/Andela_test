const _ = require("lodash");
const BookEntity = require("../../entities/book/book-entity");
const Validator = require("../../entity-validations/validator");
const BookRepo = require("../../repositories/book-repo");
const BaseUseCase = require("../base/base-usecase");
const ErrorTypes = require("../../errors/error-types");

module.exports = class SaveBookUseCase extends BaseUseCase {

    constructor(book) {
        super();
        this.book = book;
        this.bookEntityInstance = new BookEntity(book);
    }

    saveBook() {
        return this.validate()
            .then(() => {
                return this.performSaveAction();
            });
    }

    validate() {
        return this.validateWithoutThrowingError()
            .then((errorList) => {
                this.handleErrorIfExist(
                    errorList,
                    ErrorTypes.MISSING_ATTRIBUTES,
                    "Book Validation Failed",
                    "BusinessError from validate function in SaveBookUseCase"
                );
            });
    }

    validateWithoutThrowingError() {
        return this.validateUserProvidedFields();
    }

    validateUserProvidedFields() {
        this.book = _.pick(this.book, this.bookEntityInstance.getUserProvidedFields());
        this.validatorInstance = new Validator(this.book, BookRepo);

        return this.validatorInstance.validate(
            this.bookEntityInstance.getValidationRules(),
            this.bookEntityInstance.getFieldsForUniqueness()
        );
    }

    performSaveAction() {
        return this.save();
    }

    save() {
        return BookRepo.save(this.trimBookObject(), this.transactionInstance);
    }

    trimBookObject() {
        return {
            ...(this.book.id && {id: this.book.id}),
            name: this.book.name,
        };
    }
}