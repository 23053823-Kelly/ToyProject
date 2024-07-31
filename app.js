const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Create MySQL connection
const connection = mysql.createConnection({
    //host: 'localhost',
    //user: 'root',
    //password: '',
    //database: 'c237_toyapp'
    host:'sql.freedb.tech',
    user:'freedb_kelly',
    password:'9G6pk&mn!abKU4!',
    database:'freedb_Miniproject1'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Enable static files
app.use(express.static('public'));

// Enable form processing
app.use(bodyParser.urlencoded({ extended: false }));


// It helps to display all the toys
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM toys';
    // get the data from MySQL
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Database query error:", error.message);
            return res.status(500).send('Error retrieving toys');
        }
        // it connect to the index.ejs
        res.render('index', { toys: results });
    });
});

// It helps to  get a specific toy through the toy ID
app.get('/inventory/:id', (req, res) => {
    const toyId = req.params.id;
    const sql = 'SELECT * FROM toys WHERE toyid = ?';
    // get the data from MySQL
    connection.query(sql, [toyId], (error, results) => {
        if (error) {
            console.error("Database query error:", error.message);
            return res.status(500).send('Error retrieving toy');
        }
        if (results.length > 0) {
            // connect toyinfo.ejs to retrieve the toy data
            res.render('toyInfo', { toy: results[0] });
        } else {
            res.status(404).send("Toy not found");
        }
    });
});

// Add a new toy form
app.get('/addProductForm', (req, res) => {
    res.render('addToys');
});

// Add a new toy
app.post('/toys', upload.single('image'), (req, res) => {
    const { productName, quantity, price, agegroup, description } = req.body;
    let image;
    if (req.file) {
        image = req.file.filename; //it saves the file
    } else {
        image = null;
    }
    const sql = 'INSERT INTO toys (productName, quantity, price, agegroup, description, image) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [productName, quantity, price, agegroup, description, image], (error, results) => {
        if (error) {
            console.error("Error adding toy:", error.message);
            return res.status(500).send('Error adding toy');
        }
        res.redirect('/');
    });
});

// update page
app.get('/inventory/:id/update', (req, res) => {
    const toyId = req.params.id;
    const sql = 'SELECT * FROM toys WHERE toyid = ?';
    connection.query(sql, [toyId], (error, results) => {
        if (error) {
            console.error("Database query error:", error.message);
            return res.status(500).send('Error retrieving toy');
        }
        if (results.length > 0) {
            res.render('updateToy', { updateToy: results[0] });
        } else {
            res.status(404).send("Toy not found");
        }
    });
});

// Update a toy through ID -
app.post('/inventory/:id/update', upload.single('image'), (req, res) => {
    const toyId = req.params.id;
    const { productName, quantity, price, agegroup, description } = req.body;
    let image = req.body.currentImage;
    if (req.file) { // If new image is uploaded
        image = req.file.filename; // Set image to be new image filename
    }
    const sql = 'UPDATE toys SET productName = ?, quantity = ?, price = ?, agegroup = ?, description = ?, image = ? WHERE toyid = ?';
    connection.query(sql, [productName, quantity, price, agegroup, description, image, toyId], (error, results) => {
        if (error) {
            console.error("Error updating toy:", error.message);
            return res.status(500).send('Error updating toy');
        }
        res.redirect('/');
    });
});

// Delete a toy through toy ID
app.get('/inventory/:id/delete', (req, res) => {
    const toyId = req.params.id;
    const sql = 'DELETE FROM toys WHERE toyid = ?';
    connection.query(sql, [toyId], (error, results) => {
        if (error) {
            console.error("Error deleting toy:", error.message);
            return res.status(500).send('Error deleting toy');
        }
        res.redirect('/');
    });
});

// Contact page
app.get('/contact', (req, res) => {
    res.render('contact');
});

// it helps to handle the contact page submission
app.post('/submit', (req, res) => {
    const { name, email, phone, comments } = req.body;
    const sql = 'INSERT INTO contact (name, email, phone, comments) VALUES (?, ?, ?, ?)';
    
    connection.query(sql, [name, email, phone, comments], (error, results) => {
        if (error) {
            console.error("Error adding contact:", error.message);
            return res.status(500).send('Error adding contact');
        }
        res.redirect('/');
    });
});

// login page
app.get('/login', (req, res) => {
    res.render('login');
});

//handle the login page submission 
app.post('/login', (req, res) => {
    const { username,pswd} = req.body;
    const sql = 'INSERT INTO login (username,pswd) VALUES (?, ?)';
    
    connection.query(sql, [username,pswd], (error, results) => {
        if (error) {
            console.error("Error adding login information:", error.message);
            return res.status(500).send('Error adding login information');   
        }
        res.redirect('/');
        
    });
});

// search bar 
app.get('/search', (req, res) => {
    const searchQuery = req.query.search || '';
    const sql = 'SELECT * FROM toys WHERE productName LIKE ?';
    const searchValue = '%' + searchQuery + '%';

    connection.query(sql, [searchValue], (error, results) => {
        if (error) {
            console.error("Database query error:", error.message);
            return res.status(500).send('Error retrieving toys');
        }
        res.render('index', { toys: results, searchQuery: searchQuery });
    });
});

//cart page
app.get('/cart', (req, res) => {
    //to store the toy by using a list
    const cartItems = []; // Replace with actual logic to retrieve cart items
    res.render('cart', { cartItems });
});

// it helps to add item to cart
app.get('/cart/add/:toyid', (req, res) => {
    const toyId = req.params.toyid;
    const sql = 'SELECT * FROM toys WHERE toyid = ?';
    connection.query(sql, [toyId], (error, results) => {
        if (error) {
            console.error("Database query error:", error.message);
            return res.status(500).send('Error retrieving toy');
        }
        if (results.length > 0) {
            const toy = results[0];
            // connect to cart.ejs
            res.render('cart', { cartItems: [{ 
                toyid: toy.toyid,
                productName: toy.productName,
                image: toy.image,
                agegroup: toy.agegroup,
                quantity: 1, // to make it simple, the quantity will be set as 1
                price: toy.price
            }] });
        } else {
            res.status(404).send("Toy not found");
        }
    });
});


//checkout page
app.get('/checkout', (req, res) => {
    res.render('checkout'); 
});

//credict card page
app.get('/checkout/creditcard', (req, res) => {
    res.render('creditcard');
});

//bank account page
app.get('/checkout/bankaccount', (req, res) => {
    res.render('bankaccount');
});

//ceditcard proccess payment
app.post('/processCreditCardPayment', (req, res) => {
    const { name, email, cardNumber, expiration, cvv } = req.body;
    const sql = 'INSERT INTO creditcard (name, email, cardnumber, expiration, CVV) VALUES (?, ?, ?, ?, ?)';
    
    connection.query(sql, [name, email, cardNumber, expiration, cvv], (error, results) => {
        if (error) {
            console.error("Error adding credit card information:", error.message);
            return res.status(500).send('Error adding credit card information');
        }
        res.redirect('/');
    });
});

// Bank account proccess payment
app.post('/processBankAccountPayment', (req, res) => {
    const { name, email, bankAccountNumber, bankRoutingNumber } = req.body;
    const sql = 'INSERT INTO bankaccount (name, email, accountnumber, routingnumber) VALUES (?, ?, ?, ?)';
    
    connection.query(sql, [name, email, bankAccountNumber, bankRoutingNumber], (error, results) => {
        if (error) {
            console.error("Error adding bank account information:", error.message);
            return res.status(500).send('Error adding bank account information');
        }
        res.redirect('/');
    });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

