
const xhr = new XMLHttpRequest();
xhr.open("GET", "/all");
xhr.onload = function() {
    const bodyElement = document.querySelector("body");
    if (xhr.status === 200) {
        let shoes = JSON.parse(xhr.responseText);
        const headerParagraph = document.createElement("p")
        const title = document.createElement("h1")
        title.innerText = "SneakerNation"
        headerParagraph.append(title)
        bodyElement.appendChild(headerParagraph)
        for (const shoe of shoes) {
            for (const sneaker of shoe) {
            
                let article = document.createElement("article")
                var name = document.createElement("h2");
                name.innerText = sneaker.shoeName;
                let infoParagraph = document.createElement("p");
                let picParagraph = document.createElement("p");
                var pic = document.createElement("img");
                pic.setAttribute("src", sneaker.thumbnail);
                var brand = "Brand:  " + sneaker.brand;
                var price = "Price: " + sneaker.price+ "$";
                infoParagraph.innerHTML = brand + "<br>"+ price;
                picParagraph.append(pic);
                var button = document.createElement("button");
                button.innerText = "Add to Wishlist";
                button.id = "shoeButton";
                var button2 = document.createElement("button");
                button2.innerText = "Add to Cart";
                button2.id = "shoeButton";
                article.append(name);
                article.append(picParagraph);
                article.append(infoParagraph);
                article.append(button);
                article.append(button2);
                bodyElement.appendChild(article);
            }
            /* let article = document.createElement("article")
            var name = document.createElement("h1");
            name.innerText = shoe.shoeName;
            article.appendChild(name)
            bodyElement.append(article); */
        }
    }
}
xhr.send();