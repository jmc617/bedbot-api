module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      username: {
        type: Sequelize.STRING,
      },
      interval: {
        type: Sequelize.INTEGER,
        defaultValue: 20
      },
      joinChannel: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      canBedify: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
  
    return User;
  };