const xhr = new XMLHttpRequest();
const urlParams = new URLSearchParams(window.location.search);
const brand = urlParams.get('brand');
const brandTitleElement = document.querySelector('#brandTitle');
brandTitleElement.textContent = brand.charAt(0).toUpperCase() + brand.slice(1);
xhr.open("GET", `/brand/${brand}`);
console.log("Brand Name:", brand); // Log the brand name
xhr.onload = function() {
    const bodyElement = document.getElementById("brandProductsDiv");
    if (xhr.status === 200) {
        let shoes = JSON.parse(xhr.responseText);
        for (const sneaker of shoes) {
            
            // article
            let article = document.createElement("article");
            // product name
            var name = document.createElement("h2");
            name.innerText = sneaker.shoeName;
            // paragraphs
            let infoParagraph = document.createElement("p");
            // thumbnail
            var pic = document.createElement("img");
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
            button.id = "shoeButton";
            var button2 = document.createElement("button");
            button2.innerText = "Add to Cart";
            button2.id = "shoeButton";
            // append everything to article, then to bodyElement
            article.append(name);
            article.append(pic);
            article.append(infoParagraph);
            article.append(button);
            article.append(button2);
            bodyElement.appendChild(article);
            }
        }
    }
xhr.send();