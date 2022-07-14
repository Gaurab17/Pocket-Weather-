// const key = '7GjrZJn9ViFFro8nBoLf4jt8OHFBGj53';
// const searchCity = document.querySelector('.search');
// const cityName = document.querySelector('.city_name');
// const weatherCondition = document.querySelector('.weather_condition');
// const temperature = document.querySelector('.temperature');
// const image = document.querySelector('img');
// const result = document.querySelector('.result');

// //get city search
// const getCity = async (city) =>{
//     const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
//     const query = `?apikey=${key}&q=${city}`;
//     const response = await fetch(base+query);
//     const cityData = await response.json();
//     return cityData[0];
// }

// //get city Weather conditions
// const getWeather = async (id) =>{
//     const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
//     const query =  `${id}?apikey=${key}`;
//     const response = await fetch(base+query);
//     const data = await response.json();
//     return data[0];
// }

// //search the city
// const search = async (d) =>{
//     const cityDetails = await getCity(d);
//     const weatherDetails = await getWeather(cityDetails.Key);
//     cityName.innerHTML = `<h4>${cityDetails.LocalizedName}</h4>`
//     weatherCondition.innerHTML = `<h4>${weatherDetails.WeatherText}</h4>`
//     temperature.innerHTML = `<h2>${weatherDetails.Temperature.Metric.Value} °C</h2>`
    
//     return {
//         cityDetails:cityDetails,
//         weatherDetails:weatherDetails
//     }
// }

// //update uUI
// const updateUI = () =>{
//     search(localStorage.getItem('city'))
//         .then(data=>{
//             let timeSrc = null;
//             if(data.weatherDetails.IsDayTime){
//                 timeSrc = "img/day.png";
//             } else{
//                 timeSrc = "img/night.png";
//             } 
//             image.setAttribute('src', timeSrc);
//         })
//         .catch(err=>console.log(err));
//     result.style.display = "block";
// }

// searchCity.addEventListener('submit', e=>{
//     e.preventDefault();
//     const city = searchCity.search.value.trim();
//     localStorage.setItem('city', city);
//     searchCity.reset();
//     let timeSrc = null;
//     updateUI();
// });

// if(localStorage.getItem('city')){
//     updateUI();
// }

const searchCity = document.querySelector('.search');
const cityName = document.querySelector('.city_name');
const weatherCondition = document.querySelector('.weather_condition');
const temperature = document.querySelector('.temperature');
const image = document.querySelector('img');
const result = document.querySelector('.result');

class Forecast{
    constructor(){
        this.key = "7GjrZJn9ViFFro8nBoLf4jt8OHFBGj53";
        this.getCityUri = "https://dataservice.accuweather.com/locations/v1/cities/search";
        this.getWeatherUri = "https://dataservice.accuweather.com/currentconditions/v1/";
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.getCityUri+query);
        const cityData = await response.json();
        return cityData[0];
    }
    async getWeather(id){
        const query =  `${id}?apikey=${this.key}`;
        const response = await fetch(this.getWeatherUri+query);
        const data = await response.json();
        return data[0];
    }
    async search(d){
        const cityDetails = await this.getCity(d);
        const weatherDetails = await this.getWeather(cityDetails.Key);
        cityName.innerHTML = `<h4>${cityDetails.LocalizedName}</h4>`
        weatherCondition.innerHTML = `<h4>${weatherDetails.WeatherText}</h4>`
        temperature.innerHTML = `<h2>${weatherDetails.Temperature.Metric.Value} °C</h2>`
        
        return {
            cityDetails:cityDetails,
            weatherDetails:weatherDetails
        }
    }
    updateUI(){
        this.search(localStorage.getItem('city'))
            .then(data=>{
                let timeSrc = null;
                if(data.weatherDetails.IsDayTime){
                    timeSrc = "img/day.png";
                } else{
                    timeSrc = "img/night.png";
                } 
                image.setAttribute('src', timeSrc);
            })
            .catch(err=>console.log(err));
        result.style.display = "block";
    }

}

const forecast = new Forecast();
console.log(forecast);

searchCity.addEventListener('submit', e=>{
    e.preventDefault();
    const city = searchCity.search.value.trim();
    localStorage.setItem('city', city);
    searchCity.reset();
    let timeSrc = null;
    forecast.updateUI();
});

if(localStorage.getItem('city')){
    forecast.updateUI();
}
