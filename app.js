const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 3000;;

const server = http.createServer((req, res) => {

    let filePath;

    if (req.url === '/') {
        filePath = 'index.html';
    } else {
        filePath = '.' + req.url;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Error: File not found');
            return;
        }

        let contentType = 'text/html';

        if(req.url.endsWith('style.css')) {
            contentType = 'text/css';
        }

        if(req.url.endsWith('script.js')) {
            contentType = 'text/javascript';
        }

        res.writeHead(200, { 
            'Content-Type': contentType 
        });

        res.end(data);

    });
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}/`);
});
