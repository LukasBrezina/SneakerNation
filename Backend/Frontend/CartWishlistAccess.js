// method checks if token is invalid, if invalid catch and relocate to homepage

function verifyJWT() {

    const token = localStorage.getItem('token');

    fetch('/api/verify', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(response => response.json())
    .catch(error => {
      window.location.href = '/';
      console.error("Error:", error);
    });
  }


  window.onload = verifyJWT;