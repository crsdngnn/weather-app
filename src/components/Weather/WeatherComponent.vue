<template>
    <div :class="['weather-app', weatherClass]">
        <h1 class="title">Weather App</h1>
        <form @submit.prevent="getWeather">
            <input type="text" v-model="city" placeholder="Enter city name" required />
            <button :style="buttonStyle" :disabled="loading">Get Weather</button>
        </form>

        <div v-if="loading" class="loading">Loading...</div>

        <div v-if="weatherData" class="weather-info">
            <h2>Weather in {{ weatherData.name }}</h2>
            <i :class="`wi wi-owm-${weatherData.weather[0].id}`" style="font-size: 4em;"></i>
            <p class="temperature">{{ (weatherData.main.temp - 273.15).toFixed(2) }} °C</p>
            <p class="condition">{{ weatherData.weather[0].description }}</p>
            <p>Humidity: {{ weatherData.main.humidity }}%</p>
            <p>Wind Speed: {{ weatherData.wind.speed }} m/s</p>
        </div>

        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
