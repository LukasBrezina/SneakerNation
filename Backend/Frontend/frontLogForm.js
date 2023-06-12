// Form submission event handler
document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (event.submitter.id === "registerButton") {
      // Register button clicked
      registerUser(username, password);
    } else if (event.submitter.id === "loginButton") {
      // Login button clicked
      loginUser(username, password);
    }
  });
  
  // Register user function
function registerUser(username, password) {
  // Send a POST request to the backend register endpoint
  fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert("User registration successful!");
      clearForm();
      // Redirect to postalEtiquette.html


      window.top.location.href = "postalEtiquette.html";
    } else {
      alert("User registration failed: " + data.message);
    }
  })
  .catch(error => {
    console.error("Error:", error);
  });
}








  // Login user function
  function loginUser(username, password) {
    // Send a POST request to the backend login endpoint
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("Login successful!");
        clearForm();
      } else {
        alert("Login failed: " + data.message);
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }
  
  // Clear form function
  function clearForm() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }
  