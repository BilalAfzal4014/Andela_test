const _ = require("lodash");
const BookModel = require("../models/book-model");
const BaseRepo = require("./base-repo");

class BookRepo extends BaseRepo {

    static save(book) {
        if (!book.id) {
            return BookModel.query().insertAndFetch(book);
        } else {
            return BookModel.query().updateAndFetchById(
                book.id,
                book
            );
        }
    }

    static findByAttributes(attributes, extraAttributes, dontFetchDeleted = false) {
        return BookRepo.findByAttributesAndIdIsNot(attributes, null, extraAttributes, dontFetchDeleted);
    }

    static findByAttributesAndIdIsNot(attributes, id, extraAttributes, dontFetchDeleted = false) {
        return BookRepo.findByAttributeWhereIdIsNotAndGivenModel(BookModel, attributes, id, extraAttributes, dontFetchDeleted);
    }

    static findById(bookId){
        return BookRepo.findByAttributes([], [{
            key: "id",
            value: bookId
        }], false)
            .then(([book]) => (book));
    }

    static findByName(bookName){
        return BookRepo.findByAttributes([], [{
            key: "name",
            value: bookName
        }], false);
    }

    static fetchAllBooks(){
        return BookRepo.findByAttributes([], [], false);
    }


}

module.exports = BookRepo;