const apiKey = "e07d5dbab7644d46beb153206232608";
document.addEventListener("DOMContentLoaded", function (){
    fetch("http://api.weatherapi.com/v1/forecast.json?key=" + apiKey + "&q=auto:ip&days=5")
        .then(resp => resp.json().then(obj => console.log(obj))).catch(err => console.error(err));

    document.getElementById("add-city").addEventListener("click", function (ev){
        ev.preventDefault();
        document.querySelector(".module__form").removeAttribute("hidden");
    });
});