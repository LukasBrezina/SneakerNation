
    const token = localStorage.getItem('token');

    fetch('/api/verify', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  .then(response => response.json())
  .then(data => {
    const loginContainer = document.getElementById('loginContainer');
  
    if (data.success) {
      // User success, load user account button
      const userMenuHtml = `
        <nav class="navAccount">
          <button class="accountButton" data-toggle="collapse" data-target="#accountToggle">Account</button>
          <div class="collapse" id="accountToggle">
            <ul class="account-choices">
              <li class="account-item">
                <a class="link" href="">${data.user.username}</a>
              </li>
              <li class="account-item">
                <a class="link" href="">Shopping Cart</a>
              </li>
              <li class="account-item">
                <a class="link" href="">Wishlist</a>
              </li>
              <li class="account-item">
                <a class="link" href="" id="logoutButton">Logout</a>
              </li>
            </ul>
          </div>
        </nav>
      `;
      loginContainer.innerHTML = userMenuHtml;
       document.getElementById('logoutButton').addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('token');
        location.reload();
        });
    } 
  })
  .catch(error => {
    console.log("geht")
    // No user, show login/register button
    const loginRegisterHtml = `
      <nav class="navAccount">
        <button class="accountButton" data-toggle="collapse" data-target="#accountToggle">Account</button>
        <div class="collapse" id="accountToggle">
          <ul class="account-choices">
            <li class="account-item">
              <a class="link" href="frontLogForm.html">Login / Register</a>
            </li>
          </ul>
        </div>
      </nav>
    `;
    loginContainer.innerHTML = loginRegisterHtml;
    console.error('Error:', error);
  });