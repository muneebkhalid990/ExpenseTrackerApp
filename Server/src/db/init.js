
import userModel from "../models/user/user.js";
import incomeModel from "../models/income/index.js";
import expenseModel from "../models/expense/index.js";
import incomeTagModel from "../models/inomeTag/incomeTag.js";
import expenseTagModel from "../models/expenseTag/expenseTag.js";

const dbInit = async()=>{
    await userModel.sync({
        alter:true,
        force:false,
    });
    await incomeModel.sync({
        alter:true,
        force:false,
    });
    await expenseModel.sync({
        alter:true,
        force:false,
    });
    await incomeTagModel.sync({
        alter:true,
        force:false,
    });
    await expenseTagModel.sync({
        alter:true,
        force:false,
    });
    
};

export default dbInit;