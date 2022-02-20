import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchForecasts, fetchCityWeather, Weather } from '../actions';
import { StoreState } from '../reducers';
import moment from 'moment';
import './App.css';

interface AppProps {
  forecasts: Weather[];
  cityWeather: Weather;
  fetchForecasts(id: number): any;
  fetchCityWeather(id: number): any;
}

function _App(props: AppProps) {
  const [cityId, setCityId] = useState(0);
  const [showForecasts, setShowForecasts] = useState(false);
  const cities = [
    {
      id: 6167865,
      name: 'Toronto',
      country: 'CA',
    },
    {
      id: 6094817,
      name: 'Ottawa',
      country: 'CA',
    },
    {
      id: 1850147,
      name: 'Tokyo',
      country: 'JP',
    },
  ];

  const cityChange = (e: any) => {
    const value = e.target.value;
    if (value) {
      props.fetchCityWeather(value);
      setCityId(value);
    }
  };

  const renderList = (): JSX.Element[] => {
    return props.forecasts.map((item: any, index: number) => {
      return (
        <ul className='list-weather' key={index}>
          <li>{moment(item.dt).format('DD MMM LT')}</li>
          <li>{item.main.feels_like}</li>
          <li>{item.main.temp_min}&deg;C</li>
          <li>{item.main.temp_max}&deg;C</li>
          <li>{item.wind.speed}m/s</li>
          <li>{item.weather[0].description}</li>
        </ul>
      );
    });
  };

  const renderCityWeather = (): JSX.Element => {
    return (
      <div className='city-weather-wrapper'>
        <div>
          <p>{props.cityWeather.weather[0].main}</p>
          <p>{props.cityWeather.weather[0].description}</p>
        </div>
        <div>
          <p>
            {props.cityWeather.dt &&
              moment(props.cityWeather.dt).format('DD MMM LT')}
          </p>
          <p>{props.cityWeather.main.feels_like}</p>
        </div>
      </div>
    );
  };

  const seeForecast = () => {
    setShowForecasts((prevState) => !prevState);
    console.log(showForecasts);
    if (!showForecasts && cityId) {
      props.fetchForecasts(cityId);
    }
  };

  return (
    <div className='app-wrapper'>
      <h2>Weather Forecast</h2>
      <div>
        <div className='select-city-wrapper'>
          <select className='select-city' onChange={cityChange}>
            <option key='city-root' value=''>
              City
            </option>
            {cities.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <p className='desc'>please select a city to see the forecast</p>
        </div>
        {cityId !== 0 ? (
          <div>
            <div>{!props.cityWeather.weather ? '' : renderCityWeather()}</div>

            <button onClick={seeForecast}>SEE FORECAST</button>
            {showForecasts ? (
              <div >
                <ul className='list-weather-title'>
                  <li>Date</li>
                  <li>Temp</li>
                  <li>Min Temp</li>
                  <li>Max Temp</li>
                  <li>Wind</li>
                  <li>Description</li>
                </ul>
                {props.forecasts ? renderList() : <p>loading...</p>}
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({
  forecasts,
  cityWeather,
}: StoreState): { forecasts: Weather[]; cityWeather: Weather } => {
  return { forecasts, cityWeather };
};

export const App = connect(mapStateToProps, {
  fetchForecasts,
  fetchCityWeather,
})(_App);
