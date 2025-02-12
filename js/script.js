
//searchBreweries
async function searchBreweries() {
    const searchCriteria = document.getElementById('searchCriteria').value;
    const searchInput = document.getElementById('searchInput').value.trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

//Validate that search input is not null error handling
    if (searchInput === '') {
        resultsDiv.innerHTML = '<p>Brewery Search Criteria Can Not Be Blank</p>';
        return;
    };

//try block to handle potential errors bringing back error in catch block
//searchCriteia path is called from html searchCriteria container 
//searchInput is the query path 
    try {
        const response = await fetch(`https://api.openbrewerydb.org/breweries?${searchCriteria}=${searchInput}`);
        const breweries = await response.json();

    //No results return error
        if (breweries.length === 0) {
            resultsDiv.innerHTML = '<p>No breweries found. Please try again.</p>';
            return;
        }

//Unordered list to bring back all breweries. Inside the ul is a list that pulls back and orders details for each brewery and appends to the ul
        const ul = document.createElement('ul');
        breweries.forEach(brewery => {
            const li = document.createElement('li');
            li.innerHTML = `
            <br>
                <b> Name: </b> ${brewery.name}<br>
                <b> Address: </b> ${brewery.address_1}<br>
                <b> City: </b> ${brewery.city}<br>
                <b> State: </b> ${brewery.state}<br>
                <b> Phone: </b> ${brewery.phone}<br>
                <b> Type: </b> ${brewery.brewery_type}<br>
                <b> Website:  </b> <a href="${brewery.website_url}" target="_blank">${brewery.website_url}<a><br>
            </br>
            `;
            ul.appendChild(li);
        });
        resultsDiv.appendChild(ul);

//catch block is trigged if there is an error during fetching 
        // to see example of fetch error select Brewery Type and capitalize input to throw error. 
    } catch (error) {
        console.error('Error fetching data:', error);
        resultsDiv.innerHTML = '<p>Failed to fetch breweries. Please try again later.</p>';
    };
}

//Listener to know when Search Breweries button is clicked console logging success or failue
document.getElementById('searchButton').addEventListener('click', async () => {
    try {
        await searchBreweries();
        console.log('Search Successful');
    } catch (error) {
        console.error('Search Failed:', error);
    }
});
