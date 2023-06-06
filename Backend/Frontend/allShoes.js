
const xhr = new XMLHttpRequest();
xhr.open("GET", "/all");
xhr.onload = function() {
    const bodyElement = document.querySelector("body");
    if (xhr.status === 200) {
        let shoes = JSON.parse(xhr.responseText);
        /* const headerParagraph = document.createElement("p")
        const title = document.createElement("header")
        title.innerText = "SneakerNation"
        headerParagraph.append(title)
        bodyElement.appendChild(headerParagraph)  */
        for (const shoe of shoes) {
            for (const sneaker of shoe) {
                
                // article
                let article = document.createElement("article");
                // product name
                var name = document.createElement("h2");
                name.innerText = sneaker.shoeName;
                // paragraphs
                let infoParagraph = document.createElement("p");
                let picParagraph = document.createElement("p");
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
                picParagraph.append(pic);
                // create buttons for wishlist and cart
                var button = document.createElement("button");
                button.innerText = "Add to Wishlist";
                button.id = "shoeButton";
                var button2 = document.createElement("button");
                button2.innerText = "Add to Cart";
                button2.id = "shoeButton";
                // append everything to article, then to bodyElement
                article.append(name);
                article.append(picParagraph);
                article.append(infoParagraph);
                article.append(button);
                article.append(button2);
                bodyElement.appendChild(article);
            }
        }
    }
}
xhr.send();
