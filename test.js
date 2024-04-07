fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Use the data here
        console.log(data); // This will log the array of currencies
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
