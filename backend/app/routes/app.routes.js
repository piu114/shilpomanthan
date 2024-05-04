module.exports = (app) => {
    const App = require("../controllers/app.controller");

    app.post("/user/create", App.createUser);
    app.get("/user/get-all", App.findAll);
    app.get("/user/search-all-users/:userid", App.searchUsers);
    app.put("/user/update/:userid",App.updateUser);
    app.delete("/user/delete/:userid", App.deleteUser);
  };