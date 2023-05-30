const express = require('express');
const path = require('path')
const app = express()
const SneaksAPI = require('sneaks-api')
const sneaks = new SneaksAPI()
const shoeModel  = require('./shoe-model.js')

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
    sneaks.getMostPopular(5, function(err,products) {
        products = filterShoes(products);
        res.send(products);
    })
})

console.log("Server now listening on http://localhost:3000/")