/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

var getWeatherFromApi = async (lat, lon) => {
  if (typeof fetch === "function") {
    try {
      const uri = (lat && lon) ? encodeURI(`${baseURL}/weather?lat=${lat}&lon=${lon}`) :
                                 encodeURI(`${baseURL}/weather`);
      const response = await fetch(uri);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
  return {};
};

const getForecastFromApi = async (lat, lon) => {
  if (typeof fetch === "function") {
    try {
      const uri = (lat && lon) ? encodeURI(`${baseURL}/forecast?lat=${lat}&lon=${lon}`) :
                                 encodeURI(`${baseURL}/forecast`);
      const response = await fetch(uri);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      list: [],
      latitude: '',
      longitude: '',
    };
  }

  async updateState(location) {
    if (location) {
      const lat = Number((location.coords.latitude).toFixed(3));
      const lon = Number((location.coords.longitude).toFixed(3));
      try {
        const weather = await getWeatherFromApi(lat, lon);
        const forecast = await getForecastFromApi(lat, lon);
        this.setState({ icon: weather.icon.slice(0, -1),
                        list: forecast.list,
                        latitude: lat,
                        longitude: lon });
      } catch (e) {
        console.error("Failed to fetch weather data! Setting location...");
        this.setState({ latitude: lat,
                        longitude: lon });
      }
    } else {
      try {
        const weather = await getWeatherFromApi();
        const forecast = await getForecastFromApi();
        this.setState({ icon: weather.icon.slice(0, -1),
                        list: forecast.list });
      } catch (e) {
        console.error("Failed to fetch weather data!");
      }
    }
    return this.state;
  }

  async componentWillMount() {
    const _this = this;
    if (!navigator.geolocation){
      console.log("Geolocation is not supported by browser");
      _this.updateState();
    }

    function success(location) {
      console.log("Location accruired!");
      _this.updateState(location);
    }

    function error() {
      console.log("Unable to retrieve your location");
      _this.updateState();
    }

    navigator.geolocation && navigator.geolocation.getCurrentPosition(success, error);
  }

  render() {
    const { icon, list, latitude, longitude } = this.state;
    return (
      <div className="container">
        <h2>Todays weather ({new Date().toDateString()})</h2>
        { latitude && <h3>Latitude: {latitude} Longitude: {longitude}</h3> }
        <div className="icon">
          { icon && <img src={`img/${icon}.svg`} alt="icon" /> }
        </div>

        { list.length > 0 &&
          <div className="forecast">
            <h2>Forecast</h2>
            { list.map(day => (
              <div className="day" key={day.dt}>
                <div className="icon">
                  { day.weather[0].icon && <img src={`img/${day.weather[0].icon.slice(0, -1)}.svg`} alt="icon" /> }
                </div>
                <div className="date">
                  { day.dt_txt.substring(11) }
                </div>
              </div>
            )) }
          </div>
        }
      </div>
    );
  }
}

export default Weather;
