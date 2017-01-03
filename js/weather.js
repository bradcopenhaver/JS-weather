function City(name) {
  this.name = name;
  this.weatherData;
}

City.prototype.setWeatherData = function(data) {
  this.weatherData = data;
}

exports.cityModule = City;
