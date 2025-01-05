const path = require('node:path');
const http = require('node:http');
const fs = require('node:fs');
const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();
const os = require('node:os');
const zlib = require('node:zlib');


const PORT1 = 3001;
const PORT2 = 3002;
const PORT3 = 3003;
const PORT4 = 3004;
const PORT5 = 3005;



console.log("Question 1:");
let server1 = http.createServer((req, res, next) => {
    const { url, method } = req;
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
        return body;
    });

    // Task 1.1
    if (url == "/path-info" && method == "POST") {
        req.on('end', () => {
            const { filepath } = JSON.parse(body);
            const parsedPath = path.parse(filepath);

            res.writeHead(200, { 'Content-Type': 'application/json' });

            res.end(JSON.stringify({ parsedPath, formattedPath: filepath }))
        })
    // Task 1.2
    } else if (url == "/path-check" && method == "POST") {
        req.on('end', () => {
            const { filepath } = JSON.parse(body);
            const isAbsolute = path.isAbsolute(filepath);
            const basename = path.basename(filepath);
            const extname = path.extname(filepath);
            const joinedPath = path.join(__dirname, filepath);
            const resolvedPath = path.resolve(filepath);
            let absolutePath;

            if (isAbsolute == true) {
                absolutePath = filepath;
            } else {
                absolutePath = path.join(__dirname, filepath)
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });

            res.end(JSON.stringify({
                isAbsolute,
                basename,
                extname,
                joinedPath,
                resolvedPath,
            }));
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'End-Point not found' }));
    }
})


server1.listen(3000, () => {
    console.log(`Server 1 running on port: ${PORT1}`);
});


console.log("----------------------------------------------------------------");
console.log("Question 2:");
eventEmitter.on('createFile', (fileName) => {
    console.log(`Event emitted: file created for ${fileName}`);
});
eventEmitter.on('readFile', (fileName) => {
    console.log(`Event emitted: file read for ${fileName}`);
});
eventEmitter.on('deleteFile', (fileName) => {
    console.log(`Event emitted: file deleted for ${fileName}`);
});

let server2 = http.createServer((req, res, next) => {
    const { url, method } = req;
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
        return body;
    });

    req.on('end', () => {
        if (url == '/create-file' && method == 'POST') {
            const { fileName, content } = JSON.parse(body);
            const filePath = path.join(__dirname, fileName);

            fs.writeFile(filePath, content, (error) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'File creation failed' }));
                } else {
                    eventEmitter.emit('createFile', fileName);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: `File ${fileName} created successfully` }));
                }

            });

        } else if (url == '/read-file' && method == 'GET') {
            const { fileName } = JSON.parse(body);
            const filePath = path.join(__dirname, fileName);

            fs.readFile(filePath, 'utf8', (error, data) => {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'File not found' }));
                } else {
                    eventEmitter.emit('readFile', fileName);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: `File ${fileName} read successfully`, content: data }));
                }
            });

        } else if (url == '/delete-file' && method == 'DELETE') {
            const { fileName } = JSON.parse(body);
            const filePath = path.join(__dirname, fileName);

            fs.unlink(filePath, (error) => {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'File not found or deletion failed' }));
                } else {
                    eventEmitter.emit('deleteFile', fileName);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: `File ${fileName} deleted successfully` }));
                }

            });

        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'End-Point not found' }));
        }
    });
});

server2.listen(PORT2, () => {
    console.log(`Server 2 running on port: ${PORT2}`);
});

console.log("----------------------------------------------------------------");

console.log("Question 3:");
let server3 = http.createServer((req, res, next) => {
    const { url, method } = req;

    if (url == "/system-info" && method == "GET") {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            architecture: os.arch(),
            platform: os.platform(),
            freeMemory: os.freemem(),
            totalMemory: os.totalmem()
        }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'End-Point not found' }));
    }
});

server3.listen(PORT3, () => {
    console.log(`Server 3 running on port: ${PORT3}`);
});

console.log("----------------------------------------------------------------");

console.log("Question 4:");

let server4 = http.createServer((req, res, next) => {
    const { url, method } = req;
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
        return body;
    });

    req.on('end', () => {
        // Task 4.1 
        if (url == '/create-file' && method == 'POST') {
            const { fileName, content } = JSON.parse(body);
            const filePath = path.join(__dirname, fileName);

            fs.writeFile(filePath, content, (error) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'File creation failed' }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: `File ${fileName} created successfully` }));
                }
            });

        } else if (url == '/read-file' && method == 'GET') {
            const { fileName } = JSON.parse(body);
            const filePath = path.join(__dirname, fileName);

            fs.readFile(filePath, 'utf8', (error, data) => {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'File not found' }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: `File ${fileName} read successfully`, content: data }));
                }
            });

        } else if (url == '/delete-file' && method == 'DELETE') {
            const { fileName } = JSON.parse(body);
            const filePath = path.join(__dirname, fileName);

            fs.unlink(filePath, (error) => {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'File not found or deletion failed' }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: `File ${fileName} deleted successfully` }));
                }
            });
        // Task 4.2 
        } else if (url == '/append-async' && method == 'POST') {
            const { fileName, content } = JSON.parse(body);
            const filePath = path.resolve(__dirname, fileName);

            fs.appendFile(filePath, content, (error) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Failed to append content to file' }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: `Content appended to ${fileName} successfully` }));
                }
            });

        } else if (url == '/read-async' && method == 'POST') {
            const { fileName } = JSON.parse(body);
            const filePath = path.resolve(__dirname, fileName);

            fs.readFile(filePath, 'utf8', (error, data) => {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'File not found' }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: `File ${fileName} read successfully`, content: data }));
                }
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'End-Point not found' }));
        }
    });
});

server4.listen(PORT4, () => {
    console.log(`Server 4 running on port: ${PORT4}`);
});


console.log("----------------------------------------------------------------");


console.log("Question 5:");
let server5 = http.createServer((req, res, next) => {
    const { url, method } = req;
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
        return body;
    });

    // Task 5.1
    if (url == '/stream-file' && method == 'POST') {
        req.on('end', () => {
            const { fileName } = JSON.parse(body);
            const filePath = path.join(__dirname, fileName);
            const readStream = fs.createReadStream(filePath, { highWaterMark: 16 });
            readStream.on('open', () => {
                console.log('Stream opened');
            });

            readStream.on('data', (chunk) => {
                console.log(`Data event received: ${chunk}`);
            });

            readStream.on('end', () => {
                console.log('Stream ended');
            });

            readStream.on('error', (error) => {
                console.error('Error reading file:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'File stream error' }));
            });

            res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
            readStream.pipe(res);
            readStream.on('end', () => {
                res.end();
            });
        });
    // Task 5.2
    } else if (url == '/copy-file' && method == 'POST') {
        req.on('end', () => {
            const { sourceFile, destinationFile } = JSON.parse(body);

            const sourcePath = path.join(__dirname, sourceFile);
            const destinationPath = path.join(__dirname, destinationFile);

            const readStream = fs.createReadStream(sourcePath);
            const writeStream = fs.createWriteStream(destinationPath);

            readStream.on('error', (error) => {
                
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error reading source file' }));
            });

            writeStream.on('error', (error) => {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error writing to destination file' }));
            });

            readStream.pipe(writeStream);

            writeStream.on('finish', () => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'File copied successfully' }));
            });
        });
    // Task 5.3    
    } else if (url == '/compress-file' && method == 'POST') {
        req.on('end', () => {
            const { fileName } = JSON.parse(body);
            const filePath = path.join(__dirname, fileName);
            const gzip = zlib.createGzip(); 
            const inputStream = fs.createReadStream(filePath);
            const outputStream = fs.createWriteStream(`${fileName}.gz`); 

            inputStream.on('error', (error) => {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error reading file' }));
            });

            outputStream.on('error', (error) => {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error writing compressed file' }));
            });

            inputStream.pipe(gzip).pipe(outputStream);

            outputStream.on('finish', () => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'File compressed successfully' }));
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'End-Point not found' }));
    }
});

server5.listen(PORT5, () => {
    console.log(`Server 5 running on port: ${PORT5}`);
});

console.log("----------------------------------------------------------------");


