window.onload = function () {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const bodyElement = document.querySelector("body");
      if (xhr.status == 200) {
        
      // Create div element front
      const frontDiv = document.createElement('div');
      frontDiv.id = 'front';

      // Create h1 element
      const h1 = document.createElement('h1');
      h1.textContent = 'SneakerNation';
      frontDiv.appendChild(h1);

      // Create p element
      const p = document.createElement('p');
      p.textContent = 'Every Sneaker you can dream of';
      frontDiv.appendChild(p);

      // Create button element
      const button = document.createElement('button');
      button.textContent = 'Wishlist';
      button.onclick = function () {
        window.location.href = 'wishlist.html';
      };
      frontDiv.appendChild(button);
      bodyElement.appendChild(frontDiv);

      // Create div element trends
      const trendsDiv = document.createElement('div');
      trendsDiv.id = 'trends';

      // Create h2 element
      const h2 = document.createElement('h2');
      h2.textContent = 'Trends';
      trendsDiv.appendChild(h2);

      // Create unordered list element
      const ul = document.createElement('ul');

      // Create list item elements 
      const li1 = document.createElement('li');
      li1.textContent = 'Sneaker1';
      ul.appendChild(li1);

      const li2 = document.createElement('li');
      li2.textContent = 'Sneaker2';
      ul.appendChild(li2);

      const li3 = document.createElement('li');
      li3.textContent = 'Sneaker3';
      ul.appendChild(li3);

      trendsDiv.appendChild(ul);

      const testButton = document.createElement("button")
      testButton.textContent = 'test';
      testButton.onclick = function () {
        window.location.href = 'allShoes.html';
      };
      bodyElement.appendChild(trendsDiv);
      bodyElement.appendChild(testButton);

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
  