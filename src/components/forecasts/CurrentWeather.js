import React from 'react';
import { Temperature, Direction, Time } from '..';

const CurrentWeather = ({ data, isFahrenheit }) => {
  const {
    weather,
    sys: { sunrise, sunset },
    main: { temp, humidity },
    wind: { speed: windspeed, deg: winddeg }
  } = data;

  return (
    <div className="current-weather">
      {<Temperature temp={temp} isFahrenheit={isFahrenheit} />}
      <figure>
        <img
          src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
          title={weather[0].description}
          alt={weather[0].description}
        />
        <figcaption>{weather[0].description}</figcaption>
      </figure>
      <ul>
        <li>
          <span>Wind</span>
          <span>
            <span>{Math.round(windspeed)}</span>
            <span className="unit">m/s</span>
            <Direction degrees={winddeg} />
          </span>
        </li>
        <li>
          <span>Humidity</span>
          <span>
            <span>{humidity}</span>
            <span className="unit">%</span>
          </span>
        </li>
        <li className="sun">
          <span>sunrise</span>
          <span>
            <Time unixTimestamp={sunrise} />
          </span>
        </li>
        <li className="sun">
          <span>sunset</span>
          <span>
            <Time unixTimestamp={sunset} />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default CurrentWeather;
