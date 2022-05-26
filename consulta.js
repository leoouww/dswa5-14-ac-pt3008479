const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url =
	'mongodb://dswa5:dswa5@clusterleonardo-shard-00-00.3fhkc.mongodb.net:27017,clusterleonardo-shard-00-01.3fhkc.mongodb.net:27017,clusterleonardo-shard-00-02.3fhkc.mongodb.net:27017/ifsp?ssl=true&replicaSet=atlas-4go5n9-shard-0&authSource=admin&retryWrites=true&w=majority';
const client = new MongoClient(url);

// Database Name
const dbName = 'ifsp';

async function main() {
	// Use connect method to connect to the server
	console.log('Aluno: Leonardo Castro');
	await client.connect();
	console.log('Connected successfully to server');
	const db = client.db(dbName);
	const collection = db.collection('contatos');

	// the following code examples can be pasted here...

	console.log('Foram encontrados os seguintes docs');
	const findResult = await collection.find({}).toArray();
	console.log('Found documents =>', findResult);

	return 'done.';
}

main()
	.then(console.log)
	.catch(console.error)
	.finally(() => client.close());
