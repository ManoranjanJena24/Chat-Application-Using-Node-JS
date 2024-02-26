// const express = require('express')
// const app = express()
// const loginRoute = require("./routes/login")
// app.use(loginRoute)
// app.post('/', function (req, res) {
//     console.log("Inside Message")
//     res.send('<form action="/test" method="GET"><input type="text" name="message"><button type="submit">Send</button> </form>')

// })


// app.get('/test', function (req, res) {
//     console.log("Inside test Message")
//     // res.send('<form action="/test" method="POST"><input type="text" name="message"><button type="submit">Send</button> </form>')

// })




// app.listen(3000)










// const express = require('express');
// const app = express();
// const loginRoute = require("./routes/login");
// const fs = require('fs');
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());

// app.use(express.urlencoded({ extended: true }));
// app.use(loginRoute);

// app.get('/', (req, res) => {
//     const username = req.cookies.username;

//     // Show the send message form
//     res.send(`<form action="/send-message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>`);
// });

// app.post('/send-message', (req, res) => {
//     const username = req.cookies.username;
//     const message = req.body.message;

//     // Store the message in a file
//     const data = `${username}: ${message}\n`;
//     fs.appendFile('messages.txt', data, (err) => {
//         if (err) throw err;
//         console.log('Message saved to file');
//     });

//     res.send('Message sent successfully');
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });



const express = require('express');
const app = express();
const loginRoute = require("./routes/login");
const fs = require('fs');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(loginRoute);

// Display the message input form and messages
app.get('/', (req, res) => {
    const username = req.cookies.username;
    const messages = fs.readFileSync('messages.txt', 'utf8');
    const messageList = messages.split('\n').filter(Boolean); // Remove empty lines
    res.send(`
        <h1>Welcome, ${username}!</h1>
        <form action="/" method="POST">
            <input type="text" name="message" placeholder="Enter your message">
            <button type="submit">Send</button>
        </form>
        <h2>Messages:</h2>
        <ul>
            ${messageList.map(msg => `<li>${msg}</li>`).join('')}
        </ul>
    `);
});

// Save messages to the file
app.post('/', (req, res) => {
    const username = req.cookies.username;
    const message = req.body.message;
    const data = `${ username }: ${ message }\n`;
    fs.appendFile('messages.txt', data, (err) => {
        if (err) throw err;
        console.log('Message saved to file');
        // Redirecting is not needed; just display the updated messages
        const updatedMessages = fs.readFileSync('messages.txt', 'utf8');
        const updatedMessageList = updatedMessages.split('\n').filter(Boolean);
        res.send(`
            <h1>Welcome, ${username}!</h1>
            <form action="/" method="POST">
                <input type="text" name="message" placeholder="Enter your message">
                <button type="submit">Send</button>
            </form>
            <h2>Messages:</h2>
            <ul>
                ${updatedMessageList.map(msg => `<li>${msg}</li>`).join('')}
            </ul>
        `);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});