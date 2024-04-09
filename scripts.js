
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


//imports data from data.json
const currencyContent = document.querySelector('.currency-content');
let data;
let propertiesToDisplay = ['Name', 'Country', 'Value', 'Continent', 'Symbol', 'Code']; // Define initial properties

fetch('data.json')
  .then(response => response.json())
  .then(responseData => {
    data = responseData;
    displayDataAsTable(data, propertiesToDisplay, currencyContent); // Display initial table
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
      if (item.hasOwnProperty('Base_currency')) {
        const baseCurrency = item.Base_currency;
        const countries = item.Countries;
  
        if (countries && countries.length > 0) {
          const baseCurrencyRow = document.createElement('tr');
  
          properties.forEach(property => {
            if (baseCurrency.hasOwnProperty(property)) {
              const cell = document.createElement('td');
              cell.textContent = baseCurrency[property];
              baseCurrencyRow.appendChild(cell);
            }
          });
  
          table.appendChild(baseCurrencyRow);
  
          countries.forEach(country => {
            const countryRow = document.createElement('tr');
  
            properties.forEach(property => {
              if (property === 'Country') {
                const cell = document.createElement('td');
                cell.textContent = country.Country;
                countryRow.appendChild(cell);
              } else if (property === 'Continent') {
                const cell = document.createElement('td');
                cell.textContent = country.Continent || baseCurrency.Continent;
                countryRow.appendChild(cell);
              } else if (baseCurrency.hasOwnProperty(property)) {
                const cell = document.createElement('td');
                cell.textContent = baseCurrency[property];
                countryRow.appendChild(cell);
              }
            });
  
            table.appendChild(countryRow);
          });
        }
      } else if (item.hasOwnProperty('Name')) {
        const row = document.createElement('tr');
  
        properties.forEach(property => {
          if (item[property]) {
            const cell = document.createElement('td');
            cell.textContent = item[property];
            row.appendChild(cell);
          }
        });
  
        table.appendChild(row);
      }
    });
  
    container.innerHTML = '';
    container.appendChild(table);
  }

//*array of properties to be displayed on top
let properties = [
    "Currencies",
    "***",
    "Around the world",
    "***",
    "Compared to the dollar"
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
    if (property === "Value compared to USD") {
      listItem.textContent = "Value";
    } else {
      listItem.textContent = property;
    }
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

const shuffleButton = document.getElementById('shuffleButton');
shuffleButton.addEventListener('click', function() {
  shuffleRows();
});

function shuffleRows() {
  const shuffledData = shuffle([...originalData]); // Shuffle a copy of the original data
  displayDataAsTable(shuffledData, propertiesToDisplay, currencyContent);
}

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
  const searchBox = document.getElementById('search-box');
  const searchTerm = searchBox.value.toUpperCase();
  searchCurrencies(searchTerm);
});

function searchCurrencies(searchTerm) {
  const filteredData = originalData.filter(item => {
    return item.Code.toUpperCase() === searchTerm; // Filter based on currency code
  });
  displayDataAsTable(filteredData, propertiesToDisplay, currencyContent);
}