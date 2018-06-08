/* global navigator */
import React from 'react';

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
    const { name, desc, icon, temp, list, latitude, longitude } = this.state;
    const d = new Date();
    const hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
    const mins = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    const time = `${hours}:${mins}`;
    return (
      <div className="container">
        <div className="today">
          <h2>
            Todays weather { new Date().toDateString() } at {time}
          </h2>
          { latitude && <h3>Latitude: {latitude} Longitude: {longitude}</h3> }
          { name &&
            <h3>
              {name}
              { temp > 0 && <div className="temp-char">+</div> }
              { temp < 0 && <div className="temp-char">-</div> }
              {temp} C
            </h3>
          }
          { desc &&
            <h3 className="description">{desc}</h3>
          }
          <div className="icon">
            { icon && <img src={`img/${icon}.svg`} alt="icon" /> }
          </div>
        </div>

        { list.length > 0 &&
          <div className="forecast">
            <h2>Forecast</h2>
            { list.map(day => (
              <div className="day" key={day.dt}>
                <div className="date">
                  { day.dt_txt.substring(11) }
                </div>
                <div className="icon">
                  { day.weather[0].icon && <img src={`img/${day.weather[0].icon.slice(0, -1)}.svg`} alt="icon" /> }
                </div>
                { day.main.temp &&
                  <div className="temp">
                    { temp > 0 && <div className="temp-char">+</div> }
                    { temp < 0 && <div className="temp-char">-</div> }
                    { Math.round((day.main.temp - 273.15) * 10) / 10} C
                  </div>
                }
                <hr />
              </div>
            )) }
          </div>
        }
      </div>
    );
  }
}

export default Weather;
