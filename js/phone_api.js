const getResult = searchKeyword => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchKeyword}`)
        .then(response => response.json())
        .then(values => showResults(values.data))
};

const showResults = resultDatabase => {
    const container = document.getElementById('resultContainer');
    container.textContent = "";
    for (data of resultDatabase) {
        createResultCard(data);
    }
};

const createResultCard = value => {
    const container = document.getElementById('resultContainer');
    const colDiv = document.createElement('div');
    colDiv.innerHTML = `
        <div class="card h-100">
            <div class="w-50 mx-auto">
                <img src="${value.image}" class="card-img-top img-fluid" alt="...">
            </div>
            <div class="card-body text-center">
                <h3 class="card-title">${value.phone_name}</h3>
            </div>
            <div class="card-footer bg-brand text-center">
                <h5 class="card-title">Brand: ${value.brand}</h5>
            </div>
        </div>`;
    container.appendChild(colDiv);
};

document.getElementById('searchBtn').addEventListener('click', function () {
    const searchKeyword = document.getElementById('searchField').value;
    getResult(searchKeyword);
});