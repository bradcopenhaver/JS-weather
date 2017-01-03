var apiKey = require('./../.env').apiKey;

$(document).ready(function(){
  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey, function(response) {
      $('.showWeather').text("the weather in " + city + " is " + response.weather[0].main);
    });
  });
});
