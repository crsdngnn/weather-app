import axios from 'axios'

var promise;
const url = `${process.env.VUE_APP_API_URL}/location`;
export default class LocationService {
    getLocation(city) {
        promise = axios.get(`${url}/?text=${city}`);
        return promise;
    }
}

export const locationService = new LocationService();