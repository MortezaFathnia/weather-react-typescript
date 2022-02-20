import { FetchCityWeatherAction, Weather, } from "../actions";
import { ActionTypes } from "../actions/types";

export const cityWeatherReducers = (
    state= {},
    action: FetchCityWeatherAction
) => {
    switch(action.type){
        case ActionTypes.fetchCityWeather:
            return action.payload;
        default:
            return state;
    }
}