const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const { Readable } = require("stream");

// Use memory storage to handle files in memory before uploading to Cloudinary
const storage = multer.memoryStorage();

// File filter to accept PDF, images, videos, and text files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    // Images
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml',
    // Videos
    'video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm', 'video/x-matroska',
    // PDFs
    'application/pdf',
    // Text files
    'text/plain', 'text/csv', 'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type not supported. Allowed types: images, videos, PDFs, and text documents. Got: ${file.mimetype}`), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: fileFilter
});

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, originalname, mimetype) => {
  return new Promise((resolve, reject) => {
    // Determine resource type based on mimetype
    let resourceType = 'auto';
    if (mimetype.startsWith('video/')) {
      resourceType = 'video';
    } else if (mimetype.startsWith('image/')) {
      resourceType = 'image';
    } else {
      resourceType = 'raw'; // For PDFs and documents
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'fortisline-complaints',
        resource_type: resourceType,
        public_id: `${Date.now()}-${originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`,
        use_filename: true,
        unique_filename: true
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Convert buffer to stream and pipe to cloudinary
    const bufferStream = Readable.from(fileBuffer);
    bufferStream.pipe(uploadStream);
  });
};

module.exports = { upload, uploadToCloudinary };