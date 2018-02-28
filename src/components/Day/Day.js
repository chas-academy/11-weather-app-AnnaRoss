import React from 'react';

import { HourInterval } from '../HourInterval/HourInterval';

export const Day = (props) => {
    return (
        <React.Fragment>
            <h2>{props.forecast[0].day}</h2>
            <ul>
            { props.forecast.map(hourInterval => <HourInterval weather={hourInterval} />) }
            </ul>
        </React.Fragment>
    )
}