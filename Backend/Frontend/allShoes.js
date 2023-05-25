
const xhr = new XMLHttpRequest();
xhr.open("GET", "/all");
xhr.onload = function() {
    const bodyElement = document.querySelector("body");
    if (xhr.status === 200) {
        let shoes = JSON.parse(xhr.responseText);
        for (const shoe in shoes) {
            let article = document.createElement("article")
            var name = document.createElement("h1");
            name.innerText = shoe;
            article.appendChild(name)
            bodyElement.append(article);
        }
    }
}
xhr.send();