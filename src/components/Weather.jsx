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

    const renderIcon = (weather) => {
        if(weather.includes("clear")) return <WiDaySunny/>;
        if(weather.includes("cloud")) return <WiCloudy/>;
        if(weather.includes("rain")) return <WiRain/>;
        if(weather.includes("snow")) return <WiSnow/>;
        return null;
    }

    return(
        <div className='weather'>
            {error && <p className='error'> error</p>}
            {weatherData && (<>
                <h2>{weatherData.name}</h2>
                <h3>{weatherData.main.temp}°C</h3>
                <p>{renderIcon(weatherData.weather[0].description)}</p>
                <p>{weatherData.weather[0].description}</p>
            </>
        )}

        </div>
    );
}

export default Weather; 