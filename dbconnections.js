import { MongoClient } from 'mongodb';

const url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
	if (err) {
		console.error('Failed to connect to the database. Error:', err);
		return;
	}
	console.log('Connected successfully to the database');

	global.mydb = client.db("mydb");
	global.messagesCollection = mydb.collection("Messages");
	global.userCollection = mydb.collection("User");
	global.agentCollection = mydb.collection("Agent");
	global.usersAccountCollection = mydb.collection("UsersAccount");
	global.lobCollection = mydb.collection("LOB");
	global.carrierCollection = mydb.collection("Carrier");
	global.policyCollection = mydb.collection("Policy")
});