const http = require('http');
const url = require('url');

const USER = {
    username: "admin",
    password: "1234"
};

const server = http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;

    if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
        <html>
        <head>
            <title>Login</title>
            <style>
                body {
                    margin: 0;
                    font-family: 'Segoe UI', sans-serif;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .card {
                    background: white;
                    padding: 70px;
                    border-radius: 25px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
                    text-align: center;
                    width: 500px;   /* 🔥 increased */
                    animation: fadeIn 1s ease-in-out;
                }

                h1 {
                    margin-bottom: 30px;
                    color: #333;
                    letter-spacing: 3px;
                    font-size: 32px;  /* 🔥 bigger */
                }

                input {
                    width: 100%;
                    padding: 15px;
                    margin: 15px 0;
                    border: 1px solid #ccc;
                    border-radius: 12px;
                    font-size: 18px;  /* 🔥 bigger */
                    transition: 0.3s;
                }

                input:focus {
                    border-color: #667eea;
                    box-shadow: 0 0 12px #667eea;
                    outline: none;
                }

                button {
                    margin-top: 20px;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 12px;
                    font-size: 18px;  /* 🔥 bigger */
                    cursor: pointer;
                    transition: 0.3s;
                }

                button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>
        </head>

        <body>
            <div class="card">
                <h1>LOGIN SYSTEM</h1>
                <form action="/login" method="GET">
                    <input type="text" name="username" placeholder="Enter Username" required>
                    <input type="password" name="password" placeholder="Enter Password" required>
                    <button type="submit">Login</button>
                </form>
            </div>
        </body>
        </html>
        `);
        res.end();
    }

    else if (req.url.startsWith("/login")) {
        const username = query.username;
        const password = query.password;

        res.writeHead(200, { 'Content-Type': 'text/html' });

        if (username === USER.username && password === USER.password) {
            res.write(`
            <h1 style="color:green; text-align:center; margin-top:120px; font-size:40px;">
                🎉 Login Successful
            </h1>
            `);
        } else {
            res.write(`
            <h1 style="color:red; text-align:center; margin-top:120px; font-size:40px;">
                ❌ Invalid Credentials
            </h1>
            `);
        }

        res.end();
    }

}).listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000/");
});