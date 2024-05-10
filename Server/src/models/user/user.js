import { DataTypes } from "sequelize";

import sequelize from "../../db/config.js";

const userModel = sequelize.define("user", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eToken: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: true,
  },
  jwtToken: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: true,
  },
  otp: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: true,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  expiryTimestamps: {
    type: DataTypes.DATE,
    allowNull: true,
  }, 
});

export default userModel;
