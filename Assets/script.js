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
            let today = data;
            let jumbo = document.getElementById("#fetch");
            let infoJumbo = $("<div>");
            let day = $("#fetch-elm").addClass("date-of");
            let dayOf = $("<p>").addClass("actual-date").text(date + " Weather for: ").append(cityPicked)
            let degree = $("#temperature").text(Math.round(today.main.temp) + "˚F");
            let humid = $("<p>").addClass("humidity").text("Humidity: " + today.main.humidity + "%");
            let wind = $("<p>").addClass("wind").text("Wind Speed: " + Math.round(today.wind.speed) + " mph");
            $("#fetch").append(infoJumbo.append(day, dayOf, degree, humid, wind));
            $("#one-day").append(jumbo);


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
    localStorage.setItem("city", JSON.stringify((JSON.parse(localStorage.getItem("city")) || [])));

    $("#given-input").val("");
});

searchedCities();


$(document).on("click", ".city", function () {
    cityPicked = $(this).text();
    getApi();
});