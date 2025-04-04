const http = require("http");
const fs = require("fs");
const url = require("url");


const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.method}: ${req.url} New Request Received \n`;
    // const myUrl = url.parse(req.url, true); // this line which will extract important information
    // console.log(myUrl);
    fs.appendFile("log.txt", log, (err, data) => {
        switch (req.url) {
            case '/':
                if (req.method === "GET") res.end("HOME PAGE");
                break;
            case '/about': res.end("ABOUT");
                break;
            case '/signup':
                if (req.method === "GET") res.end("This is signup FORM");
                else if (req.method === "POST") {
                    // DB query
                    res.end("SUCCESS");
                }
            default:
                res.end("404 PAGE NOT FOUND!");
        }
    });
});

myServer.listen(3000, () => console.log("server started"))

