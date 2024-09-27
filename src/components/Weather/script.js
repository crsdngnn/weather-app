import {locationService} from "../../services/location/location.service";
import {weatherService} from "../../services/weather/weather.service";

export default {
    data() {
        return {
            city: '',
            weatherData: null,
            error: null,
            loading: false,
        };
    },
    computed: {
        weatherClass() {
            if (!this.weatherData) return '';
            const main = this.weatherData.weather[0].main.toLowerCase();
            return main === 'clear'
                ? 'clear'
                : main === 'clouds'
                    ? 'cloudy' : main === 'rain'
                        ? 'rain'
                        : 'default';
        },
        buttonStyle() {
            return {
                backgroundColor: this.weatherData ? this.getButtonColor() : '#007bff',
            };
        },
    },
    methods: {
        async getWeather() {
            this.error = null;
            this.loading = true;
            try {
                const geoResponse = await locationService.getLocation(this.city);
                const { lat, lon } = geoResponse.data.features[0]?.properties || {};
                if (!lat || !lon) throw new Error('City not found.');
                const response = await weatherService.getWeather(lon, lat);
                this.weatherData = response.data;
            } catch (err) {
                this.error = 'City not found. Please try again.';
                this.weatherData = null;
            } finally {
                this.loading = false;
            }
        },
        getButtonColor() {
            const main = this.weatherData.weather[0].main.toLowerCase();
            switch (main) {
                case 'clear':
                    return '#ffeb3b';
                case 'clouds':
                    return '#9e9e9e';
                case 'rain':
                    return '#2196f3';
                default:
                    return '#007bff';
            }
        },
    },
};