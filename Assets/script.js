/* var container = $("<div>");
var p = $("<p>");
container.addClass("row");
p.addClass("col-sm-6");
container.append(p);

$(".container").append(container); */

/* var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("http://dataservice.accuweather.com/forecasts/v1/daily/5day/2245013?apikey=e0K4ujKd11MAA5S0Vxj9i5sjhNKy7HKS", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error)); */

var issueContainer = document.getElementById('issues');
var fetchButton = document.getElementById('fetch-button');

function getApi() {
    var requestUrl = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/2245013?apikey=e0K4ujKd11MAA5S0Vxj9i5sjhNKy7HKS';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var date = document.createElement('h2');
                var degree = document.createElement('h3');
                cityName.textContent = data[i].date;
                degree.textContent = data[i].temperature;
                container.append(date);
                p.append(degree);
                container.html(date);
                p.html(degree);
            }
        });
}
fetchButton.addEventListener('click', getApi);