const api = {
key: "c2291b7c48f3e9bd45f9fbf89ceffacc",
base: "https://api.openweathermap.org/data/2.5/"
} 


// const api list is an object not an array it uses {}. 
// it uses name to acces members ((api.key returns the string 
// value within ""))

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

function getInput (event) {
   event.preventDefault();
   if (event.type == "click") {
    getData(search.value);
    console.log(search.value);
    
}
}

function getData () {
    fetch(`${api.base}weather?q=${search.value}&appid=${api.key}&units=imperial`)
        .then(response => {
            return response.json();
         }) .then(displayData);
        }

function displayData (response) {
    // console.log(response); 
    if (response.cod === "404") {
        const error = document.querySelector(".error");
        error.textContent = "Please enter a valid city";
        search.value = "";

    } else {
        const city = document.querySelector(".city");
        city.innerText = `${response.name}, ${response.sys.country}`;
        




        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFunction(today);

        const temp = document.querySelector(".temp");
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)}  <span>°F</span>`; 

        const weather = document.querySelector(".weather");
        weather.innerText = `Weather: ${response.weather[0].main}`;

        const tempRange = document.querySelector(".temp-range");
        tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}°F/${Math.round(response.main.temp_max)} °F `;

        const weatherIcon = document.querySelector(".weather-icon");
        const iconURL = "https://openweathermap.org/img/wn/";
        weatherIcon.src = iconURL + response.weather[0].icon + "@2x" + ".png"; 


    }
}
function dateFunction (d) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
"July", "Aug", "Sep", "Oct", "Nov", "Dec"];

let days = ["Sunday", "Monday", "Tuesday", "Wednedsay", 
"Thursday", "Friday", "Saturday"];

let day = days[d.getDay()];
let date = d.getDate();
let month = months[d.getMonth()];
let year = d.getFullYear();


return `${day}, ${date}, ${month}, ${year}`;

}
