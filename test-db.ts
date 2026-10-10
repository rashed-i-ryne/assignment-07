import { MongoClient } from "mongodb";

const uri = "mongodb+srv://assignment-07:H9N6xJzYWa0ikFZm@cluster0.hl95j6i.mongodb.net/bazardor?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
  const client = new MongoClient(uri);
  try {
    console.log("Attempting to connect to MongoDB Atlas...");
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("SUCCESS! Connected successfully to MongoDB Atlas!");
  } catch (error) {
    console.error("FAILED to connect to MongoDB:", error);
  } finally {
    await client.close();
  }
}

testConnection();