const http = require("http");

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    if (method === "GET" && url === "/users") {
        const options = {
            hostname: "jsonplaceholder.typicode.com",
            path: "/users/1",
            method: "GET"
        };

        const externalReq = http.request(options, externalReq => {
            let data = "";

            externalReq.on("data", chunk => (data += chunk));
            externalReq.on("end", () => {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(data); //send the fetched data to client 
            });
        });

        externalReq.on("error", error => {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Failed to Fetch Data");
        });
        externalReq.end();
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("NOT FOUND");
    }

});

server.listen(3000, () => {
    console.log("Server is Runnng");
})