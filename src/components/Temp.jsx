import React, { useState } from "react";
import { TiLocation } from "react-icons/ti";
import axios from "axios";
import moment from "moment";
import "./temp.css";

function Temp() {
  const [temperature, setTemperature] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("Kathmandu");
  const[max,setMax]= useState("")
  const[min,setMin]= useState()

  const getWeatherData = (city) => {
    axios({
      method: "GET",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9fbbbf4d9de651b40b9d0d188076b2ae`,
    })
      .then((response) => {
        console.log(response.data.main.temp);
        // Kelvin to Celsius

        setTemperature(response.data.main.temp);
        setDesc(response.data.weather[0].main);
        setMax(response.data.main.temp_max);
        setMin(response.data.main.temp_min);
      
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          setTemperature(error.response.data.cod)
          setCity(error.response.data.message)
        }
      });
  };

  return (
    <>
      <main className="App">
        <section className="weather-today">
          <div className="container">
            <article className="weather-city">
              <h1 className="heading">Weather App</h1>
              <div className="city-form">
                <input
                  type="search"
                  className="inputField"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Search city"
                />
                <button
                  className="inputBtn"
                  onClick={() => {
                    getWeatherData(city);
                  }}
                >Submit</button>
              </div>
            </article>

            <article className="weather-data">
              <h1 className="weather-temp">
                <span className="temp-value">
                  {!city ? (
                    <p>data not found</p>
                  ) : (
                    <>
                      <div className="info">
                        <h1 className="temp">
                          <span>
                            {" "}
                            {Math.round(temperature * 100) / 100}℃ - {desc}
                          </span>
                        </h1>
                        {moment().format("MMM Do YYYY")}
                        {/* {new Date().toLocaleString()} */}
                        <h3 className="tempmin_max">
                          Min:{min}℃ Max:{max}℃
                        </h3>
                        <h2 className="location" value={city}>
                          <TiLocation /> {city}
                        </h2>
                      </div>
                    </>
                  )}
                </span>
              </h1>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

export default Temp;
