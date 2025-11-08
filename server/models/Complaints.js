const mongoose=require('mongoose')


const ComplaintSchema=new mongoose.Schema({
    type:String,
    location:String,
    date: Date,
    desc: String,
})

const ComplaintModel=mongoose.model("complaints",ComplaintSchema)
module.exports=ComplaintModel