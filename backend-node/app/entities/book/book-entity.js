const BooksCreateEntity = require("./book-create-entity");
const BooksUpdateEntity = require("./book-update-entity");
const {TYPES} = require("../../validators/type-validator");

class BookEntity {
    constructor(book) {
        this.bookEntityDesiredInstance = BookEntity.getDesiredInstance(book);
    }

    static getDesiredInstance(book) {
        if (book.id === undefined) {
            return new BooksCreateEntity();
        }
        return new BooksUpdateEntity();
    }

    getValidationRules = () => {
        let validationRules = [
            {
                name: "name",
                required: true,
                types: [
                    {
                        exists: false,
                        dataType: TYPES.ANY
                    }
                ],
                allowedTypes: [],
                unique: false
            }
        ];

        return [...this.bookEntityDesiredInstance.getValidationRules(), ...validationRules];
    }

    getUserProvidedFields = () => {
        let userProvidedFields = ['name'];
        return [...this.bookEntityDesiredInstance.getUserProvidedFields(), ...userProvidedFields]
    };

    getFieldsForUniqueness = () => ([]);

}

module.exports = BookEntity;