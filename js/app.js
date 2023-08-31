const apiKey = "e07d5dbab7644d46beb153206232608";
const weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const body = document.querySelector("body");
class futureDay {
    constructor(dayName, temperature, iconImg) {
        this.dayName = dayName;
        this.temperature = temperature;
        this.iconImg = iconImg;
    }
}

document.addEventListener("DOMContentLoaded", function (){

    body.className = "loading";
    fetchData().then(function (response){
        renderModule(response);
    });
});

// show search module
// document.getElementById("add-city").addEventListener("click", function (ev){
//     ev.preventDefault();
//     document.querySelector(".module__form").removeAttribute("hidden");
// });
//
// // hide search module
// document.querySelector(".module__form").querySelector(".btn--close").addEventListener("click", function (ev){
//     ev.preventDefault();
//     document.querySelector(".module__form").setAttribute("hidden", "");
// });
//
// //hide weather module
// document.querySelector(".module__weather").querySelector(".btn--close").addEventListener("click", function (ev){
//     ev.preventDefault();
//     ev.currentTarget.parentElement.setAttribute("hidden", "");
// });
//
// document.querySelector("form").addEventListener("click", function (ev) {
//     ev.preventDefault();
//     //TODO fetch and show anotcher module
// });


///////////////////// functions
function fetchData(city = "auto:ip"){

    // body.className = "loading";
    return fetch("http://api.weatherapi.com/v1/forecast.json?key=" + apiKey + "&q=" + city + "&days=5")
        .then(function (resp){
            if(!resp.ok) {
                alert("Something went wrong")
            }
            return resp.json();
        });
}
function renderModule(obj) {
    const container = document.querySelector("section.container");
    const firstCity = container.querySelector(".module__weather");
    const newCity = firstCity.cloneNode(true);
    container.appendChild(newCity);

    const icon = obj.current.condition.icon;
    newCity.querySelector(".weather__icon").querySelector("img").setAttribute("src", buildImgPath(icon));
    //temp
    newCity.querySelector(".temperature__value").innerText = obj.current.temp_c
    //city
    newCity.querySelector(".city__name").innerText = obj.location.name
    //details
    newCity.querySelector(".pressure__value").innerText = obj.current.pressure_mb + " hPa";
    newCity.querySelector(".humidity__value").innerText = obj.current.humidity + " %";
    newCity.querySelector(".wind-speed__value").innerText = obj.current.wind_kph + " km/h"

    // furure days fetched data
    const futureDays = [];

    for (let i = 0; i < obj.forecast.forecastday.length; i++) {
        const maxtempC = obj.forecast.forecastday[i].day.maxtemp_c;
        const date = obj.forecast.forecastday[i].date;
        const icon = obj.forecast.forecastday[i].day.condition.icon;
        // const conditionCode = obj.forecast.forecastday[i].day.condition.code;
        // const conditionText = obj.forecast.forecastday[i].day.condition.text;

        const day = new futureDay(getDayName(date), maxtempC, buildImgPath(icon));
        futureDays.push(day);
    }

    // future days DOM objects
    const nextDays = newCity.querySelector(".weather__forecast").querySelectorAll("li");
    for (let i = 0; i < nextDays.length; i++) {
        const dayName = nextDays[i].querySelector(".day").innerText = futureDays[i].dayName;
        const icon = nextDays[i].querySelector("img").setAttribute("src", futureDays[i].iconImg);
        const temperature = nextDays[i].querySelector(".temperature__value").innerText = futureDays[i].temperature;
    }

    body.classList.remove("loading");
    newCity.removeAttribute("hidden");
}

function getDayName(stringDate) {
    const date = new Date(stringDate);
    let dayOfWeek = weekDayNames[date.getDay()];
    return dayOfWeek;
}

function buildImgPath(pathFromAPI) {
    const iconPath = pathFromAPI.replace("//cdn.weatherapi.com/weather", "assets");
    return iconPath;
}

