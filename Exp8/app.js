const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const uri = "mongodb+srv://juveria:juveria2006@cluster0.bgpgver.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

let collection;

async function connectDB() {
    await client.connect();
    const db = client.db("FSD_DB");
    collection = db.collection("students");

    // insert sample data if empty
    const count = await collection.countDocuments();
    if (count === 0) {
        await collection.insertMany([
            { name: "Alice", age: 22 },
            { name: "Bob", age: 25 },
            { name: "Charlie", age: 20 },
            { name: "David", age: 28 },
            { name: "Eva", age: 21 }
        ]);
    }

    console.log("✅ Connected to MongoDB");
}
connectDB();


// 🏠 HOME PAGE (Dashboard)
app.get("/", (req, res) => {
    res.send(`
    <html>
    <head>
        <title>MongoDB Operations</title>
        <style>
            body {
                font-family: 'Segoe UI';
                background: linear-gradient(135deg, #e0eafc, #cfdef3);
                text-align: center;
                padding: 40px;
            }

            h1 {
                color: #333;
            }

            .btn {
                padding: 12px 20px;
                margin: 10px;
                border: none;
                border-radius: 8px;
                background: #667eea;
                color: white;
                cursor: pointer;
                font-size: 15px;
                transition: 0.3s;
            }

            .btn:hover {
                background: #5a67d8;
                transform: scale(1.05);
            }

            .box {
                margin-top: 30px;
                background: white;
                padding: 20px;
                border-radius: 15px;
                width: 700px;
                margin-left: auto;
                margin-right: auto;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th, td {
                padding: 12px;
                border-bottom: 1px solid #ddd;
            }

            th {
                background: #667eea;
                color: white;
            }
        </style>
    </head>

    <body>
        <h1>📊 MongoDB Operations Dashboard</h1>

        <div>
            <a href="/count"><button class="btn">Count</button></a>
            <a href="/limit"><button class="btn">Limit (3)</button></a>
            <a href="/sortAsc"><button class="btn">Sort ↑ Age</button></a>
            <a href="/sortDesc"><button class="btn">Sort ↓ Age</button></a>
            <a href="/skip"><button class="btn">Skip 2</button></a>
            <a href="/all"><button class="btn">Show All</button></a>
        </div>
    </body>
    </html>
    `);
});


// 🔢 COUNT
app.get("/count", async (req, res) => {
    const count = await collection.countDocuments();

    res.send(`<h2>Total Records: ${count}</h2><a href="/">⬅ Back</a>`);
});


// 📌 LIMIT
app.get("/limit", async (req, res) => {
    const data = await collection.find().limit(3).toArray();
    res.send(renderTable(data));
});


// 🔼 SORT ASC
app.get("/sortAsc", async (req, res) => {
    const data = await collection.find().sort({ age: 1 }).toArray();
    res.send(renderTable(data));
});


// 🔽 SORT DESC
app.get("/sortDesc", async (req, res) => {
    const data = await collection.find().sort({ age: -1 }).toArray();
    res.send(renderTable(data));
});


// ⏭ SKIP
app.get("/skip", async (req, res) => {
    const data = await collection.find().skip(2).toArray();
    res.send(renderTable(data));
});


// 📄 ALL DATA
app.get("/all", async (req, res) => {
    const data = await collection.find().toArray();
    res.send(renderTable(data));
});


// 🎨 TABLE RENDER FUNCTION
function renderTable(data) {
    let rows = data.map(d => `
        <tr>
            <td>${d.name}</td>
            <td>${d.age}</td>
        </tr>
    `).join("");

    return `
    <html>
    <head>
        <style>
            body {
                font-family: 'Segoe UI';
                background: linear-gradient(135deg, #e0eafc, #cfdef3);
                text-align: center;
            }

            .box {
                margin: 40px auto;
                width: 600px;
                background: white;
                padding: 20px;
                border-radius: 15px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th, td {
                padding: 12px;
                border-bottom: 1px solid #ddd;
            }

            th {
                background: #667eea;
                color: white;
            }

            a {
                display: inline-block;
                margin-top: 15px;
                color: #667eea;
                text-decoration: none;
            }
        </style>
    </head>

    <body>
        <div class="box">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                </tr>
                ${rows}
            </table>
            <a href="/">⬅ Back</a>
        </div>
    </body>
    </html>
    `;
}

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});