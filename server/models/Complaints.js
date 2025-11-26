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
  isVictim: { type: String, enum: ['Yes', 'No'], required: false },
  isFirstTime: { type: String, enum: ['Yes', 'No'], required: false },
  isThreatened: { type: String, enum: ['Yes', 'No'], required: false },
  isOnCampus: { type: String, enum: ['Yes', 'No'], required: false },
  hasWitnesses: { type: String, enum: ['Yes', 'No'], required: false },
  isPhysicallyHarmed: { type: String, enum: ['Yes', 'No'], required: false },
  knowsPerpetrator: { type: String, enum: ['Yes', 'No'], required: false },
  status:{
    type: String,
    enum: ['New', 'In Review', 'Resolved','Rejected'],
    default: 'New'
  },
  attachments: {
    type: [String],
    default: []
  },
  // Deterministic hash of tracking code using server secret (HMAC)
  trackingCodeHash: {
    type: String,
    index: true,
    unique: true,
    sparse: true
  }
}, { timestamps: true });

const ComplaintModel=mongoose.model("complaints",ComplaintSchema)
module.exports=ComplaintModel