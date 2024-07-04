const functions = {};
import { Worker } from 'worker_threads';
import path from 'path';
const __dirname = path.resolve();
import cron from 'node-cron';

functions.fileUpload = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const mongoDetails = {
        uri: 'mongodb://127.0.0.1:27017',
        dbName: 'tasks',
        file: file.path
      };
      const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
        workerData: mongoDetails,
      });

      worker.on('message', (message) => {
        console.log("message", message);
      });

      worker.on('error', (error) => {
        console.error(`Worker error: ${error}`);
      });

      worker.on('exit', (code) => {
          console.error(`Worker stopped with exit code ${code}`);
      });
      resolve({
        status: "Success",
      });
    } catch (error) {
      reject({
        status: "Failed",
        error: error
      });
    }
  })
}

functions.getPolicyInfo = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let policyInfoWithUser = await policyCollection.aggregate([
        {
          $lookup: {
            from: "User",
            localField: "userId",
            foreignField: "_id",
            as: "user_details",
          },
        },
        { $unwind: "$user_details" },
        {
          $group: {
            _id: "$user_details._id", policyInfo: {
              $push: {
                policy_number: "$policy_number",
                policy_start_date: "$policy_start_date",
                policy_end_date: "$policy_end_date",
                user_name: "$user_details.firstname"
              }
            }
          }
        }
      ]).toArray();
      resolve({
        status: "Success",
        result: policyInfoWithUser
      })
    } catch (error) {
      reject({
        status: "Failed",
        error: error
      });
    }
  })
}

functions.searchPolicyInfoWithUsername = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let policyDetails = []
      if (body.name) {
        policyDetails = await userCollection.aggregate([
          { $match: { "firstname": RegExp(body.name) } },
          {
            $lookup: {
              from: "Policy",
              localField: "_id",
              foreignField: "userId",
              as: "policy_details",
            },
          },
          {$project: {policy_details: 1}}        
        ]).toArray();
      }
      resolve({
        status: "Success",
        result: policyDetails
      })
    } catch (error) {
      reject({
        status: "Failed",
        error: error
      });
    }
  })
}

functions.insertMessage = (body) => {
  return new Promise(async (resolve, reject) => {
    const time = body.time.split(':')
    const hours = time[0];
    const minutes = time[1];
    const date = new Date(body.day);
    try {
      cron.schedule(`${minutes} ${hours} ${date.getDate()} ${date.getMonth()+1} *`, () => {
        messagesCollection.insertOne({ messge: body.message, date: body.day, time: body.time })
      });
      resolve({
        status: "Success",
        message: "Inserted Successfully"
      })

    } catch (error) {
      reject({
        status: "Failed",
        error: error
      });
    }
  })
}

export default functions;