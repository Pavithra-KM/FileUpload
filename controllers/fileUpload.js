import fileUploadService from '../services/fileUpload.js';

const functions = {};

functions.fileUpload = async(req, res) => { 
    console.log(" req.files.file", req.file); 
    try {
       res.send({
            status: "Sucess",
            result: await fileUploadService.fileUpload(req.file)
        })
    } catch (error) {
        console.log('iuhjuiodofiujbgiofp', error);
        res.send({
            status: "Failed"
        })
    }
}

functions.getPolicyInfo = async(req, res) => { 
    try {
       res.send({
            status: "Sucess",
            result: await fileUploadService.getPolicyInfo()
        })
    } catch (error) {
        console.log('iuhjuiodofiujbgiofp', error);
        res.send({
            status: "Failed"
        })
    }
}

functions.searchPolicyInfoWithUsername = async(req, res) => { 
    try {
       res.send({
            status: "Sucess",
            result: await fileUploadService.searchPolicyInfoWithUsername(req.body)
        })
    } catch (error) {
        console.log('iuhjuiodofiujbgiofp', error);
        res.send({
            status: "Failed"
        })
    }
}

functions.insertMessage = async(req, res) => { 
    try {
       res.send({
            status: "Sucess",
            result: await fileUploadService.insertMessage(req.body)
        })
    } catch (error) {
        console.log('iuhjuiodofiujbgiofp', error);
        res.send({
            status: "Failed"
        })
    }
}

export default functions;