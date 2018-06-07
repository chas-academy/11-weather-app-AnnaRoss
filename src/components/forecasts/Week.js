import React from 'react';
import { Day } from '..';

const Week = ({ data, isFahrenheit, ...props }) => (
  <table className="table">
    <caption>
      <span>
        The weather<span> a couple of days ahead </span>
      </span>
      <span>
        at current position: <span>{props.city}</span>
      </span>
    </caption>
    {Object.values(data).map(
      (data, i) =>
        i === 0 ? null : (
          <Day
            key={i}
            day={data[0].dt}
            data={data}
            isFahrenheit={isFahrenheit}
          />
        )
    )}
  </table>
);

export default Week;
