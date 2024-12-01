import { useState } from 'react'
import Weather from "./components/Weather"
import './App.css'

function App() {
  const [city, setCity] = useState("");

  return (
    <>
      <div className='app'>
        <h1>Weather App</h1>
        <input type="text" placeholder='Enter your city'
        value={city}
        onChange={(e) => setCity(e.target.value)} />
        <Weather city={city} />
      </div>
    </>
  )
}

export default App
