//! INSTRUCTIONS
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

//*Disclaimer: This is definetly bad syntax and spagethi code, since I've never coded in Java script, CSS nor HTML so as a first experience
//This was truly tough for me and I really appretiate the friends that helped me finding resources on the internet due to me having no clue at first
//I feel the worst part of all this project was printing from JS into HTML, due to how unfamiliar I was with all this syntax


const currencyContent = document.querySelector('.currency-content');
//"placeholder"
let data;
//Properties to be displayed
let propertiesToDisplay = ['Name', 'Country', 'Value', 'Continent', 'Symbol', 'Code'];

//imports data from data.json
fetch('data.json')
  .then(response => response.json())
  .then(responseData => {
    //response is like some sort of scanner
    data = responseData;
    //then data is gonna be an array
    displayDataAsTable(data, propertiesToDisplay, currencyContent); // Display initial table
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  //*Toughest function to work on
  function displayDataAsTable(data, properties, container) {
    //"defines" table
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
  
    //looping through the properties given, which will create the top row with the name of the displayed properties
    properties.forEach(property => {
      const headerCell = document.createElement('th');
      //creates cells and fills it up with the content
      headerCell.textContent = property;
      //appends cells
      headerRow.appendChild(headerCell);
    });
  //function that will "attach" the resulting row into the actual table
    table.appendChild(headerRow);
  
    data.forEach(item => {
      if (item.hasOwnProperty('Base_currency')) {
        //case for a group of countries that share a currency
        const baseCurrency = item.Base_currency;
        const countries = item.Countries;
  
        if (countries && countries.length > 0) {
          //will display the countries that are grouped into a base currency group
          const baseCurrencyRow = document.createElement('tr');
  
          properties.forEach(property => {
            if (baseCurrency.hasOwnProperty(property)) {
              const cell = document.createElement('td');
              cell.textContent = baseCurrency[property];
              baseCurrencyRow.appendChild(cell);
            }
          });
          
          //appends result into the actual table
          table.appendChild(baseCurrencyRow);
  
          countries.forEach(country => {
            const countryRow = document.createElement('tr');
  
            properties.forEach(property => {
              if (property === 'Country') {
                //Case in which there is a group of countries in my data
                const cell = document.createElement('td');
                cell.textContent = country.Country;
                countryRow.appendChild(cell);
              } 
              else if (property === 'Continent') {
                //Case in which there is a group of countries that despite sharing currency are located in a different continent
                const cell = document.createElement('td');
                cell.textContent = country.Continent || baseCurrency.Continent;
                countryRow.appendChild(cell);
              } 
              else if (baseCurrency.hasOwnProperty(property)) {
                //regular case
                const cell = document.createElement('td');
                cell.textContent = baseCurrency[property];
                countryRow.appendChild(cell);
              }
            });
  
            table.appendChild(countryRow);
          });
        }
      } 
      else if (item.hasOwnProperty('Name')) {
        //Individual currency case
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

//*array of words to be displayed on top
let properties = [
    "Currencies",
    "***",
    "Around the world",
    "***",
    "Compared to the dollar"
];
displayProperties (properties);

 //Done for testing purposes, and just modified it to have a weird "welcome"
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

function displaySingleRow(dataItem, properties, container) {
  //function to display result of search
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');

  properties.forEach(property => {
    const headerCell = document.createElement('th');
    headerCell.textContent = property;
    headerRow.appendChild(headerCell);
  });

  table.appendChild(headerRow);

  const row = document.createElement('tr');

  properties.forEach(property => {
    if (dataItem[property]) {
      const cell = document.createElement('td');
      cell.textContent = dataItem[property];
      row.appendChild(cell);
    }
  });

  table.appendChild(row);

  container.innerHTML = '';
  container.appendChild(table);
}


const shuffleButton = document.getElementById('shuffleButton');
shuffleButton.addEventListener('click', function() {
  shuffleRows();
});

// Shuffle a copy of the original data
//Thought it was a good idea, since it helped me learning Array in C++
//Not really useful in a real-world application
function shuffleRows() {
  const shuffledData = shuffle([...data]); 
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
  displaySingleRow(shuffledData, propertiesToDisplay, currencyContent);

});

//Search function, it will take the input from the user and change it to upercase regardless of the input
  function searchCurrencies() {
    const searchTerm = document.getElementById('search-box').value.toUpperCase();
    const tableRows = document.querySelectorAll('table tr');
  
    tableRows.forEach(row => {
      const cells = row.querySelectorAll('td');
      let found = false;
      cells.forEach(cell => {
        if (cell.textContent.toUpperCase().includes(searchTerm)) {
          found = true;
        }
      });
      if (found) {
        row.style.display = "table-row";
        //case in which the display row function is called
      } else {
        row.style.display = "none";
        //failed case
      }
    });
  }
  
