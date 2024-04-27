module.exports = (app) => {
    const App = require("../controllers/app.controller");

    app.post("/create", App.createUser);
    app.get("/get-all", App.findAll);
    app.get("/search-all-users/:fname", App.searchUsers);
    app.put("/update/:fname",App.updateUser);
    app.delete("/delete/:fname", App.deleteUser);
  };