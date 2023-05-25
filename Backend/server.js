const express = require('express');
const path = require('path')
const app = express()
const SneaksAPI = require("sneaks-api")
const sneaks = new SneaksAPI()

app.use(express.static(path.join(__dirname, 'Frontend')));

app.listen(3000)

app.get('/allShoes', function(req,res) {
    res.send("These are all shoes")
})

console.log("Server now listening on http://localhost:3000/")

