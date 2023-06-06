const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const fs = require('fs');
const storeUsersOnServer = 'users.json';

// Serve static files from the "files" folder
app.use(express.static(path.join(__dirname, 'files')));

// Handle GET request for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'files', 'index.html'));
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
    res.json({ success: true });
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

    res.json({ success: true, message: "User registration successful." });
    console.log(users);
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


// Export the functions
module.exports = {
  handleLogin,
  handleRegistration,
  loadUserData,
};
