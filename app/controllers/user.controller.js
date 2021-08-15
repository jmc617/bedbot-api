const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "username can not be empty!"
    });
    return;
  }

  // Create a user
  const user = {
    username: req.body.username,
    interval: req.body.interval,
    joinChannel: req.body.joinChannel,
    canBedify: req.body.canBedify
  };

  // Save user in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};
// Retrieve all users.
exports.findAll = (req, res) => {
 
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users."
            });
        });
  };

//COUNT all users who want bedbot in their channel
exports.countChannels = (req, res) => {
    User.count({ 
        where: { joinChannel: true }
    })
    .then(data => {
        //to string because you can't send number
        res.send(data.toString());
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving the channel count."
        });
    });
};

// retrieve all users that want bedbot in their channel
exports.findChannels = (req, res) => {
    User.findAll({ where: { joinChannel: true }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving the channel list."
            });
        });
};

// retrieve all users to be ignored
exports.findIgnored = (req, res) => {
    User.findAll({ where: { canBedify: false }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving the ignore list."
            });
        });
};

// Find a single user with an username
exports.findOne = (req, res) => {
    const username = req.params.username;

    User.findOne({ where: {username: username} })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message: 
                err.message || `Some error occurred while retrieving the user with name: ${username}`
            });
        });
};

// Update a user by the username
exports.update = (req, res) => {
    const username = req.params.username;
  
    User.update(req.body, {
      where: { username: username }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with name=${username}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: 
          err.message || `Error updating User with username=${username}`
        });
      });
  };

// Delete a User with the specified id in the request
//  in client: only delete if canBedify=true (otherwise just update joinChannel=false so that opt-out will still be stored)
exports.delete = (req, res) => {
    const username = req.params.username;
  
    User.destroy({
      where: { username: username }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Could not delete User with name=${username}. Maybe User was not found?`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: 
            err.message || `Error deleting User with name=${username}`
        });
      });
  };

