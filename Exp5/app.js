const http = require('http');
const url = require('url');

const restaurants = [
    { name: "Pizza Palace", items: ["Margherita", "Veg Supreme", "Cheese Burst"] },
    { name: "Burger Hub", items: ["Veg Burger", "Cheese Burger", "Chicken Burger"] },
    { name: "Biryani House", items: ["Veg Biryani", "Chicken Biryani", "Mutton Biryani"] }
];

const server = http.createServer((req, res) => {

    // 🌐 HOME PAGE
    if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        let cards = restaurants.map(r => `
            <div class="card">
                <h2>${r.name}</h2>
                <p>Delicious food available</p>
                <a href="/menu?name=${r.name}">View Menu</a>
            </div>
        `).join("");

        res.write(`
        <html>
        <head>
            <title>Food Delivery</title>
            <style>
                body {
                    margin: 0;
                    font-family: 'Segoe UI', sans-serif;
                    background: linear-gradient(135deg, #1e3c72, #2a5298);
                    color: #fff;
                }

                h1 {
                    text-align: center;
                    padding: 20px;
                    font-size: 36px;
                }

                .container {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    padding: 20px;
                }

                .card {
                    background: #ffffff;
                    color: #333;
                    width: 260px;
                    margin: 15px;
                    padding: 25px;
                    border-radius: 15px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                    text-align: center;
                    transition: 0.3s;
                }

                .card:hover {
                    transform: translateY(-10px) scale(1.05);
                    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
                }

                a {
                    display: inline-block;
                    margin-top: 10px;
                    padding: 10px 18px;
                    background: linear-gradient(135deg, #4facfe, #00f2fe);
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: bold;
                    transition: 0.3s;
                }

                a:hover {
                    transform: scale(1.1);
                }
            </style>
        </head>

        <body>
            <h1>Food Delivery System</h1>
            <div class="container">
                ${cards}
            </div>
        </body>
        </html>
        `);

        res.end();
    }

    // 🍽 MENU PAGE
    else if (req.url.startsWith("/menu")) {

        const query = url.parse(req.url, true).query;
        const restaurant = restaurants.find(r => r.name === query.name);

        let items = restaurant.items.map(item => `
            <li>
                ${item}
                <a href="/order?item=${item}&restaurant=${restaurant.name}">Order</a>
            </li>
        `).join("");

        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.write(`
        <html>
        <head>
            <title>Menu</title>
            <style>
                body {
                    font-family: 'Segoe UI';
                    background: #f5f7fa;
                    text-align: center;
                }

                h2 {
                    margin-top: 20px;
                    color: #333;
                }

                ul {
                    list-style: none;
                    padding: 0;
                }

                li {
                    background: white;
                    margin: 12px auto;
                    width: 320px;
                    padding: 15px;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                a {
                    text-decoration: none;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    padding: 6px 12px;
                    border-radius: 6px;
                }

                a:hover {
                    transform: scale(1.1);
                }
            </style>
        </head>

        <body>
            <h2>${restaurant.name} Menu</h2>
            <ul>
                ${items}
            </ul>
        </body>
        </html>
        `);

        res.end();
    }

    // 🛒 ORDER PAGE
    else if (req.url.startsWith("/order")) {

        const query = url.parse(req.url, true).query;

        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.write(`
        <html>
        <head>
            <title>Order</title>
            <style>
                body {
                    font-family: 'Segoe UI';
                    background: linear-gradient(135deg, #43cea2, #185a9d);
                    text-align: center;
                    color: white;
                }

                .box {
                    background: white;
                    color: black;
                    width: 420px;
                    margin: 120px auto;
                    padding: 40px;
                    border-radius: 15px;
                    box-shadow: 0 15px 30px rgba(0,0,0,0.3);
                }

                h2 {
                    color: #4caf50;
                }

                a {
                    display: inline-block;
                    margin-top: 15px;
                    padding: 10px 20px;
                    background: #1e3c72;
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                }
            </style>
        </head>

        <body>
            <div class="box">
                <h2>Order Confirmed</h2>
                <p><b>Restaurant:</b> ${query.restaurant}</p>
                <p><b>Item:</b> ${query.item}</p>
                <p>Thank you for ordering!</p>
                <a href="/">Back to Home</a>
            </div>
        </body>
        </html>
        `);

        res.end();
    }

});

server.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000/");
});