import { DataTypes } from "sequelize";

import sequelize from "../../db/config.js";
import userModel from "../user/user.js";

const expenseModel = sequelize.define("expense",{
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    category:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },date:{
        type:DataTypes.DATEONLY,
        allowNull: true,
    }
});

userModel.hasMany(expenseModel );
expenseModel.belongsTo(userModel );


export default expenseModel;