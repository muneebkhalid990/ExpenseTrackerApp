import { DataTypes } from "sequelize";
import userModel from "../user/user.js";
import incomeModel from "../income/index.js";

import sequelize from "../../db/config.js";

const incomeTagModel = sequelize.define("incometag",{
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});

userModel.hasMany(incomeTagModel);
incomeTagModel.belongsTo(userModel);

incomeModel.hasMany(incomeTagModel);
incomeTagModel.belongsTo(incomeModel);

export default incomeTagModel;

