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
        dbName: 'mydb',
        file: file.path
      };
      const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
        workerData: mongoDetails,
      });

      worker.on('message', (message) => {
        console.log("poiuytgyuioplokmjnm", message);
      });

      worker.on('error', (error) => {
        console.error(`Worker error: ${error}`);
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          console.error(`Worker stopped with exit code ${code}`);
        }
      });
      resolve({
        status: "Success",
      });
    } catch (error) {
      console.log("kdjfkblgkfmdkldfkgbm", error);
      reject({
        status: "Failed",
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
      console.log("kdjfkblgkfmdkldfkgbm", error);
      reject({
        status: "Failed",
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
          {$project: {firstname: 1}}        
        ]).toArray();
        console.log("kjkpoldjfk,lgbpoikjrke3", policyDetails);
      }
      resolve({
        status: "Success",
        result: policyDetails
      })
    } catch (error) {
      console.log("kdjfkblgkfmdkldfkgbm", error);
      reject({
        status: "Failed",
      });
    }
  })
}

functions.insertMessage = (body) => {
  return new Promise(async (resolve, reject) => {
    console.log("kjnjl;olkfjkofkjlodfkjvlkfr", body.time.split(':'));
    const now = new Date(body.time);
    console.log("nownownownownow", now);
    const hours = body.time.split(':')[0]
    const minutes = body.time.split(':')[1]
    const date = new Date(body.day);
    console.log("hourshourshourshourshours", date,date.getDate(), date.getMonth());
    try {
      cron.schedule(`${minutes} ${hours} ${date.getDate()} ${date.getMonth()} *`, () => {
        console.log("kjhnmklosjklkdfv", body.message);
        messagesCollection.insertOne({ messge: body.message }, (err, result) => {
          console.log("resultresultresultresultresult",result);
          resolve({
            status: "Success"
          })
        })
      });

    } catch (error) {
      console.log("kdjfkblgkfmdkldfkgbm", error);
      reject({
        status: "Failed",
      });
    }
  })
}

export default functions;