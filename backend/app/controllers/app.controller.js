const usersModel = require('../models/users.model');

exports.createUser = (req, res) => {

  usersModel.find({$or: [ {userid: req.body.userid}, {email:req.body.email}, {phoneno: req.body.phoneno} ]})
    .then((data) => {
      if (data.length) {
        res.status(200).send({
          message: "UserID or email or phone number already exists. Check again."
        })
      } else {
        const newUser = new usersModel({
          userid: req.body.userid,
          fname: req.body.fname,
          lname: req.body.lname,
          address1: req.body.address1,
          address2: req.body.address2,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip,
          email: req.body.email,
          phoneno: req.body.phoneno,
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
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
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
  usersModel.findOne({ userid: req.params.userid })
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
  usersModel.deleteOne({ userid: req.params.userid })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.userid,
        });
      }
      res.send({ message: "Message deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.userid,
        });
      }
      return res.status(500).send({
        message: "Could not delete message with id " + req.params.userid,
      });
    });
};

exports.updateUser = (req, res) => {
  usersModel.updateOne({ userid: req.params.userid },
    {
      
      fname: req.body.fname,
      lname: req.body.lname,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      email: req.body.email,
      phoneno: req.body.phoneno,
      password: req.body.password
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.userid,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.userid,
        });
      }
      return res.status(500).send({
        message: "Error updating message with id " + req.params.userid,
      });
    });

};

exports.loginUser = ( req,res ) => {
  usersModel.findOne({ userid: req.body.userid , password: req.body.password})
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "userid and password donot match",
    });
  }); 
}
