import { combineReducers } from "redux";
import { Weather } from "../actions";
import { cityWeatherReducers } from "./cityWeather";
import { forecastsReducers } from "./forecasts";

export interface StoreState{
    forecasts:Weather[],
    cityWeather:any
}

export const reducers=combineReducers<StoreState>({
    forecasts:forecastsReducers,
    cityWeather:cityWeatherReducers
})