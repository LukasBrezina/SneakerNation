const express = require('express');
const path = require('path')
const app = express()
const SneaksAPI = require('sneaks-api')
const sneaks = new SneaksAPI()

app.use(express.static(path.join(__dirname, 'Frontend')));

function filterShoes(shoes) {
    var filtered = shoes.map(function(item) {      
        return {
            shoeName: item.shoeName,
            brand: item.brand,
            colorWay: item.colorWay,
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
        sneaks.getProducts("jordan", 1, function(err, products) {
            products = filterShoes(products);
            allSneaker.push(products);
            resolve();
        });
      });
    const getProduct2 = new Promise(function(resolve,reject) {
        sneaks.getProducts("yeezy", 1, function(err, products) {
            products = filterShoes(products);
            allSneaker.push(products)
            resolve();
        });
      });
    
    Promise.all([getProduct1, getProduct2])
        .then(function() {
          res.send(allSneaker);
        })
    });
    
app.get('/brand/:input', function(req,res) {
    const brand = req.params.input;
    sneaks.getProducts(brand, 5, function(err,products) {
        products = filterShoes(products);
            res.send(products)
    });
})

console.log("Server now listening on http://localhost:3000/")