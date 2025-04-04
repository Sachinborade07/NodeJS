const http = require("http");

const users = [
    { id: 1, name: "Sachin " },
    { id: 2, name: "Bobby" },
    { id: 3, name: "Ram" },
];

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    if (method === "GET" && url === "/users") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
    }
    else if (method === "POST" && url === "/users") {
        let body = "";
        req.on("data", chunk => (body += chunk));
        req.on("end", () => {
            try {
                const newUser = JSON.parse(body);
                users.push(newUser);
                res.writeHead(201, { "Content-Type": "text/plain" });
                res.end("User Added");
            } catch (err) {
                res.writeHead(400, { "Content-Type": "text/plain" });
                res.end("INVALID");
            }
        });
    }
    else if (method === "DELETE" && url.startsWith("/users/")) {
        const id = parseInt(url.split("/")[2]);
        const index = users.findIndex(u => (u.id === id));
        if (index !== -1) {
            users.splice(index, 1);
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("User Deleted");
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("User Not Found");
        }
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

server.listen(3000, () => {
    console.log("API running at http://localhost:3000");
});