const getResult = searchKeyword => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchKeyword}`)
        .then(response => response.json())
        .then(values => showResults(values.data))
};

const showResults = resultDatabase => {
    const detailsContainer = document.getElementById('detailsContainer');
    detailsContainer.style.display = "none";
    const container = document.getElementById('resultContainer');
    container.textContent = "";
    const twentyResults = resultDatabase.slice(0, 20);
    twentyResults.forEach(createResultCard);
};

const loadDetails = idValue => {
    fetch(`https://openapi.programming-hero.com/api/phone/${idValue}`)
        .then(response => response.json())
        .then(value => showDetails(value.data))
};

const showDetails = value => {
    const container = document.getElementById('detailsContainer');
    container.textContent = '';
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'g-0');
    rowDiv.innerHTML = `
        <div class="col-md-4 bg-light p-3 d-flex justify-content-center">
            <img src="${value.image}" class="img-fluid" alt="Phone image">
        </div>
        <div class="col-md-8 pt-3 px-3">
            <div class="card-body">
                <h3 class="card-title fw-bold">${value.name}</h3>
                <p class="card-text">
                    <small class="text-muted">Release Date: ${value.releaseDate}</small>
                </p>
                <table class="table table-striped">
                    <tbody>
                        <tr>
                            <th scope="row">Brand:</th>
                            <td>${value.brand}</td>
                        </tr>
                        <tr>
                            <th scope="row">Display Size:</th>
                            <td>${value.mainFeatures.displaySize}</td>
                        </tr>
                        <tr>
                            <th scope="row">ChipSet:</th>
                            <td>${value.mainFeatures.chipSet}</td>
                        </tr>
                        <tr>
                            <th scope="row">Storage:</th>
                            <td>${value.mainFeatures.storage}</td>
                        </tr>
                        <tr>
                            <th scope="row">Memory:</th>
                            <td>${value.mainFeatures.memory}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    const divBottom = document.createElement('div');
    divBottom.classList.add('col-md-12', 'pb-3', 'px-3');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const otherInfoTable = document.createElement('table');
    otherInfoTable.classList.add('table', 'table-striped');
    const tBody = document.createElement('tbody');

    const sensors = value.mainFeatures.sensors.join(', ');
    const sensorRow = document.createElement('tr');
    sensorRow.innerHTML = `
        <th scope="row">Sensors:</th>
        <td>${sensors}</td>
    `;
    tBody.appendChild(sensorRow);

    Object.keys(value.others).forEach(objKey => {
        const tblRow = document.createElement('tr');
        const tblHeader = document.createElement('th');
        const thValue = document.createTextNode(`${objKey}:`);
        const tblData = document.createElement('td');
        const tdValue = document.createTextNode(`${value.others[objKey]}`);

        tblData.appendChild(tdValue);
        tblHeader.appendChild(thValue);
        tblRow.appendChild(tblHeader);
        tblRow.appendChild(tblData);
        tBody.appendChild(tblRow);
    });

    otherInfoTable.appendChild(tBody);
    cardBody.appendChild(otherInfoTable);
    divBottom.appendChild(cardBody);

    container.appendChild(rowDiv);
    container.appendChild(divBottom);
    container.style.display = 'block';
    window.scroll({ top: 0, left: 0 });
};


const createResultCard = value => {
    const container = document.getElementById('resultContainer');
    const colDiv = document.createElement('div');
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
    container.appendChild(colDiv);
};

document.getElementById('searchBtn').addEventListener('click', function () {
    const searchKeyword = document.getElementById('searchField').value;
    getResult(searchKeyword);
});