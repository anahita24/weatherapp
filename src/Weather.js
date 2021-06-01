import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css"
import { useState } from "react/cjs/react.development";
let display=false;
const Weather=function Weather()
{
    const [location,setlocation]=useState("Lucknow");
    const [weather,setWeather]=useState({
        currentTemp: 0,
        country: "",
        region: "",
        localtime: "",
        weatherMain: '',
        humidity:0,
    })
    const setWeatherValue=function ()
    {
          
          setlocation(document.getElementById("location").value);
    }
    useEffect(function(){ display=true;
        fetch("http://api.weatherstack.com/current\?access_key=24644919850b37c40893e7b83e08a328\n&query="+location+"")
        .then(response => response.json())
        .then(result => {
            
            console.log(location);
            setWeather({currentTemp:result.current.temperature,
                weatherMain:result.current.weather_descriptions[0],
               weather_icon:result.current.weather_icons,   
               country:result.location.country,
               region:result.location.region,
               localtime:result.location.localtime,
                humidity:result.current.humidity,})
                
            console.log(result);
        })
        .catch(error => {display=false});
            },[location]);
         
    if(display){
    return (<><main><input id="location" placeholder="Enter location"></input>
    <br/>
    
    <button onClick={setWeatherValue}>Get Weather</button>
    {<><div class="big">{location}</div><div class="big">{weather.country}</div>
    <br/><div class="big">{weather.region}</div><div>{weather.localtime}</div><div class="normal">Temperature:{weather.currentTemp}</div><div><img src={weather.weather_icon}/></div><div class="normal">{weather.weatherMain}</div><div class="normal">Humidity:{weather.humidity}</div></>}
    </main></>)
    }
    else
    return (<><main><input id="location" placeholder="Lucknow"></input>
    <br/>
    <br/>
    <button onClick={setWeatherValue}>Get Weather</button></main></>);
}
export default Weather;

