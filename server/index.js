const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const session=require("express-session")
const path=require("path")
const fs=require("fs")
const ComplaintModel=require('./models/Complaints')
const adminRoutes=require('./routes/admin.routes')
const { upload }=require("./middlewares/multer.middleware")
require('dotenv').config()



const app=express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
  secret: process.env.SESSION_SECRET || 'fortisline-dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 8
  }
}))

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/FortisLine")

app.post("/form",upload.single("attachment"),async (req,res)=>{
  try{
     console.log("Request Body:", req.body); // Debug: Check what's being received
    console.log("File:", req.file); // Debug: Check file upload
    // Normalize path to use forward slashes for URLs
    let filePath=req.file.path.replace(/\\/g, '/');
    const complaintData = {
     type: req.body.type,
      location: req.body.location,
      date: req.body.date,
      desc: req.body.desc,
      attachment: filePath
    };
    console.log("Complaint Data:", complaintData); 
    const complaint=await ComplaintModel.create(complaintData);
    res.json(complaint);
  }catch(err){
    res.status(500).json({error:err.message});
  }
})


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/uploads/:filePath",(req,res)=>{
  try{
    const filePath =req.params.filePath;
    console.log(filePath);
    const fullPath = path.join(__dirname, 'uploads', filePath);
    console.log(fullPath);
  
    if (!fullPath.startsWith(path.join(__dirname, 'uploads'))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    res.sendFile(fullPath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
    
});

app.get("/complaints", async (req,res)=>{
  try {
    const complaints = await ComplaintModel.find({})
    res.json(complaints)
  } catch(err) {
    res.status(500).json({ error: err.message })
  }
})

app.get("/getComplaint/:id", async(req,res)=>{
  try{
 
    const complaints=await ComplaintModel.findById(req.params.id);
    res.json(complaints)
  }catch(err){
    console.error(err);
    res.status(500).json({error:err.message})
  }

})

// Admin routes (session-based auth)
app.use('/admin', adminRoutes)
app.listen(3000,()=>{
    console.log("Server is running")
})