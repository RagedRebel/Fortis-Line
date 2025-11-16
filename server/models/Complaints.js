const mongoose=require('mongoose')


const ComplaintSchema=new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  attachment: {
    type: String,
    default: null
  }
}, { timestamps: true });

const ComplaintModel=mongoose.model("complaints",ComplaintSchema)
module.exports=ComplaintModel