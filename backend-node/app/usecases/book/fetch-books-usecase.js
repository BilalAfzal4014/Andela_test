const BookRepo = require("../../repositories/book-repo");
const BusinessError = require("../../errors/business-error");
const ErrorTypes = require("../../errors/error-types");

module.exports = class FetchBookUseCase {
    static fetchAll() {
        return BookRepo.fetchAllBooks();
    }

    static fetchByDesiredColumn(column, value){
        switch (column){
            case "id":
                return FetchBookUseCase.fetchById(value);
            case "name":
                return FetchBookUseCase.fetchByName(value);
        }
    }

    static fetchById(id) {
        return BookRepo.findById(id)
            .then((book) => {
                if (!book) {
                    throw new BusinessError(
                        ErrorTypes.NOT_FOUND,
                        "Book doesn't exist", [],
                        "BusinessError from fetchById function in FetchBookUseCase"
                    );
                }
                return book;
            });
    }

    static fetchByName(name){
        return BookRepo.findByName(name);
    }
}