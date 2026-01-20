const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const session=require("express-session")
const path=require("path")
const fs=require("fs")
const ComplaintModel=require('./models/Complaints')
const adminRoutes=require('./routes/admin.routes')
const { upload, uploadToCloudinary }=require("./middlewares/multer.middleware")
const { generateTrackingCode, hmacSha256Hex } = require('./utils/tracking')
require('dotenv').config()



const app=express()
const isProduction = process.env.NODE_ENV === 'production'
if (isProduction) {
  // Required on Render/behind proxies so secure cookies work correctly.
  app.set('trust proxy', 1)
}

app.use(cors({
  // In production, reflect the request Origin. For stricter control, set CORS_ORIGIN.
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((v) => v.trim()).filter(Boolean)
    : (isProduction ? true : 'http://localhost:5173'),
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
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 8
  }
}))

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/FortisLine")

// Admin routes (session-based auth)
app.use('/admin', adminRoutes)

app.post("/form",upload.array("attachments", 3),async (req,res)=>{
  try{
     console.log("Request Body:", req.body); // Debug: Check what's being received
    console.log("Files:", req.files); // Debug: Check files upload
    
    let attachmentUrls = [];
    
    // Upload files to Cloudinary
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => 
        uploadToCloudinary(file.buffer, file.originalname, file.mimetype)
      );
      
      try {
        const uploadResults = await Promise.all(uploadPromises);
        attachmentUrls = uploadResults.map(result => ({
          url: result.secure_url,
          publicId: result.public_id,
          resourceType: result.resource_type,
          format: result.format,
          originalName: result.original_filename || 'file'
        }));
        console.log("Uploaded to Cloudinary:", attachmentUrls);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ error: "Failed to upload files to cloud storage" });
      }
    }

    const trackingSecret = process.env.TRACKING_CODE_SECRET || 'fortisline-dev-tracking-secret'
    const trackingCode = generateTrackingCode()
    const trackingCodeHash = hmacSha256Hex(trackingCode, trackingSecret)
    const complaintData = {
     type: req.body.type,
      location: req.body.location,
      date: req.body.date,
      desc: req.body.desc,
      isVictim: req.body.isVictim,
      isFirstTime: req.body.isFirstTime,
      isThreatened: req.body.isThreatened,
      isOnCampus: req.body.isOnCampus,
      hasWitnesses: req.body.hasWitnesses,
      isPhysicallyHarmed: req.body.isPhysicallyHarmed,
      knowsPerpetrator: req.body.knowsPerpetrator,
      attachments: attachmentUrls,
      trackingCodeHash
    };
    console.log("Complaint Data:", complaintData); 
    const complaint=await ComplaintModel.create(complaintData);
    // Return complaint with plaintext trackingCode shown once
    res.json({
      _id: complaint._id,
      status: complaint.status,
      createdAt: complaint.createdAt,
      trackingCode
    });
  }catch(err){
    console.error("Error creating complaint:", err);
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

// Resolve complaint by tracking code
app.post('/track', async (req, res) => {
  try {
    const { code } = req.body || {}
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ message: 'Tracking code required' })
    }
    const trackingSecret = process.env.TRACKING_CODE_SECRET || 'fortisline-dev-tracking-secret'
    const codeHash = hmacSha256Hex(code.trim().toLowerCase(), trackingSecret)
    const match = await ComplaintModel.findOne({ trackingCodeHash: codeHash })
    if (!match) return res.status(404).json({ message: 'Not found' })
    return res.json({ _id: match._id, status: match.status })
  } catch (err) {
    res.status(500).json({ message: err.message })
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

// Serve React files (JS, CSS, images)
app.use(express.static(path.join(__dirname, '../client/dist')));

// For any unknown route, send React's index.html
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})