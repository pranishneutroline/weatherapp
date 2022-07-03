import React, { useEffect, useState } from "react";
import {TiLocation} from "react-icons/ti"
import "./temp.css";

function Temp() {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("pokhara");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=18746cf2f2c367f806b385b9e23f0890`;
      const response = await fetch(url);
      // console.log(response);
      const responseInJson = await response.json();
      console.log(responseInJson);
      setCity(responseInJson.main);
    };
    fetchApi();
  }, [search]);

  return (
    <>
      <main className="App">
        <section className="weather-today">
          <div className="container">
            <article className="weather-city">
              <form className="city-form">
                <input
                  type="search"
                  className="inputField"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Search city"
                />
                <input type="button" value="submit" className="inputBtn"/>
              </form>
            </article>

            <article className="weather-data">
              <h1 className="weather-temp">
                <span className="temp-value">
                  {!city ? (
                    <p>No data found</p>
                  ) : (
                    <>
                      <div className="info">
                      <h1 className="temp">
                          {city.temp}
                          <span> deg C</span>
                        </h1>
                       
                       {/* date */}
                        <h3 className="tempmin_max">
                          Min: {city.temp_min} deg cel Max:{city.temp_max} deg
                          cel
                        </h3>
                        <h2 className="location" value={city}>
                        <TiLocation /> {search}
                        </h2>
                      </div>
                    </>
                  )}
                </span>
              </h1>
            </article>
          </div>
        </section>

        <section class="highlights">
            <article>
              
            </article>
            <article></article>
        </section>
      </main>
    </>
  );
}

export default Temp;
