import React, { Component } from 'react';
import { CurrentWeather, Day, Week } from '..';
import {
  filterTodaysHourIntervals,
  sortHourIntervalsIntoWeekdays
} from '../common/helpers';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFahrenheit: false,
      coordLon: undefined,
      coordLat: undefined,
      city: undefined,
      visibleForecast: undefined,
      visibleDetails: undefined,
      current: undefined,
      today: undefined,
      week: undefined
    };

    this.getCoordinates = this.getCoordinates.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  componentDidMount() {
    this.getCoordinates().then(position => {
      this.setState(
        {
          coordLon: position.coords.longitude,
          coordLat: position.coords.latitude
        },
        _ => this.fetchWeather('current').then(this.fetchWeather('120h'))
      );
    });
  }

  getCoordinates() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position, error) => {
        if (error) {
          return reject(error);
        }

        return resolve(position);
      });
    });
  }

  changeTempUnit() {
    this.setState({
      isFahrenheit: !this.state.isFahrenheit
    });
  }

  fetchWeather(forecast, timePeriod = forecast, locationType) {
    let period;
    switch (timePeriod) {
      case 'current':
        period = 'weather';
        break;
      default:
        period = 'forecast';
    }

    let location;
    switch (locationType) {
      case 'byCityName':
        location = `q=${this.state.searchQuery}`;
        break;
      default:
        location = `lat=${this.state.coordLat}&lon=${this.state.coordLon}`;
    }

    this.setState({
      visibleForecast: undefined
    });

    return fetch(
      `http://api.openweathermap.org/data/2.5/${period}?${location}&APPID=${
        process.env.REACT_APP_OW_APP_ID
      }&units=metric`
    )
      .then(response => response.json())
      .then(response => {
        switch (timePeriod) {
          case 'current':
            return this.setState({
              current: response,
              city: response.name,
              visibleForecast: timePeriod,
              visibleDetails: timePeriod
            });
          case 'week':
            return this.setState({
              week: sortHourIntervalsIntoWeekdays(response.list),
              visibleForecast: timePeriod,
              visibleDetails: 'none'
            });
          default:
            return (
              this.setState({
                week: sortHourIntervalsIntoWeekdays(response.list)
              }),
              this.setState({
                today: filterTodaysHourIntervals(this.state.week)
              })
            );
        }
      });
  }

  renderWeatherData(forecastToShow) {
    switch (forecastToShow) {
      case 'current':
        return (
          <CurrentWeather
            data={this.state.current}
            isFahrenheit={this.state.isFahrenheit}
          />
        );
      case 'week':
        return (
          <Week
            data={this.state.week}
            isFahrenheit={this.state.isFahrenheit}
            city={this.state.city}
          />
        );
      default:
        return <p>Loading...</p>;
    }
  }

  renderWeatherDetails(forecastToShow) {
    switch (forecastToShow) {
      case 'current':
        return (
          <table className="table">
            <caption>
              <span>
                The weather<span> right now </span>
              </span>
              <span>
                at current position:<span> {this.state.city}</span>
              </span>
            </caption>
            <Day
              day={Date.now()}
              title={`Rest of today - ${new Date(Date.now()).toDateString()}`}
              data={this.state.today}
              isFahrenheit={this.state.isFahrenheit}
            />
          </table>
        );
      case 'week':
        return (
          <Week
            data={this.state.week}
            isFahrenheit={this.state.isFahrenheit}
            city={this.state.city}
          />
        );
      case 'none':
        return null;
      default:
        return <p>Loading...</p>;
    }
  }

  render() {
    const { visibleForecast, visibleDetails, isFahrenheit } = this.state;

    return (
      <React.Fragment>
        <menu className="forecast-switcher">
          <button className="unit-switch" onClick={e => this.changeTempUnit()}>
            °{isFahrenheit ? 'C' : 'F'}
          </button>
          <button
            value={visibleForecast === 'current' ? 'week' : 'current'}
            onClick={e => this.fetchWeather(e.target.value)}
          >
            {visibleForecast === 'current' ? 'week' : 'today'}
          </button>
        </menu>
        <section className="details">
          {this.renderWeatherDetails(visibleDetails)}
        </section>
        <section className="overview">
          {this.renderWeatherData(visibleForecast)}
        </section>
      </React.Fragment>
    );
  }
}

export default App;
