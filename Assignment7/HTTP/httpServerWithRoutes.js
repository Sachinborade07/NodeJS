import http from 'http';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');

    switch (req.url) {
        case '/home':
            res.statusCode = 200;
            res.end('Home Page');
            break;

        case '/about':
            res.statusCode = 200;
            res.end('About Page');
            break;

        default:
            res.statusCode = 404;
            res.end('404 Page Not Found');
            break;
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
