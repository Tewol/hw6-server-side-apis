var city = localStorage.getItem("search");
numDays = 5;
var apiKey = "0846fd7d71c2829c591944b48eaefebf";

var apiUrlCitySearch = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
var apiFutureForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=" + numDays + "&appid=" + apiKey


var searchFormEl = document.querySelector('#search-form');

var current = moment().format("MM/DD/YYYY");


var dayOne = moment().add(1, 'days').format("MM/DD/YYYY");
var dayTwo = moment().add(2, 'days').format("MM/DD/YYYY");
var dayThree = moment().add(3, 'days').format("MM/DD/YYYY");
var dayFour = moment().add(4, 'days').format("MM/DD/YYYY");
var dayFive = moment().add(5, 'days').format("MM/DD/YYYY");


$("#currentDay").text(current);

function getCityName() {
  fetch(apiUrlCitySearch)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {

      $("h2").append (data.name).text(current); 
    
      //const celsius = kelvin - 273;
      //const fahrenheit = Math.floor(celsius * (9/5) + 32);
      $("#temp").append(data.main.temp)
      $("#wind").append(data.wind.speed)
      $("#humidity").append(data.main.humidity) //humidity
      $("#uvIndex").append(data.weather[0].icon) //
    
  })
  
}

function getFutureWeather() {
  fetch(apiFutureForcast)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {

      console.log(data)

      //Future 5 Days 
      $("#dayOne").append(data.list[0].dt_txt).text (dayOne)
      $("#dayTwo").append(data.list[1].dt_txt).text (dayTwo)
      $("#dayThree").append(data.list[2].dt_txt).text (dayThree)
      $("#dayFour").append(data.list[3].dt_txt).text (dayFour)
      $("#dayFive").append(data.list[4].dt_txt).text (dayFive)
      
     
      //Temperature forcast for the next 5 days
      $("#dayOneTemp").append(data.list[0].main.temp)
      $("#dayTwoTemp").append(data.list[1].main.temp)
      $("#dayThreeTemp").append(data.list[2].main.temp)
      $("#dayFourTemp").append(data.list[3].main.temp)
      $("#dayFiveTemp").append(data.list[4].main.temp)

      //Wind forcast for the next 5 days
      $("#dayOneWind").append(data.list[0].wind.deg)
      $("#dayTwoWind").append(data.list[1].wind.deg)
      $("#dayThreeWind").append(data.list[2].wind.deg)
      $("#dayFourWind").append(data.list[3].wind.deg)
      $("#dayFiveWind").append(data.list[4].wind.deg)    

      //Humidity forcast for the next 5days
      $("#dayOneHumidity").append(data.list[0].main.humidity)
      $("#dayTwoHumidity").append(data.list[1].main.humidity)
      $("#dayThreeHumidity").append(data.list[2].main.humidity)
      $("#dayFourHumidity").append(data.list[3].main.humidity)
      $("#dayFiveHumidity").append(data.list[4].main.humidity)
  })
  
}

function storeInput() {
  city = $("#search-input").val();
  localStorage.setItem("search", city);
  console.log(city);
}

/*
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
*/


$("#searchBtn").on("click", storeInput)

$( window ).on("load", getCityName(), getFutureWeather() )