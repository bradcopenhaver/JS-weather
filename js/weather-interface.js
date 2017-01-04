var apiKey = require('./../.env').apiKey;
var City = require('./../js/weather.js').cityModule;

$(document).ready(function(){

  $('form').submit(function(event) {
    event.preventDefault();
    $('.output').html("");
    var city = $('#location').val();
    var currentCity = new City(city);
    $('#location').val("");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
      currentCity.setWeatherData(response);
      $('.currentCity').html("<h3>Current City: " + city + "</h3>");
    }).fail(function(error) {
      $('.currentCity').html("<h3>" + error.responseJSON.message + "</h3>");
    });
    $.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=imperial&cnt=5&appid=' + apiKey).then(function(response) {
      currentCity.setForecastData(response);
    });
    $('.buttons').show();

    $('#weather').click(function() {
      $('.output').html("<h3>Current Weather: " + currentCity.weatherData.weather[0].main + "</h3>");
    });
    $('#humidity').click(function() {
      $('.output').html("<h3>Current Humidity: " + currentCity.weatherData.main.humidity + "%</h3>");
    });
    $('#temperature').click(function() {
      currentCity.convert();
      $('.output').html("<h3>Current Temperature: " + currentCity.farenheit + " °F & " + currentCity.celsius + " °C</h3>");
    });
    $('#forecast').click(function() {
      $('.output').html("<h3 class='text'>Five-Day Forecast:</h3>");
      for(i=0; i<5; i++){
        $('.output').append("<div class='forecast'><h3>Day " + (i+1) + ": " + currentCity.forecastData.list[i].weather[0].main + "</h3><img src=http://openweathermap.org/img/w/" + currentCity.forecastData.list[i].weather[0].icon + ".png><h5>High: " + currentCity.forecastData.list[i].temp.max + " °F</h5><h5>Low: " + currentCity.forecastData.list[i].temp.min + " °F</h5></div>");
      }
    });
  });
});
