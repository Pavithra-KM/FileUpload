import { parentPort, workerData } from 'worker_threads';
import fs from 'fs';
import csvParser from 'csv-parser';
import { MongoClient } from 'mongodb';

const filePath = workerData.file
const results = [];
fs.createReadStream(filePath)
  .pipe(csvParser())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    parentPort.postMessage("CSV file successfully processed");

    MongoClient.connect(workerData.uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
      if (err) {
        console.error('Failed to connect to the database. Error:', err);
        return;
      }
      console.log('Connected successfully to the database');
      const mydb = client.db(workerData.dbName);
      results.forEach(async (obj) => {
        let categoryId = "";
        let userId = "";
        let companyId = "";
        let insertAgent = await mydb.collection('Agent').insertOne({ agentName: obj.agent });
        let insertUser = await mydb.collection('User').insertOne({ firstname: obj.firstname, dob: obj.dob, address: obj.address, phoneNumber: obj.phone, state: obj.state, zipcode: obj.zip, email: obj.email, gender: obj.gender, userType: obj.userType });
        let insertUsersAccount = await mydb.collection('UsersAccount').insertOne({ account_name: obj.account_name });
        let insertPolicyCategory = await mydb.collection('LOB').insertOne({ category_name: obj.category_name });
        let insertPolicyCarrier = await mydb.collection('Carrier').insertOne({ company_name: obj.company_name });

        if (insertUser.insertedId) {
          userId = insertUser.insertedId
        }
        if (insertPolicyCarrier.insertedId) {
          categoryId = insertPolicyCarrier.insertedId
        }
        if (insertPolicyCarrier.insertedId) {
          companyId = insertPolicyCarrier.insertedId
        }
        if (userId && categoryId && companyId) {
          let insertPolicyInfo = await mydb.collection('Policy').insertOne({ policy_number: obj.policy_number, policy_start_date: obj.policy_start_date, policy_end_date: obj.policy_end_date, policy_category: categoryId, companyId: companyId, userId: userId });
        }
      });
    });


    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      }
      console.log('Temporary file deleted');
    });
  })
