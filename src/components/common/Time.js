import React from 'react';
import { convertUnixToDate } from './helpers';

const Time = ({ unixTimestamp }) => {
  let fullDate = convertUnixToDate(unixTimestamp);
  let formattedTime = `${fullDate.getHours()}:${fullDate.getMinutes()}`;
  return <time>{formattedTime}</time>;
};

export default Time;
