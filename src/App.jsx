import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const { register, handleSubmit, reset} = useForm();

  useEffect(() => {
    if (location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=27adc638e851b6f98817a8259107093a`;
        axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('City not found', error);
        });
    }
  }, [location]);

  const onFormSubmit = (event) => {
    setLocation(event.location);
    reset();
  };

  return (
    <div className="App ">
      <p className="text-6xl text-white mt-3 hover:text-stone-300 font-semibold text-center">Pocket Weather</p>
      <div>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className='flex justify-center'>
          <input
            type="text"
            placeholder="Search City..."
            className="input input-bordered w-full max-w-xs mt-10"
            {...register('location', { required: true })}
          />
          <div className="form mt-10 ml-3">
            <button type="submit" className="btn btn-outline btn-success">
              Search
            </button>
          </div>
          </div>
        </form>

    {
      data.main ?<div >
        <p className='text-5xl font-bold mt-7 text-white text-center'>Temperature</p>
        {data.main ? <h1 className='text-6xl font-bold mt-4 text-white  text-center'>{(data.main.temp - 273.15).toFixed(2)}°C</h1> : null}
        <p className='text-2xl mt-1 font-bold  text-white text-center'>{location.charAt(0).toUpperCase()+location.slice(1)}</p>
        </div>: null
    }
    
    {
    data.main ?  
    <div className='grid gap-7 lg:grid-cols-3 place-items-center mt-10'>
    
    <div className="card w-96 bg-blue-400 text-white glass " style={{backgroundImage: 'url(https://images.unsplash.com/photo-1618588507085-c79565432917?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwbmF0dXJlfGVufDB8fDB8fHww&w=1000&q=80)'}}>
      <div className="card-body">
        <h2 className="card-title text-3xl font-bold">Feels Like</h2>
         {
            data.main ? (
              <p className="text-3xl">{data.main ? <p>{(data.main.feels_like - 273.15).toFixed(2)}°C</p> : null}</p>
            ) : null
          }
      </div>
    </div>

    <div className="card w-96 bg-blue-400 text-white glass" style={{backgroundImage: 'url(https://goblueox.com/wp-content/uploads/2019/08/1-1-1024x594.jpg)'}}>
      <div className="card-body">
        <h2 className="card-title text-3xl font-bold">Humidity</h2>
         {
          data.main ? (
            <p className='text-3xl'>{data.main ? <p>{data.main.humidity}%</p>:null}</p>
          ) : null
          }
      </div>
    </div>

    <div className="card w-96 bg-blue-400 text-white glass" style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Wind_turbines_in_southern_California_2016.jpg/660px-Wind_turbines_in_southern_California_2016.jpg)'}}>
      <div className="card-body">
        <h2 className="card-title text-3xl font-bold">Wind Speed</h2>
         {
          data.main ? (
             <p className="text-3xl">{data.wind ? <p>{data.wind.speed}mph</p>:null}</p>
          ) : null
          }
      </div>
    </div>

  </div>: null
  }
  </div>
</div>
  );
}

export default App;
