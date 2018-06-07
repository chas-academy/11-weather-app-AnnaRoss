import React from 'react';
import { Temperature, Direction } from '..';

const HourInterval = ({ data, isFahrenheit }) => {
  const {
    weather,
    time,
    temp,
    main: { humidity },
    wind: { speed: windspeed, deg: winddeg }
  } = data;

  let rain = 0;
  if (data['rain'] && data['rain']['3h'])
    rain = data['rain']['3h'].toFixed(2).valueOf();

  return (
    <tr className="hour-interval">
      <th scope="row" className="th-time">
        {time}
      </th>
      <td>
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
          title={weather[0].description}
          alt={weather[0].description}
        />
      </td>
      <td>
        <Temperature temp={temp} isFahrenheit={isFahrenheit} />
      </td>
      <td>
        {rain}
        <span className="unit">mm</span>
      </td>
      <td>
        {humidity}
        <span className="unit">%</span>
      </td>
      <td>
        <span>
          {Math.round(windspeed)}
          <span className="unit">m/s</span>
        </span>
        <Direction degrees={winddeg} />
      </td>
    </tr>
  );
};

export default HourInterval;
