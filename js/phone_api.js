// function to fetch search results
const getResult = searchKeyword => {
    // clear search box
    document.getElementById('searchField').value = "";

    // fetch data from API using search keyword
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchKeyword}`)
        .then(response => response.json())
        .then(values => showResults(values.data))
};


// function to show search results
const showResults = resultDatabase => {
    // check search results is empty or not
    if (resultDatabase.length != 0) {
        // hide search result error message before showing the results
        document.getElementById('noResultsErrorMessage').style.display = "none";

        // hide phone details container for every search
        document.getElementById('detailsContainer').style.display = "none";

        // clear previous search results before displaying new search result
        document.getElementById('resultContainer').textContent = "";

        // show only first twenty search results
        const twentyResults = resultDatabase.slice(0, 20);
        twentyResults.forEach(createResultCard);
    }
    // activate search result error message
    else {
        document.getElementById('noResultsErrorMessage').style.display = "block";
    }

};


// function fetch phone details
const loadDetails = idValue => {
    // clear previous phone details before showing new one
    document.getElementById('detailsContainer').textContent = '';
    document.getElementById('detailsContainer').style.display = "none";

    // fetch phone details from API
    fetch(`https://openapi.programming-hero.com/api/phone/${idValue}`)
        .then(response => response.json())
        .then(value => showDetails(value.data))
};


// function to create search result cards
const createResultCard = value => {
    // create result cards container
    const container = document.getElementById('resultContainer');

    // create card column
    const colDiv = document.createElement('div');

    // create card
    colDiv.innerHTML = `
        <div class="card h-100 shadow border-0 rounded">
            <div class="d-flex justify-content-center pt-4">
                <img src="${value.image}" class="card-img-top w-50 img-fluid" alt="...">
            </div>
            <div class="card-body text-center py-4">
                <h4 class="card-title fw-bold">${value.phone_name}</h4>
                <a class="btn btn-dark mt-2" onclick="loadDetails('${value.slug}')">Explore</a>
            </div>
            <div class="card-footer bg-brand text-center border-0">
                <h6 class="card-title">Brand: ${value.brand}</h6>
            </div>
        </div>`;

    // append card column in the card container
    container.appendChild(colDiv);
};


// function to create & show phone details
const showDetails = value => {
    // create details container
    const container = document.getElementById('detailsContainer');

    // create details row
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'g-0');

    // create details details (image, name, release date, brand, chipset, display, storage, memory)
    rowDiv.innerHTML = `
        <div class="col-md-4 bg-light p-3 d-flex justify-content-center">
            <img src="${value.image ? value.image : 'No valid data'}" class="img-fluid" alt="Phone image">
        </div>
        <div class="col-md-8 pt-3 px-3">
            <div class="card-body">
                <h3 class="card-title fw-bold">${value.name ? value.name : "No valid data"}</h3>
                <p class="card-text">
                    <small class="text-muted">Release Date: ${value.releaseDate ? value.releaseDate : "No valid data"}</small>
                </p>
                <table class="table table-striped">
                    <tbody>
                        <tr>
                            <th scope="row">Brand:</th>
                            <td>${value.brand ? value.brand : "No valid data"}</td>
                        </tr>
                        <tr>
                            <th scope="row">Display Size:</th>
                            <td>${value.mainFeatures.displaySize ? value.mainFeatures.displaySize : "No valid data"}</td>
                        </tr>
                        <tr>
                            <th scope="row">ChipSet:</th>
                            <td>${value.mainFeatures.chipSet ? value.mainFeatures.chipSet : "No valid data"}</td>
                        </tr>
                        <tr>
                            <th scope="row">Storage:</th>
                            <td>${value.mainFeatures.storage ? value.mainFeatures.storage : "No valid data"}</td>
                        </tr>
                        <tr>
                            <th scope="row">Memory:</th>
                            <td>${value.mainFeatures.memory ? value.mainFeatures.memory : "No valid data"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // append phone details(image, name, release date, brand, chipset, display, storage, memory)
    container.appendChild(rowDiv);

    // create sensors and other information table div
    const divBottom = showSensorsAndOtherInfo(value);

    // append phone details(sensors, other information)
    container.appendChild(divBottom);

    // activate phone details section
    container.style.display = 'block';

    // scroll to top to see phone details section
    window.scroll({ top: 0, left: 0 });
};


// function to create phone sensors and other information table div
const showSensorsAndOtherInfo = phoneValue => {
    // create another details div under phone image
    const divBottom = document.createElement('div');
    divBottom.classList.add('col-md-12', 'pb-3', 'px-3');

    // create another details body div under phone image
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // create second details table under phone image
    const otherInfoTable = document.createElement('table');
    otherInfoTable.classList.add('table', 'table-striped');

    // create table body for sensors and other information
    const tBody = document.createElement('tbody');

    // check sensors information existance
    if (phoneValue.mainFeatures.sensors) {
        // create sensor information row
        const sensorRow = createSensorsRow(phoneValue);

        // append sensor row in the table body
        tBody.appendChild(sensorRow);
    }

    // check existance of phone other information 
    if (phoneValue.others) {
        // create phone other information rows depends on object length
        Object.keys(phoneValue.others).forEach(objKey => {
            const tblRow = document.createElement('tr');

            const tblHeader = document.createElement('th');
            // get object key
            const thValue = document.createTextNode(`${objKey}:`);

            const tblData = document.createElement('td');
            // get object value
            const tdValue = document.createTextNode(`${phoneValue.others[objKey]}`);

            // append object value as table data
            tblData.appendChild(tdValue);
            // append object key as table header
            tblHeader.appendChild(thValue);
            // append table header and data to the row
            tblRow.appendChild(tblHeader);
            tblRow.appendChild(tblData);

            // append table row to the table body
            tBody.appendChild(tblRow);
        });
    }

    // append sensors and other information rows in the table body
    otherInfoTable.appendChild(tBody);

    // append sensors and other information in the table and details body
    cardBody.appendChild(otherInfoTable);
    divBottom.appendChild(cardBody);

    // return sensors and other details table div to append in the details container
    return divBottom;
}


// function to create sensors row
const createSensorsRow = phoneValue => {
    // join sensor values from sensors array
    const sensors = phoneValue.mainFeatures.sensors.join(', ');

    // create sensor row
    const sensorRow = document.createElement('tr');
    sensorRow.innerHTML = `
        <th scope="row">Sensors:</th>
        <td>${sensors}</td>
    `;

    // return sensor row to append in the table body
    return sensorRow;
}


// get search box input
document.getElementById('searchBtn').addEventListener('click', function () {
    const searchKeyword = document.getElementById('searchField').value;
    // fetch data only when search box has a value 
    if (searchKeyword) {
        document.getElementById('errorMessage').style.display = "none";
        getResult(searchKeyword);
    }

    // show an error message if the search box is empty
    else {
        document.getElementById('errorMessage').style.display = "block";
    }
});