window.onload = function() {
    const xhr = new XMLHttpRequest();
    xhr.onload  = function() {
        const bodyElement = document.querySelector("body")
        if (xhr.status == 200) {
            const highlightShoes = JSON.parse(xhr.responseText);
            for (const shoe of highlightShoes) {
                let article = document.createElement("article")
                var img =  document.createElement("img")
                img.setAttribute("src", shoe.thumbnail)
                article.append(img)
                bodyElement.append(article)
            }
        }
    }
    xhr.open("GET", "/");
    xhr.send();
}