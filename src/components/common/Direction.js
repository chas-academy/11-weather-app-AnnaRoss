import React from 'react';

const Direction = ({ degrees }) => {
  const value = Math.floor(degrees / 22.5 + 0.5);
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW'
  ];
  const direction = directions[value % 16];

  return <span className="direction">{direction}</span>;
};

export default Direction;
