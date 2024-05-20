
//"export" makes function available outside of current module allowing other modules to call function
export async function searchBreweries() {
    const searchCriteria = document.getElementById('searchCriteria').value;
    const searchInput = document.getElementById('searchInput').value.trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (searchInput === '') {
        resultsDiv.innerHTML = '<p>Brewery Search Criteria Can Not Be Blank</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.openbrewerydb.org/breweries?${searchCriteria}=${searchInput}`);
        const breweries = await response.json();

        if (breweries.length === 0) {
            resultsDiv.innerHTML = '<p>No breweries found. Please try again.</p>';
            return;
        }

        const ul = document.createElement('ul');
        breweries.forEach(brewery => {
            const li = document.createElement('li');
            li.innerHTML = `
                Name: ${brewery.name}<br>
                City: ${brewery.city}<br>
                State: ${brewery.state}<br>
                Phone: ${brewery.phone}<br>
                Type: ${brewery.brewery_type}<br>
                Website: <a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a><br>
               
            `;
            ul.appendChild(li);
        });
        resultsDiv.appendChild(ul);

    } catch (error) {
        console.error('Error fetching data:', error);
        resultsDiv.innerHTML = '<p>Failed to fetch breweries. Please try again later.</p>';
    }
}