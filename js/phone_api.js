const getResult = searchKeyword => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchKeyword}`)
        .then(response => response.json())
        .then(values => showResults(values.data))
};

const showResults = resultDatabase => {
    const container = document.getElementById('resultContainer');
    container.textContent = "";
    const twentyResults = resultDatabase.slice(0, 20);
    twentyResults.forEach(createResultCard);
};

const loadDetails = idValue => {
    const container = document.getElementById('detailsContainer');
    container.style.display = 'none';
    fetch(`https://openapi.programming-hero.com/api/phone/${idValue}`)
        .then(response => response.json())
        .then(value => showDetails(value.data))
};

const showDetails = value => {
    console.log(value);
    const container = document.getElementById('detailsContainer');
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'g-0');
    rowDiv.innerHTML = `
        <div class="col-md-4 bg-light p-3 d-flex justify-content-center">
            <img src="${value.image}" class="img-fluid" alt="...">
        </div>
        <div class="col-md-8 p-3">
            <div class="card-body">
                <h4 class="card-title">${value.name}</h4>
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
                            <th scope="row">Storage:</th>
                            <td>${value.mainFeatures.storage}</td>
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
                            <th scope="row">Memory:</th>
                            <td>${value.mainFeatures.memory}</td>
                        </tr>
                    </tbody>
                    </table>
            </div>
        </div>
    `;
    container.appendChild(rowDiv);
    container.style.display = 'block';
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
                <h4 class="card-title">${value.phone_name}</h4>
                <button class="btn btn-dark mt-2" onclick="loadDetails('${value.slug}')">Explore</button>
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