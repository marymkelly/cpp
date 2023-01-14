import { MongoClient } from "mongodb";

export async function connectToDatabase() {
	const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.a5xpsi3.mongodb.net/?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;
	const client = new MongoClient(url);
	return client.connect();
}
