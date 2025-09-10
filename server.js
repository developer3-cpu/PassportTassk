import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
}));
app.use(morgan('dev'));

// Google Drive API setup
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, 'credentials.json'),
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

// Root folder ID where all dealer folders will be created
const REGISTRATION_FOLDER_ID = process.env.REGISTRATION_FOLDER_ID;

// Helper function to create folder in Google Drive
async function createFolder(folderName, parentFolderId) {
  try {
    const folderMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId],
    };

    const folder = await drive.files.create({
      resource: folderMetadata,
      fields: 'id',
    });

    return folder.data.id;
  } catch (error) {
    console.error('Error creating folder:', error.message);
    throw error;
  }
}

// Helper function to check if folder exists
async function findFolder(folderName, parentFolderId) {
  try {
    const response = await drive.files.list({
      q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and '${parentFolderId}' in parents and trashed=false`,
      fields: 'files(id, name)',
    });

    return response.data.files.length > 0 ? response.data.files[0].id : null;
  } catch (error) {
    console.error('Error finding folder:', error.message);
    throw error;
  }
}

// Helper function to upload file to Google Drive
async function uploadFile(file, fileName, mimeType, folderId) {
  try {
    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };

    const media = {
      mimeType,
      body: fs.createReadStream(file.tempFilePath),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id',
    });

    return response.data.id;
  } catch (error) {
    console.error('Error uploading file:', error.message);
    throw error;
  }
}

// API endpoint to upload passport documents
app.post('/api/upload', async (req, res) => {
  try {
    const { dealersCode, dealershipName } = req.body;
    
    if (!dealersCode || !dealershipName) {
      return res.status(400).json({ error: 'Dealers code and dealership name are required' });
    }

    if (!req.files || !req.files.selfPassport) {
      return res.status(400).json({ error: 'Self passport file is required' });
    }

    // Create folder name based on dealer code and name
    const folderName = `${dealersCode}_${dealershipName}`;
    
    // Check if registration folder exists, if not create it
    let registrationFolderId = REGISTRATION_FOLDER_ID;
    if (!registrationFolderId) {
      const rootFolderResponse = await drive.files.list({
        q: "name='registration' and mimeType='application/vnd.google-apps.folder' and trashed=false",
        fields: 'files(id, name)',
      });
      
      if (rootFolderResponse.data.files.length > 0) {
        registrationFolderId = rootFolderResponse.data.files[0].id;
      } else {
        const rootFolderMetadata = {
          name: 'registration',
          mimeType: 'application/vnd.google-apps.folder',
        };
        
        const rootFolder = await drive.files.create({
          resource: rootFolderMetadata,
          fields: 'id',
        });
        
        registrationFolderId = rootFolder.data.id;
      }
    }

    // Check if dealer folder exists, if not create it
    let dealerFolderId = await findFolder(folderName, registrationFolderId);
    if (!dealerFolderId) {
      dealerFolderId = await createFolder(folderName, registrationFolderId);
    }

    // Upload self passport
    const selfPassport = req.files.selfPassport;
    const selfPassportName = `Self_${dealershipName}_Passport${path.extname(selfPassport.name)}`;
    await uploadFile(
      selfPassport,
      selfPassportName,
      selfPassport.mimetype,
      dealerFolderId
    );

    // Upload spouse passport if provided
    if (req.files.spousePassport) {
      const spousePassport = req.files.spousePassport;
      const spousePassportName = `Spouse_${dealershipName}_Passport${path.extname(spousePassport.name)}`;
      await uploadFile(
        spousePassport,
        spousePassportName,
        spousePassport.mimetype,
        dealerFolderId
      );
    }

    res.status(200).json({ success: true, message: 'Documents uploaded successfully' });
  } catch (error) {
    console.error('Error in upload endpoint:', error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});