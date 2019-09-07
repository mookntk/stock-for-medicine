const Sequelize = require("sequelize");
const db = require("../../db");

module.exports = db.sequelize.define(
  "user",
  {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        require:"please enter"
        
    },
    password:{
        type: Sequelize.STRING,
        require:"please enter"
    },
    user_type:{
        type: Sequelize.STRING,
        require:"please enter"
    },
    name:{
        type: Sequelize.STRING
    },
  },
  {
    timestamps: false
  }
);
