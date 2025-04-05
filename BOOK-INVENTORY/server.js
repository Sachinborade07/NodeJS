const http = require("http");
const { authors, genres, users, books, idCounters } = require("./data");

const parseBody = (req, callback) => {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => callback(JSON.parse(body || "{}")));
};

const server = http.createServer((req, res) => {
    const method = req.method;
    const urlParts = req.url.split("/").filter(Boolean);
    const route = urlParts[0];
    const id = parseInt(urlParts[1]);
    const contentType = { "Content-Type": "application/json" };

    // GET /books/details
    if (method === "GET" && req.url === "/books/details") {
        const result = books.map(book => ({
            id: book.id,
            title: book.title,
            author: authors.find(a => a.id === book.author_id)?.name || "Unknown",
            genre: genres.find(g => g.id === book.genre_id)?.name || "Unknown",
        }));
        res.writeHead(200, contentType);
        return res.end(JSON.stringify(result));
    }

    const tables = { authors, genres, users, books };
    const table = tables[route];

    if (!table) {
        res.writeHead(404, contentType);
        return res.end(JSON.stringify({ error: "Table not found" }));
    }

    if (method === "GET") {
        const data = id ? table.find(e => e.id === id) : table;
        if (!data) {
            res.writeHead(404, contentType);
            return res.end(JSON.stringify({ error: "Record not found" }));
        }
        res.writeHead(200, contentType);
        return res.end(JSON.stringify(data));
    }

    if (method === "POST") {
        parseBody(req, data => {
            data.id = idCounters[route]++;
            table.push(data);
            res.writeHead(201, contentType);
            res.end(JSON.stringify({ message: "Created", id: data.id }));
        });
    }

    else if (method === "PUT" && id) {
        parseBody(req, data => {
            const index = table.findIndex(e => e.id === id);
            if (index === -1) {
                res.writeHead(404, contentType);
                return res.end(JSON.stringify({ error: "Record not found" }));
            }
            table[index] = { ...table[index], ...data, id };
            res.writeHead(200, contentType);
            res.end(JSON.stringify({ message: "Updated" }));
        });
    }

    else if (method === "DELETE" && id) {
        const index = table.findIndex(e => e.id === id);
        if (index === -1) {
            res.writeHead(404, contentType);
            return res.end(JSON.stringify({ error: "Record not found" }));
        }
        table.splice(index, 1);
        res.writeHead(200, contentType);
        res.end(JSON.stringify({ message: "Deleted" }));
    }

    else {
        res.writeHead(400, contentType);
        res.end(JSON.stringify({ error: "Invalid request" }));
    }
});

server.listen(3000, () => {
    console.log("📚 API running at http://localhost:3000");
});
