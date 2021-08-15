module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);

    // Retrieve all users
    router.get("/", users.findAll);
  
    // COUNT all users who want bedbot in their channel
    router.get("/count-channels",users.countChannels);
  
    // retrieve all users that want bedbot in their channel
    router.get("/channels", users.findChannels);

    // retrieve all users to be ignored
    router.get("/ignore", users.findIgnored);
  
    // Retrieve a user with username
    router.get("/:username", users.findOne);
  
    // Update a user with username
    router.put("/:username", users.update);
  
    // Delete a user with username
    router.delete("/:username", users.delete);
  
    app.use('/api/users', router);
  };