function City(name) {
  this.name = name;
  this.weatherData;
  this.farenheit;
  this.celsius;
}

City.prototype.setWeatherData = function(data) {
  this.weatherData = data;
}

City.prototype.convert = function () {
  var kelvin = this.weatherData.main.temp;
  this.farenheit = (kelvin * (9/5) - 459.67).toFixed(1);
  this.celsius = (kelvin - 273.15).toFixed(1);
};


exports.cityModule = City;
