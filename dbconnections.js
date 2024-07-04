import { MongoClient } from 'mongodb';

const url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
	if (err) {
		console.error('Failed to connect to the database. Error:', err);
		return;
	}
	console.log('Connected successfully to the database');

	global.tasksDb = client.db("tasks");
	global.messagesCollection = tasksDb.collection("Messages");
	global.userCollection = tasksDb.collection("User");
	global.agentCollection = tasksDb.collection("Agent");
	global.usersAccountCollection = tasksDb.collection("UsersAccount");
	global.lobCollection = tasksDb.collection("LOB");
	global.carrierCollection = tasksDb.collection("Carrier");
	global.policyCollection = tasksDb.collection("Policy")
});