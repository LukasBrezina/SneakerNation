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
            console.log(data.success)
            // User success, load user account button
            const userMenuHtml = `
              <nav class="navAccount">
            <button class="accountButton" data-toggle="collapse" data-target="#accountToggle" style="border: none; padding: 0; background: none;">
              <img src="./images/abstract-user-flat-4.svg" width="55" height="55" alt="Profile Image"/>
            </button>
            <div class="collapse user-collapse" id="accountToggle">
              <ul class="account-choices">
                <li class="account-item">
                  ${data.user.username}
                </li>
                <li class="account-item">
                  <a class="link" href="/cart.html">Shopping Cart</a>
                </li>
                <li class="account-item">
                  <a class="link" href="/wishlist.html">Wishlist</a>
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
        console.log(error)
        // No user, show login/register button
        const loginRegisterHtml = `
      <nav class="navAccount">
        <button class="accountButton" data-toggle="collapse" data-target="#accountToggle" style="border: none; padding: 0; background: none;">
          <img src="./images/abstract-user-flat-4.svg" width="55" height="55" alt="Profile Image"/>
        </button>
        <div class="collapse user-collapse" id="accountToggle">
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