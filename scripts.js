/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 * 
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your 
 *    browser and make sure you can see that change. 
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 * 
 */


//TODO: Input pictures of flags

//imports data from data.json
const currencyContent = document.querySelector('.currency-content');

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const propertiesToDisplay = ['name', 'country', 'value', 'continent'];
    displayDataAsTable(data, propertiesToDisplay, document.querySelector('.currency-content'));
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  function displayDataAsTable(data, properties, container) {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
  
    properties.forEach(property => {
      const headerCell = document.createElement('th');
      headerCell.textContent = property;
      headerRow.appendChild(headerCell);
    });
  
    table.appendChild(headerRow);
  
    data.forEach(item => {
      const row = document.createElement('tr');
  
      properties.forEach(property => {
        const cell = document.createElement('td');
        cell.textContent = item[property];
        row.appendChild(cell);
      });
  
      table.appendChild(row);
    });
  
    container.appendChild(table);
  }
//*array of properties to be displayed on top
let properties = [
    "Name",
    "Country",
    "Value compared to USD"
];
displayProperties (properties);

function displayProperties(properties) {
    const container = document.getElementById("property-container");
    container.innerHTML = "";
  
    const propertyRow = document.createElement("div");
    propertyRow.classList.add("property-row");
  
    properties.forEach((property, index) => {
      const listItem = document.createElement("div");
      listItem.classList.add("property-item");
      listItem.textContent = property;
      propertyRow.appendChild(listItem);
    });
  
    container.appendChild(propertyRow);
  
    const tittlesDiv = document.querySelector('.tittles');
    tittlesDiv.style.display = 'block';
  }
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Your final submission should have much more data than this, and 
// you should use more than just an array of strings to store it all.

// Call the function with your array of properties


// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

function quoteAlert() {
    console.log("Button Clicked!")
    alert("On the works!!");
}

function shuffleElements(container) {
  var elements = container.children;
  for (var i = elements.length; i >= 0; i--) {
    container.appendChild(elements[Math.random() * i | 0]);
  }
}

// Wait for the page to fully load before shuffling the elements
window.addEventListener('load', function() {
  var button = document.querySelector('button[onclick*="shuffle"]');
  button.addEventListener("click", function() {
    var container = document.getElementById('currency-content');
    shuffleElements(container);
  });
});

function removeLastCard() {
    titles.pop(); // Remove last item in titles array
    showCards(); // Call showCards again to refresh
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


