const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World\n");
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});


/* 
Theory:

http.createServer():->  creates a basic HTTP server.

res.writeHead():->  sets the response status and headers.

res.end():-> sends the response body.

server.listen() listens on port 3000.
*/