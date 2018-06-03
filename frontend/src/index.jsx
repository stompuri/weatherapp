/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getForecastFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/forecast`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      list: [],
    };
  }

  async componentWillMount() {
    const weather = await getWeatherFromApi();
    const forecast = await getForecastFromApi();
    this.setState({ icon: weather.icon.slice(0, -1), list: forecast.list });
  }

  render() {
    const { icon, list } = this.state;
    return (
      <div className="container">
        <h2>Todays weather ({new Date().toDateString()})</h2>
        <div className="icon">
          { icon && <img src={`/img/${icon}.svg`} alt="icon" /> }
        </div>

        { list.length > 0 &&
          <div className="forecast">
            <h2>Forecast</h2>
            { list.map(day => (
              <div className="day" key={day.dt}>
                <div className="icon">
                  { day.weather[0].icon && <img src={`/img/${day.weather[0].icon.slice(0, -1)}.svg`} alt="icon" /> }
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

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
