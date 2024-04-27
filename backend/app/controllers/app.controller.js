const usersModel = require('../models/users.model');

exports.createUser = (req, res) => {

  const newUser = new usersModel({
    fname: req.body.fname,
    lname: req.body.lname,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    email: req.body.email,
    password: req.body.password
  });

  newUser
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
    });
};

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

exports.searchUsers = (req, res) => {
  usersModel.find({ fname: req.params.fname })
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

exports.deleteUser = (req, res) => {
  usersModel.deleteOne({ fname: req.params.fname })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.fname,
        });
      }
      res.send({ message: "Message deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.fname,
        });
      }
      return res.status(500).send({
        message: "Could not delete message with id " + req.params.fname,
      });
    });
};

exports.updateUser = (req, res) => {
  usersModel.updateOne({ fname: req.params.fname },
    {
      fname: req.body.fname,
      lname: req.body.lname,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      email: req.body.email,
      password: req.body.password
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.fname,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.fname,
        });
      }
      return res.status(500).send({
        message: "Error updating message with id " + req.params.fname,
      });
    });
};
