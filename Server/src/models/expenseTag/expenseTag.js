import { DataTypes } from "sequelize";
import userModel from "../user/user.js";
import expenseModel from "../expense/index.js";

import sequelize from "../../db/config.js";

const expenseTagModel = sequelize.define("expensetag",{
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});

userModel.hasMany(expenseTagModel);
expenseTagModel.belongsTo(userModel);

expenseModel.hasMany(expenseTagModel);
expenseTagModel.belongsTo(expenseModel);

export default expenseTagModel;
