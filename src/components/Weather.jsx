import {useState,useEffect} from 'react'
import axios from "axios"
import {WiDaySunny, WiRain, WiCloudy, WiSnow} from "react-icons/wi"


const Weather = ({city}) => {
    const[weatherData,setWeatherData] = useState(null);
    const[error,setError] = useState("");

    useEffect(() => {
        if(city){
            const fetchWeather = async() => {
                try{
                    const apiKey = "cba2280af5bd75cb4919003160d3a086";
                    const response = await axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
                    setWeatherData(response.data);
                    setError("");
                }
                catch{
                    setError("City not found. Please try again.");
                    setWeatherData(null);
                }
            }
            fetchWeather();
        }
    },[city]);

    const weatherIcons = {
        clear: <WiDaySunny />,
        clouds: <WiCloudy />,
        rain: <WiRain />,
        snow: <WiSnow />,
    };
    
    const renderIcon = (weather) => {
        const key = Object.keys(weatherIcons).find((key) => weather.includes(key));
        return weatherIcons[key] || null;
    };
    

    return(
        <div className='weather'>
            {error && <p className='error'> {error}</p>}
            {weatherData && (<>
                <h2>Weather in {weatherData.name}</h2>
                <h3>Temperatue : {weatherData.main.temp}°C</h3>                
                <p>Condition : {weatherData.weather[0].description}</p>
                <p>{renderIcon(weatherData.weather[0].description || '')}</p>
            </>
        )}

        </div>
    );
}

export default Weather; 