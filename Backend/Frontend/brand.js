import { addToCart, addToWL } from "./personal.js";

const xhr = new XMLHttpRequest();
const urlParams = new URLSearchParams(window.location.search);
const brand = urlParams.get('brand');
const brandTitleElement = document.querySelector('#brandTitle');
brandTitleElement.textContent = brand.charAt(0).toUpperCase() + brand.slice(1);

if (brand == "newbalance"){
    brandTitleElement.textContent = "New Balance"; //Just for New Balance
}

xhr.open("GET", `/brand/${brand}`);
console.log("Brand Name:", brand); // Log the brand name
xhr.onload = function() {
    const bodyElement = document.getElementById("brandProductsDiv");
    if (xhr.status === 200) {
        let shoes = JSON.parse(xhr.responseText);
        for (const sneaker of shoes) {
                // article
                let article = document.createElement("article");
                article.className = "shoe";
                // product name
                var name = document.createElement("h2");
                name.innerText = sneaker.shoeName;
                name.className = "shoe-name"
                // paragraphs
                let infoParagraph = document.createElement("p");
                infoParagraph.className = "shoe-p";
                // thumbnail
                var pic = document.createElement("img");
                pic.setAttribute("src", sneaker.thumbnail);
                pic.className = "shoe-img";
                // infoParagraph content
                var brand = "Brand:  " + sneaker.brand;
                var price = "Price: " + sneaker.price+ "$";
                // span for releaseDate
                var dateSpan = document.createElement("span");
                var date = new Date(sneaker.releaseDate);
                var release = document.createTextNode(date.toLocaleDateString());
                var releaseText = "Released: ";
                dateSpan.append(releaseText);
                dateSpan.append(release);
                // append to paragraphs
                infoParagraph.innerHTML = brand + "<br>"+ price + "<br>";
                infoParagraph.append(dateSpan);
                // create buttons for wishlist and cart
                var button = document.createElement("button");
                button.innerText = "Add to Wishlist";
                button.className = "add-to-wl";
                var button2 = document.createElement("button");
                button2.innerText = "Add to Cart";
                button2.className = "add-to-cart";
                // append everything to article, then to bodyElement
                article.append(name);
                article.append(pic);
                article.append(infoParagraph);
                article.append(button);
                article.append(button2);
                bodyElement.appendChild(article);
            }
        }
        // event listener for buttons
        const addToCartButtons = document.querySelectorAll('.shoe .add-to-cart');
        addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart); 
        }); 
        
        const addToWLButtons = document.querySelectorAll('.shoe .add-to-wl');
        addToWLButtons.forEach(button => {
        button.addEventListener('click', addToWL); 
        })
        }
      
xhr.send();