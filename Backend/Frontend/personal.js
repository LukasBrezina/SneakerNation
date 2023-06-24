
// add to Cart function
export function addToCart(event) {
  const shoeName = event.target.closest('.shoe').querySelector('.shoe-name').textContent;
  const pElement = event.target.closest('.shoe').querySelector('.shoe-p').textContent;
  const img = event.target.closest('.shoe').querySelector('.shoe-img').getAttribute("src");
  const token = localStorage.getItem('token');

 
  const priceRegex = /Price: (\d+)/;
  const priceMatch = pElement.match(priceRegex);
  const price = priceMatch ? parseInt(priceMatch[1]) : 0;

 
  let cart = localStorage.getItem('cart');

  if (cart) {
    
    cart = JSON.parse(cart);
  } else {

    cart = [];
  }

  const existingShoe = cart.find(item => item.name === shoeName);

  if (existingShoe) {

    existingShoe.count++;
    updateShoppingCart(token, cart)

  } else {
    cart.push({ name: shoeName, price: price, count: 1, image: img });
    updateShoppingCart(token, cart)
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}


// add to WL function
export function addToWL(event) {
  const shoeName = event.target.closest('.shoe').querySelector('.shoe-name').textContent;
  const pElement = event.target.closest('.shoe').querySelector('.shoe-p').textContent;
  const img = event.target.closest('.shoe').querySelector('.shoe-img').getAttribute("src");

  const priceRegex = /Price: (\d+)/;
  const priceMatch = pElement.match(priceRegex);
  const price = priceMatch ? parseInt(priceMatch[1]) : 0;

  let wishlist = localStorage.getItem('wishlist');

  if (wishlist && wishlist !== "undefined") {
    wishlist = JSON.parse(wishlist);
  } else {
    wishlist = [];
  }

  const existingShoe = wishlist.find(item => item.name === shoeName);


  if (existingShoe) {
  } else {
    wishlist.push({ name: shoeName, price: price, image: img});
  }
  updateWishlist("fill", wishlist);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// update shopping cart when change is made
function updateShoppingCart(username, shoppingCart) {
  const token = localStorage.getItem('token');
  fetch('/api/addShoppingCart', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token,
      shoppingCart: shoppingCart
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Shopping cart updated successfully.');
    } else {
      console.log('User not found.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// updates wishlist when change is made
function updateWishlist(username, wishlist) {
  const token = localStorage.getItem('token');
  fetch('/api/addWishlist', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token,
      wishlist: wishlist
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Wishlist updated successfully.');
    } else {
      console.log('User not found.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}