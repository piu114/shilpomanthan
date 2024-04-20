module.exports = (app) => {
    const App = require("../controllers/app.controller.js");
  
    app.get("/get-all", App.findAll);
  };