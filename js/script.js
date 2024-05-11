async function searchBreweries() {
    const searchInput = document.getElementById('searchInput').value.trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (searchInput === '') {
        resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.openbrewerydb.org/breweries?by_city=${searchInput}`);
        const breweries = await response.json();

        if (breweries.length === 0) {
            resultsDiv.innerHTML = '<p>No Breweries in this city</p>';
            return;
        }

        const ul = document.createElement('ul');
        breweries.forEach(brewery => {
            const li = document.createElement('li');
            li.textContent = brewery.name;
            ul.appendChild(li);
        });
        resultsDiv.appendChild(ul);
    } catch (error) {
        console.error('Error fetching data:', error);
        resultsDiv.innerHTML = '<p>Failed to fetch breweries. Please try again later.</p>';
    }
    
}