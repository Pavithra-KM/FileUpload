import express from 'express';
import fileUploadController from './controllers/fileUpload.js';
import path from 'path';
const __dirname = path.resolve();
const upload = multer({ dest: path.join(__dirname, 'uploads') });
import multer from 'multer';
const route = express.Router();

// API to upload csv file
route.post('/fileUpload', upload.single('upload'), fileUploadController.fileUpload);

// API to get aggregated policy by each user
route.get('/findPolicyInfo', fileUploadController.getPolicyInfo)

// Search API to find policy info with the help of user name
route.post('/searchPolicyInfoWithUsername', fileUploadController.searchPolicyInfoWithUsername)

route.post('/insertMessage', fileUploadController.insertMessage)

export default route;