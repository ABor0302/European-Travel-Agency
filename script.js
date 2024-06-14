const apiKey = 'YOUR_API_KEY';

function getWeather() {
    const city = document.getElementById('citySelect').value;

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const weatherInfo = document.getElementById('weatherInfo');
            let forecastHTML = `<h2>5-Day Weather Forecast for ${city}</h2>`;

            // Reduce data list to 5-day forecast by selecting one item per day (at noon)
            const dailyData = [];
            const dailyDataMap = new Map();

            data.list.forEach(item => {
                const date = new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                if (!dailyDataMap.has(date)) {
                    dailyDataMap.set(date, item);
                }
            });

            dailyDataMap.forEach((value, key) => dailyData.push(value));

            dailyData.forEach((day, index) => {
                if (index < 5) { // Only show 5 days
                    const date = new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                    forecastHTML += `
                        <div class="forecast-day">
                            <h3>${date}</h3>
                            <p>Temperature: ${day.main.temp} °C</p>
                            <p>Description: ${day.weather[0].description}</p>
                            <p>Humidity: ${day.main.humidity}%</p>
                        </div>
                    `;
                }
            });

            weatherInfo.innerHTML = forecastHTML;
        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
        });
}
