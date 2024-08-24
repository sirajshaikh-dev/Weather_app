 async function fetchCurrentWeather(city) {
    const apiKey = 'e797490782f48e86e4ffca87684601e1';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === '404') {
            throw new Error('City not found');
        }

        displayCurrentWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        document.querySelector('.weather-info').innerHTML = `<div class="alert">City not found</div>`;
    }
}

// Function to fetch and display 5-day weather forecast
async function fetchWeatherForecast(city) {
    const apiKey = 'e797490782f48e86e4ffca87684601e1';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === '404') {
            throw new Error('City not found');
        }

        displayWeatherForecast(data);
    } catch (error) {
        console.error('Error fetching forecast data:', error.message);
        document.querySelector('.weather-info').innerHTML = `<div class="alert">City not found</div>`;
    }
}

// Function to display current weather data
function displayCurrentWeather(data) {
    const weatherInfo = document.querySelector('.weather-info');
    weatherInfo.innerHTML = `
        <h2>${data.name}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <div class="weather-forecast"></div>
    `;

    // Call to fetch the 5-day forecast after the current weather is displayed
    fetchWeatherForecast(data.name);
}

// Function to display 5-day weather forecast
function displayWeatherForecast(data) {
    const forecastContainer = document.querySelector('.weather-forecast');
    forecastContainer.innerHTML = '<h3>5-Day Forecast</h3>';
    const forecastList = data.list;

    // Loop through the forecast data to display 5-day weather
    for (let i = 0; i < forecastList.length; i += 8) {
        const forecastItem = forecastList[i];
        const forecastDate = new Date(forecastItem.dt_txt).toLocaleDateString();
        forecastContainer.innerHTML += `
            <div class="forecast-item">
                <p>${forecastDate}</p>
                <img src="https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png" alt="${forecastItem.weather[0].description}">
                <p>${forecastItem.weather[0].description}</p>
                <p>Temp: ${forecastItem.main.temp}°C</p>
            </div>
        `;
    }
}

// Function to fetch both current weather and forecast
function fetchWeatherData(city) {
    fetchCurrentWeather(city);
}

// Event listener for the search button
document.querySelector('#search-button').addEventListener('click', () => {
    const city = document.querySelector('#city-select').value;
    fetchWeatherData(city);
});

// Fetch weather for the default city "Surat" when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData('Surat');
});
