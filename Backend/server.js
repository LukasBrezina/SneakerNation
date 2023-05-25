const express = require('express');
const app = express();
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

app.get('/', function(req,res) {
    sneaks.getProducts("Yeezy Cinder", 1, function(err, products) {
        res.send(products)
    })
})

app.listen(3000);
console.log("Server is running at http://localhost:3000");