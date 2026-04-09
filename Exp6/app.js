const { MongoClient } = require('mongodb');

// 🔗 Your MongoDB Atlas connection string
const uri = "mongodb+srv://juveria:juveria2006@cluster0.bgpgver.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
    try {
        // ✅ Connect
        await client.connect();
        console.log("✅ Connected to MongoDB");

        // 📂 DB & Collection
        const db = client.db("FSD_DB");
        const collection = db.collection("students");

        // 📥 INSERT
        const insertResult = await collection.insertOne({
            name: "John",
            age: 20,
            course: "FSD"
        });
        console.log("✅ Inserted ID:", insertResult.insertedId);

        // 📖 READ
        const data = await collection.find().toArray();
        console.log("\n📄 Records:");
        console.log(data);

        // ✏️ UPDATE
        const updateResult = await collection.updateOne(
            { name: "John" },
            { $set: { age: 21 } }
        );
        console.log("\n✏️ Updated Count:", updateResult.modifiedCount);

        // ❌ DELETE REMOVED (so data stays)
        // const deleteResult = await collection.deleteOne({ name: "John" });

    } catch (err) {
        console.error("❌ Error:", err);
    } finally {
        await client.close();
        console.log("\n🔌 Connection Closed");
    }
}

run();