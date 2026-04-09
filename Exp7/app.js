const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const uri = "mongodb+srv://juveria:juveria2006@cluster0.bgpgver.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

let collection;

async function connectDB() {
    await client.connect();
    const db = client.db("FSD_DB");
    collection = db.collection("students");
    console.log("✅ Connected to MongoDB");
}
connectDB();


// 🏠 HOME PAGE
app.get("/", (req, res) => {
    res.send(`
    <html>
    <head>
        <title>Student System</title>
        <style>
            body {
                margin: 0;
                font-family: 'Segoe UI', sans-serif;
                background: linear-gradient(135deg, #4b6cb7, #8e44ad);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }

            .card {
                background: rgba(255,255,255,0.15);
                backdrop-filter: blur(12px);
                padding: 50px;
                border-radius: 20px;
                width: 450px;
                box-shadow: 0 15px 40px rgba(0,0,0,0.3);
                text-align: center;
                color: white;
            }

            h2 {
                font-size: 28px;
                margin-bottom: 25px;
            }

            input {
                width: 100%;
                padding: 14px;
                margin: 12px 0;
                border: none;
                border-radius: 10px;
                font-size: 16px;
            }

            button {
                width: 100%;
                padding: 14px;
                border: none;
                border-radius: 10px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                font-size: 18px;
                cursor: pointer;
                transition: 0.3s;
            }

            button:hover {
                transform: scale(1.05);
            }

            a {
                display: inline-block;
                margin-top: 20px;
                color: #ffffff;
                font-size: 16px;
                text-decoration: none;
            }
        </style>
    </head>

    <body>
        <div class="card">
            <h2>Student Registration</h2>
            <form method="POST" action="/add">
                <input type="text" name="name" placeholder="Enter Name" required>
                <input type="number" name="age" placeholder="Enter Age" required>
                <input type="text" name="course" placeholder="Enter Course" required>
                <button type="submit">Submit</button>
            </form>
            <a href="/students">📊 View Records</a>
        </div>
    </body>
    </html>
    `);
});


// 📥 INSERT (FIXED BIG SUCCESS PAGE)
app.post("/add", async (req, res) => {
    const { name, age, course } = req.body;

    await collection.insertOne({
        name,
        age: parseInt(age),
        course
    });

    res.send(`
    <html>
    <head>
        <style>
            body {
                margin: 0;
                font-family: 'Segoe UI';
                background: linear-gradient(135deg, #4b6cb7, #8e44ad);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                color: white;
            }

            .box {
                background: rgba(255,255,255,0.15);
                backdrop-filter: blur(12px);
                padding: 50px;
                border-radius: 20px;
                text-align: center;
                width: 400px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }

            h2 {
                font-size: 32px;
                margin-bottom: 20px;
            }

            p {
                font-size: 18px;
            }

            a {
                display: inline-block;
                margin-top: 15px;
                color: white;
                text-decoration: none;
                font-size: 16px;
            }
        </style>
    </head>

    <body>
        <div class="box">
            <h2>✅ Data Stored Successfully</h2>
            <p>Your record has been added to the database.</p>
            <a href="/">⬅ Go Back</a><br>
            <a href="/students">📊 View Records</a>
        </div>
    </body>
    </html>
    `);
});


// 📄 VIEW DATA
app.get("/students", async (req, res) => {
    const data = await collection.find().toArray();

    let rows = data.map(d => `
        <tr>
            <td>${d.name}</td>
            <td>${d.age}</td>
            <td>${d.course}</td>
        </tr>
    `).join("");

    res.send(`
    <html>
    <head>
        <style>
            body {
                margin: 0;
                font-family: 'Segoe UI';
                background: linear-gradient(135deg, #4b6cb7, #8e44ad);
                text-align: center;
                color: white;
            }

            h2 {
                margin-top: 40px;
                font-size: 30px;
            }

            .table-box {
                width: 600px;
                margin: 30px auto;
                background: rgba(255,255,255,0.15);
                backdrop-filter: blur(10px);
                border-radius: 15px;
                padding: 20px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th, td {
                padding: 14px;
                font-size: 16px;
            }

            th {
                background: white;
                color: black;
            }

            tr:hover {
                background: rgba(255,255,255,0.2);
            }

            a {
                color: white;
                text-decoration: none;
                font-size: 16px;
            }
        </style>
    </head>

    <body>
        <h2>📊 Student Records</h2>

        <div class="table-box">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Course</th>
                </tr>
                ${rows}
            </table>
        </div>

        <a href="/">⬅ Back</a>
    </body>
    </html>
    `);
});

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});