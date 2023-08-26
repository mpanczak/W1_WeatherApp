const apiKey = "e07d5dbab7644d46beb153206232608";
document.addEventListener("DOMContentLoaded", function (){
    fetch("http://api.weatherapi.com/v1/forecast.json?key=" + apiKey + "&q=auto:ip&days=5")
        .then(resp => resp.json()
            .then(obj => {
                console.log(obj);

                //show module
                document.querySelector(".module__weather").removeAttribute("hidden");

                //icon
                console.log(obj.current.condition.text);
                console.log(obj.current.condition.icon);
                document.querySelector(".weather__icon").querySelector("img").setAttribute("src", "assets/icons/clear-day.svg")

                //temp
                document.querySelector(".temperature__value").innerText = obj.current.temp_c

                //city
                document.querySelector(".city__name").innerText = obj.location.name

                //details
                document.querySelector(".pressure__value").innerText = obj.current.pressure_mb;
                document.querySelector(".humidity__value").innerText = obj.current.humidity
                document.querySelector(".wind-speed__value").innerText = obj.current.wind_mph

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
});


