const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // set header content type

    res.setHeader('content-Type', 'text/html');

    // res.write("<head><link rel='stylesheet' href='#'></head>")
    // res.write('<p> Hello, Bonheur</p>');
    // res.write("<p> Hello Again, Bonheur</p>");
    // res.end();

    let path = "./Views/";
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        // about-me it will direct me to about page
        case '/about-me':
            res.setHeader('location', '/about');
            res.end();
            res.statusCode = 301;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // send any html files
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.write(data);
            res.end();
        }
    })

});



server.listen(3000, 'localhost', () => {
    console.log('Listening for request on port 3000');
});