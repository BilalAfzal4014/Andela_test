const router = require("express").Router();
const bookRoutes = require("./book/books-routes");


const setupRoutes = (app) => {
    router.use("/books", bookRoutes);
    app.use("/v1", router);
};

module.exports = {
    setupRoutes,
};