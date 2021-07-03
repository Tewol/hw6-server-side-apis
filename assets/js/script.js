var city = localStorage.getItem("search");
numDays = 5;
var apiKey = "0846fd7d71c2829c591944b48eaefebf";

var apiUrlCitySearch = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
var apiFutureForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=" + numDays + "&appid=" + apiKey

var current = moment().format("MM/DD/YYYY");

//var lat = data.coord.lat
//var lon = data.coord.lon
//var uvURL= "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon




var dayOne = moment().add(1, 'days').format("MM/DD/YYYY");
var dayTwo = moment().add(2, 'days').format("MM/DD/YYYY");
var dayThree = moment().add(3, 'days').format("MM/DD/YYYY");
var dayFour = moment().add(4, 'days').format("MM/DD/YYYY");
var dayFive = moment().add(5, 'days').format("MM/DD/YYYY");

function getCityName() {
  
  fetch(apiUrlCitySearch)
    
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
      console.log(data)
      
      $("h2").append (data.name + ' (' ); //city Name
      $("h2").append (current + ')' + '&mdash;'); //current date

      icon = data.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
      $("#icon").html("<img src='" + iconUrl  + "'>");

      kelvin = data.main.temp;
      const celsius = kelvin - 273;
      const fahrenheit = (celsius * (9/5) + 32) .toFixed(2) ;

      $("#temp").append(fahrenheit + '&deg;' + "F") //current temprature
      $("#wind").append(data.wind.speed + " MPH") // Wind spead
      $("#humidity").append(data.main.humidity + ' &#37;' )//current date humidity
      

    // AJAX for UV Index:
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon,
        method: "GET"
      }).then(function (data) {
        console.log(data);
        console.log(data.value);
        //$(".uvIndex").text("UV Index:" + response.value);
        $("#uvIndex").append(data.value) //current date UV Index
        /*
        if (data.value <= 4){
            //favourable 
        }

        else if((data.value > 4 ) && (data.value < 8 )){

          //moderate
        }

        else{ (data.value >= 8){
          //sevier

        }*/


        
      });
  })
   
}

function getFutureWeather() {
  fetch(apiFutureForcast)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {

      //console.log(data)
      //Future 5 Days 
      $("#dayOne").append(data.list[0].dt_txt).text (dayOne)
      $("#dayTwo").append(data.list[1].dt_txt).text (dayTwo)
      $("#dayThree").append(data.list[2].dt_txt).text (dayThree)
      $("#dayFour").append(data.list[3].dt_txt).text (dayFour)
      $("#dayFive").append(data.list[4].dt_txt).text (dayFive)

      //Future 5 Days Icon
      iconOne = data.list[0].weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + iconOne + ".png";
      $("#dayOneIcon").html("<img src='" + iconUrl  + "'>");

      iconTwo = data.list[1].weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + iconTwo + ".png";
      $("#dayTwoIcon").html("<img src='" + iconUrl  + "'>");

      iconThree = data.list[2].weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + iconThree + ".png";
      $("#dayThreeIcon").html("<img src='" + iconUrl  + "'>");

      iconFour = data.list[3].weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + iconFour + ".png";
      $("#dayFourIcon").html("<img src='" + iconUrl  + "'>");

      iconFive = data.list[4].weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + iconFive + ".png";
      $("#dayFiveIcon").html("<img src='" + iconUrl  + "'>");

      //Temperature forcast for the next 5 days
      $("#dayOneTemp").append(((data.list[0].main.temp-273.5)*1.8+32).toFixed(2) + '&deg;' + "F")
      $("#dayTwoTemp").append(((data.list[1].main.temp-273.5)*1.8+32).toFixed(2) + '&deg;' + "F")
      $("#dayThreeTemp").append(((data.list[2].main.temp-273.5)*1.8+32).toFixed(2) + '&deg;' + "F")
      $("#dayFourTemp").append(((data.list[3].main.temp-273.5)*1.8+32).toFixed(2) + '&deg;' + "F")
      $("#dayFiveTemp").append(((data.list[4].main.temp-273.5)*1.8+32).toFixed(2) + '&deg;' + "F")   

      //Wind forcast for the next 5 days
      $("#dayOneWind").append(data.list[0].wind.speed + " MPH")
      $("#dayTwoWind").append(data.list[1].wind.speed + " MPH")
      $("#dayThreeWind").append(data.list[2].wind.speed + " MPH")
      $("#dayFourWind").append(data.list[3].wind.speed + " MPH")
      $("#dayFiveWind").append(data.list[4].wind.speed + " MPH")    

      //Humidity forcast for the next 5days
      $("#dayOneHumidity").append(data.list[0].main.humidity + ' &#37;' )
      $("#dayTwoHumidity").append(data.list[1].main.humidity + ' &#37;' )
      $("#dayThreeHumidity").append(data.list[2].main.humidity + ' &#37;' )
      $("#dayFourHumidity").append(data.list[3].main.humidity + ' &#37;' )
      $("#dayFiveHumidity").append(data.list[4].main.humidity + ' &#37;' )
  })
}

function storeInput() {
  city = $("#search-input").val();
  localStorage.setItem("search", city);
  console.log(city);
}

$("#searchBtn").on("click", storeInput)

$( window ).on("load", getCityName(), getFutureWeather() )