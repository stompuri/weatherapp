/* global navigator */
import React from 'react';
import Today from './Today';
import Forecast from './Forecast';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async (lat, lon) => {
  if (typeof fetch === 'function') {
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
  if (typeof fetch === 'function') {
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
      name: '',
      desc: '',
      icon: '',
      temp: '',
      list: [],
      latitude: '',
      longitude: '',
    };
  }

  async componentWillMount() {
    const that = this;
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by browser');
      that.updateState();
    }

    function success(location) {
      console.log('Location accruired!');
      that.updateState(location);
    }

    function error() {
      console.log('Unable to retrieve your location');
      that.updateState();
    }

    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  async updateState(location) {
    if (location) {
      const lat = Number((location.coords.latitude).toFixed(3));
      const lon = Number((location.coords.longitude).toFixed(3));
      try {
        const today = await getWeatherFromApi(lat, lon);
        const weather = today.weather[0];
        const forecast = await getForecastFromApi(lat, lon);
        this.setState({
          name: today.name,
          desc: weather.description,
          icon: weather.icon.slice(0, -1),
          temp: today.main.temp - 273.15,
          list: forecast.list,
          latitude: lat,
          longitude: lon,
        });
      } catch (e) {
        console.error('Failed to fetch weather data! Setting location...');
        this.setState({ latitude: lat, longitude: lon });
      }
    } else {
      try {
        // Fallback to fetch weather data using predefined city (Helsinki)
        const today = await getWeatherFromApi();
        const weather = today.weather[0];
        const forecast = await getForecastFromApi();
        this.setState({
          name: `<use defaul> ${today.name}`,
          desc: weather.description,
          icon: weather.icon.slice(0, -1),
          temp: today.main.temp - 273.15,
          list: forecast.list,
          latitude: 'N/A',
          longitude: 'N/A',
        });
      } catch (e) {
        console.error('Failed to fetch weather data!');
      }
    }
    return this.state;
  }

  render() {
    return (
      <div className="container">
        <Today state={this.state} />
        <Forecast state={this.state} />
      </div>
    );
  }
}

export default Weather;
