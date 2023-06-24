import { addToCart } from "./personal.js";

// get wishlist data from backend (token in header)
async function fetchWishlist() {
    const token = localStorage.getItem("token");
    const response = await fetch('/api/getWishlist', {
        headers: {
            Authorization: 'Bearer ' + token
        },
    });

    if (!response.ok) {
        console.error('Error:', response.status);
        return;
    }

    const data = await response.json();
    return data.wishlist;
}

// Store the wishlist in the local storage
async function storeWishlist() {
    const wishlist = await fetchWishlist();
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Render each item on the page
async function renderWishlist() {
    const wishlistContainer = document.getElementById('wishlist-container');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistContainer.innerHTML = "";

    wishlist.forEach(item => {
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
        const price = "Price: " + item.price + "$";
        // append to paragraphs
        infoParagraph.innerHTML = price + "<br>";
        // create buttons for wishlist and cart
        const button = document.createElement("button");
        button.innerText = "Remove from Wishlist";
        button.className = "remove-from-wl";
        button.addEventListener('click', () => deleteItemFromWishlist(item.name));
        const button2 = document.createElement("button");
        button2.innerText = "Add to Cart";
        button2.className = "add-to-cart";
        article.append(name);
        article.append(pic);
        article.append(infoParagraph);
        article.append(button);
        article.append(button2);
        document.getElementById("wishlist-container").appendChild(article);
    });
    const addToCartButtons = document.querySelectorAll('.shoe .add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// store wishlist -> after renderWishlist
storeWishlist().then(renderWishlist);

// Delete item from backend & localStorage
async function deleteItemFromWishlist(itemName) {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/deleteWishlist', {
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
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.findIndex(item => item.name === itemName);

    if (index !== -1) {
        wishlist.splice(index, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
}

async function deleteItem(itemName) {
    deleteItemFromLocalStorage(itemName);
    renderWishlist();
}
