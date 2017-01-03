var apiKey = require('./../.env').apiKey;
var City = require('./../js/weather.js').cityModule;

$(document).ready(function(){

  $('#submit').click(function() {
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
    $.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey).then(function(response) {
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
      $('.output').html("<h3>Five-Day Forecast:</h3>");
      for(i=1; i<6; i++){
        $('.output').append("<h3>Day " + i + ": " + currentCity.forecastData.list[i].weather[0].main + ".</h3>");
      }
    });
  });
});
