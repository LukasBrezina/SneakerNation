const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const fs = require('fs');
const jwt = require('jsonwebtoken');

// generate random hash for jwt
const crypto = require('crypto');

function generateSecretKey(length) {
  return crypto.randomBytes(length).toString('hex');
}
const secret = generateSecretKey(32);

const storeUsersOnServer = 'users.json';

// Serve static files
app.use(express.static(path.join(__dirname, 'Frontend')));

// Handle GET request for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
});

// Body parser middleware
app.use(bodyParser.json());

// User data structure for login validation
let users = [];
loadUserData();

// Login handler
function handleLogin(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    // Successful login
    const token = jwt.sign({ username: user.username }, secret, { expiresIn: '336h' }); // Creates a token that expires in 2 weeks
    res.json({ success: true, token: token});
  } else {
    // Invalid login
    res.status(401).json({ success: false, message: "Invalid username or password." });
  }
}

// Register handler
function handleRegistration(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // Check if the username is already taken
  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    // Username is already taken
    res.status(409).json({ success: false, message: "Username is already taken." });
  } else {
    // Create a new user account
    const newUser = { username: username, password: password };
    users.push(newUser);

    saveUserData(); // Save user data immediately after registration
    const token = jwt.sign({ username: newUser.username }, secret, { expiresIn: '336h' }); // Creates a token that expires in 2 weeks
    res.json({ success: true, message: "User registration successful.", token:token });
  }
}

// Save user data to the external file
function saveUserData() {
  const data = JSON.stringify(users, null, 2);
  fs.writeFile(storeUsersOnServer, data, 'utf8', (err) => {
    if (err) {
      console.error('Error saving user data:', err);
    } else {
      console.log('User data saved successfully.');
    }
  });
}



// Load user data from the external file
function loadUserData() {
  
  fs.readFile(storeUsersOnServer, 'utf8', (err, data) => {
    if (err) {
      console.error('Error loading user data:', err);
      return;
    }

    try {
      users = JSON.parse(data);
      console.log('User data loaded successfully.');
    } catch (err) {
      console.error('Error parsing user data:', err);
    } //finally{fs.close();}
  });
}

// get wishlist for a user
function getWishlist(req,res) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  let username;

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    username = user.username;
  });
  
  const user = users.find((user) => user.username === username);

  if (user) {
    res.json({ success: true, wishlist: user.wishlist });
  } else {
    
    res.status(404).json({ success: false, message: "User not found." });
  }
}

// same as getWishlist but with shopping cart
function getShoppingCart(req,res) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  let username;

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    username = user.username;
  });
  
  const user = users.find((user) => user.username === username);

  if (user) {
    res.json({ success: true, shoppingCart: user.shoppingCart });
  } else {
   
    res.status(404).json({ success: false, message: "User not found." });
  }
}

// add a shoe to the shopping cart
function addItemShoppingCart(req,res) {
  const token = req.body.token;
  const shoppingCart = req.body.shoppingCart;
  let username;

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    username = user.username;
  });

  const user = users.find((user) => user.username === username);

  if (user) {

    user.shoppingCart = shoppingCart;
    saveUserData();
    res.json({ success: true, message: "Shopping cart updated successfully." });
  } else {

    res.status(404).json({ success: false, message: "User not found." });
  }
}

// add a shoe to the wishlist
function addItemWishlist(req,res) {
  try {
    const token = req.body.token;
    const wishlist = req.body.wishlist;
    let username;
  
    if (token == null) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      username = user.username;
    });

    const user = users.find((user) => user.username === username);
    if (user) {
      user.wishlist = wishlist;
      saveUserData();
      res.json({ success: true, message: "Wishlist updated successfully." });
    } else {
      res.status(404).json({ success: false, message: "User not found." });
    } 
  } catch (err) {
    console.log(err);
  }
}

// delete shoe from wishlist
function deleteItemWishlist(req,res) {
  const token = req.body.token;
  const itemName = req.body.name;
  let username;

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    username = user.username;
  });

  
  const user = users.find((user) => user.username === username);

  if (user) {
    const index = user.wishlist.findIndex((item) => item.name === itemName);
    if (index !== -1) {
      user.wishlist.splice(index, 1);
      saveUserData();
      res.json({ success: true, message: "Item removed from wishlist." });

    } else {  
      res.status(404).json({ success: false, message: "Item not found in wishlist." });

    }
  } else {
    res.status(404).json({ success: false, message: "User not found." });
  }
}

// delete shoe from shopping cart
function deleteItemShoppingCart(req,res) {
  const token = req.body.token;
  const itemName = req.body.name;
  let username;

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    username = user.username;
  });

  const user = users.find((user) => user.username === username);

  if (user) {

    const item = user.shoppingCart.find((item) => item.name === itemName);

    if (item) {
      // if more than one of this item is in shopping cart, decrease count
      if (item.count > 1) {
        item.count--;
        res.json({ success: true, message: "Item count decreased by one." });
      } else {
        // only one pair of this shoe -> delete it
        const index = user.shoppingCart.findIndex((item) => item.name === itemName);
        user.shoppingCart.splice(index, 1);
        res.json({ success: true, message: "Item removed from shopping cart." });
      }
      saveUserData();
    } else {
      res.status(404).json({ success: false, message: "Item not found in shopping cart." });
    }
  } else {
    res.status(404).json({ success: false, message: "User not found." });
  }
}

// Export the functions
module.exports = {
  getShoppingCart,
  deleteItemWishlist,
  addItemWishlist,
  addItemShoppingCart,
  deleteItemShoppingCart,
  getWishlist,
  handleLogin,
  handleRegistration,
  loadUserData,
  secret
};
