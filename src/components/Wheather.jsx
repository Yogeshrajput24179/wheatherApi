import React from 'react'
import './Weather.css'
import { useEffect, useState, useRef } from 'react'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'
import searchBar from '../assets/searchBar.png'
const Wheather = () => {
    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState(false);
    const allIcons = {
        '01d': clear,
        '01n': clear,
        '02d': cloud,
        '02n': cloud,
        '03d': cloud,
        '03n': cloud,
        '04d': drizzle,
        '04n': drizzle,
        '09d': rain,
        '09n': rain,
        '10d': rain,
        '10n': rain,
        '13d': snow,
        '13n': snow
    }


    const search = async (city) => {
        if (city === "") {
            alert('Please enter a city name');
            return;
        }
        try {
            const apiKey = "a5c5713ae13d0880bc2dea0186c723c4";
         const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
           const response = await fetch(apiUrl);
            const data = await response.json();
            if(!response.ok){
                alert('City not found');
                return;
            }
            console.log(data);

            const icon = allIcons[data.weather[0].icon];
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temprature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        } catch (err) {
            setWeatherData(false);
            console.error("error in fetching data")
        }
    }

    useEffect(() => {
        search('London');

    }, [])
    return (
        <div className='weather'>
            <div className="search-bar">
                <input type="text" placeholder="   search" ref={inputRef} name="" id="" />
                <img src={searchBar} onClick={() => search(inputRef.current.value)} alt="" />
            </div>
            {weatherData ? <>
                <img src={weatherData.icon} alt="" className='weather_icon' />
                <p className='temprature'>{weatherData.temprature}°C</p>
                <p className='location'>{weatherData.location}</p>
                <div className="weather-data">
                    <div className="col">
                        <img src={humidity} alt="" />
                        <div>
                            <p>{weatherData.humidity}</p>
                            <span></span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={wind} alt="" />
                        <div>
                            <p>{weatherData.windSpeed}</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div> </>:<></>}

        </div>
    )
}

export default Wheather