const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const ComplaintModel=require('./models/Complaints')

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/FortisLine")

app.post("/form",(req,res)=>{
    ComplaintModel.create(req.body)
    .then(complaints=>res.join(complaints))
    .catch(err=>res.json(err))
})

app.get("/complaints", async (req,res)=>{
  try {
    const complaints = await ComplaintModel.find({})
    res.json(complaints)
  } catch(err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(3000,()=>{
    console.log("Server is running")
})