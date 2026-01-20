# Cloudinary Setup for FortisLine

## Overview
This application uses Cloudinary to store and serve uploaded files including images, videos, PDFs, and text documents.

## Setup Instructions

### 1. Create a Cloudinary Account
1. Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account
2. After signing in, go to your Dashboard
3. You'll see your Cloud Name, API Key, and API Secret

### 2. Configure Environment Variables
Add the following to your `.env` file in the server directory:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Replace the values with your actual Cloudinary credentials.

### 3. Supported File Types
The application now accepts:
- **Images**: JPEG, PNG, GIF, WebP, BMP, SVG
- **Videos**: MP4, MPEG, QuickTime (MOV), AVI, WebM, MKV
- **Documents**: PDF, TXT, CSV, DOC, DOCX, XLS, XLSX
- **File Size Limit**: 50MB per file
- **Max Files**: 3 files per complaint

### 4. How It Works
1. Files are uploaded via the complaint form
2. Multer processes the file in memory
3. Files are then uploaded to Cloudinary
4. Cloudinary URLs are stored in the database
5. Files can be viewed directly from Cloudinary in both admin and user detail views

### 5. Features
- **Automatic Format Detection**: Images and videos are automatically detected and displayed inline
- **Preview Support**: Images show thumbnails, videos have embedded players
- **Download/View**: All files can be opened in a new tab
- **Secure Storage**: Files are stored securely on Cloudinary's CDN
- **Fast Loading**: Cloudinary's CDN ensures fast file delivery globally

### 6. Folder Structure
All complaint attachments are stored in the `fortisline-complaints` folder on Cloudinary.

## Development Notes
- Files are no longer stored locally in the `uploads/` folder
- The old local file serving endpoint is still available for backward compatibility
- New complaints will use Cloudinary URLs exclusively
