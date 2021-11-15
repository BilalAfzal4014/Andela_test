const BaseModel = require("./base-model");
const { knex } = require("../databases/sql-connection");

class BookModel extends BaseModel {
    static get tableName() {
        return "book";
    }
    
}

module.exports = BookModel;