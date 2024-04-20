const usersModel = require("../models/users.model.js");

exports.findAll = (req, res) => {
    usersModel.find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving messages.",
        });
      });
  };
  