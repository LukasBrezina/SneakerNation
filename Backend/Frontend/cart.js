
// fetches shopping cart from backend (with token in header) and returns data
async function fetchCart() {
    const token = localStorage.getItem("token");
    const response = await fetch('/api/getShoppingCart', {
        headers: {
            Authorization: 'Bearer ' + token
        },
    });

    if (!response.ok) {
        console.error('Error:', response.status);
        return;
    }

    const data = await response.json();
    return data.shoppingCart;
}

// Store the wishlist in the local storage
async function storeWishlist() {
    const cart = await fetchCart();
    if (cart && cart !== []) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

let currentCurrency = 'USD';
let selectCount = 0;

// Render each item on the page
async function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById("cart-container").innerHTML = "";

    if (selectCount < 1) {
         // currency select
        const selectElement = document.createElement('select');
        const currencies = ['USD', 'EUR']; 
        currencies.forEach(currency => {
            const optionElement = document.createElement('option');
            optionElement.value = currency;
            optionElement.textContent = currency;
            selectElement.appendChild(optionElement);
            });
    
        selectElement.value = currentCurrency;
        selectElement.addEventListener('change', handleCurrencyChange);
        document.getElementById("loginContainer").appendChild(selectElement);
        selectCount++;
    }

    cart.forEach(item => {

        fetch(`/convert-currency?have=USD&want=${currentCurrency}&amount=${parseInt(item.price)}`)
        .then(response => {
            let newPrice = response;
            console.log(newPrice)
            console.log(response.data)
            item.price = newPrice;
            console.log(item.price)
        })
        .catch((error) => {
            console.log(error);
        })
        
        // article
        let article = document.createElement("article");
        article.className = "shoe";
        // product name
        const name = document.createElement("h2");
        name.innerText = item.name;
        name.className = "shoe-name"
        // paragraphs
        let infoParagraph = document.createElement("p");
        infoParagraph.className = "shoe-p";
        // thumbnail
        const pic = document.createElement("img");
        pic.className = "shoe-img";
        pic.setAttribute("src", item.image);
        // infoParagraph content
        const price = "Quantity: " + item.count + "<br> Price: " + item.price + currentCurrency;
        // append to paragraphs
        infoParagraph.innerHTML = price + "<br>";
        // create buttons for cart
        const button2 = document.createElement("button");
        button2.innerText = "Delete from Cart";
        button2.addEventListener('click', () => removeCart(item.name));
        article.append(name);
        article.append(pic);
        article.append(infoParagraph);
        article.append(button2);
        document.getElementById("cart-container").appendChild(article);

    });
}

// store Wishlist -> renderCart after
storeWishlist().then(renderCart);

// delete item from shopping cart from the backend
async function removeCart(itemName) {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/deleteShoppingCart', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token,
            name: itemName
        })
    })
    .then(() => {
        deleteItem(itemName);
    });

    if (!response.ok) {
        console.error('Error:', response.status);
        return;
    }

    const data = await response.json();
    return data.success;
}

// Delete item from local storage
async function deleteItemFromLocalStorage(itemName) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.name === itemName);

    if (item) {
        // if more than one of this shoe -> decrease count
        if (item.count > 1) {
            item.count--;
        } else {
            // only one pair of this shoe -> delete it 
            const index = cart.findIndex(item => item.name === itemName);
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

async function deleteItem(itemName) {
    deleteItemFromLocalStorage(itemName);
    renderCart();
}

// fetch Patch endpoint to make change when select is changed
function handleCurrencyChange(event) {
    const newCurrency = event.target.value;
    
    // patch endpoint to update currency
    fetch('/api/updateCurrency', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ currency: newCurrency })
    })
    .then(response => {
      if (response.ok) {
        currentCurrency = newCurrency;
        renderCart();
        console.log('Currency updated successfully');
      } else {
        console.error('Failed to update currency');
      }
    })
    .catch(error => {
      console.error('An error occurred while updating currency:', error);
    });
  }

