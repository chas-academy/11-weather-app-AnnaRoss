import React, { Component } from 'react';

import './Forecast.css';

import { Day } from '../Day/Day';

class Forecast extends Component {
    constructor() {
        super();

        this.state = {
            query: '',
            city: '',
            country: '',
            coordLat: 0,
            coordLong: 0,
            weather: [],
            temp: 0,
            humidity: 0,
            windspeed: 0,
            winddeg: 0,
            week: {},
            isLoading: false
        }

        this.updateCoordinates = this.updateCoordinates.bind(this);
        this.fetchWeatherByCoordinates = this.fetchWeatherByCoordinates.bind(this);

        this.extractData = this.extractData.bind(this);
        this.fetchWeatherFor5days = this.fetchWeatherFor5days.bind(this);
    }

    componentWillMount() {
        this.updateCoordinates();
    }

    updateCoordinates() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                coordLat: position.coords.latitude,
                coordLong: position.coords.longitude
            }, this.fetchWeatherByCoordinates)
        });
    }

    fetchWeatherByCoordinates() {
        this.setState({
            isLoading: true
        });

        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.coordLat}&lon=${this.state.coordLong}&APPID=${process.env.REACT_APP_OW_APP_ID}`)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    city: response.name,
                    weather: response.weather,
                    temp: response.main.temp,
                    humidity: response.main.humidity,
                    windspeed: response.wind.speed,
                    winddeg: response.wind.deg,
                    isLoading: false
                })
            });
    }

    extractData(forecast) {
        let week = forecast.list.reduce((dayGroup, currentDay) => {
            // Get a readable Day from current iterations date
            const dayDate = new Date(currentDay.dt_txt);

            // Add this to the current object to use for later
            currentDay.day = dayDate.toDateString().substr(0, 3);
            currentDay.time = dayDate.toLocaleTimeString();

            // If the accumulator (previous group) has "quasi-index" of the current day
            // push the current day in to that group since they're of the same day
            // else create a new array and push the currentday into that one since the day
            // has obviously changed
            dayGroup[currentDay.day] = dayGroup[currentDay.day] || []; 
            dayGroup[currentDay.day].push(currentDay);

            // return the whole array to the next iteration and in the end to the week variable
            return dayGroup;
        }, {});

        this.setState({
            week: week
        });
    }

    fetchWeatherFor5days() {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.state.coordLat}&lon=${this.state.coordLong}&APPID=${process.env.REACT_APP_OW_APP_ID}`)
            .then(response => response.json())
            .then(this.extractData);
    }

    render() {
        return (
            <React.Fragment>
            <button onClick={this.fetchWeatherFor5days}>5 days, please!</button>
                {this.state.weather.length > 0 ?  // if the weather property of the state object contains anything, then <div>-block will be included as the component renders
                    <div className="flexbox">
                        <div>
                            <h2>{this.state.city}</h2>
                            <img src={`http://openweathermap.org/img/w/${this.state.weather[0].icon}.png`} title={this.state.weather[0].description} alt={this.state.weather[0].description} />
                            <h3>{this.state.weather[0].description}</h3>
                        </div>

                        <ul className="ul">
                            <li className="li"><b>Current temperature</b><p>{this.state.temp}</p></li>
                            <li className="li"><b>Humidity</b><p>{this.state.humidity} %</p></li>
                            <li className="li"><b>Wind speed</b><p>{this.state.windspeed}</p></li>
                            <li className="li"><b>Wind deg</b><p>{this.state.winddeg}</p></li>
                        </ul>
                    </div>

                    : <p>{this.state.isLoading ? 'Fetching the latest results for ya!' : ''}</p> // otherwise, this <p> element will be rendered.
                }

                { Object.values(this.state.week).map(day => <Day forecast={day} />) }

            </React.Fragment>
        );
    }
}

export default Forecast;