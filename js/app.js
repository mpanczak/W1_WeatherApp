const apiKey = "e07d5dbab7644d46beb153206232608";
fetch("http://api.weatherapi.com/v1/forecast.json?key=" + apiKey + "&q=auto:ip&days=5")
    .then(resp => resp.json()
        .then(obj => {

            //show module
            document.querySelector(".module__weather").removeAttribute("hidden");

            // current day
            //icon
            const conditionCode = obj.current.condition.code;
            const conditionText = obj.current.condition.text;
            const icon = obj.current.condition.icon;
            document.querySelector(".weather__icon").querySelector("img").setAttribute("src", "assets/icons/clear-day.svg")
            //temp
            document.querySelector(".temperature__value").innerText = obj.current.temp_c
            //city
            document.querySelector(".city__name").innerText = obj.location.name
            //details
            document.querySelector(".pressure__value").innerText = obj.current.pressure_mb;
            document.querySelector(".humidity__value").innerText = obj.current.humidity
            document.querySelector(".wind-speed__value").innerText = obj.current.wind_mph

            // furure days fetched data
            for (let i = 0; i < obj.forecast.forecastday.length; i++) {
                const avgtempC = obj.forecast.forecastday[i].day.avgtemp_c;
                const date = obj.forecast.forecastday[i].date;
                const icon = obj.forecast.forecastday[i].day.condition.icon;
                const conditionCode = obj.forecast.forecastday[i].day.condition.code;
                const conditionText = obj.forecast.forecastday[i].day.condition.text;
            }

            // future days DOM objects
            const nextDays = document.querySelector(".weather__forecast").querySelectorAll("li");
            for (let i = 0; i < nextDays.length; i++) {
                const dayName = nextDays[i].querySelector(".day").innerText;
                const icon = nextDays[i].querySelector("img").getAttribute("src");
                const temperature = nextDays[i].querySelector(".temperature__value").innerText;
            }

        }))
    .catch(err => console.error(err));

// show search module
document.getElementById("add-city").addEventListener("click", function (ev){
    ev.preventDefault();
    document.querySelector(".module__form").removeAttribute("hidden");
});

// hide search module
document.querySelector(".module__form").querySelector(".btn--close").addEventListener("click", function (ev){
    ev.preventDefault();
    document.querySelector(".module__form").setAttribute("hidden", "");
});

// console.log(new Date().getDay());
// console.log(new Date("2023-08-31").getDay());
