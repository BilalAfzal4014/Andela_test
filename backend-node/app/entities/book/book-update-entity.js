const {TYPES} = require("../../validators/type-validator");

module.exports = class BookUpdateEntity {

    getUserProvidedFields = () => ['id'];

    getValidationRules = () => [
        {
            name: "id",
            required: true,
            types: [
                {
                    exists: true,
                    match_with_name: "id",
                    dataType: TYPES.NUMBER
                }
            ],
            allowedTypes: [],
            unique: false,
        }
    ];

};