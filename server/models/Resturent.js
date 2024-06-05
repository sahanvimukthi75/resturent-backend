const mongoose =require("mongoose")

const ResturentShema =new mongoose.Schema({
    name:String,
    phoneNumber:Number,
    address:String
})

const ResturentModel =mongoose.model("resturent",ResturentShema)
module.exports =ResturentModel