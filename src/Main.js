import { useEffect, useState } from "react";
import { api } from "./api";
import CurrentWeather from "./CurrentWeather";

const autoData = require("./autoData.json");
const searchData = require("./searchData.json");
const forecastData = require('./forecast.json')

function Weather() {
  const [location, setLocation] = useState("");
  const [autocompleteResponse, setAutocompleteResponse] = useState([]);
  const [weatherText, setWeatherText] = useState("");
  const [weatherMetric, setWeatherMetric] = useState("");
  const [weatherImperial, setWeatherImperial] = useState("");

  const onSearchChange = (e) => {
    setLocation(e.target.value);
    if (location) {
      api
        .getAutocomlete(location)
        .then((res) => {
          setAutocompleteResponse(res);
        })
        .catch((err) => console.log(err));
    }
  };

  const onSearch = (searchTerm, locationKey) => {
    console.log(locationKey);
    setLocation(searchTerm);
    setWeatherText(searchData[0].WeatherText);
    setWeatherMetric(searchData[0].Temperature.Metric.Value);
    // api.getCurrentWeather(locationKey).then((res) => {
    //   console.log(res);
    //
    // });
  };

  return (
    <div className="w-full">
      <div className="w-3/5 mx-auto mt-14">
        <h1 className="text-6xl mx-auto text-center">
          So...
          <br /> How's the Weather?
        </h1>
        <p className="text-2xl text-center mt-10">
          The ultimate website that provides <u>percise</u> weather to talk
          about when you got nothing else to talk about
        </p>
      </div>

      <div className="h-8 border-box w-3/5 mx-auto mt-10 flex flex-wrap">
        <input
          type="text"
          className="w-4/5 mx-auto shadow-lg"
          placeholder="Enter desired location"
          onChange={onSearchChange}
          value={location}
        ></input>
        <div
          className={`bg-white flex-column w-4/5 mx-auto ${
            location ? "" : "hidden"
          }`}
        >
          {autoData
            .filter((suggestion) => {
              const searchTerm = location.toLowerCase();
              const suggestionName = suggestion.LocalizedName.toLowerCase();
              return (
                searchTerm &&
                suggestionName.startsWith(searchTerm) &&
                suggestionName !== searchTerm
              );
            })
            .map((suggestion) => (
              <div
                className="text-slate-500 hover:bg-slate-200 cursor-pointer"
                onClick={() =>
                  onSearch(suggestion.LocalizedName, suggestion.Key)
                }
              >
                {suggestion.LocalizedName}
              </div>
            ))}
        </div>
      </div>
      <div className="mt-10 mx-auto w-3/5 bg-white h-96 shadow-lg p-4">
        <button></button>
        <h2 className="text-5xl mx-auto w-1/2 text-center">{weatherText}</h2>
        <p className="text-3xl w-1/2 mx-auto mt-10 text-center">
          {weatherMetric}
        </p>
        <div className="w-full flex space-x-10 mt-6">
          {forecastData.DailyForecasts.map((day) => (
            <div className="w-1/5 border-box border-2 border-blue-500">
              <p></p>
              <h3>{day.Day.IconPhrase}</h3>
              <p>{day.Temperature.Minimum.Value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Weather;
