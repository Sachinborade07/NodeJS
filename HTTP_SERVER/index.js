const http = require("http");
const fs = require("fs");
const url = require("url");


const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url} New Request Received \n`;
    const myUrl = url.parse(req.url, true); // this line which will extract important information
    console.log(myUrl);
    fs.appendFile("log.txt", log, (err, data) => {
        switch (req.url) {
            case '/': res.end("HOME");
                break
            case '/about': res.end("ABOUT");
                break
            default:
                res.end("404 PAGE NOT FOUND!");
        }
    });
});

myServer.listen(3000, () => console.log("server started"))

