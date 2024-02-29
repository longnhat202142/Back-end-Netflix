const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
    username :{type: String , required : true , unique:true },
    email :{type: String , required : true , unique:true },
    password :{type: String , required : true },
    profliePicture : {type :String , default:""},
    isAdmin: { type: Boolean, default:false },


},{
    timestamps:true
}
)

module.exports = mongoose.model("user", UserSchema);
