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




08_25 Pipe Project Completion Tracking & Review (1).xlsx I have this excel sheet whcih is used to track the status of several projects (Turn key installations) of Agricultural and industiral type projects, which are of huge values and execution timelines span several months or years as well.

Problem: My team is currently tracking the status is a dirty excel format, which I dont like, its error prone and we cannot digest the information in a clean way. Also, when multiple people work on this, the sheet become cluttered and the past information, audit trail etc is lost.

What i want: I want to change this whole status tracking approach and create an ONLINE WEB PORTAL which is quick, real time and allows multiple people to collaborate in punching the data. Plus I want to have management roles on this portal, where they can see the data in clean presentable format, and see reports as well. I also want the editors / admins / management roles to update the data right in this portal itself, so that any updates in the status is seemlessly handled from the same portal.

What I want you to do: Create a web based portal, using apple style SF Pro Display font, and bento box designs, with client side filters and quick data fetchers. I wan to use MySql data base for the DB data storage, but for now, I just want to create a mock data and complete the front end website skeleton first. We will tackle the DB / storage for realtime data later.

Please review the excel sheet and propose a good portal solution
```
