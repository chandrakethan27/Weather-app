import './App.css';
import {useState} from 'react';
import axios from 'axios';
function App() {
  const [data, setData] = useState({})
  const [msg, setMsg] =useState('Welcome to Weather App')
  const [error, setError] = useState()
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=895284fb2d2c50a520ea537456963d9c`
  const welcome = ()=>{
    setMsg('')
  }
  const searchLocation = (event) =>{
    if (event.key ==="Enter"){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('City not found:', error);
        setError('Oops, city not found')
      });
      setLocation('')
      welcome();
    }

  }
  return (
    <div className="app">
    <div className="container">
        <div className="search">
      <input value = {location} 
      onChange={event => setLocation(event.target.value)}
      onKeyPress={searchLocation} 
      placeholder='Enter location'
      type='text'/> 
    </div>
    <h2>{msg}</h2>
      <div className="top">
        <div className="location">
          <p className="">{data.name ? data.name:<h1>{error}</h1>}</p>
        </div>
        <div className="temp"> {data.main ? <h1>{(data.main.temp - 273.15).toFixed(2)}°C</h1> : null}</div>
      <div className="description">
        <p className="">{data.weather ? <p>{data.weather[0].main}</p>:null} </p>
      </div>
    </div>
    <div className="bottom">
      <div className="feels">
        <p className="">{data.main ? <p>{(data.main.feels_like - 273.15).toFixed(2)}°C</p> : null}</p>
        <p>Feels Like</p>
      </div>
      <div className="humidity">
        <p>Humidity</p>
        <p>{data.main ? <p>{data.main.humidity}</p>:null}</p>
      </div>
      <div className="wind">
        <p className="">{data.wind ? <p>{data.wind.speed}</p>:null}</p>
        <p>Winds</p>
      </div>
    </div>
    </div>
    </div>
  );
}
export default App;
