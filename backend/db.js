const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL);

const User = new Schema({
    email: {type:String, unique:true, required:true},
    password: String,
    name:String
})
const Accounts = new Schema({
    userId: {type: Schema.Types.ObjectId, ref:"User", required: true},
    balance: {type: Number , required: true} 
})
const UserModel = mongoose.model('User', User);
const AccountsModel = mongoose.model('Accounts' , Accounts);

module.exports = {
    UserModel,
    AccountsModel
}