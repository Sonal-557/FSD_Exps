const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {

    // Home Page
    if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.write(`
        <html>
        <head>
            <title>Form</title>
            <style>
                body {
                    font-family: Arial;
                    background: linear-gradient(135deg, #43cea2, #185a9d);
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .box {
                    background: white;
                    padding: 60px;   /* 🔥 bigger box */
                    border-radius: 20px;
                    width: 450px;    /* 🔥 wider box */
                    text-align: center;
                    box-shadow: 0 15px 40px rgba(0,0,0,0.4);
                }

                h2 {
                    margin-bottom: 10px;
                }

                .format {
                    font-size: 14px;
                    color: #555;
                    margin-bottom: 20px;
                    background: #f4f4f4;
                    padding: 10px;
                    border-radius: 8px;
                }

                input {
                    width: 100%;     /* 🔥 full width */
                    padding: 15px;    /* 🔥 bigger inputs */
                    margin: 15px 0;
                    border-radius: 10px;
                    border: 1px solid #ccc;
                    font-size: 16px;
                }

                button {
                    padding: 12px 25px;
                    border: none;
                    background: #185a9d;
                    color: white;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 16px;
                }

                button:hover {
                    background: #43cea2;
                }
            </style>
        </head>

        <body>
            <div class="box">
                
                <h2>User Form</h2>

                <!-- Query String Format Title -->
                <div class="format">
                    <b>Query String Format:</b><br>
                    /submit?name=___&email=___&course=___
                </div>

                <form action="/submit" method="GET">
                    <input type="text" name="name" placeholder="Enter Name" required>
                    <input type="email" name="email" placeholder="Enter Email" required>
                    <input type="text" name="course" placeholder="Enter Course" required>
                    <button type="submit">Submit</button>
                </form>

            </div>
        </body>
        </html>
        `);

        res.end();
    }

    // Query String Handling
    else if (req.url.startsWith("/submit")) {

        const query = url.parse(req.url, true).query;

        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.write(`
        <html>
        <body style="text-align:center; font-family:Arial; margin-top:100px;">
            <h1>🎉 Form Submitted Successfully</h1>
            <h3>📌 Query String Format Used:</h3>
            <p><b>/submit?name=${query.name}&email=${query.email}&course=${query.course}</b></p>

            <h3>📄 Submitted Data:</h3>
            <p><b>Name:</b> ${query.name}</p>
            <p><b>Email:</b> ${query.email}</p>
            <p><b>Course:</b> ${query.course}</p>
        </body>
        </html>
        `);

        res.end();
    }

});

server.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000/");
});