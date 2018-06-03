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
const TARGET_CITY = process.env.TARGET_CITY || 'Helsinki,fi';
const PORT = process.env.PORT || 9000;

const app = new Koa();
const router = new Router();

app.use(cors());

const fetchWeather = async () => {
  // api.openweathermap.org/data/2.5/weather?q={city name},{country code}
  const endpoint = `${MAP_URI}/weather?q=${TARGET_CITY}&appid=${APP_ID}&`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

const fetchForecast = async () => {
  // api.openweathermap.org/data/2.5/forecast?q={city name},{country code}
  const endpoint = `${MAP_URI}/forecast?q=${TARGET_CITY}&appid=${APP_ID}&`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

router.get('/api/weather', async ctx => {
  const weatherData = await fetchWeather();
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.weather ? weatherData.weather[0] : {};
});

router.get('/api/forecast', async ctx => {
  const forecastData = await fetchForecast();
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = forecastData ? forecastData : {};
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT);

console.log(`App listening on port ${PORT}`);
