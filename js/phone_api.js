const getResult = searchKeyword => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchKeyword}`)
        .then(response => response.json())
        .then(values => showResults(values.data))
};

const showResults = resultDatabase => {
    for (data of resultDatabase) {
        console.log(data);
    }
};

document.getElementById('searchBtn').addEventListener('click', function () {
    const searchKeyword = document.getElementById('searchField').value;
    getResult(searchKeyword);
});