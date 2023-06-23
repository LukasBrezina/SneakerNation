function verifyJWT() {

    const token = localStorage.getItem('token');

    fetch('/api/verify', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = '/';

      } else {
        localStorage.removeItem('token');
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }


  window.onload = verifyJWT;