
var city = localStorage.getItem("search");
var apiKey = "0846fd7d71c2829c591944b48eaefebf";

var apiUrlCitySearch = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
var searchFormEl = document.querySelector('#search-form');

var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

//var current = moment().format("MMM Do, YYYY");

function getCityName() {
  fetch(apiUrlCitySearch)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {

      $("h4 ").append (data.name)
      //$("h4").text(current);
      console.log(data)
      //console.log(cityName)
    
      //const celsius = kelvin - 273;
      //const fahrenheit = Math.floor(celsius * (9/5) + 32);
      $("#temp").append(data.main.temp)
      //temp = data.main.temp //city temprature 
      console.log(temp)
    
      $("#wind").append(data.wind.speed)
      wind = data.wind.speed //wind
      console.log(wind)

      $("#humidity").append(data.main.humidity) //humidity
      humidity =  data.main.humidity
      console.log(humidity)


      $("#uvIndex").append(data.main.uvIndex) //humidity
      uvIndex =  data.main.uvIndex
      console.log(humidity)
  
  })
  
}

function storeInput() {
  city = $("#search-input").val();
  localStorage.setItem("search", city);
  console.log(city);
}

function searchFormSubmit() {
  //event.preventDefault();
  var searchInputVal = document.querySelector('#search-input').value;
  console.log(searchInputVal)
  if (!searchInputVal) {
    console.error('You need to enter City!');
    return;
  }
    console.log(city);
    searchApi(searchInputVal);
}


$("#searchBtn").on("click", storeInput)

$( window ).on("load", getCityName )