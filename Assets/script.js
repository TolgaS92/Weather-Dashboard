let cityPicked = "";
let issueContainer = document.getElementById('issues');
const date = moment().format("MMMM Do YYYY");


function getApi() {
    const requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityPicked + "&units=imperial&appid=1690177fc6acff4c67ec2d90d2b1d0c6";

    fetch(requestUrl)
        .then(function (data) {
            return data.json();
        }).then(function (data) {
            console.log(data);
            $("#fetch").empty();
            let today = data;
            let jumbo = document.getElementById("#fetch");
            let infoJumbo = $("<div>");
            let day = $("#fetch-elm").addClass("date-of");
            let dayOf = $("<p>").addClass("actual-date").text(date);
            let expCity = $("<p>").addClass("exp-city").text(" Weather for: ").append(cityPicked);
            let degree = $("<p>").addClass("lead").text(Math.round(today.main.temp) + "˚F");
            console.log(degree);
            let humid = $("<p>").addClass("humidity").text("Humidity: " + today.main.humidity + "%");
            let wind = $("<p>").addClass("wind").text("Wind Speed: " + Math.round(today.wind.speed) + " mph");
            $("#fetch").append(infoJumbo.append(day, dayOf, expCity, degree, humid, wind));
            $("#one-day").append(jumbo);


        })
}

function fiveDaysApi() {
    const urlRequest = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityPicked + "&units=imperial&appid=45b6598a4a1bd706ba39bf0f2ac2fcf4";

    fetch(urlRequest)
        .then(function (data) {
            return data.json();
        }).then(function (data) {
            console.log(data);
            console.log(data.list[0].dt_txt);
            console.log(data.list[0].main.temp + "˚F");
            console.log(data.list[0].main.humidity + " %");
            console.log(data.list[0].wind.speed + " mph");
            console.log(data.list[8].dt_txt);
            console.log(data.list[8].main.temp + "˚F");
            console.log(data.list[8].main.humidity + " %");
            console.log(data.list[8].wind.speed + " mph");
            console.log(data.list[16].dt_txt);
            console.log(data.list[16].main.temp + "˚F");
            console.log(data.list[16].main.humidity + " %");
            console.log(data.list[16].wind.speed + " mph");
            console.log(data.list[24].dt_txt);
            console.log(data.list[24].main.temp + "˚F");
            console.log(data.list[24].main.humidity + " %");
            console.log(data.list[24].wind.speed + " mph");
            console.log(data.list[32].dt_txt);
            console.log(data.list[32].main.temp + "˚F");
            console.log(data.list[32].main.humidity + " %");
            console.log(data.list[32].wind.speed + " mph");
        })
}
function searchedCities() {
    $("#searched").empty();
    for (let i = 0; i < cityPicked.length; i++) {
        let el = $("<h4 class='city'>");
        el.attr(cityPicked[i]);
        el.text(cityPicked[i]);
        $("#searched").append(el);
    }
}


$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    cityPicked = $("#given-input").val().trim();

    if (!(JSON.parse(localStorage.getItem("city")) || []).includes(cityPicked)) {
        (JSON.parse(localStorage.getItem("city")) || []).push(cityPicked);
    }
    if ((JSON.parse(localStorage.getItem("city")) || []).length > 5) {
        (JSON.parse(localStorage.getItem("city")) || []).shift();
    }

    searchedCities();
    getApi();
    fiveDaysApi()
    localStorage.setItem("city", JSON.stringify((JSON.parse(localStorage.getItem("city")) || [])));

    $("#given-input").val("");
    $("#issues").css('display', 'block');
});

searchedCities();


$(document).on("click", ".city", function () {
    cityPicked = $(this).text();
    getApi();
    fiveDaysApi()
});