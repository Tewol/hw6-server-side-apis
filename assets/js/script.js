
var city = localStorage.getItem("search");
var apiKey = "0846fd7d71c2829c591944b48eaefebf";

var apiUrlCitySearch = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
var searchFormEl = document.querySelector('#search-form');

var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

function getPersonBio(id) {
  apiUrlgetPersonBio = "https://api.themoviedb.org/3/person/" + id + "?api_key=" + apiKey;
  fetch(apiUrlgetPersonBio)
      .then(function (response) {
          return response.json()
      })
      .then(function (data) {
          //console.log(data);
          //console.log(data.biography);
          //alert("Text: " 
          $("#personBio").text(data.biography);
          $("#personName").text(data.name);

      })
}

function getCityName() {
  fetch(apiUrlCitySearch)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
      $("h4 ").append (data.name)
      
      console.log(data)
      
      //console.log(cityName)
    
      $("#temp").append(data.main.temp)
      //temp = data.main.temp //city temprature 
      console.log(temp)

      $("#wind").append(data.wind.deg)
      $("#wind").append(data.wind.speed)
      wind = data.wind //wind
      console.log(wind)

      $("#humidity").append(data.main.humidity)//humidity
      humidity =  data.main.humidity
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