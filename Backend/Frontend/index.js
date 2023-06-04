window.onload = function () {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const bodyElement = document.querySelector("body");
      if (xhr.status == 200) {
      
      // Create div element front
      const frontDiv = document.createElement('div');
      frontDiv.id = 'front';

      // Create h1 element
      const h1 = document.createElement('header');
      h1.textContent = 'SneakerNation'; 
      frontDiv.appendChild(h1);

      // Create p element
      const p = document.createElement('p');
      p.textContent = '"Every Sneaker you can dream of"';
      frontDiv.appendChild(p);

      // Create button element
      const button = document.createElement('button');e
      button.textContent = 'Wishlist'; 
      button.id = 'middleButton'; 
      button.onclick = function () { 
        window.location.href = 'wishlist.html';
      };
      frontDiv.appendChild(button);

      const img1 = document.createElement("img");
      img1.setAttribute("src", "https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
      frontDiv.append(img1);
      bodyElement.appendChild(frontDiv);

      // Create div element trends
      const trendsDiv = document.createElement('div');
      trendsDiv.id = 'trends';

      // Create h2 element
      const h2 = document.createElement('h2');
      h2.textContent = 'Trends';
      trendsDiv.appendChild(h2);

      const trendButton = document.createElement("button");
      trendButton.innerText = "Trending";
      trendButton.id = "middleButton";
      trendButton.onclick = function() {
        window.location.href = 'trend.html';
      }
      trendsDiv.appendChild(trendButton);
      bodyElement.appendChild(trendsDiv);

      let allDiv = document.createElement("div");
      allDiv.id = "allDiv";

      let h2_all = document.createElement("h2");
      h2_all.textContent = "All Products";
      allDiv.appendChild(h2_all);

      const allButton = document.createElement("button")
      allButton.textContent = 'All Sneaker';
      allButton.id = "middleButton";
      allButton.onclick = function () {
        window.location.href = 'allShoes.html';
      };
      allDiv.appendChild(allButton);
      bodyElement.appendChild(allDiv);

      } else {
        bodyElement.append(
          "Daten konnten nicht geladen werden, Status " +
            xhr.status +
            " - " +
            xhr.statusText
        );
      }
    };
    xhr.open("GET", "/");
    xhr.send();
  };
  