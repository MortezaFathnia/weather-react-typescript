import { FetchCityWeatherAction, FetchForecastsAction, Weather } from "../actions";
import { ActionTypes } from "../actions/types";

export const forecastsReducers = (
    state: Weather[] = [],
    action: FetchForecastsAction 
) => {
    switch(action.type){
        case ActionTypes.fetchForecasts:
            return action.payload;
        default:
            return state;
    }
}