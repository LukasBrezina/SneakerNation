/* const SneaksAPI = require('sneaks-api')
const sneaks = new SneaksAPI()

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
    let allShoes = [];
    const getProduct1 = new Promise(function(resolve,reject) {
        sneaks.getProducts("jordan", 1, function(err, products) {
            products = filterShoes(products);
            allShoes.push(products);
            resolve();
        });
      });
    const getProduct2 = new Promise(function(resolve,reject) {
        sneaks.getProducts("yeezy", 1, function(err, products) {
            products = filterShoes(products);
            allShoes.push(products)
            resolve();
        });
      });
    
    Promise.all([getProduct1, getProduct2])
        .then(function() {
            module.exports = JSON.parse(allShoes);
        }) */


        /* THIS IS COMMENTED,BECAUSE IT IS CAUSING PROBLEMS AND I DONT KNOW
            WHY. PLEASE FIX IF YOU CAN FIX IT THANK YOU */