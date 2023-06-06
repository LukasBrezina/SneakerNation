const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
//SzauleLogin/server/backendLoginAdmin.js
const backendLoginAdmin = require('./backendLoginAdmin');

// Serve static files from the "files" folder
app.use(express.static(path.join(__dirname, 'files')));

// Handle GET request for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'files', 'index.html'));
});

// Body parser middleware
app.use(bodyParser.json());

// 
//SzauleLogin/server/backendLoginAdmin.jse
app.post('/api/login', backendLoginAdmin.handleLogin);
app.post('/api/register', backendLoginAdmin.handleRegistration);

const PORT = 3000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




