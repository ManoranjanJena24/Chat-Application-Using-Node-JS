// const express = require('express');
// const router = express.Router();

// //admin/add-product =>GET
// router.get('/login', (req, res, next) => {
//     console.log("Middleware 1");
//     res.send('<form action="/" method="POST"><input type="text" name="username"><button type="submit">Login</button> </form>')

// })

// //admin/add-product =>POST
// router.post('/add-product', (req, res, next) => {
//     console.log(req.body);
//     res.redirect('/shop') //we are redirect to shop becoz it is our bydefault page for now is http://localhost:3000/shop

// })

// module.exports = router;





// const express = require('express');
// const router = express.Router();

// router.get('/login', (req, res, next) => {
//     res.send('<form action="/login" method="POST"><input type="text" name="username"><button type="submit">Login</button></form>');
// });

// router.post('/login', (req, res, next) => {
//     const username = req.body.username;

//     // Store the username in local storage
//     res.cookie('username', username); // Using cookie for simplicity, consider using a more secure solution in production

//     // Redirect to "/"
//     res.redirect('/');
// });

// module.exports = router;




const express = require('express');
const router = express.Router();

// Display the login form
router.get('/login', (req, res, next) => {
    res.send(`
        <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Enter your username">
            <button type="submit">Login</button>
        </form>
    `);
});

// Handle login form submission
router.post('/login', (req, res, next) => {
    const username = req.body.username;
    // Store the username in local storage (you can also use cookies)
    res.cookie('username', username);
    res.redirect('/');
});

module.exports = router;