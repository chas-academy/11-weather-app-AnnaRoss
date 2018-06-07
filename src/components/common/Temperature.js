import React from 'react';

const Temperature = ({ temp, isFahrenheit }) => {
  let temperature;
  let unit;

  isFahrenheit
    ? (unit = 'F') && (temperature = ((temp * 9) / 5 + 32).toFixed(1))
    : (unit = 'C') && (temperature = Number.parseFloat(temp).toFixed(1));

  return (
    <span className="temp">
      <span>{temperature}</span>
      <span>°{unit}</span>
    </span>
  );
};

export default Temperature;
