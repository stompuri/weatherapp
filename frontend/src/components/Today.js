"use strict";
import React from 'react';

class Today extends React.Component {
  render() {
    const { name, desc, icon, temp, list, latitude, longitude } = this.props.state;
    const d = new Date();
    const hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
    const mins = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    const time = `${hours}:${mins}`;
    return (
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
    );
  }
}

export default Today;
