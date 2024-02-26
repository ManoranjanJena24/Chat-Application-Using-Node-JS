const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        // Read existing messages from file
        const existingMessages = fs.readFileSync('message.txt', 'utf8').split('\n').filter(msg => msg.trim() !== '');

        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body>');

        // Display only the latest message
        if (existingMessages.length > 0) {
            res.write(`<p>Latest Message: ${existingMessages[existingMessages.length - 1]}</p>`);
        }

        // Display the message input form
        res.write('<form action="/message" method="POST">');
        res.write('<input type="text" name="message">');
        res.write('<button type="submit">Send</button>');
        res.write('</form>');

        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const newMessage = parsedBody.split('=')[0]; // Extract the message from the form data

            // Append the new message to the file
            fs.appendFileSync('message.txt', `${newMessage}\n`);

            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    }

    // Handle other routes
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();

}

// module.exports = requestHandler; case1
// module.exports = {
//     handler: requestHandler,
//     someText: 'Some Hard Coded Text'

// };

// orr you can do like this

module.exports.handler = requestHandler;
module.exports.someText = 'Some Hard coded Text';