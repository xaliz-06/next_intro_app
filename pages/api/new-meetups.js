import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      const uri =
        "mongodb+srv://xaliz06:8Q66NwvPW9hRgjG7@cluster0.cbo4cok.mongodb.net/?retryWrites=true&w=majority";

      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await client.connect();

      const database = client.db("meetups");
      const meetupsCollection = database.collection("meetups");

      const result = await meetupsCollection.insertOne(data);

      console.log(result);

      res.status(201).json({ message: "Meetup inserted!" });
      client.close();
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export default handler;
