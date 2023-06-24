import { addToCart, addToWL } from "./personal.js";


const xhr = new XMLHttpRequest();
xhr.open("GET", "/all");
xhr.onload = function() {
    const bodyElement = document.getElementById("allShoesDiv");
    if (xhr.status === 200) {
        let shoes = JSON.parse(xhr.responseText);
        for (const shoe of shoes) {
            for (const sneaker of shoe) {
                
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
                pic.className = "shoe-img";
                pic.setAttribute("src", sneaker.thumbnail);
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
        const addToCartButtons = document.querySelectorAll('.shoe .add-to-cart');
        addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart); 
        }); 

        const addToWLButtons = document.querySelectorAll('.shoe .add-to-wl');
        addToWLButtons.forEach(button => {
        button.addEventListener('click', addToWL);
        })

    }
}
xhr.send();