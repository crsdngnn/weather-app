import axios from 'axios'

var promise;
const url = `${process.env.VUE_APP_API_URL}/weather`;
export default class WeatherService {
    getWeather(lon, lat) {
        promise = axios.get(`${url}?lon=${lon}&lat=${lat}`);
        return promise;
    }
}

export const weatherService = new WeatherService();