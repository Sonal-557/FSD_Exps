const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// 🗄️ In-memory DB (for lab)
let students = [];

// 📥 CREATE
app.post('/students', (req, res) => {
    students.push(req.body);
    res.send({ message: "Student added" });
});

// 📄 READ
app.get('/students', (req, res) => {
    res.json(students);
});

// ❌ DELETE
app.delete('/students/:index', (req, res) => {
    students.splice(req.params.index, 1);
    res.send({ message: "Student deleted" });
});

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});