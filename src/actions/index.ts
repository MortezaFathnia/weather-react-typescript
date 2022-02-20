import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';


// export interface Forecasts {
//     clouds: { all: number },
//     dt: number,
//     dt_txt: string,
//     main: { temp: number, feels_like: number, temp_min: number, temp_max: number, pressure: number, sea_level: number, temp_kf: number },
//     visibility: number,
//     weather: [{ id: number, main: string, description: string, icon: string }],
//     wind: { speed: number, deg: number, gust: number }
// }

interface ResponseData{
    list:Weather[]
}

export interface Weather {
    clouds: { all: number },
    dt: number,
    dt_txt: string,
    main: { temp: number, feels_like: number, temp_min: number, temp_max: number, pressure: number, sea_level: number, temp_kf: number },
    visibility: number,
    weather: [{ id: number, main: string, description: string, icon: string }],
    wind: { speed: number, deg: number, gust: number }
}


export interface FetchForecastsAction {
    type: ActionTypes.fetchForecasts;
    payload: Weather[];
}

export interface FetchCityWeatherAction {
    type: ActionTypes.fetchCityWeather;
    payload: Weather;
}

export const fetchCityWeather = (cityId: number) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<Weather>(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=538882fc8387290c6cee83f313a6acf5`);
        console.log(response)
        dispatch<FetchCityWeatherAction>({
            type: ActionTypes.fetchCityWeather,
            payload: response.data
        })
    }
}

export const fetchForecasts = (cityId: number) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<ResponseData>(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=538882fc8387290c6cee83f313a6acf5`);
        console.log(response.data.list)
        dispatch<FetchForecastsAction>({
            type: ActionTypes.fetchForecasts,
            payload: response.data.list
        })
    }
}