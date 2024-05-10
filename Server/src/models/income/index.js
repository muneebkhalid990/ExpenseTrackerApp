import { DataTypes } from "sequelize";

import sequelize from "../../db/config.js";
import userModel from "../user/user.js";

const incomeModel = sequelize.define("income",{
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

userModel.hasMany(incomeModel);
incomeModel.belongsTo(userModel);

export default incomeModel;