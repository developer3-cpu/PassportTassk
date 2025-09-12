# Passport Upload Portal

A web application for dealers to upload passport documents. The system includes a login screen with mobile number validation, OTP verification, and a passport upload page. Uploaded documents are stored in Google Drive with a specific folder structure.

## Features

- Mobile number validation (10 digits)
- OTP verification (hardcoded as 121212)
- Passport upload page with required fields:
  - Dealers Code
  - Dealership Name
  - Self Passport (required, image or PDF)
  - Spouse Passport (optional, image or PDF)
- Google Drive integration for document storage
- Organized folder structure in Google Drive based on dealer information

## Setup Instructions

### Frontend Setup

1. Install dependencies:
   ```
   cd pass
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

### Backend Setup

1. Install dependencies:
   ```
   cd pass/server
   npm install
   ```

2. Set up Google Drive API:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the Google Drive API
   - Create a service account and download the credentials JSON file
   - Rename the downloaded file to `credentials.json` and place it in the `server` directory
   - Share a Google Drive folder with the service account email

3. Configure environment variables:
   - Create a `.env` file in the `server` directory based on the `.env.example` file
   - Set the `REGISTRATION_FOLDER_ID` to the ID of your Google Drive folder

4. Start the server:
   ```
   npm run dev
   ```

## Usage

1. Open the application in your browser (typically at http://localhost:5173)
2. https://docs.google.com/spreadsheets/d/1WERo3j6ZOTagyE75U64sTMD5sD1eM1PT/edit?gid=796863543#gid=796863543
3. Enter a 10-digit mobile number
4. Enter the OTP (121212)
5. Fill in the passport upload form with dealer information and upload passport documents
6. Submit the form to upload documents to Google Drive

## Folder Structure in Google Drive

Documents are organized in Google Drive as follows:

```
registration/
└── [DealersCode]_[DealershipName]/
    ├── Self_[DealershipName]_Passport.jpg
    └── Spouse_[DealershipName]_Passport.jpg (if provided)
```

For example, if the dealer code is 2323 and the dealership name is XYZ, the folder structure would be:

```
registration/
└── 2323_XYZ/
    ├── Self_XYZ_Passport.jpg
    └── Spouse_XYZ_Passport.jpg (if provided)
```
