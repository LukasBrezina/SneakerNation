
const express = require('express');
const path = require('path')
const app = express()
const SneaksAPI = require('sneaks-api')
const sneaks = new SneaksAPI()
const bodyParser = require("body-parser");
//SzauleLogin/server/backendLoginAdmin.js
const backendLoginAdmin = require('./backendLoginAdmin');
const jwt = require('jsonwebtoken');
const https = require("https")

app.use(express.static(path.join(__dirname, 'Frontend')));

function filterShoes(shoes) {
    var filtered = shoes.map(function(item) {      
        return {
            shoeName: item.shoeName,
            brand: item.brand,
            // colorWay: item.colorWay,
            price: item.retailPrice,
            thumbnail: item.thumbnail,
            releaseDate: item.releaseDate,
            id: item._id
        }
    })
    return filtered;
}
// Handle GET request for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
});

// Body parser middleware
app.use(bodyParser.json());


app.listen(3000);

app.get('/all', function(req,res) {
    let allSneaker = []
    const getProduct1 = new Promise(function(resolve,reject) {
        sneaks.getProducts("jordan", 6, function(err, products) {
            products = filterShoes(products);
            allSneaker.push(products);
            resolve();
        });
     });

    const getProduct2 = new Promise(function(resolve,reject) {
        sneaks.getProducts("yeezy", 6, function(err, products) {
            products = filterShoes(products);
            allSneaker.push(products)
            resolve();
        });
      });
      const getProduct3 = new Promise(function(resolve,reject) {
        sneaks.getProducts("nike", 6, function(err, products) {
            products = filterShoes(products);
            allSneaker.push(products)
            resolve();
        });
      });
      const getProduct4 = new Promise(function(resolve,reject) {
        sneaks.getProducts("balance", 6, function(err, products) {
            products = filterShoes(products);
            allSneaker.push(products);
            resolve();
        })
      })

    Promise.all([getProduct1, getProduct2, getProduct3, getProduct4])
        .then(function() {
          res.send(allSneaker);
        }) 
    });

app.get('/brand/:input', function(req,res) {
    const brand = req.params.input;
    sneaks.getProducts(brand, 6, function(err,products) {
        products = filterShoes(products);
        res.send(products)
    });
})

app.get('/trends', function(req,res) {
    sneaks.getMostPopular(6, function(err,products) {
        products = filterShoes(products);
        res.send(products);
    })
})

//SzauleLogin/server/backendLoginAdmin.jse
app.post('/api/login', backendLoginAdmin.handleLogin);
app.post('/api/register', backendLoginAdmin.handleRegistration);

app.get('/api/verify', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, backendLoginAdmin.secret, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
  
      res.json({ success: true, user: user });
    });
  });

 // Endpoints for Wishlist and Shopping Cart

 // Store wishlist of each user
app.put('/api/addWishlist', backendLoginAdmin.addItemWishlist);

// Store shopping cart of each user
app.put('/api/addShoppingCart', backendLoginAdmin.addItemShoppingCart);

// Delete item from wishlist
app.delete('/api/deleteWishlist', backendLoginAdmin.deleteItemWishlist);

// Delete item from shopping cart
app.delete('/api/deleteShoppingCart', backendLoginAdmin.deleteItemShoppingCart);

// Get shopping cart of specific user
app.get('/api/getShoppingCart', backendLoginAdmin.getShoppingCart);

// Get wishlist of specific user
app.get('/api/getWishlist', backendLoginAdmin.getWishlist);

// to change currency
app.patch('/api/updateCurrency', (req, res) => {
  const newCurrency = req.body.currency;
  currentCurrency = newCurrency;
  res.sendStatus(200); 
});


app.get(`/convert-currency`, (req, res) => {
    const want = req.query.want;
    const have = req.query.have;
    const amount = parseInt(req.query.amount);
    const apiKey = 'LtYAZInNgi2eC5RFpebm+w==gPR4PFFxS324RCW5';

    const apiUrl = `https://api.api-ninjas.com/v1/convertcurrency?want=${want}&have=${have}&amount=${amount}`;

    const options = {
        headers: {
            'X-Api-Key': apiKey
        }
    };

    const request = https.get(apiUrl, options, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                const convertedCurrency = parseInt(parsedData.new_amount);
                res.send({ price: convertedCurrency });
            } catch (error) {
                console.error('Parsing response failed:', error);
                res.status(500).send('An error occurred');
            }
        });
    });

    request.on('error', (error) => {
        console.error('Request failed:', error);
        res.status(500).send('An error occurred');
    });
});

console.log("Server now listening on http://localhost:3000/")
