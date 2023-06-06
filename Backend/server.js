

const express = require('express');
const path = require('path')
const app = express()
const SneaksAPI = require('sneaks-api')
const sneaks = new SneaksAPI()
const shoeModel  = require('./shoe-model.js')
const bodyParser = require("body-parser");
//SzauleLogin/server/backendLoginAdmin.js
const backendLoginAdmin = require('./backendLoginAdmin');

app.use(express.static(path.join(__dirname, 'Frontend')));

function filterShoes(shoes) {
    var filtered = shoes.map(function(item) {      
        return {
            shoeName: item.shoeName,
            brand: item.brand,
            // colorWay: item.colorWay,
            price: item.retailPrice,
            thumbnail: item.thumbnail,
            releaseDate: item.releaseDate
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

// 

app.listen(3000)
app.get('/all', function(req,res) {
    let allSneaker = []
    const getProduct1 = new Promise(function(resolve,reject) {
        sneaks.getProducts("jordan", 5, function(err, products) {
            products = filterShoes(products);
            allSneaker.push(products);
            resolve();
        });
     });

    const getProduct2 = new Promise(function(resolve,reject) {
        sneaks.getProducts("yeezy", 5, function(err, products) {
            products = filterShoes(products);
            allSneaker.push(products)
            resolve();
        });
      });
      const getProduct3 = new Promise(function(resolve,reject) {
        sneaks.getProducts("nike", 5, function(err, products) {
            products = filterShoes(products);
            allSneaker.push(products)
            resolve();
        });
      });
      const getProduct4 = new Promise(function(resolve,reject) {
        sneaks.getProducts("balance", 5, function(err, products) {
            products = filterShoes(products);
            allSneaker.push(products);
            resolve();
        })
      })

    Promise.all([getProduct1, getProduct2, getProduct3, getProduct4])
        .then(function() {
          res.send(allSneaker);
        }) 
        // res.send(shoeModel) <- look shoe-model.js for context
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


console.log("Server now listening on http://localhost:3000/")
