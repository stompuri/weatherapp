'use strict';

// const Promise = require('promise');
// const async = require('async');
// const debug = require('debug')('weathermap');
const Koa = require('koa');
const Router = require('koa-router');
const fetch = require('node-fetch');
const cors = require('kcors');

const APP_ID = process.env.APPID || '7d38bb13c9fc0c19fe6848fd3916974d';
const MAP_URI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const PORT = process.env.PORT || 9000;

const app = new Koa();
const router = new Router();

app.use(cors());

const fetchWeatherByCoord = async (lat, lon) => {
  const response = await fetch(`${MAP_URI}/weather?lat=${lat}&lon=${lon}&appid=${APP_ID}&`);
  return response ? response.json() : {};
};

const fetchWeather = async (city) => {
  if (!city)
    city = process.env.TARGET_CITY || 'Helsinki,fi';
  const response = await fetch(`${MAP_URI}/weather?q=${city}&appid=${APP_ID}&`);
  return response ? response.json() : {};
};

const fetchForecastByCoord = async (lat, lon) => {
  const response = await fetch(`${MAP_URI}/forecast?lat=${lat}&lon=${lon}&appid=${APP_ID}&`);
  return response ? response.json() : {};
};

const fetchForecast = async (city) => {
  if (!city)
    city = process.env.TARGET_CITY || 'Helsinki,fi';
  const response = await fetch(`${MAP_URI}/forecast?q=${city}&appid=${APP_ID}&`);
  return response ? response.json() : {};
};

router.get('/api/weather', async ctx => {
  var weatherData;
  if (ctx.request.query.lat && ctx.request.query.lon) {
    weatherData = await fetchWeatherByCoord(ctx.request.query.lat, ctx.request.query.lon);
  } else {
    weatherData = await fetchWeather(ctx.request.query.city);
  }
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.weather ? weatherData.weather[0] : {};
});

router.get('/api/forecast', async ctx => {
  var forecastData;
  if (ctx.request.query.lat && ctx.request.query.lon) {
    forecastData = await fetchForecastByCoord(ctx.request.query.lat, ctx.request.query.lon);
  } else {
    forecastData = await fetchForecast(ctx.request.query.city);
  }
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = forecastData ? forecastData : {};
});

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(PORT);
console.log(`App listening on port ${PORT}`);

function stop() {
  server.close();
}

module.exports = server;
module.exports.stop = stop;
